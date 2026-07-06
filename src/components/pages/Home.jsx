// import React from 'react'
import React, { useEffect, useRef, useState } from "react";
// import { GestureHandling } from "leaflet-gesture-handling";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { styled } from '@mui/material/styles';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Footer from "../Footer";
import Header from "../Header";
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, animate } from 'motion/react';



function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [hash]);
  return null;
}

function Slider1({ slides = [] }) {
  return (
    <Swiper
      modules={[EffectFade, Autoplay, Navigation]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
      navigation={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={1000}
      className="w-full h-[450px] md:h-[600px]"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={slide.src}
            alt={slide.alt1 || `Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Slider2({ slides = [], duration = 3000 }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!isHovered && slides.length > 0) {
      const interval = setInterval(() => {
        setIndex((current) => (current + 1) % slides.length);
      }, duration);
      return () => clearInterval(interval);
    }
  }, [isHovered, duration, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="w-full lg:p-10 sm:p-4 p-2">
      <div className="flex flex-col gap-3">
        <div
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div className="flex" style={{ x }}>
            {slides.map((slide, i) => (
              <div key={i} className="shrink-0 w-full h-60">
                <img
                  src={slide.src}
                  alt={slide.alt || `Slide ${i + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                ${index === 0
                ? 'opacity-40 cursor-not-allowed bg-gray-300'
                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            disabled={index === slides.length - 1}
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                ${index === slides.length - 1
                ? 'opacity-40 cursor-not-allowed bg-gray-300'
                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `3px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<DoubleArrowSharpIcon sx={{ fontSize: '0.9rem', color: 'greenyellow' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#000B58',
  color: 'white',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Home() {
  const [expanded, setExpanded] = useState(true);
  const [sectionsMap, setSectionsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/home')
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        if (Array.isArray(data)) {
          data.forEach((s) => { map[s.key] = s; });
        }
        setSectionsMap(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const s = (key) => sectionsMap[key] || {};

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Section data helpers
  const heroSlides = s('hero').slider || [];
  const whoWeAre = s('who-we-are');
  const whoSlides = whoWeAre.slider || [];
  const mission = s('mission');
  const whatWeDo = s('what-we-do');
  const accordionItems = whatWeDo.accordianContent || [];
  const volunteerism = s('volunteerism-and-support');
  const founders = s('founders');
  const founderCards = founders.cardContent || [];
  const latestNews = s('latest-news');
  const newsCards = latestNews.cardContent || [];
  const joinOurEffort = s('join-our-effort');
  const byTheNumber = s('by-the-number');
  const numberItems = byTheNumber.items || [];

  return (
    <>
      <ScrollToHash />
      <Header />

      {/* Hero Slider */}
      <div id="who-we-are">
        <Slider1 slides={heroSlides} />
      </div>

      {/* Who We Are */}
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-bold text-white text-2xl'>{whoWeAre.title || 'Who we are'}</h3>
      </div>
      <section>
        <div className='grid md:grid-cols-2 gap-7 bg-linear-to-r from-cyan-200 to-oklch(98.4% 0.019 200.873) text-center text-base'>
          <div className='text-lg text-blue-950 p-6 text-center'>
            {whoWeAre.content
              ? whoWeAre.content.split('\n').map((line, i) => <p key={i}>{line}</p>)
              : (
                <>
                  <p><strong>As our name suggests, we are a group of Bangladesh-based mapmakers</strong></p>
                  <p>GroupMappers is a Bangladeshi crowdsourcing initiative that utilizes geospatial technology for public health issues.</p>
                </>
              )}
          </div>
          <Slider2 slides={whoSlides} />
        </div>
      </section>

      {/* Mission */}
      <div className='bg-[#000B58] text-center py-1' id="mission">
        <h3 className='font-bold text-white text-2xl'>{mission.title || 'Mission'}</h3>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-gradient-to-r from-cyan-200 via-sky-100 to-slate-100 p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-xl h-50 sm:h-65 md:h-75 mx-auto border border-gray-950 shadow-md overflow-hidden">
          <iframe
            className="w-full h-full"
            src={mission.url || 'https://www.youtube.com/embed/h39Xfd5wJLw'}
            title="Mission Video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-center text-center md:text-left px-2">
          <p className="text-base sm:text-lg md:text-xl text-blue-950 font-medium leading-relaxed max-w-xl">
            {mission.content || '"Empowering communities through the utilization of crowdsourced mapping and data analysis for enhanced public health outcomes."'}
          </p>
        </div>
      </section>

      {/* What We Do */}
      <div className='bg-[#000B58] text-center py-1' id="what-we-do">
        <h3 className='font-bold text-white text-2xl'>{whatWeDo.title || 'What we do'}</h3>
      </div>
      <section>
        <div className='grid md:grid-cols-2 gap-8 bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-100 p-5'>
          <div className='text-center text-blue-950'>
            {whatWeDo.content
              ? whatWeDo.content.split('\n').map((line, i) => <p key={i} className='mb-4'>{line}</p>)
              : (
                <p className='mb-4'>
                  By utilizing a geospatial approach, we aim to address public health issues through the development of innovative solutions.
                </p>
              )}
          </div>
          <div className="w-full">
            {accordionItems.length > 0
              ? accordionItems.map((item, idx) => (
                <Accordion
                  key={item.key || idx}
                  expanded={expanded === `panel${idx + 1}`}
                  onChange={handleChange(`panel${idx + 1}`)}
                >
                  <AccordionSummary aria-controls={`panel${idx + 1}d-content`} id={`panel${idx + 1}d-header`}>
                    <Typography component="span">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.contents}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
              : (
                <>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography component="span">Data collection &amp; management</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>The GroupMappers team has extensive expertise in both collection and management of geospatial data.</Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
          </div>
        </div>
      </section>

      {/* Volunteerism */}
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-bold text-white text-2xl'>{volunteerism.title || 'Volunteerism and Support'}</h3>
      </div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9 shadow-2xl bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-100 p-4 sm:p-6 md:p-0">
          <div className="mx-auto md:m-9 text-center text-sm sm:text-base text-blue-950 max-w-xl">
            {volunteerism.content
              ? volunteerism.content.split('\n').map((line, i) => <p key={i} className='mb-4'>{line}</p>)
              : (
                <p className="mb-4">
                  As a crowdsourcing initiative, GroupMappers values the power of volunteerism and engages young individuals who share a passion for exploring the world of geospatial techniques and public health.
                </p>
              )}
          </div>
          <div className="flex justify-center items-center px-4 sm:px-6 md:px-9 py-4">
            <img
              src="/assets/images/Res02_IMG_20200221_144520-scaled.webp"
              alt="Volunteers Image"
              className="rounded-[40px] sm:rounded-[50px] w-full max-w-sm h-45 sm:h-55 md:h-65 object-cover drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Founders */}
      <div className='bg-[#000B58] text-center py-1' id="founders">
        <h3 className='font-bold text-white text-2xl'>{founders.title || 'Founders'}</h3>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 lg:p-10 bg-sky-200">
        {founderCards.length > 0 ? founderCards.map((card, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 text-center">
            <img
              src={card.image}
              alt={card.name}
              className="rounded-[25%] w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] object-cover"
            />
            <div className="max-w-sm px-2">
              <h1 className="font-bold text-xl sm:text-2xl text-[#121E62]">{card.name}</h1>
              <h2 className="font-semibold py-2 text-red-800 text-sm sm:text-base">{card.designation}</h2>
              <p className="text-sm sm:text-base leading-relaxed">{card.details}</p>
            </div>
            <span className="flex gap-4 pt-2">
              {card['link-1'] && (
                <a href={card['link-1']} target="_blank" rel="noreferrer">
                  <img src="/assets/images/pngegg.png" className="w-9 h-9" alt="website" />
                </a>
              )}
              {card['link-2'] && (
                <a href={card['link-2']} target="_blank" rel="noreferrer">
                  <img src="/assets/images/twitter.png" className="w-7 h-7" alt="twitter" />
                </a>
              )}
              {card['link-3'] && (
                <a href={card['link-3']} target="_blank" rel="noreferrer">
                  <img src="/assets/images/linkedin.png" className="w-7 h-7" alt="linkedin" />
                </a>
              )}
            </span>
          </div>
        )) : (
          // Fallback static founders
          <>
            <div className="flex flex-col items-center gap-4 text-center">
              <img src="/assets/images/richard.webp" alt="Richard Maude" className="rounded-[25%] w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] object-cover" />
              <div className="max-w-sm px-2">
                <h1 className="font-bold text-xl sm:text-2xl text-[#121E62]">Richard Maude</h1>
                <h2 className="font-semibold py-2 text-red-800 text-sm sm:text-base">Head of Epidemiology</h2>
                <p className="text-sm sm:text-base leading-relaxed">Professor Maude is Head of the Epidemiology Department at Mahidol-Oxford Tropical Medicine Research Unit, Bangkok, Thailand.</p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Latest News */}
      <div className='bg-[#000B58] text-center py-1' id="news">
        <h3 className='font-bold text-white text-2xl'>{latestNews.title || 'Latest News'}</h3>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-9 p-4 sm:p-6 lg:p-10 bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-100">
        {newsCards.length > 0 ? newsCards.map((card, idx) => (
          <div key={card.id || idx}>
            <div className="relative w-full max-w-md mx-auto overflow-hidden shadow-lg group">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute right-0 top-2 px-2 py-1 text-xs sm:text-sm font-bold bg-green-300 opacity-90">
                <FontAwesomeIcon icon={faTag} /> {card.date}
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <Link
                to={card.slug || '#'}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
              />
            </div>
            <Link to={card.slug || '#'} target="_blank">
              <h3 className="text-center text-sm sm:text-base font-bold text-green-500 hover:underline px-2">
                {card.title}
              </h3>
            </Link>
          </div>
        )) : null}
      </section>

      {/* Join Our Effort */}
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-bold text-white text-2xl'>{joinOurEffort.title || 'Join our effort'}</h3>
      </div>
      <section className='grid md:grid-cols-2 gap-9 bg-sky-200'>
        <div className='md:w-full mx-5 my-9 text-md text-blue-950 text-center'>
          {joinOurEffort.content
            ? joinOurEffort.content.split('\n').map((line, i) => <p key={i}>{line}</p>)
            : (
              <p>You can support us in our mission to improve public health in Bangladesh by making a donation, sharing your technical knowledge or collaborating with the organization.</p>
            )}
        </div>
        <div className='flex flex-col items-center my-5'>
          <img
            src={joinOurEffort.image || '/assets/images/Caddddpture.webp'}
            alt="Join our effort"
            className='md:w-150 h-50 rounded-3xl shadow-2xl shadow-black my-4'
          />
          <p className='text-center text-3xl font-semibold py-4'>{joinOurEffort.text || 'Help us make an impact'}</p>
          <Button
            onClick={() => window.location.href = joinOurEffort.btnLink || 'https://www.campaign.ox.ac.uk/groupmappers'}
            variant="contained"
            color="success"
          >
            Donate to support us
          </Button>
        </div>
      </section>

      {/* By the Number */}
      <div className='bg-[#000B58] text-center py-1'>
        <h3 className='font-bold text-white text-2xl'>{byTheNumber.title || 'By the number'}</h3>
      </div>
      <section className='flex md:flex-row flex-col m-2'>
        {numberItems.length > 0 ? numberItems.map((item, idx) => (
          <div key={item.key || idx} className="bg-[url('/assets/images/stars-changing-colors.gif')] md:w-[50%] h-50 text-center">
            <div className="py-6">
              <h1 className='text-7xl mt-4 font-[alice,sans-serif] font-500 text-[rgb(18,30,98)]'>{item.value}</h1>
              <h1 className='text-2xl font-semibold text-[rgb(18,30,98)]'>{item.label}</h1>
            </div>
          </div>
        )) : (
          // Fallback static
          <>
            <div className="bg-[url('/assets/images/stars-changing-colors.gif')] md:w-[50%] h-50 text-center">
              <div className="py-6">
                <h1 className='text-7xl mt-4 font-[alice,sans-serif] font-500 text-[rgb(18,30,98)]'>20</h1>
                <h1 className='text-2xl font-semibold text-[rgb(18,30,98)]'>Core Experts</h1>
              </div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}