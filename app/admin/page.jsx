"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload, Link, Trash2, GripVertical, Pencil, X, Check, ChevronsUpDown
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const contentTypes = [
  "page",
  "profiles",
  "bytheNumbers",
  "news",
  "project",
  "activity",
  "teamMember",
  "galleryItem",
  "rabiesPage",
  "navigation",
  "siteSetting"
];

const emptyForm = {
  type: "page",
  slug: "",
  title: "",
  status: "draft",
  summary: "",
  body: "",
  images: [],          // [{ url: string, alt: string }]
  seoTitle: "",
  seoDescription: "",
};

function formFromItem(item) {
  // Support both legacy string[] and new object[] formats
  const images = Array.isArray(item.images)
    ? item.images.map((img) =>
      typeof img === "string" ? { url: img, alt: "" } : img
    )
    : [];
  return {
    type: item.type || "page",
    slug: item.slug || "",
    title: item.title || "",
    status: item.status || "draft",
    updatedAt: item.updatedAt,
    summary: item.summary || "",
    body: item.body || "",
    images,
    seoTitle: item.seo?.title || "",
    seoDescription: item.seo?.description || "",
  };
}

function payloadFromForm(form) {
  return {
    type: form.type,
    slug: form.slug,
    title: form.title,
    status: form.status,
    summary: form.summary,
    body: form.body,
    // Store as plain url strings for DB compatibility with existing schema
    images: form.images.map((img) => img.url).filter(Boolean),
    // Store rich metadata in blocks so alt text is preserved
    blocks: form.images.map((img) => ({ type: "image", url: img.url, alt: img.alt })),
    seo: {
      title: form.seoTitle,
      description: form.seoDescription,
    },
  };
}

