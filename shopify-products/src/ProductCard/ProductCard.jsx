import React from 'react';
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router"

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const myheaders = new Headers();
        myheaders.append('Content-Type', 'application/json');

        const response = await fetch(`${process.env.REACT_APP_URL}/products/${product.id}`, {
            method: 'DELETE',
            headers: myheaders,
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            alert('Product deleted successfully');
        }
        else {
                alert('Error deleting product');
        }
        window.location.reload();
    }

    return (
        <div className={styles.product}>
            <h2>{product.title}</h2>
            <p dangerouslySetInnerHTML={{__html: product.body_html}}></p>
            <p>{product.vendor}</p>
            <p>{product.product_type}</p>
            <p>{product.tags}</p>
            <button onClick={() => {
                navigate(`/products/update?id=${product.id}`);
            }} className={styles.btn}>Update</button>
            <button onClick={handleDelete} className={styles.btn}>Delete</button>
        </div> 
    )
};

export default ProductCard;