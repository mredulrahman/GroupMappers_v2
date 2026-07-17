"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Link, Trash2, GripVertical, Pencil, X, Check, Search, MoveLeft, EllipsisVertical, Archive, Plus, Save } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import {
  activitySlugSequence,
  emptyForm,
  formContentTypes,
  getContentApiLink,
  getContentTypeConfig,
  getContentTypeLabel,
  homeSections,
  activityPageItems,
  projectPageItems,
  projectSlugSequence,
} from "../context/AdminContext";


function ImageManager({ images, onChange }) {
  const fileInputRef = useRef(null);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlBox, setShowUrlBox] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  function addByUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onChange([...images, { url: trimmed, alt: "" }]);
    setUrlInput("");
    setShowUrlBox(false);
  }
  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({ url: URL.createObjectURL(file), alt: file.name.replace(/\.[^.]+$/, "") }));
    onChange([...images, ...newImages]);
    e.target.value = "";
  }
  function deleteImage(index) { onChange(images.filter((_, i) => i !== index)); }
  function updateAlt(index, alt) { onChange(images.map((img, i) => (i === index ? { ...img, alt } : img))); }
  function startEdit(index) { setEditingIndex(index); setEditUrl(images[index].url); }
  function commitEdit(index) { onChange(images.map((img, i) => i === index ? { ...img, url: editUrl.trim() } : img)); setEditingIndex(null); }
  function onDragStart(index) { dragItem.current = index; }
  function onDragEnter(index) { dragOverItem.current = index; }
  function onDragEnd() {
    const from = dragItem.current; const to = dragOverItem.current;
    if (from === null || to === null || from === to) return;
    const next = [...images]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved);
    onChange(next); dragItem.current = null; dragOverItem.current = null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Images</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-slate-50 transition-colors">
            <Upload size={13} /> Upload
          </button>
          <button type="button" onClick={() => setShowUrlBox(!showUrlBox)} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-slate-50 transition-colors">
            <Link size={13} /> Add URL
          </button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      </div>
      {showUrlBox && (
        <div className="flex gap-2 mb-3">
          <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addByUrl())} placeholder="https://example.com/image.jpg" className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" onClick={addByUrl} className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700">Add</button>
          <button type="button" onClick={() => setShowUrlBox(false)} className="rounded border border-slate-300 px-2 py-1.5 text-xs hover:bg-slate-50"><X size={14} /></button>
        </div>
      )}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-slate-200 py-8 text-slate-400 text-sm cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
          <Upload size={24} /><span>Upload images or add a URL above</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, index) => (
          <div key={index} draggable onDragStart={() => onDragStart(index)} onDragEnter={() => onDragEnter(index)} onDragEnd={onDragEnd} onDragOver={(e) => e.preventDefault()} className="group relative rounded border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="relative h-28 bg-slate-100">
              <img src={img.url} alt={img.alt || "image"} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-start justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <span className="cursor-grab text-white" title="Drag to reorder"><GripVertical size={16} /></span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => startEdit(index)} className="rounded bg-white/80 p-1 text-slate-700 hover:bg-white" title="Edit URL"><Pencil size={13} /></button>
                  <button type="button" onClick={() => deleteImage(index)} className="rounded bg-white/80 p-1 text-red-600 hover:bg-white" title="Delete"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
            {editingIndex === index && (
              <div className="flex gap-1 border-t border-slate-200 p-1">
                <input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} className="min-w-0 flex-1 rounded border border-slate-300 px-1.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" autoFocus />
                <button type="button" onClick={() => commitEdit(index)} className="rounded bg-blue-600 p-1 text-white hover:bg-blue-700"><Check size={13} /></button>
                <button type="button" onClick={() => setEditingIndex(null)} className="rounded border border-slate-300 p-1 hover:bg-slate-50"><X size={13} /></button>
              </div>
            )}
            <div className="border-t border-slate-100 p-1.5">
              <input type="text" value={img.alt} onChange={(e) => updateAlt(index, e.target.value)} placeholder="alt text" className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function fieldClass() {
  return "rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white w-full text-sm";
}
function labelClass() { return "grid gap-1.5 text-sm font-medium text-slate-700"; }

function orderItemsBySlug(items, sequence) {
  const order = new Map(sequence.map((slug, index) => [slug, index]));
  return [...items].sort((a, b) => {
    const aIndex = order.has(a.slug) ? order.get(a.slug) : Number.MAX_SAFE_INTEGER;
    const bIndex = order.has(b.slug) ? order.get(b.slug) : Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) return aIndex - bIndex;
    return (a.title || "").localeCompare(b.title || "");
  });
}

