"use client";
import { X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function Preview() {
  const { showPreview, setShowPreview, form, getPreviewUrl } = useAdmin();

  if (!showPreview) return null;

  return (
    <aside className="w-[450px] border-l border-slate-300 bg-slate-100 flex flex-col z-20 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.1)] flex-shrink-0">
      <div className="p-3 border-b border-slate-300 bg-slate-200 flex items-center justify-between shadow-sm">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Live Preview
        </span>
        <button
          onClick={() => setShowPreview(false)}
          className="p-1 rounded text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 bg-white relative">
        <iframe
          src={getPreviewUrl(form.type, form.slug)}
          className="absolute inset-0 w-full h-full border-0 bg-white"
          title="Frontend Preview"
        />
      </div>
    </aside>
  );
}
