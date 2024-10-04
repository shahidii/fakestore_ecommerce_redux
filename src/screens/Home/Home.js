import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import { Link } from 'react-router-dom'; // Import Link
import './styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  // if (loading) return <p>Loading featured products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <section className="hero">
        <div className="container hero-title">
          <h1>Welcome to <span className="banner-Max">Max</span></h1>
          <p>Your destination for the latest in fashion and tech</p>
          <Link to="/products" className="btn btn-outline-primary">Shop Now</Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products container py-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {items.slice(0, 3).map((product) => (
            <div className="col-md-4" key={product.id}>
              <Link to={`/product/${product.id}`} className='text-decoration-none'> 
                <div className="card product-card shadow-sm">
                  <img src={product.image} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-rating">⭐️⭐️⭐️⭐️⭐️ (based on {product.reviews} reviews)</p>
                    <div className="offer-box">Today's Offer</div>
                    <p className="price">₹{(product.price * 80).toFixed(2)}</p>
                    <p className="mrp"><strike>MRP :₹{(product.price * 100).toFixed(2)}</strike></p>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-primary">View Details</Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
