import React from "react";
import "./Dashboard.scss";

function Dashboard(props) {
  return (
    <div className="dashboard-page">
      <section className="text-section">
        <p>Trendy Designs</p>
        <img
          className="dashboard-background-img"
          src="https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/background_logo.png"
          alt="logo"
        />
      </section>
      <img
        className="dashboard-img"
        src="https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/Dog_photo_18.jpg"
        alt="Great Dane"
      />
      <section className="text-section">
        <p>Durable and Sustainable</p>
        <img
          className="dashboard-background-img"
          src="https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/background_logo_r.png"
          alt="logo r"
        />
      </section>
      <img
        className="dashboard-img"
        src="https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/Dog_photo_53.jpg"
        alt="Golden Retriever in Truck"
      />
      <section className="text-section">
        <p>100% Satisfaction Guarantee</p>
        <img 
        className='dashboard-background-img'
        src='https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/background_logo3.png'
        alt='remy and roo logo'/>
      </section>
      <img className='dashboard-img'
      src='https://remy-and-roo-bucket.s3-us-west-1.amazonaws.com/Dog_photo_39.jpg'
      alt='doberman dog'/>
    </div>
  );
}

export default Dashboard;
