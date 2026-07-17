import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
// import Projects from './pages/Projects';
// import Activities from './pages/Activities';
// import Contact from './pages/Contact';
// import Donate from './pages/Donate';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Link0 from './pages/latestNews/Link0';
// import Link1 from './pages/latestNews/Link1';
// import Link2 from './pages/latestNews/Link2';
// import Link3 from './pages/latestNews/Link3';
// import Link4 from './pages/latestNews/Link4';
// import Link5 from './pages/latestNews/Link5';
// import Link6 from './pages/latestNews/Link6';
// import Link7 from './pages/latestNews/Link7';
// import Link8 from './pages/latestNews/Link8';
// import Link9 from './pages/latestNews/Link9';
import Gallery from './pages/aboutUs/Gallery';
import Project_01 from './pages/projects/diseases/malaria/Project_01';
import Project_02 from './pages/projects/diseases/malaria/Project_02';
import Project_03 from './pages/projects/diseases/malaria/Project_03';
import Project_04 from './pages/projects/diseases/malaria/Project_04';
import Proj_2022 from './pages/projects/diseases/covid19/Project_01';
import Proj_2021 from './pages/projects/diseases/covid19/Project_02';
import Proj_2020 from './pages/projects/diseases/covid19/Project_03';
import Covid_2020 from './pages/projects/diseases/covid19/Project_04';
import Covid19_2020 from './pages/projects/diseases/covid19/Project_05';
import Dengue_2021 from './pages/projects/diseases/dengue/Project_03';
import Dengue_2019 from './pages/projects/diseases/dengue/Project_04';
import PreMonsoon from './pages/projects/diseases/dengue/aedes_mosquito_survey/Project_01';
import PostMonsoon from './pages/projects/diseases/dengue/aedes_mosquito_survey/Project_02';
import DengueRiskZoning from './pages/projects/diseases/dengue/Project_05';
import DroneImageries from './pages/projects/diseases/dengue/Project_06';
// import Acst from './pages/projects/diseases/rabies/dog_vaccination_program (2018 - ongoing)/Project_01';
// import DigitalMapMaking from './pages/projects/diseases/rabies/dog_vaccination_program (2018 - ongoing)/Project_02';
// import Training2021 from './pages/projects/diseases/rabies/dog_vaccination_program (2018 - ongoing)/Project_04';
// import CdcTraining2018 from './pages/projects/diseases/rabies/dog_vaccination_program (2018 - ongoing)/Project_03';
import FilariasisProj_2018 from './pages/projects/diseases/filariasis/Project-01';
import GHFD from './pages/projects/non-diseases/GHFD';
// import Issue_1 from './pages/activities/groupletters/Issue1';
// import Issue_2 from './pages/activities/groupletters/Issue2';
// import Issue_3 from './pages/activities/groupletters/Issue3';
// import Volunteering from './pages/activities/Volunteering';
// import Gisrsclubcafe from './pages/activities/Gis&rsclubcafe';
// import Acitivity_2019 from './pages/activities/training/capacity_training/Activity1';
// import Acitivity_2017 from './pages/activities/training/capacity_training/Activity2';
import ContactUs from './pages/ContactUs';
import DonateUs from './pages/DonateUs';
// import Proj_Summary from './pages/projects/diseases/rabies/dog_vaccination_program (2018 - ongoing)/Project_summary';
import Team from './pages/aboutUs/Team';
// import Nurullah from './pages/team_members/Nurullah';
import News from './pages/News';
import Activity from './pages/Activities';
import TeamMember from './pages/Profile';
import Rabies from './pages/Rabies';

