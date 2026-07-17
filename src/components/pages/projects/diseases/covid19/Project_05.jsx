import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Covid19_2020() {
  return (
    <> 
    <Header />
    <div className='bg-[#000B58] text-center py-1'>
      <h3 className='font-semibold text-white md:text-xl text-lg'>Real-time population mapping to assess the impact of travel restrictions and social distancing on COVID-19 spread (2020) </h3>
    </div>
    <section className="bg-gradient-to-r from-cyan-100 to-sky-50 px-4 sm:px-8 lg:px-14">
        <div className="text-[#121E62] text-base sm:text-md lg:text-lg py-4 space-y-4">
          <p className="leading-tight text-justify">
            The study conducted in Bangladesh during the COVID-19 pandemic used real-time mobility data from Facebook to analyze the impact of travel restrictions and social distancing on the spread of the virus. The study aimed to assess the effectiveness of spatially and temporally variable enforcement of social distancing on COVID-19 spread. The findings showed that the population of Bangladesh fluctuated during major events throughout the year, and the COVID-19 case count rose and fell in correspondence with these events. This indicates that travel restrictions and social distancing measures had an impact on the spread of COVID-19. The study suggests that real-time population mapping using Facebook data can be a useful tool for analyzing the effectiveness of pandemic mitigation responses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-0 sm:mx-6 lg:mx-10">
            <img
              src="/assets/images/htht.png"
              alt=""
              className="w-full h-auto object-contain"
            />
            <img
              src="/assets/images/covie-population.png"
              alt=""
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}
