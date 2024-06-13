require("dotenv").config();

exports.addProduct = async (req, res, next) => {
  const myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");
  myheaders.append("X-Shopify-Access-Token", process.env.ACCESS_TOKEN);

  const { title, body_html, vendor, product_type, tags } = req.body;

  const url = `${process.env.SHOPIFY_URL}/products.json`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: myheaders,
      body: JSON.stringify({
        product: {
          title,
          body_html,
          vendor,
          product_type,
          tags,
        },
      }),
    });

    const data = await response.json();

    res.status(201).json({
      success: true,
      product: data.product,
    });
  } catch (error) {
    return next(new Error("Error adding product" + error));
  }
};

exports.getAllProducts = async (req, res, next) => {
  const myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");
  myheaders.append("X-Shopify-Access-Token", process.env.ACCESS_TOKEN);

  const { page = "", limit = 5, searchTerm = "" } = req.query; // Default page to 1 for initial load

  let url = `${process.env.SHOPIFY_URL}/products.json?limit=${limit}`;

  if (page !== "") {
    url += `&page_info=${page}`;
  } else if (searchTerm !== "") {
    url += `&title=${searchTerm}`;
  }

  try {
    const response = await fetch(url, { method: "GET", headers: myheaders });

    const headers = response.headers;
    const data = await response.json();

    const { nextPageInfo, prevPageInfo } = getPrevAndNextPageInfo(headers);

    console.log(nextPageInfo);
    console.log(prevPageInfo);

    res.status(200).json({
      products: data.products,
      nextPageInfo,
      prevPageInfo, // Include next and previous page links in the response
    });
  } catch (error) {
    return next(new Error("Error fetching products" + error));
  }
};

function getPrevAndNextPageInfo(headers) {
  let nextPageInfo = null;
  let prevPageInfo = null;

  const linkHeader = headers.get("link").split(","); // Get the link header from the response
  linkHeader.forEach((link) => {
    if (link.includes('rel="next"')) {
      nextPageInfo = link
        .split(";")[0]
        .split("&")[1]
        .split("=")[1]
        .replace(">", ""); // Extract the next page link
    }
    if (link.includes('rel="previous"')) {
      prevPageInfo = link
        .split(";")[0]
        .split("&")[1]
        .split("=")[1]
        .replace(">", ""); // Extract the previous page link
    }
  });
  return { nextPageInfo, prevPageInfo };
}

exports.findProductByTitle = async (req, res, next) => {
  const myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");
  myheaders.append("X-Shopify-Access-Token", process.env.ACCESS_TOKEN);

  const { title } = req.query;

  const url = `${process.env.SHOPIFY_URL}/products.json?title=${title}`;

  try {
    const response = await fetch(url, { method: "GET", headers: myheaders });

    const data = await response.json();

    res.status(200).json({
      products: data.products,
      nextPageInfo: null,
      prevPageInfo: null,
    });
  } catch (error) {
    return next(new Error("Error fetching products" + error));
  }
};

exports.updateProduct = async (req, res, next) => {
  const myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");
  myheaders.append("X-Shopify-Access-Token", process.env.ACCESS_TOKEN);

  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  const { title, body_html, vendor, product_type, tags } = req.body;
  console.log(title, body_html, vendor, product_type, tags);

  const url = `${process.env.SHOPIFY_URL}/products/${id}.json`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: myheaders,
      body: JSON.stringify({
        product: {
          title,
          body_html,
          vendor,
          product_type,
          tags,
        },
      }),
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      product: data.product,
    });
  } catch (error) {
    return next(new Error("Error updating product" + error));
  }
};

exports.deleteProduct = async (req, res, next) => {
  const myheaders = new Headers();
  myheaders.append("Content-Type", "application/json");
  myheaders.append("X-Shopify-Access-Token", process.env.ACCESS_TOKEN);

  const { id } = req.params;

  const url = `${process.env.SHOPIFY_URL}/products/${id}.json`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: myheaders,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new Error("Error deleting product" + error));
  }
};
