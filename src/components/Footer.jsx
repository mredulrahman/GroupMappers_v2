"use client"
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="relative w-full md:h-80 py-12">
        {/* Light White Base Layer */}
        <div className="absolute inset-0 bg-blue-300"></div>
        {/* Background Image with opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-66"
          style={{ backgroundImage: "url('/assets/images/insurance-footer-background.webp')" }}
        ></div>
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 items-center relative z-10 h-full gap-6 md:px-16 pl-4">
          <div className="">
            <h1 className='text-xl font-bold text-white'>Contact Us</h1>
            <hr className='w-12 border-t-6 border-white my-5' />
            <h1 className='text-white text-sm font-bold mt-14 leading-loose'>+8801793593083</h1>
            <h1 className='text-white text-sm font-bold leading-loose'>groupmappers@gmail.com</h1>
          </div>
          <div className="">
            <h1 className='text-xl font-bold text-white'>Bangladesh Office</h1>
            <hr className='w-12 border-t-6 border-white my-5' />
            <h1 className='text-white text-sm mt-14 leading-loose'>House : 6/20 (1st floor), Block- E, Lalmatia, Mohammadpur, Dhaka, Bangladesh.</h1>
          </div>
          <div className='relative w-60 h-60'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14607.197354762757!2d90.36537!3d23.754534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfc7dc9b9a4d%3A0xc64c0a82037bb028!2z4KaX4KeN4Kaw4KeB4Kaq4Kau4KeN4Kav4Ka-4Kaq4Ka-4Kaw4KeN4Ka4!5e0!3m2!1sbn!2sbd!4v1769606269983!5m2!1sbn!2sbd"
              className='w-full h-full'
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className="">
            <h1 className='text-xl font-bold text-white'>Important Links</h1>
            <hr className='w-12 border-t-6 border-white my-5' />
            <div className='grid grid-cols-2 text-sm mt-14'>
              <span className='flex flex-col gap-3 text-white'>
                <Link href="/" target="_blank" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">Home</Link>
                <Link href="" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">What We Do</Link>
                <Link href="" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">Projects</Link>
              </span>
              <span className='flex flex-col gap-3 text-sm'>
                <a href="" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">Who we are</a>
                <a href="" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">Latest News</a>
                <Link href="/" target="_blank" className="no-underline hover:underline text-white hover:text-blue-950 hover:transition duration-400">Activities</Link>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-[#000B58] w-full h-20 px-14 py-2 flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-white flex items-center justify-center md:justify-start">
          <h1 className="text-sm">
            © 2025 Copyright | GroupMappers | All rights reserved.
          </h1>
        </div>
        <div className="flex gap-2 justify-center md:justify-end">
          <a href="https://www.facebook.com/GroupMappers" target="_blank">
            <FontAwesomeIcon icon={faFacebookF} className="text-md hover:text-white rounded-full hover:bg-blue-900 p-2 bg-[#A0A5C0] transition duration-400" />
          </a>
          <a href="https://twitter.com/GroupMappers" target="_blank">
            <FontAwesomeIcon icon={faXTwitter} className="text-md hover:text-white rounded-3xl hover:bg-black p-2 bg-[#A0A5C0] transition duration-400" />
          </a>
          <a href="https://www.instagram.com/groupmappers.bd/" target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="text-md hover:text-white rounded-3xl hover:bg-stone-500 p-2 bg-[#A0A5C0] transition duration-400" />
          </a>
          <a href="https://www.linkedin.com/company/groupmappers/" target="_blank">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-md hover:text-white rounded-3xl hover:bg-sky-800 p-2 bg-[#A0A5C0] transition duration-400" />
          </a>
          <a href="https://www.youtube.com/@groupmappers539" target="_blank">
            <FontAwesomeIcon icon={faYoutube} className="text-md hover:text-white rounded-3xl hover:bg-red-700 p-2 bg-[#A0A5C0] transition duration-400" />
          </a>
        </div>
      </div>
    </>
  );
}