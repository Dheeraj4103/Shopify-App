import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";
import { loadProducts } from "../store/Products";

function ProductList() {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productsList);
    const [currentPageInfo, setCurrentPageInfo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    console.log(productsList);

    useEffect(() => {
        dispatch(loadProducts(currentPageInfo, searchTerm));
    }, [dispatch, currentPageInfo]);

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    function hasNextPage() {
        if (productsList.nextPageInfo) {
            setCurrentPageInfo(productsList.nextPageInfo);
        }
    }

    function hasPrevPage() {
        if (productsList.prevPageInfo) {
            setCurrentPageInfo(productsList.prevPageInfo);
        }
    }

    function handleSearchSubmit() {
        dispatch(loadProducts("", searchTerm));
    }

    if (productsList.isLoading) {
        return <h1>Loading .....</h1>
    } else if (productsList.products.length > 0) {
        return (
            <>
                <div className={styles.navbar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={handleSearch}
                            className={styles.searchInput}
                        />
                        <button onClick={handleSearchSubmit} className={styles.submitBtn}>Submit</button>
                    </div>
                    <button onClick={() => {
                        navigate("/products/add");
                    }} className={styles.btn}>Add Product</button>
                </div>
                <div className={styles.list}>
                    {
                        productsList.products.map((product, index) => {
                            return (
                                <ProductCard key={index} product={product} />
                                
                            )
                        })
                    }
                </div>
                <div className={styles.navigationButtons}>
                    <button
                        onClick={hasPrevPage}
                        disabled={!productsList.prevPageInfo}
                        className={styles.btn}
                    >
                        Prev
                    </button>
                    <button
                        onClick={hasNextPage}
                        disabled={!productsList.nextPageInfo}
                        className={styles.btn}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    } else {
        return <h1>No Products Found</h1>
    }
}

export default ProductList;