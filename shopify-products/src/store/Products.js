const Load_Products_Start = "Load_Products_Start";
const Load_Products_Success = "Load_Products_Success";
const Load_Products_Error = "Load_Products_Error";
const Page_Info = "Page_Info";

export function productsLoading() {
  return {
    type: Load_Products_Start,
  };
}

export function pageInfo(nextPageInfo, prevPageInfo) {
  return {
    type: Page_Info,
    payload: { nextPageInfo, prevPageInfo },
  };
}

export function productsLoaded(products) {
  return {
    type: Load_Products_Success,
    payload: products,
  };
}

export function productsError(error) {
  return {
    type: Load_Products_Error,
    payload: error,
  };
}

export function loadProducts(currentPageInfo = "", searchTerm = "") {
  return async (dispatch, getstate) => {
    dispatch(productsLoading());

    try {
      const myheaders = new Headers();
      myheaders.append("Content-Type", "application/json");

      let url = `${process.env.REACT_APP_URL}/products`;

      if (currentPageInfo !== "") {
        url += `?page=${currentPageInfo}`;
      } else if (searchTerm !== "") {
        url += `/find?title=${searchTerm}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: myheaders,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { nextPageInfo, prevPageInfo } = data;
        dispatch(pageInfo(nextPageInfo, prevPageInfo));
        dispatch(productsLoaded(data.products));
      } else {
        dispatch(productsError("Error fetching products"));
      }
    } catch (error) {
      dispatch(productsError(error));
    }
  };
}

function productReducer(
  state = {
    isLoading: false,
    error: null,
    products: [],
    nextPageInfo: null,
    prevPageInfo: null,
  },
  action
) {
  switch (action.type) {
    case "Load_Products_Start":
      return { ...state, isLoading: true };

    case "Load_Products_Success":
      return { ...state, isLoading: false, products: action.payload };

    case "Page_Info":
      return {
        ...state,
        nextPageInfo: action.payload.nextPageInfo,
        prevPageInfo: action.payload.prevPageInfo,
      };

    case "Load_Products_Error":
      return { ...state, isLoading: true, error: action.payload };

    default:
      return state;
  }
}

export default productReducer;
