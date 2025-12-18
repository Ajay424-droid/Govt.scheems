import React from 'react';
import HeroSection from '../pages/HeroSection';
import Card from "../pages/Card";
import MVofUs from "../pages/MVofUs";
import Features from '../pages/Features';

const Home = () => {
  return (
    <div className="Home">
     <div style={{ marginBottom: "80px" }}>
        <HeroSection />
      </div>
      <div style={{ marginBottom: "80px" }}>
        <Card />
      </div>
      <div style={{ marginBottom: "80px" }}>
        <MVofUs />
        </div>
        <div style={{ marginBottom: "80px" }}>
        <Features />
        </div>
    </div>
  );
};

export default Home;