// ─── ImageManager Component ────────────────────────────────────────────────
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
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, ""),
    }));
    onChange([...images, ...newImages]);
    e.target.value = "";
  }

  function deleteImage(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  function updateAlt(index, alt) {
    const next = images.map((img, i) => (i === index ? { ...img, alt } : img));
    onChange(next);
  }

  function startEdit(index) {
    setEditingIndex(index);
    setEditUrl(images[index].url);
  }

  function commitEdit(index) {
    const next = images.map((img, i) =>
      i === index ? { ...img, url: editUrl.trim() } : img
    );
    onChange(next);
    setEditingIndex(null);
  }

  function onDragStart(index) {
    dragItem.current = index;
  }

  function onDragEnter(index) {
    dragOverItem.current = index;
  }

  function onDragEnd() {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Images</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-slate-50 transition-colors"
          >
            <Upload size={13} /> Upload
          </button>
          <button
            type="button"
            onClick={() => setShowUrlBox(!showUrlBox)}
            className="flex items-center gap-1 text-xs rounded border border-slate-300 px-2 py-1 hover:bg-slate-50 transition-colors"
          >
            <Link size={13} /> Add URL
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {showUrlBox && (
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addByUrl())}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addByUrl}
            className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowUrlBox(false)}
            className="rounded border border-slate-300 px-2 py-1.5 text-xs hover:bg-slate-50"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {images.length === 0 && (
        <div
          className="flex flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-slate-200 py-8 text-slate-400 text-sm cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={24} />
          <span>Upload images or add a URL above</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="group relative rounded border border-slate-200 bg-white overflow-hidden shadow-sm"
          >
            {/* Thumbnail */}
            <div className="relative h-28 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || "image"}
                className="h-full w-full object-cover"
              />
              {/* Toolbar overlay */}
              <div className="absolute inset-0 flex items-start justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <span
                  className="cursor-grab text-white"
                  title="Drag to reorder"
                >
                  <GripVertical size={16} />
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(index)}
                    className="rounded bg-white/80 p-1 text-slate-700 hover:bg-white"
                    title="Edit URL"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteImage(index)}
                    className="rounded bg-white/80 p-1 text-red-600 hover:bg-white"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Edit URL inline */}
            {editingIndex === index && (
              <div className="flex gap-1 border-t border-slate-200 p-1">
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="min-w-0 flex-1 rounded border border-slate-300 px-1.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => commitEdit(index)}
                  className="rounded bg-blue-600 p-1 text-white hover:bg-blue-700"
                >
                  <Check size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  className="rounded border border-slate-300 p-1 hover:bg-slate-50"
                >
                  <X size={13} />
                </button>
              </div>
            )}

            {/* Alt text fields */}
            <div className="border-t border-slate-100 p-1.5">
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateAlt(index, e.target.value)}
                placeholder={`alt text`}
                className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const getPreviewUrl = (type, slug) => {
    if (!slug) return "/";
    switch (type) {
      case "page": return `/${slug}`;
      case "news": return `/news/${slug}`;
      case "project": return `/projects/${slug}`;
      case "activity": return `/activities/${slug}`;
      case "teamMember": return `/team`;
      case "galleryItem": return `/gallery`;
      default: return `/${slug}`;
    }
  };


  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleStatusColor = (status) => {
    switch (status) {
      case 'draft': return '#f59e0b';
      case 'published': return '#10b981';
      case 'archived': return '#6b7280';
      default: return '';
    }
  }

  const handleStatusToast = (status) => {
    switch (status) {
      case "draft":
        toast.info("Status changed to Draft");
        break;

      case "published":
        toast.success("Content published successfully");
        break;

      case "archived":
        toast.warning("Content moved to archive");
        break;

      default:
        break;
    }
  };

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (const key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value >= 1) {
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  async function loadItems() {
    try {
      let allItems = [];
      if (filter === "teamMember") {
        const res = await fetch("/api/team-members");
        const data = await res.json();
        if (res.ok) allItems = data.items || [];
        else throw new Error(data.error || data.message || "Failed to load team members");
      } else if (filter) {
        const res = await fetch(`/api/admin/content?type=${encodeURIComponent(filter)}`);
        const data = await res.json();
        if (res.ok) allItems = data.items || [];
        else throw new Error(data.error || data.message || "Failed to load content");
      } else {
        const [contentRes, teamRes] = await Promise.all([
          fetch("/api/admin/content"),
          fetch("/api/team-members")
        ]);
        const contentData = await contentRes.json();
        const teamData = await teamRes.json();
        if (contentRes.ok) allItems.push(...(contentData.items || []));
        if (teamRes.ok) allItems.push(...(teamData.items || []));
      }
      setItems(allItems);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const isTeamMember = form.type === "teamMember";
    const baseUrl = isTeamMember ? "/api/team-members" : "/api/admin/content";
    const url = selectedId ? `${baseUrl}/${selectedId}` : baseUrl;
    const method = selectedId ? (isTeamMember ? "PUT" : "PATCH") : "POST";

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payloadFromForm(form)),
    });

    const data = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.error || data.message || "Save failed.");
      return;
    }

    setSelectedId(data.item._id);
    setIsCreating(false);
    setForm(formFromItem(data.item));
    setMessage("Saved.");
    await loadItems();
  }

  async function handleDelete() {
    if (!selectedId) return;

    const isTeamMember = form.type === "teamMember";
    const url = isTeamMember ? `/api/team-members/${selectedId}` : `/api/admin/content/${selectedId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || data.message || "Delete failed.");
      return;
    }

    setSelectedId(null);
    setIsCreating(false);
    setForm(emptyForm);
    setMessage("Deleted.");
    await loadItems();
  }

  async function handleSeed() {
    setMessage("");
    const response = await fetch("/api/admin/seed", {
      method: "POST",
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Import failed.");
      return;
    }

    setMessage(`Imported ${data.imported} records.`);
    await loadItems();
  }

  function selectItem(item) {
    setSelectedId(item._id);
    setIsCreating(false);
    setForm(formFromItem(item));
    setMessage("");
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <main className="h-screen bg-slate-50 text-slate-950 flex flex-col overflow-hidden">
        <section className="border-b border-slate-200 bg-white flex-shrink-0 z-20">
          <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                GroupMappers CMS
              </p>
              <h1 className="text-2xl font-bold">Content Admin</h1>
            </div>

            <div className="relative group">
              <button className="rounded-full overflow-hidden transition-all">
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#000000" /></svg>
              </button>

              <div className="absolute right-0 top-full w-48 pt-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
                <div className="bg-white border border-slate-200 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-400"
                    onClick={() => {
                      router.push("/admin/settings");
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-400"
                    onClick={() => router.push("/admin/cms-login")}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex-1 overflow-hidden flex">
          {/* PANE 1: Content Types */}
          <aside className="w-56 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10">
            <div className="p-4 border-b border-slate-200 font-semibold text-slate-800">
              Content Types
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <button
                onClick={() => { setFilter(""); setSelectedId(null); setIsCreating(false); }}
                className={`w-full text-left px-4 py-2 text-sm ${filter === "" ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
              >
                All types
              </button>
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setFilter(type); setSelectedId(null); setIsCreating(false); }}
                  className={`w-full text-left px-4 py-2 text-sm capitalize ${filter === type ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </aside>

          {/* PANE 2: Middle Area */}
          <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative">

            {/* Breadcrumb Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0 z-10 min-h-[56px]">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => { setFilter(""); setSelectedId(null); setIsCreating(false); }}
                  className="text-slate-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Content
                </button>
                {filter && (
                  <>
                    <span className="text-slate-400">/</span>
                    <button
                      onClick={() => { setSelectedId(null); setIsCreating(false); }}
                      className={`capitalize transition-colors ${selectedId || isCreating ? "text-slate-500 hover:text-blue-600 font-medium" : "text-slate-900 font-semibold"}`}
                    >
                      {filter}
                    </button>
                  </>
                )}
                {selectedId && !isCreating && (
                  <>
                    <span className="text-slate-400">/</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[300px]">
                      {form.title || "Untitled"}
                    </span>
                  </>
                )}
                {isCreating && (
                  <>
                    <span className="text-slate-400">/</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[300px]">
                      New {form.type}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${showPreview ? "bg-slate-200 text-slate-800" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                >
                  {showPreview ? "Hide Preview" : "Preview"}
                </button>
              </div>
            </div>

            {/* Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
              {!selectedId && !isCreating ? (
                /* --- LIST VIEW --- */
                <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-slate-800 capitalize">
                      {filter ? `${filter} Items` : "All Content"}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSeed}
                        className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                        type="button"
                      >
                        Import JSON
                      </button>
                      <button
                        onClick={() => loadItems()}
                        className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                        type="button"
                      >
                        Reload
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(null);
                          setIsCreating(true);
                          setForm({ ...emptyForm, type: filter || "page" });
                        }}
                        className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                        type="button"
                      >
                        + New {filter ? filter : "content"}
                      </button>
                    </div>
                  </div>

                  {items.length === 0 ? (
                    <div className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-sm">
                      <div className="text-slate-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900">No items found</h3>
                      <p className="text-slate-500 mt-1">Get started by creating a new item or importing existing data.</p>
                    </div>
                  ) : (
                    <div className={`grid grid-cols-1 gap-4 ${showPreview ? "xl:grid-cols-3 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                      {items.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => selectItem(item)}
                          className="group bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all flex flex-col h-[140px]"
                        >
                          <div className="flex-1 min-h-0">
                            <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                              {item.title || "Untitled"}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {item.summary || item.slug || "No summary provided."}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 flex-shrink-0">
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <span className="text-xs font-medium px-2 py-1 rounded capitalize" style={{ color: handleStatusColor(item.status), backgroundColor: `${handleStatusColor(item.status)}15` }}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* --- FORM VIEW --- */
                <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-max">
                  {/* Sticky Form Action Bar */}
                  <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3 border-b border-slate-200 shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsStatusOpen(!isStatusOpen)}
                          style={{ backgroundColor: handleStatusColor(form.status) }}
                          className="rounded border border-slate-300 px-3 py-1.5 text-sm text-white flex items-center gap-2 min-w-[120px] justify-between shadow-sm"
                        >
                          <span className="capitalize">{form.status}</span>
                          <ChevronsUpDown className="w-3 h-3" strokeWidth={2} />
                        </button>

                        {isStatusOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setIsStatusOpen(false)}
                            />
                            <ul className="absolute left-0 z-20 mt-1 w-full rounded-md border border-slate-200 bg-white p-1 shadow-lg flex flex-col gap-1">
                              {["draft", "published", "archived"].map((status) => (
                                <li key={status}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setForm({ ...form, status });
                                      setIsStatusOpen(false);
                                    }}
                                    className="w-full rounded-md px-3 py-1.5 text-left text-sm text-slate-900 hover:bg-slate-100 transition-colors capitalize"
                                  >
                                    {status}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      {form.updatedAt && (
                        <span className="text-xs text-slate-500 hidden sm:inline-block">
                          Updated {timeAgo(form.updatedAt)}
                        </span>
                      )}
                      {message && <span className="text-sm font-medium text-blue-600">{message}</span>}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDelete}
                        className="rounded border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors bg-white shadow-sm"
                        type="button"
                      >
                        Delete
                      </button>
                      <button
                        disabled={isSaving}
                        onClick={() => handleStatusToast(form.status)}
                        className="rounded bg-blue-600 px-6 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm"
                        type="submit"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="p-6 max-w-3xl mx-auto w-full flex flex-col gap-6 pb-12">
                    <div className={`grid gap-4 ${showPreview ? "xl:grid-cols-2" : "md:grid-cols-2"}`}>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Type
                        <select
                          value={form.type}
                          onChange={(event) => setForm({ ...form, type: event.target.value })}
                          className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                        >
                          {contentTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Slug
                        <input
                          value={form.slug}
                          onChange={(event) => setForm({ ...form, slug: event.target.value })}
                          className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                          placeholder="example-page"
                        />
                      </label>
                    </div>

                    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                      Title
                      <input
                        value={form.title}
                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                        className="rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-lg bg-white"
                      />
                    </label>

                    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                      Summary
                      <textarea
                        value={form.summary}
                        onChange={(event) => setForm({ ...form, summary: event.target.value })}
                        className="min-h-[80px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                      />
                    </label>

                    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                      Body
                      <textarea
                        value={form.body}
                        onChange={(event) => setForm({ ...form, body: event.target.value })}
                        className="min-h-[400px] rounded-md border border-slate-300 px-3 py-2 shadow-sm font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y bg-white"
                        placeholder="Markdown or HTML content..."
                      />
                    </label>

                    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                      <ImageManager
                        images={form.images}
                        onChange={(images) => setForm({ ...form, images })}
                      />
                    </div>

                    <div className={`rounded-md border border-slate-200 bg-white p-4 shadow-sm grid gap-4 ${showPreview ? "xl:grid-cols-2" : "md:grid-cols-2"}`}>
                      <div className="col-span-full">
                        <h3 className="font-semibold text-slate-800 text-sm">SEO Metadata</h3>
                      </div>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        SEO Title
                        <input
                          value={form.seoTitle}
                          onChange={(event) => setForm({ ...form, seoTitle: event.target.value })}
                          className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </label>

                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        SEO Description
                        <input
                          value={form.seoDescription}
                          onChange={(event) =>
                            setForm({ ...form, seoDescription: event.target.value })
                          }
                          className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </label>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* PANE 3: Preview */}
          {showPreview && (
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
          )}

        </section>
      </main>
    </>
  );
}
