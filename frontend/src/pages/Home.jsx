import React from 'react'
import MainLayout from "../layouts/MainLayout";
import Hero from "../layouts/Hero";
import CTA from "../layouts/CTA";
import Articles from "../pages/Articles";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
  </MainLayout>
  )
}

export default Home