import React from 'react';
import './style.css';

const AboutUs = () => {
  return (
    <div className="page-container about-us">
      <h1>About Us</h1>
      <section className="mission">
        <h2>WHO WE ARE</h2>
        <p>Welcome to Recipe Realm, your number one source for discovering, creating, and sharing delicious recipes. Our journey began with a simple idea: to bring together food enthusiasts from all walks of life and create a vibrant community where everyone can share their culinary adventures.</p>
      </section>
      <section className="team">
      <h2>OUR MISSION</h2>
      <p>At Recipe Realm, we believe that cooking is more than just preparing food; it's a form of art, a way to express creativity, and a means to bring people together. Our mission is to inspire and empower individuals to explore their culinary potential, try new recipes, and share their own creations with a like-minded community.</p>
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
