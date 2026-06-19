"use client"
import React, { useState } from "react"
import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/themes/tailwind-light/theme.css';
import "primereact/resources/primereact.min.css";
import { useNavigate } from "react-router-dom";
import { Menu, Button, Group, Accordion, UnstyledButton, Text, Drawer, Burger, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

const projects = {
  diseases: [
    {
      item: "Malaria",
      subitems: [
        "Village Mapping (2017 - ongoing)",
        "G6PD Testing for Malaria Treatment (2022 - ongoing)",
        "Piloting Village-level Malaria Surveillance in Lama, Bandarban. (2022)",
        "Malaria API Tracker (2021)",
      ],
    },
    {
      item: "Covid-19",
      subitems: [
        "Crisis Ready Project (CRP) (2022)",
        "Mask Study (2021)",
        "COVID-19 Risk Zoning (2020)",
        "Physical Accessibility to COVID-19 Related Health Services Analysis - Bangladesh (2020)",
        "Real-time population mapping to assess the impact of travel restrictions and social distancing on COVID-19 spread (2020)",
      ],
    },
    {
      item: "Dengue",
      subitems: [
        "Aedes mosquito survey (2021 - ongoing)",
        "Pre-monsoon Aedes Mosquito Survey",
        "Post-monsoon Aedes Mosquito Survey",
        "Dengue Risk Tracker (2021)",
        "Dengue Household Survey (2019)",
        "Dengue risk zoning (2019)",
        "Drone driven imageries to identify breeding space in Dhaka (2019)",
      ],
    },
    {
      item: "Rabies",
      subitems: [
        "Mass Dog Vaccination Program (2018 - Ongoing)",
        "Project Summary",
        "Animal Control Staff Training (2018 - ongoing)",
        "Digital map making and demarcation of union boundary (2020)",
        "CDC Atlanta Training (2018)",
        "Four Day Introductory Training on Dog Catching & Vaccination for National Team (2021)",
      ],
    },
    {
      item: "Filariasis",
      subitems: [
        "Survey for assessing the prevalence of Soil-Transmitted Helminths (STH) among school-aged children of Bangladesh (2018)",
      ],
    },
  ],
  nondiseases: [
    {
      item: "The Global Health Facilities Database (GHFD) (2020 - ongoing)",
      subitems: [],
    },
  ]
}
const activities = [
  { item: "Volunteering", subitems: [] },
  {
    item: "GroupLetters",
    subitems: ["Issue 1", "Issue 2", "Issue 3"],
  },
  {
    item: "Training",
    subitems: [
      "Capacity Training",
      "Introductory Training on Geographical Information System (GIS) (2019)",
      "Introduction to GIS for Communicable Disease Surveillance (2017)",
    ],
  },
  { item: "GIS & RS Club Cafe", subitems: [] },
]

function MenuItem({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    item.command?.();
    if (item.url) navigate(item.url);
    close?.();
  };
  // If item has children → submenu
  if (item.items && item.items.length > 0) {
    return (
      <Menu
        trigger="hover"
        openDelay={150}
        closeDelay={300}
        position="right-start"
        offset={0}
        middlewares={{ flip: false, shift: false }}
        styles={menuStyles}
        withinPortal
      >
        <Menu.Target>
          <Menu.Item rightSection={<IconChevronRight size={14} stroke={3} />}>
            {item.label}
          </Menu.Item>
        </Menu.Target>
        <Menu.Dropdown>
          {item.items.map((child, i) => (
            <MenuItem key={i} item={child} />
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }
  return (
    <Menu.Item onClick={handleClick}>
      {item.label}
    </Menu.Item>
  );
}

function Navbar({ items }) {
  const navigate = useNavigate();
  // const handleClick = () => {
  //   items.command?.();
  //   if (items.url) navigate(items.url);
  //   close();
  // };
  return (
    <Group
      gap={{ base: 'xs', xl: 'md' }}
      justify="center"
      wrap="wrap"
      maw="88%"
    >
      {items.map((item, index) => {
        // Top-level without submenu
        if (!item.items) {
          return (
            <Button
              key={index}
              variant="subtle"
              color="#121e62"
              fw={700}
              fz={{ base: 15, md: 16 }}
              px={{ base: 'sm', md: 'md' }}
              styles={{
                root: {
                  transition: 'none',
                  transform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(19, 28, 112, 0.08)',
                  },
                  '&:active': {
                    transform: 'none',
                  },
                },
              }}
              onClick={() => {
                if (item.command) item.command();
                if (item.url) navigate(item.url);
              }}
            >
              {item.label}
            </Button>
          );
        }
        // Top-level with submenu
        return (
          <Menu
            key={index}
            trigger="hover"
            openDelay={100}
            closeDelay={200}
            styles={menuStyles}
            withinPortal
          >
            <Menu.Target>
              <Button
                variant="subtle"
                color="#121e62"
                fw={700}
                fz={{ base: 15, md: 16 }}
                px={{ base: 'sm', md: 'md' }}
                rightSection={<IconChevronDown size={14} stroke={3} />}
                styles={{
                  root: {
                    transition: 'none',
                    transform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(19, 28, 112, 0.08)',
                    },
                    '&:active': {
                      transform: 'none',
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {item.items.map((child, i) => (
                <MenuItem key={i} item={child} />
              ))}
            </Menu.Dropdown>
          </Menu>
        );
      })}
    </Group>
  );
}

const menuStyles = {
  dropdown: {
    backgroundColor: '#212372',
    borderRadius: 0,
    padding: 0,
    border: 'none',
    width: 200,
    minWidth: 200,
    lineHeight: 1.3,
  },
  item: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: '16px',
    padding: '8px 12px',
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: '#212372',
    '&:hover': {
      backgroundColor: '#212372',
    },
    '&[data-hovered]': {
      backgroundColor: '#212372',
    },
    '&[data-active]': {
      backgroundColor: '#212372',
    },
    itemSection: {
      color: '#ffffff',
    },
  }
};

function MobileItem({ item, level = 0, close }) {
  const navigate = useNavigate();
  const hasChildren = item.items?.length;
  const handleClick = () => {
    item.command?.();
    if (item.url) navigate(item.url);
    close();
  };
  if (!hasChildren) {
    return (
      <UnstyledButton
        onClick={handleClick}
        w="100%"
        py="sm"
        px="sm"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          // paddingLeft: `${16 + level * 12}px`,
        }}
      >
        <Text fw={400} fz={14} c="white">
          {item.label}
        </Text>
      </UnstyledButton>
    );
  }
  return (
    <Accordion.Item value={item.label}>
      <Accordion.Control
        chevron={<IconChevronDown size={18} stroke={3} />}
        styles={{
          control: {
            // paddingLeft: `${16 + level * 12}px`,
            color: "white",
            fontSize: "14px",
            fontWeight: "400",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "#212372",
            '&:hover': {
              backgroundColor: "#212372"
            }
          },
        }}
      >
        {item.label}
      </Accordion.Control>
      <Accordion.Panel p={0}>
        {item.items.map((child, i) => (
          <MobileItem
            key={i}
            item={child}
            level={level + 1}
            close={close}
          />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function MobileMenu({ items }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    <>
      {/* Hamburger Button */}
      <Burger
        opened={opened}
        onClick={toggle}
        color="black"
        size="md"
      />
      <Drawer
        opened={opened}
        onClose={close}
        hiddenFrom="md"
        size="65%"
        padding={0}
        withCloseButton={false}
        styles={{
          body: { backgroundColor: "#212372" },
        }}
      >
        <ScrollArea h="100vh">
          <Accordion
            multiple
            chevronPosition="right"
            styles={{
              item: { border: "none" },
              chevron: { color: "white" },
            }}
          >
            {items.map((item, index) => (
              <MobileItem
                key={index}
                item={item}
                close={close}
              />
            ))}
          </Accordion>
        </ScrollArea>
      </Drawer>
    </>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const go = (key) => navigate(`/activity/${key}/`);
  const rabies = (key) => navigate(`/service/rabies/${key}/`);
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: "/",
    },
    {
      label: 'About Us',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Who we are', icon: 'pi pi-user',
          // command: () => {
          //   document.querySelector('#who-we-are')?.scrollIntoView({ behavior: 'smooth' });
          // }, 
          url: '/#who-we-are'
        },
        {
          label: 'What we do', icon: 'pi pi-briefcase',
          // command: () => {
          //   document.querySelector('#what-we-do')?.scrollIntoView({ behavior: 'smooth' });
          // },
          url: '/#what-we-do'
        },
        {
          label: 'Mission', icon: 'pi pi-flag',
          // command: () => {
          //   document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' });
          // },
          url: '/#mission'
        },
        {
          label: 'Founders', icon: 'pi pi-users',
          // command: () => {
          //   document.querySelector('#founders')?.scrollIntoView({ behavior: 'smooth' });
          // },
          url: '/#founders'
        },
        { label: 'Team members', icon: 'pi pi-sitemap', url: '/Team_Members/' },
        { label: 'Gallery', icon: 'pi pi-images', url: '/gallery/' },
        {
          label: 'Latest news', icon: 'pi pi-clock',
          // command: () => {
          //   document.querySelector('#news')?.scrollIntoView({ behavior: 'smooth' });
          // },
          url: '/#news'
        },
      ],
    },
    {
      label: 'Projects',
      icon: 'pi pi-folder-open',
      items: [
        {
          label: 'Diseases',
          icon: 'pi pi-bug',
          items: [
            {
              label: 'Malaria',
              icon: 'pi pi-file',
              items: [
                {
                  label: 'Village Mapping (2017 - ongoing)',
                  icon: 'pi pi-file-o',
                  url: '/service/village-mapping/'
                },
                {
                  label: 'G6PD Testing for Malaria Treatment (2022 - ongoing)',
                  icon: 'pi pi-file-o',
                  url: '/service/g6pd-testing-for-malaria-treatment/'
                },
                {
                  label: 'Piloting Village-level Malaria Surveillance in Lama, Bandarban. (2022)',
                  icon: 'pi pi-file-o',
                  url: '/service/piloting-village-level-malaria-surveillance-in-lama-bandarban/'
                },
                {
                  label: 'Malaria API Tracker (2021)',
                  icon: 'pi pi-file-o',
                  url: '/service/malaria-api-tracker/'
                }
              ]
            },
            // covid-19
            {
              label: 'Covid-19',
              items: [
                {
                  label: 'Crisis Ready Project (CRP) (2022)',
                  url: '/service/crp-assessing-mobility-data-for-guiding-disaster-response-in-the-greater-mekong-subregion-and-bangladesh-crisis-ready/',
                },
                {
                  label: 'Mask Study (2021)',
                  url: '/service/mask-study/',
                },
                {
                  label: 'COVID-19 Risk Zoning (2020)',
                  url: '/service/covid-19/',
                },
                {
                  label: 'Physical Accessibility to COVID-19 Related Health Services Analysis - Bangladesh (2020)',
                  url: '/service/physical-accessibility-to-covid-19-related-health-services-analysis-moru/',
                },
                {
                  label: 'Real-time population mapping to assess the impact of travel restrictions and social distancing on COVID-19 spread (2020)',
                  url: '/service/real-time-population-mapping-to-assess-the-impact-of-travel-restrictions-and-social-distancing-on-covid-19-spread-2020/'
                }
              ]
            },
            //  Dengue (4-level)
            {
              label: 'Dengue',
              icon: 'pi pi-bug',
              items: [
                {
                  label: 'Aedes mosquito survey (2021 - ongoing)',
                  icon: 'pi pi-search',
                  items: [
                    {
                      label: 'Pre-monsoon Aedes Mosquito Survey',
                      icon: 'pi pi-calendar',
                      url: '/service/pre-monsoon-aedes-mosquito-survey-nmeatdcp-dghs/'
                    },
                    {
                      label: 'Post-monsoon Aedes Mosquito Survey',
                      icon: 'pi pi-calendar-times',
                      url: '/service/post-monsoon-aedes-mosquito-survey-nmeatdcp-dghs/'
                    }
                  ]
                },
                {
                  label: 'Dengue Risk Tracker (2021)',
                  icon: 'pi pi-file-o',
                  url: '/service/dengue-risk-tracker-the-recent-seven-days-dengue-situation-in-dhaka-city-corporations-nmeatdcp-dghs/'
                },
                {
                  label: 'Dengue Household Survey (2019)',
                  icon: 'pi pi-file-o',
                  url: '/service/dengue-household-survey-nmeatdcp-dghs/'
                },
                {
                  label: 'Dengue risk zoning (2019)',
                  icon: 'pi pi-file-o',
                  url: '/service/dengue-risk-zoning-nmeatdcp-dghs/'
                },
                {
                  label: 'Drone driven imageries to identify breeding space in Dhaka (2019)',
                  icon: 'pi pi-file-o',
                  url: '/service/unmanned-aerial-vehicles-uav-for-aedes-mosquito-breeding-zone-detection-nmeatdcp-dghs/'
                }
              ]
            },
            //  Rabies (4-level)
            {
              label: 'Rabies',
              icon: 'pi pi-paw',
              items: [
                {
                  label: 'Mass Dog Vaccination Program (2018 - Ongoing)',
                  icon: 'pi pi-syringe',
                  items: [
                    {
                      label: 'Project Summary',
                      icon: 'pi pi-file',
                      command: () => {
                        rabies("project-summary");
                      }
                    },
                    {
                      label: 'Animal Control Staff Training (2018 - ongoing)',
                      icon: 'pi pi-users',
                      command: () => {
                        rabies("animal-control-staff-training-2018-ongoing");
                      }
                    },
                    {
                      label: 'Digital map making and demarcation of union boundary (2020)',
                      icon: 'pi pi-users',
                      command: () => {
                        rabies("digital-map-making-and-demarcation-of-union-boundary-2020");
                      }
                    },
                    {
                      label: 'CDC Atlanta Training (2018)',
                      icon: 'pi pi-users',
                      command: () => {
                        rabies("cdc-atlanta-training-2018");
                      }
                    },
                    {
                      label: 'Four Day Introductory Training on Dog Catching & Vaccination for National Team (2021)',
                      icon: 'pi pi-users',
                      command: () => {
                        rabies("four-day-introductory-training-on-dog-catching-vaccination-for-national-team-2021");
                      }
                    }
                  ]
                }
              ]
            },
            //filariasis
            {
              label: 'Filariasis',
              items: [
                {
                  label: 'Survey for assessing the prevalence of Soil-Transmitted Helminths (STH) among school-aged children of Bangladesh (2018)',
                  url: '/service/survey-for-assessing-the-prevalence-of-soil-transmitted-helminths-sth-among-school-aged-children-of-bangladesh-2018/'
                }
              ]
            }
          ]
        },

        //  Nondiseases
        {
          label: 'Nondiseases',
          icon: 'pi pi-database',
          items: [
            {
              label: 'The Global Health Facilities Database (GHFD) (2020 - ongoing)',
              icon: 'pi pi-building',
              url: '/service/the-global-health-facilities-database-ghfd-2020-ongoing/'
            }
          ]
        }
      ]
    },

    {
      label: 'Activities',
      icon: 'pi pi-calendar',
      items: [
        // Volunteering (no submenu)
        {
          label: 'Volunteering',
          icon: 'pi pi-users',
          command: () => {
            go("volunteering");
          }
        },

        // GroupLetters (level 2)
        {
          label: 'GroupLetters',
          icon: 'pi pi-file',
          items: [
            { label: 'Issue 1', icon: 'pi pi-file-o', command: () => go('issue-1') },
            { label: 'Issue 2', icon: 'pi pi-file-o', command: () => go('issue-2') },
            { label: 'Issue 3', icon: 'pi pi-file-o', command: () => go('issue-3') }
          ]
        },

        // Training (3-level structure)
        {
          label: 'Training',
          icon: 'pi pi-graduation-cap',
          items: [
            {
              label: 'Capacity Training',  // LEVEL 2
              icon: 'pi pi-cog',
              items: [                     // LEVEL 3
                {
                  label: 'Introductory Training on Geographical Information System (GIS) (2019)',
                  icon: 'pi pi-map',
                  command: () => go('introductory-training-on-geographical-information-system-gis-2019')
                },
                {
                  label: 'Introduction to GIS for Communicable Disease Surveillance (2017)',
                  icon: 'pi pi-map-marker',
                  command: () => go('introduction-to-gis-for-communicable-disease-surveillance-2017')
                }
              ]
            }
          ]
        },
        // GIS & RS Club Cafe (no submenu)
        {
          label: 'GIS & RS Club Cafe',
          icon: 'pi pi-coffee',
          command: () => go('gis-rs-club-cafe')
        }
      ],
    },
    {
      label: 'Contact Us',
      icon: 'pi pi-envelope',
      command: () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      },
      url: "/contact-us/",
    },
    {
      label: 'Donate Us',
      icon: 'pi pi-heart',
      command: () => {
        document.querySelector('#donate')?.scrollIntoView({ behavior: 'smooth' });
      },
      url: "/fundraising/"
    }
  ];

  return (
    <>
      <header className="w-full bg-[url('/assets/images/white-paper-bg4.jpg')] bg-cover bg-bottom-left relative">
        <div className="max-w-6xl mx-auto p-4">
          {/* MOBILE LAYOUT: logo (top) → toggle (middle) → logo (bottom) */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 lg:hidden">
            {/* Left / Top logo */}
            <div className="w-full sm:w-auto max-w-56 order-1 sm:order-0">
              <img
                src="/assets/images/GRPMbd.jpg"
                className="w-full h-auto object-contain"
                alt="GroupMappers Logo"
              />
            </div>

            {/* Hamburger menu */}
            {/* <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-full bg-white/90 border border-gray-300 shadow hover:bg-white transition order-2 sm:order-0"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button> */}

            <MobileMenu items={items} />
            {/* Right / Bottom logo */}
            <div className="w-full sm:w-auto max-w-45 order-3 sm:order-0">
              <img
                src="/assets/images/Group_MORU-removebg-preview.jpg"
                className="w-full h-auto object-contain"
                alt="MORU Logo"
              />
            </div>
          </div>
          {/* desktop layout */}
          <div className="hidden lg:flex justify-between items-center lg:h-25">
            {/* Left logo */}
            <div className="absolute left-2 top-4 w-56 xl:w-64">
              <img
                src="/assets/images/GRPMbd.jpg"
                className="w-full h-auto object-contain"
                alt="GroupMappers Logo"
              />
            </div>
            {/* Center Menubar */}
            <div className=" flex-1 flex justify-center pl-40">
              <Navbar items={items} />
            </div>
            {/* Right logo */}
            <div className="w-40 xl:w-56">
              <img
                src="/assets/images/Group_MORU-removebg-preview.jpg"
                className="w-full h-auto object-contain"
                alt="MORU Logo"
              />
            </div>
          </div>
        </div>
      </header>
      {/* MOBILE MENU BELOW HEADER (BLUE BLOCK) */}
      {/* {mobileOpen && (
          <nav className="lg:hidden bg-[#131c70] text-white">
            <style jsx>{`
              .panelmenu-mobile-custom :global(.p-panelmenu-header) {
                background: #131c70 !important;
                border-bottom: 1px solid rgba(255,255,255,0.2) !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-header:hover) {
                background: #18207e !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-header > a) {
                color: white !important;
                padding: 12px 16px !important;
                font-weight: 600 !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-header-content) {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-header-title) {
                flex: 1 !important;
                text-align: left !important;
                margin-right: 24px !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-toggler) {
                margin-left: auto !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-panel) .p-panelmenu-panel ~ .p-panelmenu-panel .p-panelmenu-header {
                margin-left: 0 !important;
                padding-left: 16px !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-root-submenu) {
                background: #18207e !important;
                margin-left: 0 !important;
                padding-left: 0 !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-root-submenu > .p-panelmenu-header) {
                padding-left: 24px !important;
              }
              .panelmenu-mobile-custom :global(.p-panelmenu-root-submenu .p-menuitem-link) {
                padding: 8px 24px !important;
                color: white !important;
              }
            `}</style>
            <PanelMenu 
              model={items}
              className="panelmenu-mobile-custom w-full"
              pt={{
                root: { className: 'flex flex-col w-full' },
                panel: { className: 'm-0 p-0' },
                header: { className: 'm-0 p-0' },
                headerContent: { className: 'p-0 m-0' },
                transition: { 
                  enterFromClass: 'max-h-0', 
                  enterActiveClass: 'overflow-hidden transition-all duration-300 ease-out', 
                  leaveToClass: 'max-h-0' 
                }
              }}
              onLeafClick={(event) => {
                setMobileOpen(false);
                if (event.item.command) {
                  event.item.command();
                }
              }}
            />
          </nav>
        )} */}
    </>
  );
}