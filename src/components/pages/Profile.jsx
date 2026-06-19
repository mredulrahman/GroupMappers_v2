import React from "react";
import { useParams } from "react-router-dom";
import Header from "./../Header";
import Footer from "./../Footer";
import teamData from "@/assets/data/profile.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function TeamMember() {
  const { key } = useParams();
  const member = teamData.find(item => item.key === key);
  if (!member) {
    return (
      <>
        <Header />
        <div className="p-10 text-center text-red-600 text-xl">
          Team member not found
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="md:mt-3 md:mx-18 mb-40 p-3">
        <div>
          <h1 className="text-5xl font-bold text-blue-950">
            {member.name}
          </h1>
          <h1 className="text-lg font-bold text-gray-500">
            {member.designation}
          </h1>
          <hr className="w-12 border-t-4 border-gray-200 my-8" />
        </div>
        {!member.img ? (
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div></div>
            <p className="text-justify">{member.description}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <img
              src={member.img}
              alt={member.name}
              className="h-72 mx-auto"
            />
            <p className="text-justify">{member.description}</p>
          </div>
        )}
        <div className="bg-[#000B58] grid md:grid-cols-2 p-12 gap-5 mt-10">
          <div>
            <p className="text-2xl text-white font-bold">
              Contact Details
            </p>
          </div>
          <div></div>
          <div>
            <i className="fa fa-envelope" aria-hidden="true" color="green"></i>
            <a
              href={`mailto:${member.mail}`}
              className="hover:underline text-green-600 font-semibold ml-2"
            >
              {member.mail}
            </a>
          </div>
          {!member.socialLink ? (
            <div>
              <p className="text-white font-semibold">
                Social Profiles
              </p>
            </div>
            ) : (
            <div>
              <p className="text-white font-semibold">
                Social Profiles
              </p>
              <a href="https://www.linkedin.com/in/loyalhasan/" target="_blank">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-md hover:text-white rounded-3xl hover:bg-sky-800 p-2 bg-white transition duration-400" />
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
