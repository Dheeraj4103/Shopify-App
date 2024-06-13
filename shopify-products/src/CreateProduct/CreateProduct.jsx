import React, { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [vendor, setVendor] = useState('');
  const [productType, setProductType] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(title, bodyHtml, vendor, productType, tags);

      const myheaders = new Headers();
      myheaders.append('Content-Type', 'application/json');

      const response = await fetch(`${process.env.REACT_APP_URL}/products/add`, {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            body_html: bodyHtml,
            vendor: vendor,
            product_type: productType,
            tags: tags,
          }),
          headers: myheaders,
      });

      const data = await response.json();
      
      if (response.ok) {
          console.log(data);
          alert('Product added successfully');
      } else {
          alert('Error adding product');
      }
      navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="bodyHtml">Body HTML:</label>
        <textarea
          id="bodyHtml"
          value={bodyHtml}
          onChange={(e) => setBodyHtml(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="vendor">Vendor:</label>
        <input
          type="text"
          id="vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="productType">Product Type:</label>
        <input
          type="text"
          id="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.btn}>Submit</button>
    </form>
  );
};

export default CreateProduct;
