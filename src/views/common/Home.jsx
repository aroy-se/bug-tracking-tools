import React from "react";
import welcome_img from "../../assets/images/home-img.jpg";

const Home = () => {
  return (
    <div className="welcome">
      <img className="welcome_image" alt="btt-welcome-img" src={welcome_img} />
    </div>
  );
};

export default Home;
