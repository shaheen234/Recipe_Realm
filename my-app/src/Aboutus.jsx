import React from 'react';
import './style.css';

const AboutUs = () => {
  return (
    <div className="page-container about-us">
      <h1>About Us</h1>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality products and services that meet the needs of our customers. 
          We strive to innovate and continuously improve in all aspects of our business.
        </p>
      </section>
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <img src="path_to_image" alt="Team Member" />
          <h3>John Doe</h3>
          <p>CEO</p>
        </div>
        <div className="team-member">
          <img src="path_to_image" alt="Team Member" />
          <h3>Jane Smith</h3>
          <p>Chief Operating Officer</p>
        </div>
        {/* Add more team members as needed */}
      </section>
      <section className="history">
        <h2>Our History</h2>
        <p>
          Founded in 2020, our company has grown from a small startup to a leading player in the industry.
          Over the years, we have achieved numerous milestones and expanded our reach globally.
        </p>
      </section>
      <section className="values">
        <h2>Our Values</h2>
        <p>
          We believe in integrity, innovation, and customer satisfaction. Our values guide our actions 
          and decisions, ensuring that we always put our customers first.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