function mergeExpectedPages(items, expectedPages) {
  return expectedPages.map((page) => {
    const existing = items.find((item) => item.slug === page.slug && item.type === page.type);
    if (existing) return existing;
    return {
      _id: `placeholder-${page.type}-${page.slug}`,
      type: page.type,
      slug: page.slug,
      title: page.title,
      status: "not created",
      summary: "CMS record has not been created yet.",
      isPlaceholder: true,
    };
  });
}

function getHomeSectionPreview(sectionData) {
  if (!sectionData) return "No saved content yet";
  if (sectionData.title) return `Title: "${sectionData.title}"`;
  if (sectionData.slider?.length) return `${sectionData.slider.length} slide(s)`;
  if (sectionData.cardContent?.length) return `${sectionData.cardContent.length} card(s)`;
  if (sectionData.accordianContent?.length) return `${sectionData.accordianContent.length} accordion item(s)`;
  if (sectionData.items?.length) return `${sectionData.items.length} item(s)`;
  if (sectionData.content) return sectionData.content;
  return "No preview";
}

function ContentCardActions({ item, openMenuId, setOpenMenuId, handleArchiveById, handleDeleteById }) {
  if (item.isPlaceholder) return null;

  return (
    <div className="absolute top-2 right-2 z-20">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item._id ? null : item._id); }}
        className="flex items-center justify-center w-7 h-7 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        title="More options"
      >
        <EllipsisVertical size={15} />
      </button>
      {openMenuId === item._id && (
        <div className="absolute right-0 top-full mt-1 w-24 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => handleArchiveById(item)} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Archive size={12} /><span className="text-xs">Archive</span></button>
          <button
            type="button"
            onClick={() => { if (window.confirm(`Delete "${item.title || item.slug || "Untitled"}"? This cannot be undone.`)) { handleDeleteById(item); } else { setOpenMenuId(null); } }}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={12} /><span className="text-xs">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

function HomeSectionCard({ section, sectionData, onSelect, openMenuId, setOpenMenuId, handleArchiveHomeSection, handleDeleteHomeSection }) {
  const hasContent = Boolean(sectionData);
  const menuId = `home-section-${section.id}`;
  const status = sectionData?.status || (hasContent ? "saved" : "empty");
  const statusClass =
    status === "archived"
      ? "bg-slate-100 text-slate-500"
      : status === "draft"
        ? "bg-amber-50 text-amber-600"
        : hasContent
          ? "bg-emerald-50 text-emerald-600"
          : "bg-slate-100 text-slate-400";

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all flex flex-col h-[140px]"
    >
      {hasContent && (
        <div className="absolute top-2 right-2 z-20">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === menuId ? null : menuId); }}
            className="flex items-center justify-center w-7 h-7 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            title="More options"
          >
            <EllipsisVertical size={15} />
          </button>
          {openMenuId === menuId && (
            <div className="absolute right-0 top-full mt-1 w-24 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => handleArchiveHomeSection(sectionData)} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"><Archive size={12} /><span className="text-xs">Archive</span></button>
              <button
                type="button"
                onClick={() => { if (window.confirm(`Delete "${sectionData.title || section.label || section.id}"? This cannot be undone.`)) { handleDeleteHomeSection(sectionData); } else { setOpenMenuId(null); } }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={12} /><span className="text-xs">Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex-1 min-h-0">
        <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-700 transition-colors pr-6">{section.label}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{getHomeSectionPreview(sectionData)}</p>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 flex-shrink-0">
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{section.id}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded ${statusClass}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className={labelClass()}>
      {label}
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={fieldClass()} />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <label className={labelClass()}>
      {label}
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={fieldClass()} />
    </label>
  );
}


function SlideListEditor({ slides = [], onChange, srcField = "src", altField = "alt1", thumbField = null }) {
  function update(idx, key, val) {
    const next = slides.map((s, i) => i === idx ? { ...s, [key]: val } : s);
    onChange(next);
  }
  function add() {
    const newItem = { [srcField]: "", [altField]: "" };
    if (thumbField) newItem[thumbField] = "";
    onChange([...slides, newItem]);
  }
  function remove(idx) { onChange(slides.filter((_, i) => i !== idx)); }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Slides ({slides.length})</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors">
          <Plus size={13} /> Add Slide
        </button>
      </div>
      {slides.map((slide, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-3 rounded border border-slate-200 bg-slate-50 relative">
          <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"><X size={14} /></button>
          <div className="flex gap-2 items-center">
            {slide[srcField] && <img src={slide[srcField]} alt="" className="w-16 h-10 object-cover rounded border" onError={(e) => { e.target.style.display = 'none'; }} />}
          </div>
          <input value={slide[srcField] || ""} onChange={(e) => update(idx, srcField, e.target.value)} placeholder="Image path e.g. /assets/images/photo.jpg" className={fieldClass()} />
          {thumbField && <input value={slide[thumbField] || ""} onChange={(e) => update(idx, thumbField, e.target.value)} placeholder="Thumbnail text e.g. thumb-1" className={fieldClass()} />}
          <input value={slide[altField] || ""} onChange={(e) => update(idx, altField, e.target.value)} placeholder="Alt text" className={fieldClass()} />
        </div>
      ))}
    </div>
  );
}


function AccordionEditor({ items = [], onChange }) {
  function update(idx, key, val) { onChange(items.map((item, i) => i === idx ? { ...item, [key]: val } : item)); }
  function add() { onChange([...items, { key: Date.now(), title: "", contents: "" }]); }
  function remove(idx) { onChange(items.filter((_, i) => i !== idx)); }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Accordion Items ({items.length})</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors"><Plus size={13} /> Add Item</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-3 rounded border border-slate-200 bg-slate-50 relative">
          <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14} /></button>
          <input value={item.title || ""} onChange={(e) => update(idx, "title", e.target.value)} placeholder="Accordion title" className={fieldClass()} />
          <textarea value={item.contents || ""} onChange={(e) => update(idx, "contents", e.target.value)} rows={3} placeholder="Accordion body" className={fieldClass()} />
        </div>
      ))}
    </div>
  );
}

