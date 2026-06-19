import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Proj_2022() {
  return (
    <>
      <Header />
        <div className='bg-[#000B58] text-center py-1'>
          <h3 className='font-semibold text-white md:text-2xl text-xl'>Crisis Ready Project (CRP)</h3>
        </div>
       <section className="bg-gradient-to-r from-cyan-100 to-sky-50">
        <div className="px-4 sm:px-6 md:mx-20 py-4 space-y-3 text-justify">
          <p className="text-md sm:text-base md:text-xl leading-tight font-500">
            Mobility data has become crucial for tracking disease transmission in today’s
            fast-moving world. The aim of the Crisis Ready Project (CRP) was to assess the use
            of mobility data in disaster response in 6 countries in Southeast Asia. The project utilized three types of mobility datasets – Apple Mobility Trends, Google Community Mobility Reports, and Facebook Data for Good – and had several objectives, including comparing available datasets, determining coverage and representative levels, developing methods for low-coverage areas, and itemizing datasets for communication with governments.
          </p>
          <p className="text-md sm:text-base md:text-xl leading-tight font-500">
            The analysis of the mobility datasets revealed that population mobility data can
            provide valuable insights for decision-making in various fields, including public
            health, urban planning, transportation, and disaster response.
          </p>
          <p className="text-md sm:text-base md:text-xl leading-tight font-500">
            A workshop titled “Use of Mobility Data for Guiding Public Health Responses” was
            conducted in Thailand in February 2023 to guide public health responses using
            mobility data.
          </p>
          <p className="text-md sm:text-base md:text-xl leading-tight font-500">
            Overall, the Crisis Ready Project demonstrated the potential for mobility data to
            enhance disaster response efforts and inform policy decisions in Southeast Asia
          </p>
        </div>
        <div className="px-4 sm:px-6 md:mx-20 py-4">
          <img
            src="/assets/images/mobility-data-scaled.jpg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      <Footer />
    </>
  )
}
