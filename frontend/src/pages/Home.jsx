import React from 'react'
import MainLayout from "../layouts/MainLayout";
import Hero from "../layouts/Hero";
import Articles from "../pages/Articles";

const Home = () => {
  return (
    <MainLayout>
         <Hero />
         <Articles />
  </MainLayout>
  )
}

export default Home