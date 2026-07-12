import React from 'react'
import Header from './../../../../Header';
import Footer from './../../../../Footer';

export default function Project_02() {
  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white md:text-2xl text-xl'>G6PD Testing for Malaria Treatment</h3>
      </div>
      <section className='bg-gradient-to-r from-cyan-100 to-sky-50'>
        <div className='md:mx-20 p-3 md:text-xl text-justify'>
          <strong>Diagnostic Network Optimization Analysis: A project in collaboration with ICCDR,B to analyze diagnostic network for G6PD testing for malaria treatment in Southeastern part of Bangladesh.</strong><br />
          <p className='py-2'>FIND, ICDDR,B, and our team collaborated on an initiative to evaluate the G6PD testing network for malaria treatment in the southeastern region of Bangladesh using accessmod.</p>
          <p className='py-2'>Our aim was to develop a plan to introduce G6PD testing, increasing access for patients with P. vivax malaria while making efficient use of available resources.</p>
          <p className='py-2'>Two types of data were used for the project-geospatial and tabular. In geospatial data the coordinate of labs and source sites are needed. Then the test demands source wise and a HF master list with details is prepared in an excel template provided by OptiDx.</p>
          <p className='py-2'>Through simulations, we determined the optimal strategy for extensive G6PD testing. This is critical because certain antimalarial drugs can cause severe hemolysis in G6PD-deficient individuals, and P. vivax malaria is common in areas where G6PD deficiency is prevalent.</p>
        </div>
        <div className='grid md:grid-cols-2 gap-4 md:mx-20 p-3'>
          <img src="/assets/images/15616.jpg" alt="" />
          <div>
            <img src="/assets/images/320692749_1154324201870460_2338870672562996617_n.jpg" alt="" className='shadow-2xl shadow-gray-400' />
            <p className='text-sm py-3'>Photo taken during the workshop conducted by FIND and ICCDR, B. The World Health Organization (WHO) recommends G6PD testing as a measure to enhance the treatment of malaria</p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
