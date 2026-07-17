import React from 'react'
import Header from './../Header';
import Footer from './../Footer';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


export default function ContactUs() {
  const position = [23.7509527, 90.3654215];
  return (
    <>
    <Header />
      <section className="w-full bg-[url('/assets/images/abstract-blue-white-technology-background-modern-vector-illustration-design_29865-4558.webp')] bg-cover relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-8 md:px-16 py-8">
          {/* Contact Info */}
          <div className="text-center space-y-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#060A59]">
              Email: groupmappers@gmail.com
            </h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#060A59]">
              Call Us: +8801793593083
            </h1>
          </div>
          {/* Social Links */}
          <div className="text-center space-y-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#060A59]">
              Social Link
            </h1>
            <div className="flex justify-center gap-1 flex-wrap">
              <a href="https://www.facebook.com/GroupMappers" target="_blank">
                <img width="50" height="50" src="/assets/images/facebook2.png" alt="facebook"/>
              </a>
              <a href="https://twitter.com/GroupMappers" target="_blank">
                <img width="50" height="50" src="/assets/images/Twitter2.png" alt="twitterx--v2"/>
              </a>
              <a href="https://www.youtube.com/@groupmappers539" target="_blank">
                <img width="48" height="48" src="/assets/images/youtube.png" alt="youtube-play"/>
              </a>
              <a href="https://www.linkedin.com/company/groupmappers/" target="_blank">
                <img width="50" height="50" src="/assets/images/linkedin.png" alt="linkedin"/>
              </a>
              <a href="https://www.instagram.com/groupmappers.bd/" target="_blank">
                <img width="50" height="50" src="/assets/images/instagram.png" alt="instagram-new"/>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center px-4 sm:px-8 md:px-16">
          <div className="shadow-black shadow-md w-full max-w-5xl">
            <h1 className="text-md sm:text-lg md:text-xl font-semibold text-[#060A59] bg-[#FDFD96] text-center">
              Bangladesh Office
            </h1>
          </div>
          <div className="relative w-full max-w-5xl h-63 sm:h-80 md:h-60 my-5 mb-8">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14607.197354762757!2d90.36537!3d23.754534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfc7dc9b9a4d%3A0xc64c0a82037bb028!2z4KaX4KeN4Kaw4KeB4Kaq4Kau4KeN4Kav4Ka-4Kaq4Ka-4Kaw4KeN4Ka4!5e0!3m2!1sbn!2sbd!4v1769606269983!5m2!1sbn!2sbd" 
              className='w-full h-full shadow-md shadow-black' 
              style={{ border: 0 }}
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className='pb-4 text-center'>
            <h1 className='text-[#121E62] font-bold'>
              House : 6/20 (1st floor), Block- E, Lalmatia, Mohammadpur, Dhaka, Bangladesh.
            </h1>
          </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}