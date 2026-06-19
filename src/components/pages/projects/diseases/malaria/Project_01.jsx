import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Project_01() {
  return (
    <>
     <Header/>
        <div className='bg-[#000B58] text-center py-1'>
            <h3 className='font-semibold text-white md:text-2xl text-xl'>Village Mapping, a key initiative of GroupMappers</h3>
        </div>
        <section className='bg-gradient-to-r from-cyan-100 to-sky-50'>
            <div className='md:mx-20 p-3 md:text-lg text-justify'>
                <p>GroupMappers’ key project, called “Village Mapping,” aims to map Bangladesh’s remote villages in a cost-effective and precise manner. The purpose of this initiative is to identify under-served communities and work toward improving healthcare and other basic needs delivered to those areas. High-quality, in-depth maps of rural areas are created by using satellite imagery annotated by GroupMappers volunteers.</p><br/>
                <strong>(2018-2019) </strong>           
                <strong>MORU/Wellcome Trust. Public Engagement Bursary.GroupMappers
                </strong> 
                <p>-Identified and mapped settlements in Lama, Bandarban.</p>
                <p>-Identified settlement in CHT and Cox’s Bazar</p><br/>
                <strong>(2021-2022) </strong>
                <strong>MORU/Wellcome Trust. iTPA Innovations Award. Introducing </strong>
                <strong>Malaria API Tracker and an interactive platform for visualizing and updating village maps. </strong>
                <p>-Developed a geospatial dashboard to track existing malaria data.</p><br/>
                <strong>(2022-2023) APMEN, Implementing village-level data collection and surveillance towards elimination</strong>
                <p>-Utilized Lama village data to train health workers with funding from APMEN.
                </p>         
            </div>
            <div className='grid md:grid-cols-2 gap-4 md:mx-20 p-3'>
                <img src="/assets/images/validation-1-scaled.jpg" alt="" />
                <img src="/assets/images/validation-3-scaled.jpg" alt="" />
                <img src="/assets/images/handover-3-scaled.jpeg" alt="" />
                <img src="/assets/images/handover-2.jpeg" alt="" />
                <img src="/assets/images/gg.png" alt="" />
                <img src="/assets/images/dvd.png" alt="" />
            </div>
        </section>
     <Footer/>
    </>
  )
}
