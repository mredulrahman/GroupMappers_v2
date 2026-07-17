"use client";

import React from "react";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import { Accordion, Burger, Button, Drawer, Group, Menu, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { headerItems } from "@/lib/headerMenu";

const menuStyles = {
  dropdown: {
    backgroundColor: "#212372",
    borderRadius: 0,
    padding: 0,
    border: "none",
    width: 200,
    minWidth: 200,
    lineHeight: 1.3,
  },
  item: {
    color: "#ffffff",
    fontWeight: 500,
    fontSize: "16px",
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: "#212372",
    "&:hover": {
      backgroundColor: "#212372",
    },
    "&[data-hovered]": {
      backgroundColor: "#212372",
    },
    "&[data-active]": {
      backgroundColor: "#212372",
    },
    itemSection: {
      color: "#ffffff",
    },
  },
};

const desktopButtonStyles = {
  root: {
    transition: "none",
    transform: "none",
    "&:hover": {
      backgroundColor: "rgba(19, 28, 112, 0.08)",
    },
    "&:active": {
      transform: "none",
    },
  },
};

const dropdownMotion = {
  hidden: {
    opacity: 0,
    y: -6,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.16,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.025,
    },
  },
};

const nestedDropdownMotion = {
  hidden: {
    opacity: 0,
    x: -6,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.16,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.025,
    },
  },
};

const dropdownItemMotion = {
  hidden: {
    opacity: 0,
    y: -3,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  },
};

function MotionDropdown({ children, nested = false }) {
  return (
    <Menu.Dropdown>
      <Motion.div
        initial="hidden"
        animate="visible"
        variants={nested ? nestedDropdownMotion : dropdownMotion}
        style={{ originX: nested ? 0 : 0.5, originY: 0 }}
      >
        {children}
      </Motion.div>
    </Menu.Dropdown>
  );
}

function MotionMenuRow({ children }) {
  return <Motion.div variants={dropdownItemMotion}>{children}</Motion.div>;
}

function MenuItem({ item }) {
  const navigate = useNavigate();

  function handleClick() {
    if (item.url) navigate(item.url);
  }

  if (item.items?.length) {
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
        <MotionDropdown nested>
          {item.items.map((child, index) => (
            <MotionMenuRow key={`${child.label}-${index}`}>
              <MenuItem item={child} />
            </MotionMenuRow>
          ))}
        </MotionDropdown>
      </Menu>
    );
  }

  return <Menu.Item onClick={handleClick}>{item.label}</Menu.Item>;
}

function Navbar({ items }) {
  const navigate = useNavigate();

  return (
    <Group gap={{ base: "xs", xl: "md" }} justify="center" wrap="wrap" maw="88%">
      {items.map((item, index) => {
        if (!item.items?.length) {
          return (
            <Button
              key={`${item.label}-${index}`}
              variant="subtle"
              color="#121e62"
              fw={700}
              fz={{ base: 15, md: 16 }}
              px={{ base: "sm", md: "md" }}
              styles={desktopButtonStyles}
              onClick={() => item.url && navigate(item.url)}
            >
              {item.label}
            </Button>
          );
        }

        return (
          <Menu key={`${item.label}-${index}`} trigger="hover" openDelay={100} closeDelay={200} styles={menuStyles} withinPortal>
            <Menu.Target>
              <Button
                variant="subtle"
                color="#121e62"
                fw={700}
                fz={{ base: 15, md: 16 }}
                px={{ base: "sm", md: "md" }}
                rightSection={<IconChevronDown size={14} stroke={3} />}
                styles={desktopButtonStyles}
              >
                {item.label}
              </Button>
            </Menu.Target>
            <MotionDropdown>
              {item.items.map((child, childIndex) => (
                <MotionMenuRow key={`${child.label}-${childIndex}`}>
                  <MenuItem item={child} />
                </MotionMenuRow>
              ))}
            </MotionDropdown>
          </Menu>
        );
      })}
    </Group>
  );
}

function MobileItem({ item, close }) {
  const navigate = useNavigate();
  const hasChildren = item.items?.length;

  function handleClick() {
    if (item.url) navigate(item.url);
    close();
  }

  if (!hasChildren) {
    return (
      <UnstyledButton
        onClick={handleClick}
        w="100%"
        py="sm"
        px="sm"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.2)",
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
            color: "white",
            fontSize: "14px",
            fontWeight: "400",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "#212372",
            "&:hover": {
              backgroundColor: "#212372",
            },
          },
        }}
      >
        {item.label}
      </Accordion.Control>
      <Accordion.Panel p={0}>
        {item.items.map((child, index) => (
          <MobileItem key={`${child.label}-${index}`} item={child} close={close} />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function MobileMenu({ items }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Burger opened={opened} onClick={toggle} color="black" size="md" />
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
              <MobileItem key={`${item.label}-${index}`} item={item} close={close} />
            ))}
          </Accordion>
        </ScrollArea>
      </Drawer>
    </>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-[url('/assets/images/white-paper-bg4.jpg')] bg-cover bg-bottom-left relative">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 lg:hidden">
          <div className="w-full sm:w-auto max-w-56 order-1 sm:order-0">
            <img src="/assets/images/GRPMbd.jpg" className="w-full h-auto object-contain" alt="GroupMappers Logo" />
          </div>

          <MobileMenu items={headerItems} />

          <div className="w-full sm:w-auto max-w-45 order-3 sm:order-0">
            <img src="/assets/images/Group_MORU-removebg-preview.jpg" className="w-full h-auto object-contain" alt="MORU Logo" />
          </div>
        </div>

        <div className="hidden lg:flex justify-between items-center lg:h-25">
          <div className="absolute left-2 top-4 w-56 xl:w-64">
            <img src="/assets/images/GRPMbd.jpg" className="w-full h-auto object-contain" alt="GroupMappers Logo" />
          </div>

          <div className="flex-1 flex justify-center pl-40">
            <Navbar items={headerItems} />
          </div>

          <div className="w-40 xl:w-56">
            <img src="/assets/images/Group_MORU-removebg-preview.jpg" className="w-full h-auto object-contain" alt="MORU Logo" />
          </div>
        </div>
      </div>
    </header>
  );
}
