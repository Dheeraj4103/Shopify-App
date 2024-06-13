import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import UpdateProductForm from "./UpdateProduct/UpdateProduct";
import CreateProduct from "./CreateProduct/CreateProduct";

function App() {
  return (
    <Routes>
      <Route exact={true} path="/" Component={ProductList} />
      <Route
        exact={true}
        path="/products/update"
        Component={UpdateProductForm}
      />
      <Route exact={true} path="/products/add" Component={CreateProduct} />
    </Routes>
  );
}

export default App;
