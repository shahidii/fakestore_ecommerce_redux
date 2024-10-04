import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.css'; // Ensure this points to your CSS file

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true); // State for navbar collapse

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
    } else if (searchTerm === '') {
      navigate('/products');
    }
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
      <div className="container">
        <NavLink className="navbar-brand" to="/">Max</NavLink>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Call toggle function
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed} // Reflect the collapse state
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <div className={`navbar-container ${isCollapsed ? '' : 'mobile'}`}> {/* Add mobile class here */}
            {/* Search box centered between brand and nav links */}
            <form className="search-box" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </form>
            
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/" activeclassname="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products" activeclassname="active">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" activeclassname="active">
                  About Us
                </NavLink>
              </li>
            </ul>

            <button className="btn btn-outline-success ms-2" aria-label="View Cart">
              <i className="bi bi-cart"></i> Cart
            </button>
            <button className="btn btn-primary ms-2" aria-label="Login">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