function FounderCardEditor({ cards = [], onChange }) {
  function update(idx, key, val) { onChange(cards.map((c, i) => i === idx ? { ...c, [key]: val } : c)); }
  function add() { onChange([...cards, { image: "", name: "", designation: "", details: "", "link-1": "", "link-2": "", "link-3": "" }]); }
  function remove(idx) { onChange(cards.filter((_, i) => i !== idx)); }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Founder Cards ({cards.length})</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors"><Plus size={13} /> Add Founder</button>
      </div>
      {cards.map((card, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-4 rounded border border-slate-200 bg-slate-50 relative">
          <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14} /></button>
          <div className="flex gap-3 items-center">
            {card.image && <img src={card.image} alt={card.name} className="w-14 h-14 object-cover rounded-full border" onError={(e) => { e.target.style.display = 'none'; }} />}
          </div>
          <input value={card.image || ""} onChange={(e) => update(idx, "image", e.target.value)} placeholder="Image path e.g. /assets/images/person.webp" className={fieldClass()} />
          <div className="grid grid-cols-2 gap-2">
            <input value={card.name || ""} onChange={(e) => update(idx, "name", e.target.value)} placeholder="Name" className={fieldClass()} />
            <input value={card.designation || ""} onChange={(e) => update(idx, "designation", e.target.value)} placeholder="Designation" className={fieldClass()} />
          </div>
          <textarea value={card.details || ""} onChange={(e) => update(idx, "details", e.target.value)} rows={2} placeholder="Details / bio" className={fieldClass()} />
          <input value={card["link-1"] || ""} onChange={(e) => update(idx, "link-1", e.target.value)} placeholder="Link 1 (website)" className={fieldClass()} />
          <input value={card["link-2"] || ""} onChange={(e) => update(idx, "link-2", e.target.value)} placeholder="Link 2 (twitter/X)" className={fieldClass()} />
          <input value={card["link-3"] || ""} onChange={(e) => update(idx, "link-3", e.target.value)} placeholder="Link 3 (linkedin)" className={fieldClass()} />
        </div>
      ))}
    </div>
  );
}

