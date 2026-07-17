import React from 'react'
import Header from './../../../Header';
import Footer from './../../../Footer';

export default function GHFD() {
  return (
    <>
      <Header />
      <section className='p-4'>
        <div className='text-gray-400 md:mx-25 text-justify'>
          <p>
            The Global Health Facilities Database (GHFD)
          </p><br/><br/>
          <p>The goal of this project is to ensure that Ministries of Health in WHO Member States have access to an updated and comprehensive master list of health facilities. This list will be considered a Global Public Good and will aid in avoiding duplication of efforts and using technical capacity to maintain and use data to address public health priorities. The mission is to enhance the technical capacity of Ministries of Health across different levels to guarantee the availability, quality, accessibility, and utilization of this master list of health facilities. </p>
        </div>
        <img src="/assets/images/rehthrt.webp" alt="" className='md:mx-20 p-9'/>  
        <p className='text-gray-400 md:mx-25 text-justify'>As a part of the GHFD, BD team prepared a baseline report on the availability and accessibility <strong>of the Master List of Health Facilities in Bangladesh</strong>. The report summarizes that the current situation in Bangladesh regarding the Global Health Facilities Data Initiative has some issues, such as the absence of a confirmed department responsible for curating the master list of health facilities, missing data dictionary, and potential data discrepancies. The documentation of data quality dimensions and standard operating procedures for data collection and updating are incomplete. capacity of Ministries of Health to maintain and use a master list of health facilities, in order to address public health. priorities and avoid duplication of efforts. <br/>
        As part of the GHFD initiative, we could support the MOHFW  across the following 7 pathways: 
        </p>
        <ul style={{ listStyleType: 'disc' }} className='text-gray-400 mx-[110px]'>
          <li>Governance and policies </li>
          <li>Data management and interoperability </li>
          <li>Innovation and technology </li>
          <li>Capacity </li>
          <li>Partnership & Collaboration </li>
          <li>Financial Sustainability </li>
          <li>Advocacy and communication</li>
        </ul>
        <img src="/assets/images/egbrregre.webp" alt="" className='md:mx-[125px] p-9'/>      
      </section>
      <Footer />
    </>
  )
}