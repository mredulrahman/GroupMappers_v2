import React from "react";
import { useParams } from "react-router-dom";
import Header from "./../Header";
import Footer from "./../Footer";
import rabiesData from "@/assets/data/rabies-data.json";
import ReactMarkdown from "react-markdown";

export default function Rabies() {
  const { key } = useParams();
  const rabies = rabiesData.find(item => item.key === key);
  if (!rabies) {
    return (
      <>
        <Header />
        <div className="p-10 text-center text-red-600 text-xl">
          Page not found
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      {/* TITLE BAR */}
      <div className="bg-[#000B58] text-center py-1">
        <h3 className="font-semibold text-white md:text-xl">
          {rabies.title}
        </h3>
      </div>
      {/* CONTENT */}
      <section className="bg-linear-to-r from-cyan-100 to-sky-50">
        <div className="px-4 sm:px-6 md:mx-20 py-4 text-blue-950 text-sm sm:text-base md:text-lg leading-tight text-justify">
          <ReactMarkdown>
            {rabies.para}
          </ReactMarkdown>
        </div>
        {/* IMAGES (ONLY IF EXISTS) */}
        {rabies.img && rabies.img.length > 0 && (
          <div className="flex flex-col gap-4 px-4 sm:px-6 md:mx-50 py-4">
            {rabies.img.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-full h-auto shadow-md shadow-gray-600"
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
