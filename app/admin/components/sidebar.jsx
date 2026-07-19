"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { contentTypes } from "../context/AdminContext";

const aboutUsTypeValues = ["team", "gallery", "news"];

export default function Sidebar() {
  const { filter, setFilter, setSelectedId, setIsCreating, setSelectedPageItem } = useAdmin();
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(aboutUsTypeValues.includes(filter));

  const aboutUsTypes = contentTypes.filter((type) => aboutUsTypeValues.includes(type.value));
  const topLevelTypes = contentTypes.filter((type) => !aboutUsTypeValues.includes(type.value));
  const isAboutUsActive = aboutUsTypeValues.includes(filter);

  function selectContentType(value) {
    setFilter(value);
    setSelectedId(null);
    setIsCreating(false);
    setSelectedPageItem(null);
  }

  return (
    <aside className="w-56 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10">
      <div className="flex-1 overflow-y-auto py-2">
        <button
          onClick={() => {
            setFilter("");
            setSelectedId(null);
            setIsCreating(false);
            setSelectedPageItem(null);
          }}
          className={`w-full text-left px-4 py-2 text-sm ${filter === "" ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
        >
          All Contents
        </button>
        {topLevelTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => selectContentType(type.value)}
            className={`w-full text-left px-4 py-2 text-sm ${filter === type.value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {type.label}
          </button>
        ))}
        <div>
          <button
            type="button"
            onClick={() => setIsAboutUsOpen((open) => !open)}
            className={`flex w-full items-center justify-between px-4 py-2 text-sm ${isAboutUsActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span>AboutUs</span>
            <ChevronDown
              size={15}
              className={`transition-transform ${isAboutUsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isAboutUsOpen && (
            <div className="py-1">
              {aboutUsTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => selectContentType(type.value)}
                  className={`w-full text-left py-2 pl-8 pr-4 text-sm ${filter === type.value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