function NewsCardEditor({ cards = [], onChange }) {
  function update(idx, key, val) { onChange(cards.map((c, i) => i === idx ? { ...c, [key]: val } : c)); }
  function add() { onChange([...cards, { id: Date.now(), title: "", date: "", image: "", slug: "" }]); }
  function remove(idx) { onChange(cards.filter((_, i) => i !== idx)); }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">News Cards ({cards.length})</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors"><Plus size={13} /> Add News</button>
      </div>
      {cards.map((card, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-3 rounded border border-slate-200 bg-slate-50 relative">
          <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14} /></button>
          <div className="flex gap-2 items-center">
            {card.image && <img src={card.image} alt={card.title} className="w-16 h-10 object-cover rounded border" onError={(e) => { e.target.style.display = 'none'; }} />}
          </div>
          <input value={card.title || ""} onChange={(e) => update(idx, "title", e.target.value)} placeholder="News headline" className={fieldClass()} />
          <div className="grid grid-cols-2 gap-2">
            <input value={card.date || ""} onChange={(e) => update(idx, "date", e.target.value)} placeholder="Date e.g. July 25, 2023" className={fieldClass()} />
            <input value={card.image || ""} onChange={(e) => update(idx, "image", e.target.value)} placeholder="Image path" className={fieldClass()} />
          </div>
          <input value={card.slug || ""} onChange={(e) => update(idx, "slug", e.target.value)} placeholder="Slug e.g. /news/my-article/" className={fieldClass()} />
        </div>
      ))}
    </div>
  );
}


function NumberItemsEditor({ items = [], onChange }) {
  function update(idx, key, val) { onChange(items.map((item, i) => i === idx ? { ...item, [key]: val } : item)); }
  function add() { onChange([...items, { key: `stat-${Date.now()}`, value: "", label: "", icon: "" }]); }
  function remove(idx) { onChange(items.filter((_, i) => i !== idx)); }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Stat Items ({items.length})</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors"><Plus size={13} /> Add Stat</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center p-3 rounded border border-slate-200 bg-slate-50 relative">
          <input value={item.value || ""} onChange={(e) => update(idx, "value", e.target.value)} placeholder="Value e.g. 50+" className={`${fieldClass()} w-28 flex-shrink-0`} />
          <input value={item.label || ""} onChange={(e) => update(idx, "label", e.target.value)} placeholder="Label e.g. Active Volunteers" className={fieldClass()} />
          <input value={item.icon || ""} onChange={(e) => update(idx, "icon", e.target.value)} placeholder="Icon code" className={`${fieldClass()} w-32 flex-shrink-0`} />
          <button type="button" onClick={() => remove(idx)} className="text-slate-300 hover:text-red-500 flex-shrink-0"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}

