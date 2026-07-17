import React from "react";
import { useParams } from "react-router-dom";
import Header from "./../Header";
import Footer from "./../Footer";
import activityData from "@/assets/data/activity-data.json";
import ReactMarkdown from "react-markdown";

export default function Activity() {
  const { key } = useParams();
  const activity = activityData.find(item => item.key === key);
  if (!activity) {
    return (
      <>
        <Header />
        <div className="p-10 text-center text-red-600 text-xl">
          Activity not found
        </div>
        <Footer />
      </>
    );
  }

  const title = activity.title || "";
  const images = Array.isArray(activity.images) ? activity.images : [];
  return (
    <>
      <Header />
      {title && (
        <div className="bg-[#000B58] text-center py-1">
          <h3 className="font-semibold text-white md:text-2xl">
            {title}
          </h3>
        </div>
      )}
      <div className="px-8 md:px-16 py-3 bg-linear-to-r from-cyan-100 to-sky-50">
        {/* Content */}
        <div className="max-w-6xl mb-8 md:text-xl text-justify">
          <ReactMarkdown>{activity.para}</ReactMarkdown>
        </div>
        {/* {images.length === 1 && (
          <div className="flex justify-center mt-6">
            <img
              src={images[0]}
              alt=""
              className="max-w-full md:max-w-200 shadow-md"
            />
          </div>
        )} */}
      {images.length === 1 ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <img src={images[0]} className="max-w-full md:max-w-200 shadow-md" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="h-72 flex items-center justify-center"
              >
                <img src={img} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}
