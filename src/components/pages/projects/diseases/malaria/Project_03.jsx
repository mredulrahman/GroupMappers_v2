import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Project_03() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>Piloting Village-level Malaria Surveillance in Lama, Bandarban.</h3>
      </div>
      <section className='bg-gradient-to-r from-cyan-100 to-sky-50'>
        <div className='md:mx-20 p-3 md:text-xl text-justify'>
          <strong>National Malaria Elimination and Aedes Transmitted Diseases Control Program</strong>
          <p className='py-2'>–  Technical Assistance in Implementing Village level Data Collection and Surveillance</p>
          <p className='py-2'>–  Malaria API Tracker</p>
          <strong className='py-2'>Technical Assistance in Implementing Village-level Data Collection and Surveillance:</strong>
          <p className='py-2'>We are now collecting malaria data at the village level to contribute to the National Malaria Elimination Programme. The mapping of communities is critical to this program’s strong disease surveillance and intervention, with which we are closely collaborating. Recently, we organized field activities to instruct health care professionals on how to transmit data via USSD and SMS. Data in real-time is crucial for combating malaria. Previously, monitoring and planning were hindered by the program’s reliance on monthly accumulated data.</p>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <img src="/assets/images/image_2023_04_12T08_05_07_050Z.png" alt="" className='md:w-5xl md:p-2' />
            <div className='grid md:grid-cols-2 gap-4 md:mx-20 p-3'>
              <div className='flex flex-col gap-4'>
                <img src="/assets/images/323640300_873953090592227_1708312130902432154_n.jpg" alt="" className='shadow-lg shadow-black' />
                <img src="/assets/images/ytjkyjy.jpg" alt=""  className='shadow-lg shadow-black'/>
                <img src="/assets/images/324188414_627857699030322_6095590925278715175_n.jpg" alt=""  className='shadow-lg shadow-black'/>
              </div>
              <div className='flex flex-col gap-4'>
                <img src="/assets/images/321999833_501425571869219_7835864888382398404_n.jpg" alt=""  className='shadow-lg shadow-black'/>
                <img src="/assets/images/322706463_556160576419262_7955593875119349774_n.jpg" alt=""  className='shadow-lg shadow-black'/>
                <img src="/assets/images/321748428_493428356251826_3099091657453625530_n-1536x1152.jpg" alt=""   className='shadow-lg shadow-black'/>
              </div>
            </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
