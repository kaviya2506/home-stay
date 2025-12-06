import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Local images
import image1 from "./david_img4.jpg";
import image2 from "./david_img5.jpg";
import image3 from "./david_img1.jpg";
import image4 from "./david_img2.jpg";
import image5 from "./david_img3.jpg";
import image6 from "./cust_1.jpg";
import image7 from "./cust_2.jpg";
import image8 from "./cust_3.jpg";
import image9 from "./cust_4.jpg";
import image10 from "./olive/olive_img1.jpg";
import image11 from "./olive/olive_img2.jpg";
import image12 from "./olive/olive_img3.avif";
import image13 from "./olive/olive_img4.jpeg";

import logo from "./logo/logo.jpg";
import instaLogo from "./logo/insta.gif";
import phoneLogo from "./logo/phone.gif";
import tripLogo from "./logo/trip-advisor.png";
import webLogo from "./logo/website.gif";

import heroImg from "./david_img.avif";

function HotelStay() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationSlide, setLocationSlide] = useState(0);
  const [footerSlide, setFooterSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const heroRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);
  const galleryRowRef = useRef(null);

  const galleryImages = [image1, image2, image3, image4, image5];

  const slides = [
    { text: "Welcome to David Residency", image: image6 },
    { text: "Luxury Rooms & Suites", image: image7 },
    { text: "World-class Service", image: image8 },
    { text: "Book Your Stay Today!", image: image9 }
  ];

  const footerslides = [
    { text: "Explore our new Branch", image: image11 },
    { text: "Olive Residency", image: image10 },
    { text: "Explore our new Branch", image: image12 },
    { text: "Book Your Stay Today!", image: image13 }
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
      ([entry]) => setIsVisible(entry.isIntersecting),
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
          }, 5000);
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
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    {/* Logo */}
    <a className="navbar-brand d-flex align-items-center" href="#hero">
      <img src={logo} alt="Logo" height="50" className="me-2 rounded" />
    </a>

    {/* Centered title */}
    <div className="text-center flex-grow-1">
      <h1 className="text-warning fst-italic mb-0 ">Welcome to David Residency</h1>
      <p className="text-warning fst-italic mb-0">Discover our world-class hotel!</p>
    </div>

    {/* Hamburger icon */}
    <button
      className="navbar-toggler"
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>

  {/* Vertical dropdown menu */}
  {menuOpen && (
  <div className="bg-dark text-light text-center py-3 position-absolute top-100 start-0 w-100 shadow">
    <a className="d-block py-2 menu-link" href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
    <a className="d-block py-2 menu-link" href="#gallery" onClick={() => setMenuOpen(false)}>Explore</a>
    <a className="d-block py-2 menu-link" href="#location" onClick={() => setMenuOpen(false)}>Location</a>
    <a className="d-block py-2 menu-link" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
  </div>
)}

</nav>


{/* Hero */}
<section id="hero" ref={heroRef} className={`position-relative ${heroVisible ? "visible" : ""}`}>
  <img src={heroImg} alt="David Residency" className="w-100 vh-100 object-fit-cover" />

  {/* Overlay content */}
  <div className="position-absolute top-50 start-50 translate-middle text-center">
    <div className="d-flex flex-column flex-md-row gap-4 justify-content-center align-items-center">
      <a href="#gallery" className="btn btn-pink btn-lg fw-bold px-4 py-2">EXPLORE THE BEAUTY</a>
      <a href="#contact" className="btn btn-dark btn-lg fw-bold px-4 py-2">CONTACT US</a>
    </div>
  </div>