function HomeSectionEditor({ sectionId, homeSectionData, saveHomeSection, isSavingSection, sectionMessage }) {
  const raw = homeSectionData[sectionId] || {};

  const [title, setTitle] = useState(raw.title || "");
  const [content, setContent] = useState(raw.content || "");
  const [url, setUrl] = useState(raw.url || "");
  const [image, setImage] = useState(raw.image || "");
  const [text, setText] = useState(raw.text || "");
  const [btnLink, setBtnLink] = useState(raw.btnLink || "");
  const [slider, setSlider] = useState(raw.slider || []);
  const [accordianContent, setAccordianContent] = useState(raw.accordianContent || []);
  const [cardContent, setCardContent] = useState(raw.cardContent || []);
  const [items, setItems] = useState(raw.items || []);

  useEffect(() => {
    const d = homeSectionData[sectionId] || {};
    setTitle(d.title || "");
    setContent(d.content || "");
    setUrl(d.url || "");
    setImage(d.image || "");
    setText(d.text || "");
    setBtnLink(d.btnLink || "");
    setSlider(d.slider || []);
    setAccordianContent(d.accordianContent || []);
    setCardContent(d.cardContent || []);
    setItems(d.items || []);
  }, [sectionId, homeSectionData]);

  function buildPayload() {
    const payload = { key: sectionId };

    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;
    if (url !== undefined) payload.url = url;
    if (image !== undefined) payload.image = image;
    if (text !== undefined) payload.text = text;
    if (btnLink !== undefined) payload.btnLink = btnLink;
    payload.slider = slider;
    payload.accordianContent = accordianContent;
    payload.cardContent = cardContent;
    payload.items = items;
    return payload;
  }

  function handleSave(e) {
    e.preventDefault();
    saveHomeSection(buildPayload());
  }

  const sectionLabel = homeSections.find((s) => s.id === sectionId)?.label || sectionId;

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 p-6 max-w-3xl mx-auto w-full pb-12">

      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3 border-b border-slate-200 shadow-sm -mx-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">{sectionLabel}</span>
          {sectionMessage && <span className={`text-xs font-medium ${sectionMessage === "Saved." ? "text-green-600" : "text-red-500"}`}>{sectionMessage}</span>}
        </div>
        <button
          type="submit"
          disabled={isSavingSection}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm"
        >
          <Save size={15} />
          {isSavingSection ? "Saving…" : "Save Changes"}
        </button>
      </div>


      {sectionId === "hero" && (
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-4 text-sm">Hero Slider Images</h3>
          <SlideListEditor slides={slider} onChange={setSlider} srcField="src" altField="alt1" thumbField="thumb" />
        </div>
      )}


      {sectionId === "who-we-are" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
            <Field label="Section Title" value={title} onChange={setTitle} />
            <TextArea label="Content" value={content} onChange={setContent} rows={5} />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-700 mb-4 text-sm">Slider Images</h3>
            <SlideListEditor slides={slider} onChange={setSlider} srcField="src" altField="alt" />
          </div>
        </>
      )}


      {sectionId === "mission" && (
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
          <Field label="Section Title" value={title} onChange={setTitle} />
          <TextArea label="Quote / Content" value={content} onChange={setContent} rows={3} />
          <Field label="YouTube Embed URL" value={url} onChange={setUrl} placeholder="https://www.youtube.com/embed/..." />
          {url && (
            <div className="aspect-video w-full max-w-md border rounded overflow-hidden">
              <iframe src={url} className="w-full h-full" title="preview" allowFullScreen />
            </div>
          )}
        </div>
      )}


      {sectionId === "what-we-do" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
            <Field label="Section Title" value={title} onChange={setTitle} />
            <TextArea label="Intro Content" value={content} onChange={setContent} rows={4} />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <AccordionEditor items={accordianContent} onChange={setAccordianContent} />
          </div>
        </>
      )}


      {sectionId === "volunteerism-and-support" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
            <Field label="Section Title" value={title} onChange={setTitle} />
            <TextArea label="Content" value={content} onChange={setContent} rows={5} />
          </div>
        </>
      )}


      {sectionId === "founders" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <Field label="Section Title" value={title} onChange={setTitle} />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <FounderCardEditor cards={cardContent} onChange={setCardContent} />
          </div>
        </>
      )}


      {sectionId === "latest-news" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <Field label="Section Title" value={title} onChange={setTitle} />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <NewsCardEditor cards={cardContent} onChange={setCardContent} />
          </div>
        </>
      )}


      {sectionId === "join-our-effort" && (
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
          <Field label="Section Title" value={title} onChange={setTitle} />
          <TextArea label="Content" value={content} onChange={setContent} rows={5} />
          <Field label="Image Path" value={image} onChange={setImage} placeholder="/assets/images/..." />
          {image && <img src={image} alt="preview" className="w-40 h-24 object-cover rounded border" onError={(e) => { e.target.style.display = 'none'; }} />}
          <Field label="Sub-heading Text" value={text} onChange={setText} placeholder="Help us make an impact" />
          <Field label="Button Link (Donate URL)" value={btnLink} onChange={setBtnLink} placeholder="https://..." />
        </div>
      )}

      {sectionId === "by-the-number" && (
        <>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <Field label="Section Title" value={title} onChange={setTitle} />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <NumberItemsEditor items={items} onChange={setItems} />
          </div>
        </>
      )}

    </form>
  );
}


