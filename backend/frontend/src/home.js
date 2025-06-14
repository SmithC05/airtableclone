import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './home.css'; 


function Home() {
  const navigate = useNavigate();
  return (
    
    <div>
          


      {/* Hero Section */}
      <section className="hero" id="home">
        <h1>Welcome to <span className="company-name">Air Table</span></h1>
        <p>Platform To The Next Gen-Z</p>
       <button className="cta-button" onClick={() => navigate("/signup")}>
      Get Started
    </button>
      </section>

      {/* About */}
      <section id="about">
        <h2>🚀 About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam ipsa veniam ducimus, quae tempora, dolorum sequi illo, eius molestias obcaecati debitis reiciendis maiores doloremque tenetur id non eos possimus.</p>
      </section>

      {/* Contact Section */}
     <div className="contact" id="contact">
        <h2>📩 Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Airtable. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;