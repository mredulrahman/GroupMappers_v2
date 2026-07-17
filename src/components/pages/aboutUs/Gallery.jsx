import React, { useRef } from "react";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import Footer from '../../Footer';
import Header from '../../Header';
import images from '@/assets/data/galleryPage-data.json';


const Gallery = () => {
  const galleryRef = useRef(null);
  const lgInstanceRef = useRef(null);

  // Initialize lightGallery manually on first click
  const openGallery = (index) => {
    if (!lgInstanceRef.current) {
      lgInstanceRef.current = lightGallery(galleryRef.current, {
        dynamic: true,
        dynamicEl: images.map((img) => ({
          src: img.src,
          thumb: img.thumb || img.src,
          subHtml: `
              <div class="lg-sub-html">
                <h3 style="margin-bottom:6px;">${img.alt1 || ""}</h3>
                <p style="font-size:14px; opacity:0.85;">${img.alt2 || ""}</p>
              </div>
            `, // optional caption
        })),

        plugins: [
          lgThumbnail,
          lgZoom,
          lgShare,
          lgAutoplay,
          lgFullscreen,
        ],
        // 🔹 Enable features
        thumbnail: true,
        zoom: true,
        fullScreen: true,     // fullscreen button
        autoplay: true,       // autoplay button
        autoplayControls: true,
        pause: 3000,          // autoplay delay (ms)
        progressBar: true,
        share: true,          // share button
        download: true,       // download button
        index: index,         // start from clicked image
      });
    } else {
      lgInstanceRef.current.openGallery(index);
    }
  };


  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white text-2xl'>Gallery</h3>
      </div>
      {/* Hidden container only for LightGallery to attach */}
      <div ref={galleryRef} style={{ display: "none" }} />

      {/* Your actual visible gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 p-9 bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-100">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openGallery(idx)}
            className="block focus:outline-none"
          >
            <img
              src={img.thumb || img.src}
              alt={img.alt2}
              className="w-full h-48 object-cover shadow-md hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;