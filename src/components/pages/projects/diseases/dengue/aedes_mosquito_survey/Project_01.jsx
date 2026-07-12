import React from 'react'
import Header from './../../../../../Header';
import Footer from './../../../../../Footer';

export default function PreMonsoon() {
  return (
    <>
      <Header/>
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-xl'>Pre-monsoon Aedes Mosquito Survey – NME&ATDCP, DGHS
        </h3>
      </div>
      <div className="bg-linear-to-r from-cyan-100 to-sky-50">
        <p className="px-4 sm:px-8 py-2 md:mx-13 text-blue-950 text-sm sm:text-base md:text-lg leading-tight text-justify">
          The goal of the project is vector data collection for micro-level planning. This survey will help the Government to tackle the future dengue situation. In order to conduct the survey, training was provided to the data collectors and CDC staff. The surveys are carried out by dividing the study areas into segments. The procedure is as follows: 98 wards were surveyed in 10 days by 21 teams. For this reason, 86 wards are divided into two sections and 10 wards are divided into 3 sections, with one team deployed in each section. Furthermore, each section is divided into four subsections, with three to four houses surveyed from each subsection, for a total of 15 households per section of a ward. Because the remaining two wards cover a bigger area, they were divided into four portions, each with one team. There are a total of 210 sections.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-10 md:px-20 py-6 md:py-10">
          <div className="flex flex-col gap-4">
            <img src="/assets/images/premonsoon.jpg" alt="" className="w-full h-auto" />
            <img src="/assets/images/pre-monsoon5-1536x1149.jpg" alt="" className="w-full h-auto" />
            <img src="/assets/images/WhatsApp-Image-2022-03-23-at-4.43.15-PM-1.jpeg" alt="" className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-4">
            <img src="/assets/images/pre-monsoon3-1536x1152.jpg" alt="" className="w-full h-auto" />
            <img src="/assets/images/pre-1024x1024-1.jpg" alt="" className="w-full h-auto" />
            <img src="/assets/images/pre-monsoon4-1536x1149.jpg" alt="" className="w-full h-auto" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
