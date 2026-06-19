"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload, Link, Trash2, GripVertical, Pencil, X, Check, ChevronsUpDown
} from "lucide-react";

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
    setForm(formFromItem(item));
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              GroupMappers CMS
            </p>
            <h1 className="text-2xl font-bold">Content Admin</h1>
          </div>

          <div className="relative group">
            <button className="rounded-full overflow-hidden transition-all">
              <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#000000" /></svg>
            </button>

            <div className="absolute right-0 top-full w-48 pt-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
              <div className="bg-white border border-slate-200 rounded shadow-lg py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-400"
                  onClick={() => {
                    setShowUserMenu(false);
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

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 p-3">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="min-w-0 flex-1 rounded border border-slate-300 px-2 py-2 text-sm"
            >
              <option value="">All types</option>
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              onClick={() => loadItems()}
              className="rounded border border-slate-300 px-3 py-2 text-sm"
              type="button"
            >
              Load
            </button>
          </div>

          <button
            onClick={handleSeed}
            className="w-full border-b border-slate-200 px-3 py-3 text-left text-sm font-semibold text-slate-700"
            type="button"
          >
            Import existing JSON
          </button>

          <button
            onClick={() => {
              setSelectedId(null);
              setForm(emptyForm);
            }}
            className="w-full border-b border-slate-200 px-3 py-3 text-left text-sm font-semibold text-blue-700"
            type="button"
          >
            New content
          </button>

          <div className="max-h-[70vh] overflow-auto">
            {items.map((item) => (
              <button
                key={item._id}
                onClick={() => selectItem(item)}
                className={`block w-full border-b border-slate-100 px-3 py-3 text-left text-sm ${selectedId === item._id ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                type="button"
              >
                <span className="block font-semibold">{item.title}</span>
                <span className="block text-xs text-slate-500">
                  {item.type} / {item.slug} / {item.status}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Form Column */}
          <div className="rounded border border-slate-200 bg-white p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium">
                Type
                <select
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                  className="rounded border border-slate-300 px-3 py-2"
                >
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1 text-sm font-medium">
                Slug
                <input
                  value={form.slug}
                  onChange={(event) => setForm({ ...form, slug: event.target.value })}
                  className="rounded border border-slate-300 px-3 py-2"
                  placeholder="example-page"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-1 text-sm font-medium">
              Title
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="mt-4 grid gap-1 text-sm font-medium">
              Summary
              <textarea
                value={form.summary}
                onChange={(event) => setForm({ ...form, summary: event.target.value })}
                className="min-h-20 rounded border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="mt-4 grid gap-1 text-sm font-medium">
              Body
              <textarea
                value={form.body}
                onChange={(event) => setForm({ ...form, body: event.target.value })}
                className="min-h-72 rounded border border-slate-300 px-3 py-2 font-mono text-sm"
                placeholder="Markdown or page content"
              />
            </label>

            <ImageManager
              images={form.images}
              onChange={(images) => setForm({ ...form, images })}
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium">
                SEO Title
                <input
                  value={form.seoTitle}
                  onChange={(event) => setForm({ ...form, seoTitle: event.target.value })}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="grid gap-1 text-sm font-medium">
                SEO Description
                <input
                  value={form.seoDescription}
                  onChange={(event) =>
                    setForm({ ...form, seoDescription: event.target.value })
                  }
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <aside className="rounded border border-slate-200 bg-white p-4 flex flex-col gap-6">
            <div className="grid gap-1 text-sm font-medium">
              Status
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  style={{ backgroundColor: handleStatusColor(form.status) }}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-left text-white flex justify-between items-center"
                >
                  <span>{form.status}</span>
                  <ChevronsUpDown className="w-4 h-4" strokeWidth={2} />
                </button>

                {isStatusOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsStatusOpen(false)}
                    />
                    <ul className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white p-1 shadow-lg flex flex-col gap-1">
                      {["draft", "published", "archived"].map((status) => (
                        <li key={status}>
                          <button
                            type="button"
                            onClick={() => {
                              setForm({ ...form, status });
                              setIsStatusOpen(false);
                            }}
                            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-200 transition-colors"
                          >
                            {status}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div>
              {message && <p className="mb-4 text-sm font-medium text-blue-700">{message}</p>}
              <div className="flex flex-col gap-2">
                <button
                  disabled={isSaving}
                  className="w-full rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                {selectedId && (
                  <button
                    onClick={handleDelete}
                    className="w-full rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-700"
                    type="button"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}