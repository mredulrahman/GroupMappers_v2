import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Proj_2020() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Covid-19 Risk Zoning</h3>
      </div>
      <section className="bg-gradient-to-r from-cyan-100 to-sky-50 px-4 sm:px-8 lg:px-14">
        <div className="text-[#121E62] text-base sm:text-lg lg:text-xl text-justify py-4">
          <strong className="block text-lg sm:text-xl lg:text-2xl leading-tight">
            A collaborative effort between A2i and GroupMappers to develop a comprehensive geospatial dashboard for mapping Covid-19 cases and mobility patterns in Bangladesh, aimed at monitoring Covid-19 in Bangladesh.  
          </strong>
          <hr className="w-10 sm:w-12 border-t-4 border-white my-4" />
          <p className="leading-tight">
            The a2i initiative in Bangladesh, funded by UNDP, aimed to identify high-priority Covid-19 risk zones by analyzing data and mapping them. The project divided the process into four stages: patient address to coordinates, coordinates to map file, demarcating risk zones, and updating zoning-related maps and dashboards. The project utilized Excel and Google Earth Pro to geocode patient addresses, and ArcMap to plot the points and aggregate the data. A set of indicators were used to designate red, orange, and green zones based on laboratory-confirmed cases per 100,000 people.
          </p>
          <br />
          <p className="leading-tight">
            The project produced 64 district maps and 12 city corporation maps indicating risk zoning status and used two ArcGIS dashboards to present the information through intuitive and interactive data visualizations. The dashboards displayed information such as the population, area, case, case per lac, and risk zone status of a particular ward, city corporation, or zone.
          </p>
        </div>
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-0 sm:mx-6 lg:mx-10">
          <img
            src="/assets/images/risk-zone.png"
            alt=""
            className="w-full"
          />
          <img
            src="/assets/images/wfdhg.png"
            alt=""
            className="w-full"
          />
        </div>

        {/* Section heading */}
        <strong className="block text-lg sm:text-xl lg:text-2xl text-[#121E62] text-justify mt-8">
          Real-time population mapping to assess the impact of travel restrictions and social distancing on COVID-19 spread 
        </strong>
        <hr className="w-10 sm:w-12 border-t-4 border-white my-4" />
        <p className="text-base sm:text-lg lg:text-xl leading-tight text-justify">
          The study conducted in Bangladesh during the COVID-19 pandemic used real-time mobility data from Facebook to analyze the impact of travel restrictions and social distancing on the spread of the virus. The study aimed to assess the effectiveness of spatially and temporally variable enforcement of social distancing on COVID-19 spread. The findings showed that the population of Bangladesh fluctuated during major events throughout the year, and the COVID-19 case count rose and fell in correspondence with these events. This indicates that travel restrictions and social distancing measures had an impact on the spread of COVID-19. The study suggests that real-time population mapping using Facebook data can be a useful tool for analyzing the effectiveness of pandemic mitigation responses.
        </p>
        <div className="mx-0 sm:mx-8 lg:mx-14 py-5">
          <img
            src="/assets/images/real-time.png"
            alt=""
            className="w-full"
          />
          <p className="font-bold text-center py-3 text-sm sm:text-base">
            Population and Travel Pattern During COVID in Bangladesh
          </p>
        </div>
      </section>
      <Footer/>
    </>
  )
}