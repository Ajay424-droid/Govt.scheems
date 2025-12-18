import React from 'react';
import { Link } from 'react-router-dom';

// styles
import '../css/Card.css';

// images (local assets)
import Atal from '../assets/poster/Atal.jpeg';
import Awaas from '../assets/poster/Awaas.jpeg';
import Rojgar from '../assets/poster/Rojgar.jpeg';
import Swachh from '../assets/poster/Swachh.jpg';

const Card = () => {
  // temp data for now – ideally should come from an API or JSON file later
  const schemesData = [
    {
      title: "Pradhan Mantri Awas Yojana",
      description: "Affordable housing scheme to provide homes to low-income families.",
      type: "Central Government",
      image: Awaas
    },
    {
      title: "Swachh Bharat Mission",
      description: "A cleanliness drive to make India open defecation-free and clean.",
      type: "Central Government",
      image: Swachh
    },
    {
      title: "Atal Pension Yojana",
      description: "A pension scheme for workers in the unorganized sector.",
      type: "Central Government",
      image: Atal
    },
    {
      title: "Rojgar Sangam Yojana (MP)",
      description: "A state-level initiative in Madhya Pradesh to support youth employment.",
      type: "State Government",
      image: Rojgar
    }
  ];

  return (
    <div className="container">
      <div className="row">
        {/* looping through each scheme to render a card */}
        {schemesData.map((item, i) => (
          <div key={i} className="col-md-3 mb-4">
            <div className="custom-card card h-100">
              {/* card image */}
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.title}
                style={{ height: 180, objectFit: 'cover' }} 
              />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p><strong>Type:</strong> {item.type}</p>

                {/* TODO: Update this link to point to a dynamic route or individual page */}
                <Link 
                  to="/sidebar" 
                  className="btn mt-auto"
                  style={{ backgroundColor: '#1e3c72', color: '#fff' }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
