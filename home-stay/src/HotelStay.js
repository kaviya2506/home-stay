import React, { useState, useEffect, useRef } from "react";
import "./HotelStay.css";

// Local images
import image1 from "./david_img4.jpg";
import image2 from "./david_img5.jpg";
import image4 from "./david_img1.jpg";
import image5 from "./david_img2.jpg";
import image6 from "./david_img3.jpg";
import image7 from "./cust_1.jpg";
import image8 from "./cust_2.jpg";
import image9 from "./cust_3.jpg";
import image10 from "./cust_4.jpg";
import image11 from "./olive/olive_img1.jpg";
import image12 from "./olive/olive_img2.jpg";
import image13 from "./olive/olive_img3.avif";
import image14 from "./olive/olive_img4.jpeg";

// Logos
import logo from "./logo/logo.jpg";
import instaLogo from "./logo/insta.gif";
import phoneLogo from "./logo/phone.gif";
import tripLogo from "./logo/trip-advisor.png";
import webLogo from "./logo/website.gif";

import davidimg1 from "./david_img.avif";

function HotelStay() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [locationSlide, setLocationSlide] = useState(0);
  const [footerSlide, setFooterSlide] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Refs
  const heroRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryRowRef = useRef(null);

  const galleryImages = [image1, image2, image4, image5, image6];

  const slides = [
    { text: "Welcome to David Residency", image: image7 },
    { text: "Luxury Rooms & Suites", image: image8 },
    { text: "World-class Service", image: image9 },
    { text: "Book Your Stay Today!", image: image10 }
  ];

  const footerslides = [
    { text: "Explore our new Branch", image: image12 },
    { text: "Olive Residency", image: image11 },
    { text: "Explore our new Branch", image: image13 },
    { text: "Book Your Stay Today!", image: image14 }
  ];

  // Gallery scroll handler
  const handleGalleryScroll = (direction) => {
    if (galleryRowRef.current) {
      const scrollAmount = galleryRowRef.current.offsetWidth;
      galleryRowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Auto-slideshow for gallery
  useEffect(() => {
    if (!galleryVisible) return;
    const interval = setInterval(() => {
      if (galleryRowRef.current) {
        galleryRowRef.current.scrollBy({
          left: galleryRowRef.current.offsetWidth,
          behavior: "smooth"
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryVisible]);

  // Hero scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  // Gallery scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setGalleryVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, []);

  // Location scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (locationRef.current) observer.observe(locationRef.current);
    return () => {
      if (locationRef.current) observer.unobserve(locationRef.current);
    };
  }, []);

  // Location slideshow effect
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setLocationSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Footer slideshow effect
 useEffect(() => {
  const footer = document.getElementById("contact");
  let interval;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        interval = setInterval(() => {
          setFooterSlide((prev) => (prev + 1) % footerslides.length);
        }, 1000); // ✅ Slower: 7 seconds
      } else {
        clearInterval(interval);
      }
    },
    { threshold: 0.3 }
  );

  if (footer) observer.observe(footer);

  return () => {
    if (footer) observer.unobserve(footer);
    clearInterval(interval);
  };
}, []);

  return (
    <div className="hotel-container">
      {/* Header */}
      <header className="hotel-header">
        <div className="logo-container">
          <img src={logo} alt="David Residency Logo" className="logo" />
        </div>
        <div className="header-text">
          <h1>Welcome to David Residency</h1>
          <p>Discover our world-class hotel!</p>
        </div>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <a href="#hero">Home</a>
            <a href="#gallery">Explore</a>
            <a href="#location">Location</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        className={`hero ${heroVisible ? "visible" : ""}`}
        id="hero"
        ref={heroRef}
      >
        <img src={davidimg1} alt="David Residency" className="hero-image" />
        <div className="hero-text">
          <div className="hero-buttons">
            <a className="btn explore" href="#gallery">EXPLORE THE BEAUTY</a>
            <a className="btn contact" href="#contact">CONTACT US</a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        ref={galleryRef}
        className={`gallery-scroll ${galleryVisible ? "visible" : ""}`}
        id="gallery"
      >
        <h2>Explore</h2>
        <div className="scroll-wrapper">
          <button className="scroll-arrow left" onClick={() => handleGalleryScroll("left")}>‹</button>
          <div className="scroll-track" ref={galleryRowRef}>
            {galleryImages.map((img, index) => (
              <div key={index} className="scroll-slide" onClick={() => setSelectedImage(img)}>
                <img src={img} alt={`gallery-${index}`} />
              </div>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => handleGalleryScroll("right")}>›</button>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <span className="close">&times;</span>
          <img src={selectedImage} alt="popup" className="modal-content" />
        </div>
      )}

      {/* Location */}
   {/* Location */}
<section
  ref={locationRef}
  className={`location-section ${isVisible ? "visible" : ""}`}
  id="location"
>
  <div className="location-wrapper">
    {/* Left side: slideshow */}
    <div className="location-image">
      <img
        src={slides[locationSlide].image}
        alt="David Residency"
        className="location-photo"
      />
      <div className="location-text">
        <h2>{slides[locationSlide].text}</h2>
      </div>
    </div>

    {/* Right side: map */}
    <div className="map-container">
      <iframe
        title="David Residency Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0221840706376!2d78.13988077760843!3d9.93211026482343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c59126c208ff%3A0x28dc3ce7d555343!2sDavid%20Residency%20Private%20limited!5e0!3m2!1sen!2sin!4v1764064473899!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="custom-footer" id="contact">
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <h4>David Residency</h4>
          <p>14-A, 14, Bharathiyar St, Managiri, </p>
          <p>KK Nagar, Madurai, Tamil Nadu 625020</p>

          <p>
            <img src={phoneLogo} alt="Phone" className="icon" />
            <a >(+91) 94878 30003</a>
          </p>

          <div className="social-logo-row">
            <a href="info@davidresidency.com" target="_blank" rel="noopener noreferrer">
              <img src={webLogo} alt="Website" className="icon" />
            </a>

            <a href="https://www.tripadvisor.in/Hotel_Review-g297677-d27140982-Reviews-David_Residency-Madurai_Madurai_District_Tamil_Nadu.html" target="_blank" rel="noopener noreferrer">
              <img src={tripLogo} alt="TripAdvisor" className="icon" />
            </a>
            <a href="https://www.instagram.com/davidresidency/" target="_blank" rel="noopener noreferrer">
              <img src={instaLogo} alt="Instagram" className="icon" />
            </a>
            
            
          </div>
        </div>
<div className="footer-slideshow">
  <img
    src={footerslides[footerSlide].image}
    alt="Footer slideshow"
    className="footer-slide-image"
  />
</div>


<div className="slideshow-content">
  <h2>{footerslides[footerSlide].text}</h2>
  <a
    href="https://www.google.com/search?q=olive+david+residency&oq=olive+david+residency&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhAMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMg0IBRAAGIYDGIAEGIoFMg0IBhAAGIYDGIAEGIoFMg0IBxAAGIYDGIAEGIoF0gEJODI0NWoxajE1qAIAsAIA&sourceid=chrome&ie=UTF-8"
    target="_blank"
    rel="noopener noreferrer"
    className="slideshow-link"
  >
    Learn More
  </a>
</div>
<p className="copyright">
  © {new Date().getFullYear()} David Residency. All rights reserved.
</p>
      </footer>
    </div>
  );
}

export default HotelStay;
