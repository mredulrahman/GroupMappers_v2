import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function DengueRiskZoning() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Dengue risk zoning – NME&ATDCP, DGHS</h3>
      </div>
      <div className="bg-linear-to-r from-cyan-100 to-sky-50">
        <div className="px-4 sm:px-6 md:mx-15 py-3">
          <p className="mb-5 p-1 text-sm sm:text-base md:text-lg text-justify leading-tight text-blue-950">
            The aim of this project was to identify the dengue risk zones on the basis of the
            dengue patient data. It assisted the government in combating the dengue outbreak by
            alerting disease surveillance and other sectors about the risk zones and level of
            danger. The location and other details of the dengue patient were provided by the
            National Malaria Elimination and Aedes Transmitted Disease Control Program, CDC,
            DGHS. Twenty volunteers were assigned for dengue data entry and data processing.
            The location of the patients was plotted on a map. Processed data was used to map
            the risk zones within Dhaka city. Map of the spatial distribution of the dengue
            patients and high risk zones were prepared. These maps are based on data of 2059
            dengue patients in 22 hospitals in Dhaka. Dengue patient location data, as well as
            Aedes mosquito density data, have been used. Although the origin of mosquitoes is
            not identified, the idea of high risk areas can be found on the map. For micro-level
            risk zoning, this initiative leads to a dengue drone survey and a dengue household
            survey. For a better understanding and monitoring of the dengue situation, a
            dashboard was created to visualize the dengue patient distribution and dengue risk
            zones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-0 sm:px-4 md:px-6">
            <img
              src="/assets/images/dengu-risk-zoning-1.webp"
              alt=""
              className="w-full h-auto shadow-md shadow-gray-600"
            />
            <img
              src="/assets/images/dengu-risk-zoning.webp"
              alt=""
              className="w-full h-auto shadow-md shadow-gray-600"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
