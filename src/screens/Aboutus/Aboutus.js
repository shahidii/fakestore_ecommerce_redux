import React from 'react';
import './styles.css'; // Import the CSS file

const AboutUs = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2 className="section-title">About Us</h2>
                        <p className="section-subtitle">Your Trusted E-commerce Partner</p>
                        <p>
                            Welcome to our e-commerce store, where innovation meets style. Our mission is to provide you with the latest trends and high-quality products at the best prices. We believe that shopping should be an enjoyable experience, which is why we carefully curate our collections to suit every taste and need.
                        </p>
                        <p>
                            Our dedicated team works tirelessly to bring you a seamless shopping experience. From exploring new trends to ensuring swift delivery, we are committed to serving you with excellence. Thank you for choosing us as your shopping destination!
                        </p>
                        {/* <a href="#" className="btn btn-primary">Learn More</a> */}
                    </div>
                    <div className="col-lg-6">
                        <div className="about-image">
                            <img src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/fi/max-fashion-to-open-1-store-ever-97c4e4bf59.gif" alt="About Us" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
