import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search");

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(100000);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) => {
    const inCategory = selectedCategories.length > 0 
      ? selectedCategories.includes(product.category) 
      : true;
    
    const inPriceRange = product.price * 30 >= minPrice && product.price * 30 <= maxPrice;
    const matchesSearchTerm = searchTerm 
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;

    return inCategory && inPriceRange && matchesSearchTerm;
  });

  const toggleFilter = () => setFilterVisible((prev) => !prev);

  const handleCategoryChange = (category) => {
    setTempSelectedCategories((prev) => 
      prev.includes(category) 
        ? prev.filter((cat) => cat !== category) 
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setMinPrice(rangeMin);
    setMaxPrice(rangeMax);
    setFilterVisible(false);
  };

  const clearFilters = () => {
    setTempSelectedCategories([]);
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(100000);
    setRangeMin(0);
    setRangeMax(100000);
    setFilterVisible(false);
  };

  if (loading) {
    return (
      <div className="container-fluid text-center p-5 m-5">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid text-center p-5 m-5">
        <h2>Error fetching products: {error}</h2>
      </div>
    );
  }

  return (
    <div className="products-container">
      {filteredProducts.length > 0 && (
        <button
          className="btn btn-outline-secondary filter-button"
          onClick={toggleFilter}
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
          <i className="bi bi-funnel ms-2"></i>
        </button>
      )}

      {isFilterVisible && filteredProducts.length > 0 && (
        <div className="filter-menu">
          <h4>Filter by Category</h4>
          <div className="filter-options">
            {["electronics", "jewelery", "men's clothing", "women's clothing"].map((category) => (
              <div key={category} className="filter-option">
                <input
                  type="checkbox"
                  id={category}
                  checked={tempSelectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
          <h4>Filter by Price</h4>
          <div className="price-filter">
            <label>Starting Price: ₹{rangeMin}</label>
            <input
              type="range"
              min="0"
              max="100000"
              value={rangeMin}
              onChange={(e) => setRangeMin(Number(e.target.value))}
            />
            <label>Maximum Price: ₹{rangeMax}</label>
            <input
              type="range"
              min="0"
              max="100000"
              value={rangeMax}
              onChange={(e) => setRangeMax(Number(e.target.value))}
            />
          </div>
          <button
            className="btn btn-outline-primary filter-button"
            style={{ marginRight: "20px", marginTop: "20px" }}
            onClick={applyFilters}
          >
            Apply Filters
          </button>
          <button
            className="btn btn-outline-secondary filter-button"
            style={{ marginTop: "20px" }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} className="text-decoration-none" >
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-rating">⭐️⭐️⭐️⭐️☆ (120 reviews)</p>
                <div className="offer-box">Today's Offer</div>
                <p className="product-price">₹{(product.price * 80).toFixed(2)}</p>
                <p className="mrp">
                  <strike>MRP :₹{(product.price * 100).toFixed(2)}</strike>
                </p>
                <button className="btn btn-warning">Add to Cart</button>
              </div>
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="container text-center p-5 m-5">
          <div className="no-products-message">
            <i
              className="bi bi-exclamation-circle"
              style={{ fontSize: "3rem", color: "#dc3545" }}
            ></i>
            <h2 className="mt-3" style={{ color: "#343a40" }}>
              No products found 
              {searchTerm && (
                <>
                  <span> for</span>
                  <span style={{ fontWeight: "bold" }}> "{searchTerm}"</span>
                </>
              )}
            </h2>
            <p className="text-muted">
              Try adjusting your search or browse our categories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
