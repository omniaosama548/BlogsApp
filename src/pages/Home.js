import React from "react";
import LandingPage from "./LandingPage";
import PublicPosts from "./PublicPosts";

function Home() {
  return (
    <>
    <section id="landing" className="landing-section position-relative"> <LandingPage /></section>
     
      <PublicPosts />
    </>
  );
}

export default Home;
