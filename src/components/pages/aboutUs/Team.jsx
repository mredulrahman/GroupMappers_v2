import React, { useEffect, useState } from 'react'
import Header from '../../Header';
import Footer from '../../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import profilesData from '../../../assets/data/profile.json';

// Slugs of team members already available as static cards
const static_slugs = new Set(profilesData.map((m) => m.key));

// Reusable card: members WITH an image (full card layout)
function TeamCardWithImage({ member }) {
  const slug = member.slug;
  const imgSrc = member.images?.[0] || null;
  const name = member.title;
  const designation = member.summary || member.metadata?.designation || "";
  const bio = member.body ? member.body.slice(0, 120) + "..." : "";

  return (
    <div className="flex items-start gap-7">
      {imgSrc && (
        <div className="w-56 h-[170px] flex-shrink-0 overflow-hidden rounded-tl-4xl rounded-br-4xl">
          <img
            src={imgSrc}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <Link
          to={`/staff/${slug}/`}
          className="text-2xl text-blue-950 hover:text-white transition duration-700"
        >
          {name}
        </Link>
        <p className="text-sm text-gray-400">{designation}</p>
        {bio && (
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">{bio}</p>
        )}
        <Link
          to={`/staff/${slug}/`}
          className="group mt-4 inline-flex items-center gap-2 transition duration-700 hover:text-white no-underline"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="rounded-full p-1 text-xs bg-emerald-400 transition-colors duration-700 group-hover:bg-black"
          />
          <span className="text-blue-950 text-sm">Read more</span>
        </Link>
      </div>
    </div>
  );
}

// Reusable card: members WITHOUT an image (text-only layout)
function TeamCardNoImage({ member }) {
  const slug = member.slug;
  const name = member.title;
  const designation = member.summary || member.metadata?.designation || "";
  const bio = member.body ? member.body.slice(0, 120) + "..." : "";

  return (
    <div>
      <div>
        <Link to={`/staff/${slug}/`} className="text-2xl text-blue-950 hover:text-white transition duration-700">
          {name}
        </Link>
        <h1 className="text-sm text-gray-400">{designation}</h1><br />
        {bio && <p className="text-sm text-gray-400">{bio}</p>}<br />
        <Link to={`/staff/${slug}/`} className="group inline-flex items-center gap-2 transition duration-700 hover:text-white no-underline">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="rounded-full p-1 text-xs bg-emerald-400 transition-colors duration-700 group-hover:bg-black"
          />
          <span className="text-blue-950 text-sm">Read more</span>
        </Link>
      </div>
    </div>
  );
}

export default function Team() {
  const [dynamicMembers, setDynamicMembers] = useState([]);

  useEffect(() => {
    fetch("/api/public/content?type=teamMember&limit=100")
      .then((res) => res.json())
      .then((data) => {
        // Only show members not already available as static cards
        const newMembers = (data.items || []).filter(
          (m) => !static_slugs.has(m.slug)
        );
        setDynamicMembers(newMembers);
      })
      .catch(() => { });
  }, []);

  return (
    <>
      <Header />
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-semibold text-white text-2xl'>Meet Our Team Members</h3>
      </div>
      <section className="bg-radial-[at_15%_35%] from-cyan-200 via-sky-100 via-45% to-blue-300 to-95% grid md:grid-cols-2 gap-9 md:p-16 py-6 px-3">

        {/* ── STATIC MEMBERS (from JSON) ── */}
        {profilesData.map((member) => {
          const adaptedMember = {
            _id: member.key,
            slug: member.key,
            title: member.name,
            summary: member.designation,
            body: member.description,
            images: member.img ? [member.img] : []
          };
          return adaptedMember.images[0]
            ? <TeamCardWithImage key={adaptedMember._id} member={adaptedMember} />
            : <TeamCardNoImage key={adaptedMember._id} member={adaptedMember} />;
        })}

        {/* ── DYNAMIC MEMBERS from admin panel (published, not already in static list) ── */}
        {dynamicMembers.map((member) =>
          member.images?.[0]
            ? <TeamCardWithImage key={member._id} member={member} />
            : <TeamCardNoImage key={member._id} member={member} />
        )}

      </section>
      <Footer />
    </>
  )
}