const AppRoutes = () => {
  return (
    <Router>
      {/* <Navbar /> Navigation bar, accessible on all pages */}
      <div className="min-h-screen">
        <Routes>
          {/* Route definitions */}
          <Route path="/" element={<Home />} />
              {/* <Route path="/2023/07/25/groupmappers-moru-is-featured-in-celebration-of-world-malaria-day-2023-by-who-news/" element={<Link0 />} />  Dynamic post route */}
              {/* <Route path="/2023/07/25/the-two-week-long-diagnostic-network-optimization-dno-training-workshop-funded-by-find/" element={<Link1 />} /> */}
              {/* <Route path="/2023/06/19/update-on-monsoon-aedes-mosquito-survey/" element={<Link2 />} /> */}
              {/* <Route path="/2023/06/15/nmep-brac-and-groupmappers-unite-to-celebrate-the-world-malaria-day-2023/" element={<Link3 />} />
              <Route path="/2023/02/26/workshop-on-development-of-malaria-funding-request-to-global-fund-gc-7/" element={<Link4 />} /> */}
              {/* <Route path="/2023/02/10/updates-on-crisis-ready-project-crp-workshop/" element={<Link5 />} />
              <Route path="2023/01/11/technical-assistance-in-implementing-village-level-data-collection-and-surveillance-towards-malaria-elimination-in-lama-upazila-bandarban/" element={<Link6 />} />
              <Route path="/2022/12/15/a-two-day-workshop-with-find-iccdr-b-and-nmep-on-applying-diagnostic-network-optimisation-analysis-to-inform-the-introduction-of-g6pd-testing-into-bangladesh-for-improved-malaria-treatment-was/" element={<Link7 />} />
              <Route path="/2022/12/05/mass-dog-vaccination-program-mdv-from-30th-november-to-5th-december-2022/" element={<Link8 />} /> */}
              {/* <Route path="/2022/11/20/our-training-in-lama-upazila-is-continuing-this-week-under-technical-assistance-in-implementing-village-level-data-collection-and-surveillance-towards-malaria-elimination-at-lama-bandarban/" element={<Link9 />} /> */}
          {/* <Route path="/about" element={<About />} /> */}

          <Route path="/service/village-mapping/" element={<Project_01 />} />
          <Route path="/service/g6pd-testing-for-malaria-treatment/" element={<Project_02 />} />
          <Route path="/service/piloting-village-level-malaria-surveillance-in-lama-bandarban/" element={<Project_03 />} />
          <Route path="/service/malaria-api-tracker/" element={<Project_04 />} />

          <Route path="/service/crp-assessing-mobility-data-for-guiding-disaster-response-in-the-greater-mekong-subregion-and-bangladesh-crisis-ready/" element={<Proj_2022 />} />
          <Route path="/service/mask-study/" element={<Proj_2021 />} />
          <Route path="/service/covid-19/" element={<Proj_2020 />} />
          <Route path="/service/physical-accessibility-to-covid-19-related-health-services-analysis-moru/" element={<Covid_2020 />} />
          <Route path="/service/real-time-population-mapping-to-assess-the-impact-of-travel-restrictions-and-social-distancing-on-covid-19-spread-2020/" element={<Covid19_2020 />} />

          <Route path="/service/pre-monsoon-aedes-mosquito-survey-nmeatdcp-dghs/" element={<PreMonsoon />} />
          <Route path="/service/post-monsoon-aedes-mosquito-survey-nmeatdcp-dghs/" element={<PostMonsoon />} />

          <Route path="/service/dengue-risk-tracker-the-recent-seven-days-dengue-situation-in-dhaka-city-corporations-nmeatdcp-dghs/" element={<Dengue_2021 />} />
          <Route path="/service/dengue-household-survey-nmeatdcp-dghs/" element={<Dengue_2019 />} />
          <Route path="/service/dengue-risk-zoning-nmeatdcp-dghs/" element={<DengueRiskZoning />} />
          <Route path="/service/unmanned-aerial-vehicles-uav-for-aedes-mosquito-breeding-zone-detection-nmeatdcp-dghs/" element={<DroneImageries />} />
          {/* <Route path="/service/project-summary/" element={<Proj_Summary />} />
          <Route path="/service/animal-control-staff-training-2018-ongoing/" element={<Acst />} />
          <Route path="/service/digital-map-making-and-demarcation-of-union-boundary-2020/" element={<DigitalMapMaking />} />
          <Route path="/service/cdc-atlanta-training-2018/" element={<CdcTraining2018 />} />
          <Route path="/service/four-day-introductory-training-on-dog-catching-vaccination-for-national-team-2021/" element={<Training2021 />} /> */}

          <Route path="/service/survey-for-assessing-the-prevalence-of-soil-transmitted-helminths-sth-among-school-aged-children-of-bangladesh-2018/" element={<FilariasisProj_2018 />} />

          <Route path="/service/the-global-health-facilities-database-ghfd-2020-ongoing/" element={<GHFD />} />

          {/* <Route path="/gis-rs-club-cafe/" element={<Gisrsclubcafe />} />
          <Route path="/issue-1/" element={<Issue_1 />} />
          <Route path="/issue-2/" element={<Issue_2 />} />
          <Route path="/issue-3/" element={<Issue_3 />} />
          <Route path="/volunteering/" element={<Volunteering />} /> */}
          {/* <Route path="/service/the-global-health-facilities-database-ghfd-2020-ongoing/" element={<GHFD />} /> */}

          {/* <Route path="/service/introductory-training-on-geographical-information-system-gis-2019/" element={<Acitivity_2019 />} />
          <Route path="/service/introduction-to-gis-for-communicable-disease-surveillance-2017/" element={<Acitivity_2017 />} /> */}

          <Route path="/contact-us/" element={<ContactUs />} />
          <Route path="/fundraising/" element={<DonateUs />} />
          <Route path="/gallery/" element={<Gallery />}/>
          <Route path="/Team_Members/" element={<Team />}/>
          
          <Route path="/staff/:key/" element={<TeamMember />}/>
          <Route path="/news/:slug/" element={<News />} />
          <Route path="/activity/:key/" element={<Activity />} />
          <Route path="/service/rabies/:key/" element={<Rabies />} />
        </Routes>
      </div>

      {/* <Footer /> Footer, also accessible on all pages */}
    </Router>
  );
};

export default AppRoutes;