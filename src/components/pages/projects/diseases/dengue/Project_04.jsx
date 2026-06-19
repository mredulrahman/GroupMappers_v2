import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Dengue_2019() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Dengue Household Survey – NME&ATDCP, DGHS</h3>
      </div>
      <div className="bg-gradient-to-r from-cyan-100 to-sky-50 px-4 sm:px-6 md:px-10 py-4">
        <p className="text-md sm:text-base md:text-xl text-justify leading-tight text-blue-950 max-w-5xl mx-auto">
          The aim of this project was household-level dengue data collection. Mobile-based data
          collection platform KoBoToolBox was used in this project. This data was used to tackle
          the dengue outbreak in Dhaka city. The surveyed site was selected based on the output
          of dengue drone survey. A total of 182 houses were surveyed, with 40 of them having
          dengue patients.
        </p>
        <img
          src="/assets/images/house-hold-servey.jpg"
          alt=""
          className="w-full md:w-250 mx-auto py-5 h-auto"
        />
      </div>
      <Footer />
    </>
  )
}
