import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function DroneImageries() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Drone driven imageries to identify breeding space in Dhaka</h3>
      </div>
      <div className="bg-linear-to-r from-cyan-100 to-sky-50 px-4 sm:px-6 md:px-10 py-3">
        <p className="text-md sm:text-base md:text-xl text-justify leading-tight text-blue-950 max-w-5xl mx-auto">
          The aim of this project is to develop an integrated system to detect mosquito breeding zones in the cityscape using UAV captured imageries combined with machine learning and manual feature extracting approach to automatically detect potential breeding zone from high-resolution imageries, and further incorporate the datasets in a real-time monitoring dashboard system to facilitate prompt and effective actions to prevent the disease.Based on the dengue case distribution map, three drone survey areas were selected- Mirpur, Gulshan, Narinda. The survey was carried out with the help of an unmanned aerial vehicle (UAV). Pix4DMappers processed the UAV data in three major steps (pre-processing, Point Cloud Generation, and Digital Surface Model (DSM)-Orthophoto Generations). The process of data collection encompassed the following: Flight planning, Image acquisition and processing, and digitization of features using geospatial analysis. High-resolution imageries were at the center of this data hub and different survey methods eg. mobile applications, online surveys, community engagement, or participatory approaches were applied. Focuses on the findings: Discarded tyres, Flower pot/Rooftop agriculture, Open water tanks, Polythenes, Open reservoirs on the roof, Air conditioners, Others important habitats. Collected data is stored and manipulated in an integrated dashboard system. A simple web application is developed which provides standard mapping interface features eg. online query or search, reporting, statistical representation, zooming and panning to a particular area, and identification of the features.
        </p>
        <img
          src="/assets/images/unmanned.png"
          alt=""
          className="w-full md:w-225 h-auto md:h-150 mx-auto rounded-lg py-5"
        />
      </div>
      <Footer />
    </>
  )
}
