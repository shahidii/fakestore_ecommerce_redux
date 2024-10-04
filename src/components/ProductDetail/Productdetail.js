import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const { items } = useSelector((state) => state.products); // Access products from Redux store

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = () => {
      const foundProduct = items.find((item) => item.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        setError("Product not found");
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, items]);

  if (loading) {
    return (
      <div className="container-fluid text-center p-5 m-5">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid text-center p-5 m-5">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        <div className="product-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-rating">⭐️⭐️⭐️⭐️☆ (120 reviews)</p>
          <div className="offer-box">Today's Offer</div>
          <p className="product-detail-price">₹{(product.price * 80).toFixed(2)}</p>
          <p className="product-detail-mrp">
            <strike>MRP: ₹{(product.price * 100).toFixed(2)}</strike>
          </p>
          <p className="product-detail-description">{product.description}</p>
          <button className="btn btn-warning">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
