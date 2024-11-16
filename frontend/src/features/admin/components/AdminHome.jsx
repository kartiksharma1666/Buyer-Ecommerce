import React, { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink } from 'react-router-dom'; // For routing
import './AdminHome.css'; // Ensure to import your CSS file

import foodAwareness from './Image/foodAwareness.png'
import foodWaste1 from './Image/foodWaste1.png'
import logo from './Image/logo.png'
import home_img from './Image/home_img.png'
import about1 from './Image/about1.png'
import whyUse from './Image/whyUse.png'


const AdminHome = () => {
  const imageRef = useRef(null);
  const [offset, setOffset] = useState(60);

  useEffect(() => {
    const handleScroll = () => {
      const top = imageRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        imageRef.current.classList.add('slide-up');
      }
    };

    const updateOffset = () => {
      if (window.innerWidth < 768) { // For mobile screens
        setOffset(50); 
      } else {
        setOffset(8);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset); 
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateOffset);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
      <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <ScrollLink to="business-solutions" smooth={true} duration={500} offset={offset}>BUSINESS SOLUTIONS</ScrollLink>
            </li>
            <li>
              <ScrollLink to="about" smooth={true} duration={500} offset={offset}>ABOUT US</ScrollLink>
            </li>
            <li>
              <ScrollLink to="food-waste" smooth={true} duration={500} offset={offset}>ABOUT FOOD WASTE</ScrollLink>
            </li>
          </ul>
        </div>
       
        <div className="nav-right">
          <RouterLink to="/register">
            <button className="btn-nav">Dashboard</button>
          </RouterLink>
          {/* <RouterLink to="/login">
            <button className="btn-nav">Dashboard</button>
          </RouterLink> */}
        </div>
      </nav>

      {/* Home Section */}
      <div className="home-container">
        <div className="left-div">
          <h3 className='heading0'>WELCOME TO BUDGETBITES</h3>
          <h1 className="heading">LET'S SAVE GOOD FOOD FROM</h1>
          <h1 className='heading2'>GOING TO WASTE</h1>
        </div>
        <div className="right-div">
          <img src={home_img} alt="Example" className="home-image" />
        </div>
      </div>

      {/* Business Solutions Section */}
      <div className="business-solutions">
        <div className="first-section">
          <h2 className="main-heading-b">BUSINESS SOLUTIONS</h2>
          <h1 className="sub-heading-b">Empowering Your Business</h1>
          <p className="description-b">
            At Budget Bites, we are dedicated to connecting your business with consumers eager to buy surplus food, helping you reduce waste and increase sales.
          </p>
        </div>

        <div className="second-section">
          <div className="box">
            <h3 className="box-heading">Increase Sales</h3>
            <p className="box-description">Reach a larger audience and turn surplus food into revenue.</p>
          </div>
          <div className="box">
            <h3 className="box-heading">Promote Sustainability</h3>
            <p className="box-description">Join the movement to reduce food waste and make a positive impact on the environment.</p>
          </div>
          <div className="box">
            <h3 className="box-heading">User-Friendly Platform</h3>
            <p className="box-description">Easily list your products and connect with consumers through our intuitive interface.</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-page-container" id="about">
        <div className="about-text-section">
          <h1 className="about-main-heading">ABOUT US</h1>
          <h2 className="about-sub-heading">OUR MISSION</h2>
          <p className="about-description">
            At Budget Bites, we’re on a mission to tackle food waste by offering businesses a platform to connect surplus food with consumers who value affordable, high-quality meals. Our goal is simple yet powerful: reduce food waste, support local businesses & make nutritious food accessible to all.
          </p>
        </div>

        <div className="about-image-section">
          <img src={about1} alt="Our Mission" className="about-image" />
        </div>

        <div className="why-use-section">
          <h2 className="why-use-heading">WHY USE</h2>
          <h1 className="why-use-subheading">BUDGETBITES</h1>
          <div className="why-use-content">
            <div className="why-use-points-left">
              <p>• Enjoy food at 1/2 price</p>
              <p>• Help the environment by reducing food waste</p>
            </div>
            <div className="why-use-image-container" ref={imageRef}>
              <img src={whyUse} alt="Why Use BudgetBites" className="why-use-image" />
            </div>
            <div className="why-use-points-right">
              <p>• Rescue food near you</p>
              <p>• Support local businesses and communities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Food Waste Section */}
      <div className="food-waste-container" id="food-waste">
        <h2 className="food-waste-heading">About Food Waste</h2>
        <p className="food-waste-paragraph">
          Food waste is a significant global issue, with approximately one-third of all food produced 
          for human consumption wasted each year. This not only squanders valuable resources like water 
          and energy but also contributes to environmental problems such as greenhouse gas emissions. 
          By understanding the impact of food waste, we can take meaningful steps to reduce it and 
          promote sustainability.
        </p>
        <div className="image-container">
          <img src={foodWaste1} alt="Food Waste" className="food-waste-image" />
        </div>
        <img src={foodAwareness} alt="Food Waste Awareness" className="full-width-image" />
      </div>

      
    </div>
  );
};

export default AdminHome;
