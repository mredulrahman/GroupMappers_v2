"use client";
import { useAdmin } from "../context/AdminContext";
import { contentTypes } from "../context/AdminContext";

export default function Sidebar() {
  const { filter, setFilter, setSelectedId, setIsCreating, setSelectedPageItem } = useAdmin();

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
        {contentTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setFilter(type.value);
              setSelectedId(null);
              setIsCreating(false);
              setSelectedPageItem(null);
            }}
            className={`w-full text-left px-4 py-2 text-sm ${filter === type.value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