export default function MainPanel() {
  const {
    items, filter, setFilter,
    selectedId, setSelectedId,
    form, setForm,
    message, isSaving,
    showPreview, setShowPreview,
    isCreating, setIsCreating,
    search, setSearch,
    openMenuId, setOpenMenuId,
    selectedPageItem, setSelectedPageItem,
    sections,
    selectedSection, setSelectedSection,
    homeSectionData,
    isSavingSection, sectionMessage, setSectionMessage,
    handleStatusColor, timeAgo,
    handleSubmit, handleDeleteById, handleArchiveById, handleSeed, selectItem, loadItems,
    updateContactStatus, deleteContactById,
    loadHomeSections, saveHomeSection, handleArchiveHomeSection, handleDeleteHomeSection,
  } = useAdmin();


  useEffect(() => {
    if (filter === "home" || selectedPageItem?.label === "Home Page") {
      loadHomeSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, selectedPageItem]);

  const filteredItems = items.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.title?.toLowerCase().includes(keyword) ||
      item.slug?.toLowerCase().includes(keyword) ||
      item.type?.toLowerCase().includes(keyword) ||
      item.status?.toLowerCase().includes(keyword) ||
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.subject?.toLowerCase().includes(keyword) ||
      item.message?.toLowerCase().includes(keyword)
    );
  });

  const visibleItems =
    filter === "projects"
      ? mergeExpectedPages(filteredItems, projectPageItems)
      : filter === "activities"
        ? mergeExpectedPages(filteredItems, activityPageItems)
        : filteredItems;

  const orderedItems =
    filter === "projects"
      ? orderItemsBySlug(visibleItems, projectSlugSequence)
      : filter === "activities"
        ? orderItemsBySlug(visibleItems, activitySlugSequence)
        : visibleItems;

  const filteredHomeSections = sections.filter((section) => {
    if (filter !== "home") return true;
    const keyword = search.toLowerCase();
    const sectionData = homeSectionData[section.id];
    return (
      section.label.toLowerCase().includes(keyword) ||
      section.id.toLowerCase().includes(keyword) ||
      section.description?.toLowerCase().includes(keyword) ||
      sectionData?.title?.toLowerCase().includes(keyword) ||
      sectionData?.content?.toLowerCase().includes(keyword)
    );
  });

  const filterConfig = getContentTypeConfig(filter);
  const filterLabel = getContentTypeLabel(filter);
  const createType = filterConfig?.createType || filter || "page";
  const isContactInbox = Boolean(filterConfig?.contactSource);
  const homePageItem = { slug: "", label: "Home Page", description: "home page" };

  const isEditingHomeSection = selectedPageItem?.label === "Home Page" && selectedSection && isCreating;

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative">

      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0 z-10 min-h-[56px]">
        <div className="flex items-center gap-2 text-sm">
          {(filter || selectedId || isCreating || selectedPageItem) && (
            <button
              onClick={() => {
                if (isEditingHomeSection) {
                  setSelectedSection(null);
                  setIsCreating(false);
                  setSectionMessage("");
                } else if (selectedId || isCreating) {
                  setSelectedId(null);
                  setIsCreating(false);
                } else if (selectedPageItem) {
                  setSelectedPageItem(null);
                  setSelectedSection(null);
                } else {
                  setFilter("");
                  setSelectedId(null);
                  setIsCreating(false);
                }
              }}
              className="flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors mr-1"
              title="Go back"
            >
              <MoveLeft size={16} />
            </button>
          )}
          <button
            onClick={() => {
              setFilter("");
              setSelectedId(null);
              setIsCreating(false);
              setSelectedPageItem(null);
              setSelectedSection(null);
            }}
            className="text-slate-500 hover:text-blue-600 font-medium transition-colors"
          >
            Content
          </button>
          {filter && (
            <>
              <span className="text-slate-400">/</span>
              <button
                onClick={() => {
                  setSelectedId(null);
                  setIsCreating(false);
                  setSelectedPageItem(null);
                }}
                className={`transition-colors ${selectedId || isCreating || selectedPageItem ? "text-slate-500 hover:text-blue-600 font-medium" : "text-slate-900 font-semibold"}`}
              >
                {filterLabel}
              </button>
            </>
          )}
          {selectedPageItem && !selectedId && !isCreating && !selectedSection && (
            <>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-900">{selectedPageItem.label}</span>
            </>
          )}
          {selectedPageItem && selectedSection && !selectedId && (
            <>
              <span className="text-slate-400">/</span>
              <button
                onClick={() => { setSelectedSection(null); setIsCreating(false); setSectionMessage(""); }}
                className={`transition-colors ${isCreating ? "text-slate-500 hover:text-blue-600 font-medium" : "text-slate-900 font-semibold"}`}
              >
                {selectedPageItem.label}
              </button>
              {isCreating && (
                <>
                  <span className="text-slate-400">/</span>
                  <span className="font-semibold text-slate-900">{selectedSection.label}</span>
                </>
              )}
            </>
          )}
          {selectedId && !isCreating && (
            <>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-900 truncate max-w-[300px]">{form.title || "Untitled"}</span>
            </>
          )}
          {isCreating && !selectedSection && (
            <>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-900 truncate max-w-[300px]">New {getContentTypeLabel(form.type)}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isContactInbox && (
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${showPreview ? "bg-slate-200 text-slate-800" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"}`}
            >
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
          )}
        </div>
      </div>


      <div className="flex-1 overflow-y-auto">

        {isEditingHomeSection ? (
          <HomeSectionEditor
            sectionId={selectedSection.id}
            homeSectionData={homeSectionData}
            saveHomeSection={saveHomeSection}
            isSavingSection={isSavingSection}
            sectionMessage={sectionMessage}
          />
        ) : !selectedId && !isCreating && selectedPageItem ? (

          <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  {selectedPageItem.label} — Sections
                </h2>
                {/* <p className="text-sm text-slate-500 mt-1">Click a section to edit its content. Changes are saved to the database and reflected live on the home page.</p> */}
              </div>
              <button
                type="button"
                onClick={loadHomeSections}
                className="rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                Refresh
              </button>
            </div>

            <div className={`grid grid-cols-1 gap-4 ${showPreview ? "xl:grid-cols-3 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {openMenuId && <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />}
              {sections.map((section) => (
                <HomeSectionCard
                  key={section.id}
                  section={section}
                  sectionData={homeSectionData[section.id]}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  handleArchiveHomeSection={handleArchiveHomeSection}
                  handleDeleteHomeSection={handleDeleteHomeSection}
                  onSelect={() => {
                    setSelectedSection(section);
                    setIsCreating(true);
                    setSectionMessage("");
                  }}
                />
              ))}
            </div>
          </div>
        ) : !selectedId && !isCreating ? (

          <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                {isContactInbox ? `${filterLabel} Messages` : filter === "home" ? "Home Sections" : filter ? `${filterLabel} Items` : "All Content"}
              </h2>
              <div className="flex gap-2">
                {!isContactInbox && filter !== "home" && <button onClick={handleSeed} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm" type="button">Import JSON</button>}
                <button onClick={() => filter === "home" ? loadHomeSections() : loadItems()} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm" type="button">Refresh</button>
                {!isContactInbox && filter !== "home" && (
                  <button
                    onClick={() => { setSelectedId(null); setIsCreating(true); setForm({ ...emptyForm, type: createType }); }}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                    type="button"
                  >
                    + New {filter ? filterLabel : "content"}
                  </button>
                )}
              </div>
            </div>
            <div className="relative group w-[300px] sm:max-w-md transition-all ml-auto mt-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-10">
                <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items..."
                className="block w-full rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm py-1 pl-12 pr-5 text-sm text-slate-800 shadow-sm transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 hover:border-slate-300 hover:bg-white hover:shadow"
              />
            </div>
            {isContactInbox ? (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                {orderedItems.length === 0 ? (
                  <div className="p-12 text-center">
                    <h3 className="text-lg font-medium text-slate-900">No messages found</h3>
                    <p className="text-slate-500 mt-1">Submissions from this form will appear here.</p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-5 py-3 font-semibold text-slate-600">Sender</th>
                        <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Subject</th>
                        <th className="text-left px-5 py-3 font-semibold text-slate-600">Message</th>
                        <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Received</th>
                        <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderedItems.map((item) => (
                        <tr key={item._id} className="border-b border-slate-100 last:border-0 align-top">
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-800">{item.name || "Unknown"}</div>
                            <a href={`mailto:${item.email}`} className="text-xs text-blue-600 hover:underline">{item.email}</a>
                          </td>
                          <td className="px-5 py-4 text-slate-700 hidden md:table-cell">{item.subject || "No subject"}</td>
                          <td className="px-5 py-4 text-slate-600 max-w-md">
                            <p className="line-clamp-3">{item.message}</p>
                          </td>
                          <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">{item.createdAt ? timeAgo(item.createdAt) : "—"}</td>
                          <td className="px-5 py-4">
                            <select
                              value={item.status || "new"}
                              onChange={(event) => updateContactStatus(item._id, event.target.value)}
                              className="rounded border border-slate-300 bg-white px-2 py-1 text-xs capitalize outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              style={{ color: handleStatusColor(item.status || "new") }}
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete message from "${item.name || item.email || "this sender"}"? This cannot be undone.`)) {
                                  deleteContactById(item._id);
                                }
                              }}
                              className="inline-flex items-center justify-center rounded border border-red-200 p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete message"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : filter === "home" ? (
              <div className={`grid grid-cols-1 gap-4 ${showPreview ? "xl:grid-cols-3 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                {openMenuId && <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />}
                {filteredHomeSections.map((section) => {
                  const sectionData = homeSectionData[section.id];
                  return (
                    <HomeSectionCard
                      key={section.id}
                      section={section}
                      sectionData={sectionData}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                      handleArchiveHomeSection={handleArchiveHomeSection}
                      handleDeleteHomeSection={handleDeleteHomeSection}
                      onSelect={() => {
                        setSelectedPageItem(homePageItem);
                        setSelectedSection(section);
                        setIsCreating(true);
                        setSectionMessage("");
                      }}
                    />
                  );
                })}
                {filteredHomeSections.length === 0 && (
                  <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 bg-white rounded-lg border border-slate-200 p-12 text-center shadow-sm">
                    <h3 className="text-lg font-medium text-slate-900">No sections found</h3>
                    <p className="text-slate-500 mt-1">Try a different search term.</p>
                  </div>
                )}
              </div>
            ) : orderedItems.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-sm">
                <div className="text-slate-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900">No items found</h3>
                <p className="text-slate-500 mt-1">Get started by creating a new item or importing existing data.</p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 gap-4 ${showPreview ? "xl:grid-cols-3 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                {openMenuId && <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />}
                {orderedItems.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      if (item.isPlaceholder) {
                        setSelectedId(null);
                        setIsCreating(true);
                        setForm({ ...emptyForm, type: item.type, slug: item.slug, title: item.title });
                      } else {
                        selectItem(item);
                      }
                    }}
                    className="group relative bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all flex flex-col h-[140px]"
                  >
                    <ContentCardActions
                      item={item}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                      handleArchiveById={handleArchiveById}
                      handleDeleteById={handleDeleteById}
                    />
                    <div className="flex-1 min-h-0">
                      <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-700 transition-colors pr-6">{item.title || "Untitled"}</h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.summary || item.slug || "No summary provided."}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 flex-shrink-0">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{getContentTypeLabel(item.type)}</span>
                      {item.isPlaceholder ? (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-400">not created</span>
                      ) : (
                        <span className="text-xs font-medium px-2 py-1 rounded capitalize" style={{ color: handleStatusColor(item.status), backgroundColor: `${handleStatusColor(item.status)}15` }}>{item.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-max">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3 border-b border-slate-200 shadow-sm flex-shrink-0">
              <div className="flex items-center gap-4">
                {form.updatedAt && <span className="text-xs text-slate-500 hidden sm:inline-block">Updated {timeAgo(form.updatedAt)}</span>}
                {message && <span className="text-sm font-medium text-blue-600">{message}</span>}
              </div>
              <div className="flex items-center gap-3">
                <button disabled={isSaving} onClick={(e) => handleSubmit(e, "archived")} className="rounded border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition-colors shadow-sm" type="button">Archive</button>
                <button disabled={isSaving} onClick={(e) => handleSubmit(e, "draft")} className="rounded border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-60 transition-colors shadow-sm" type="button">Save as Draft</button>
                <button disabled={isSaving} onClick={(e) => handleSubmit(e, "published")} className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm" type="button">Publish Changes</button>
              </div>
            </div>

            <div className="p-6 max-w-3xl mx-auto w-full flex flex-col gap-6 pb-12">
              <div className={`grid gap-4 ${showPreview ? "xl:grid-cols-2" : "md:grid-cols-2"}`}>
                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Type
                  <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                    {formContentTypes.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Slug
                  <input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white" placeholder="example-page" />
                </label>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">API link: </span>
                <code className="break-all text-xs text-blue-700">{getContentApiLink(form.type, form.slug)}</code>
              </div>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                Title
                <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-lg bg-white" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                Summary
                <textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} className="min-h-[80px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                Body
                <textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Markdown or HTML content..." className="min-h-[400px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white" />
              </label>
              <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <ImageManager images={form.images} onChange={(images) => setForm({ ...form, images })} />
              </div>
              <div className={`rounded-md border border-slate-200 bg-white p-4 shadow-sm grid gap-4 ${showPreview ? "xl:grid-cols-2" : "md:grid-cols-2"}`}>
                <div className="col-span-full"><h3 className="font-semibold text-slate-800 text-sm">SEO Metadata</h3></div>
                <label className="grid gap-1.5 text-sm font-medium text-slate-700">SEO Title<input value={form.seoTitle} onChange={(event) => setForm({ ...form, seoTitle: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" /></label>
                <label className="grid gap-1.5 text-sm font-medium text-slate-700">SEO Description<input value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" /></label>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
