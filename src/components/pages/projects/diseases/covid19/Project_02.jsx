import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Proj_2021() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Mask Study</h3>
      </div>
      <section className="bg-linear-to-r from-cyan-100 to-sky-50">
        <div className="px-4 sm:px-6 md:mx-20 py-4 text-justify">
          <p className="text-md sm:text-base md:text-xl leading-tight">
            A study focused on mapping mask usage during the Covid-19 pandemic. Volunteers
            used a counter application to collect data on the number of masks worn in different
            locations. They also identified differences in mask-wearing between indoor and
            outdoor locations and compared trends in mask-wearing behavior over time.
          </p>
        </div>
        <div className="flex flex-col gap-4 mx-auto items-center px-4 pb-6">
          <img
            src="/assets/images/3.-DISTRICTS-WITH-HIGHER-UPAZILA-COVERAGE-Mymensingh-and-Rajbari.jpg"
            alt=""
            className="w-200 object-contain"
          />
          <img
            src="/assets/images/mask-status-by-location.jpg"
            alt=""
            className="w-200 object-contain"
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