</section>




      {/* Gallery */}
      <section id="gallery" ref={galleryRef} className={`container py-5 ${galleryVisible ? "visible" : ""}`}>
        <h2 className="text-center mb-4 italic-text">Explore</h2>
        <div className="position-relative">
          <button className="btn btn-light position-absolute top-50 start-0 translate-middle-y" onClick={() => handleGalleryScroll("left")}>‹</button>
          <div className="d-flex overflow-auto" ref={galleryRowRef}>
            {galleryImages.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-100 text-center" onClick={() => setSelectedImage(img)}>
                <img src={img} alt={`gallery-${index}`} className="img-fluid rounded shadow" />
              </div>
            ))}
          </div>
          <button className="btn btn-light position-absolute top-50 end-0 translate-middle-y" onClick={() => handleGalleryScroll("right")}>›</button>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="modal d-block bg-dark bg-opacity-75" onClick={() => setSelectedImage(null)}>
          <div className="modal-dialog modal-dialog-centered">
            <img src={selectedImage} alt="popup" className="img-fluid rounded" />
          </div>
        </div>
      )}

          {/* Location */}
      <section
        id="location"
        ref={locationRef}
        className={`container py-5 ${isVisible ? "visible" : ""}`}
      >
        <div className="row g-4">
          {/* Left side: slideshow */}
          <div className="col-md-6 position-relative">
            <img
              src={slides[locationSlide].image}
              alt="David Residency"
              className="img-fluid rounded shadow"
            />
            <div className="position-absolute bottom-0 start-0 bg-dark bg-opacity-50 text-white p-3 rounded">
              <h2 className="h5">{slides[locationSlide].text}</h2>
            </div>
          </div>

          {/* Right side: map */}
          <div className="col-md-6 italic-text">
            <iframe
              title="David Residency Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0221840706376!2d78.13988077760843!3d9.93211026482343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c59126c208ff%3A0x28dc3ce7d555343!2sDavid%20Residency%20Private%20limited!5e0!3m2!1sen!2sin!4v1764064473899!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-light text-dark py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact info */}
            <div className="col-md-6 italic-text">
              <h2 className="text-warning">Contact Us</h2>
              <h4>David Residency</h4>
              <p>14-A, Bharathiyar St, Managiri,</p>
              <p>KK Nagar, Madurai, Tamil Nadu 625020</p>

              <p className="mt-2">
                <img src={phoneLogo} alt="Phone" className="me-2" width="24" />
                (+91) 94878 30003
              </p>

              {/* Social icons */}
              <div className="d-flex gap-3 mt-3">
                <a href="mailto:info@davidresidency.com" target="_blank" rel="noopener noreferrer">
                  <img src={webLogo} alt="Website" width="32" />
                </a>
                <a
                  href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0LLPMqqjKTioyYLRSMagwTjIwSDa1NDQySzYysEhLszKoMLJISTZOTjVPMTU1NTYx9hJPSSzLTFEoSi3OTEnNS65UyE1MKS1KzAQAgeEYHA&q=david+residency+madurai&oq=dav&gs_lcrp=EgZjaHJvbWUqFQgCEC4YJxivARjHARiABBiKBRiOBTIGCAAQRRg5Mg0IARAuGIMBGLEDGIAEMhUIAhAuGCcYrwEYxwEYgAQYigUYjgUyCggDEAAYsQMYgAQyCggEEAAYsQMYgAQyBwgFEAAYgAQyBwgGEC4YgAQyCggHEAAYsQMYgAQyEAgIEC4YrwEYxwEYsQMYgAQyBwgJEAAYjwLSAQk3NDU1ajBqMTWoAgiwAgHxBeCodtkORp3y&sourceid=chrome&ie=UTF-8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={tripLogo} alt="TripAdvisor" width="32" />
                </a>
                <a
                  href="https://www.instagram.com/davidresidency/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instaLogo} alt="Instagram" width="32" />
                </a>
              </div>
            </div>

            {/* Footer slideshow */}
            <div className="col-md-6 text-center">
              <img
                src={footerslides[footerSlide].image}
                alt="Footer slideshow"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "350px" }}
              />
              <h2 className="mt-3">{footerslides[footerSlide].text}</h2>
              <a
                href="https://www.google.com/search?q=olive+david+residency"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-pink mt-2 fw-bold"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center mt-4 text-muted">
            © {new Date().getFullYear()} David Residency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>  
  );
}

export default HotelStay;
