import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Covid_2020() {
  return (
    <>
      <Header/>
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Physical Accessibility to COVID-19 Related Health Services Analysis – MORU</h3>
      </div>
      <section className="bg-gradient-to-r from-cyan-100 to-sky-50 px-4 sm:px-8 lg:px-14">
        <div className="text-[#121E62] text-lg sm:text-lg lg:text-xl py-4 space-y-4">
          <p className="leading-tight text-justify">
            The study aimed to determine the subnational proportion of the population in
            Bangladesh that can access COVID-19 testing, treatment, and ICU facilities within
            1-3 hours of travel time. The AccessMod open-source package was used to estimate
            these indicators during the dry season in 2020. The results highlight areas where
            populations have limited physical access to COVID-19-related health services, and
            the government should conduct further analyses to improve access. The study also
            emphasizes the need for regular updates to account for changes in the COVID-19
            health services delivery network.
          </p>
          <img
            src="/assets/images/hfheohhef.jpg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
      <Footer/>
    </>
  )
}
