"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  activityPageItems,
  activitySlugSequence,
  projectPageItems,
  projectSlugSequence,
} from "@/lib/headerMenu";

export const contentTypes = [
  { value: "home", label: "Home", queryTypes: ["page"], createType: "page", apiLink: "/api/home" },
  { value: "team", label: "Team", queryTypes: ["teamMember"], createType: "teamMember", apiLink: "/api/team-members" },
  { value: "gallery", label: "Gallery", queryTypes: ["galleryItem"], createType: "galleryItem", apiLink: "/api/public/content?type=galleryItem" },
  { value: "news", label: "News", queryTypes: ["news"], createType: "news", apiLink: "/api/public/content?type=news" },
  { value: "projects", label: "Projects", queryTypes: ["project", "rabiesPage"], createType: "project", apiLink: "/api/public/content?type=project" },
  { value: "activities", label: "Activities", queryTypes: ["activity"], createType: "activity", apiLink: "/api/public/content?type=activity" },
  { value: "contact-us", label: "Contact Us", queryTypes: ["contact-us"], createType: "contact-us", apiLink: "/api/contact?source=contact-us", contactSource: "contact-us" },
  { value: "donate-us", label: "Donate Us", queryTypes: ["donate-us"], createType: "donate-us", apiLink: "/api/public/content?type=donate-us" },
  { value: "footer", label: "Footer", queryTypes: ["footer"], createType: "footer", apiLink: "/api/contact?source=footer", contactSource: "footer" },
  { value: "contact", label: "Contact", queryTypes: ["contact"], createType: "contact", apiLink: "/api/contact?source=contact", contactSource: "contact" },
];

const contactSources = ["contact-us", "footer", "contact"];

export const formContentTypes = [
  { value: "page", label: "Home / Page" },
  { value: "teamMember", label: "Team" },
  { value: "galleryItem", label: "Gallery" },
  { value: "news", label: "News" },
  { value: "project", label: "Projects" },
  { value: "activity", label: "Activities" },
  { value: "contact-us", label: "Contact Us" },
  { value: "donate-us", label: "Donate Us" },
  { value: "footer", label: "Footer" },
  { value: "contact", label: "Contact" },
  { value: "rabiesPage", label: "Projects / Rabies" },
  { value: "bytheNumbers", label: "By the Numbers" },
  { value: "navigation", label: "Navigation" },
  { value: "siteSetting", label: "Site Setting" },
];

export { activityPageItems, activitySlugSequence, projectPageItems, projectSlugSequence };

export function getContentTypeConfig(valueOrType) {
  return contentTypes.find((type) =>
    type.value === valueOrType ||
    type.createType === valueOrType ||
    type.queryTypes.includes(valueOrType)
  );
}

export function getContentTypeLabel(valueOrType) {
  return getContentTypeConfig(valueOrType)?.label || valueOrType || "All Contents";
}

export function getContentApiLink(type, slug = "") {
  if (type === "teamMember") {
    return slug ? `/api/team-members/${slug}` : "/api/team-members";
  }
  if (contactSources.includes(type)) {
    return `/api/contact?source=${encodeURIComponent(type)}`;
  }
  if (slug) {
    return `/api/public/content/${encodeURIComponent(type)}/${encodeURIComponent(slug)}`;
  }
  const config = getContentTypeConfig(type);
  return config?.apiLink || `/api/public/content?type=${encodeURIComponent(type)}`;
}

export const pageItems = [
  { slug: "", label: "Home Page", description: "home page" },
  { slug: "rabiespage", label: "Rabies Page", description: "" },
  { slug: "project", label: "Project", description: "" },
  { slug: "activity", label: "Activity", description: "" },
  { slug: "news", label: "News", description: "" },
  { slug: "teammember", label: "Team Member", description: "" },
];

export const homeSections = [
  { id: "hero", label: "Slider", description: "" },
  { id: "who-we-are", label: "Who We Are", description: "" },
  { id: "mission", label: "Mission", description: "" },
  { id: "what-we-do", label: "What We Do", description: "" },
  { id: "volunteerism-and-support", label: "Volunteerism & Support", description: "" },
  { id: "founders", label: "Founders", description: "" },
  { id: "latest-news", label: "Latest News", description: "" },
  { id: "join-our-effort", label: "Join Our Effort", description: "" },
  { id: "by-the-number", label: "By the Number", description: "" },
];

export const emptyForm = {
  type: "page",
  slug: "",
  title: "",
  status: "draft",
  summary: "",
  body: "",
  name: "",
  email: "",
  subject: "",
  message: "",
  images: [],
  blocks: [],
  seoTitle: "",
  seoDescription: "",
};

export const emptySectionForm = {
  type: "section",
  slug: "",
  title: "",
  body: "",
  images: [],
  status: "draft",
};

export function formFromItem(item) {
  if (contactSources.includes(item.type)) {
    return {
      type: item.type,
      slug: item.slug || item.email || item._id || "",
      title: item.title || item.subject || item.name || "",
      status: item.status || "new",
      updatedAt: item.updatedAt,
      summary: item.summary || item.message || "",
      body: item.body || item.message || "",
      name: item.name || "",
      email: item.email || "",
      subject: item.subject || "",
      message: item.message || item.summary || item.body || "",
      images: [],
      blocks: [],
      seoTitle: "",
      seoDescription: "",
    };
  }

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
    blocks: Array.isArray(item.blocks) && item.blocks.length
      ? item.blocks
      : [
          ...(item.title ? [{ id: `title-${item._id || "legacy"}`, type: "title", value: item.title }] : []),
          ...(item.body ? [{ id: `content-${item._id || "legacy"}`, type: "content", value: item.body }] : []),
        ],
    seoTitle: item.seo?.title || "",
    seoDescription: item.seo?.description || "",
  };
}

export function payloadFromForm(form) {
  const blocks = Array.isArray(form.blocks) ? form.blocks : [];
  const titleBlock = blocks.find((block) => block.type === "title");
  const contentBlocks = blocks.filter((block) => block.type === "content");
  const imageBlocks = blocks.filter((block) => block.type === "image" && block.url);
  return {
    type: form.type,
    slug: form.slug,
    title: titleBlock?.value || form.title || "Untitled",
    status: form.status,
    summary: form.summary,
    body: contentBlocks.map((block) => block.value || "").join("\n"),
    images: imageBlocks.map((block) => block.url),
    blocks,
    seo: {
      title: form.seoTitle,
      description: form.seoDescription,
    },
  };
}

function normalizeTeamMembers(data) {
  const teamItems = data.items || data.profileData || [];
  return teamItems.map((item) => ({
    _id: item._id || item.id || item.key,
    type: "teamMember",
    slug: item.slug || item.key || "",
    title: item.title || item.name || "",
    status: item.status || "published",
    summary: item.summary || item.designation || "",
    body: item.body || item.description || "",
    images: item.images || (item.img ? [item.img] : []),
    metadata: item.metadata || {
      email: item.mail || "",
      socialLink: item.socialLink || "",
    },
    updatedAt: item.updatedAt,
  }));
}

function normalizeContacts(data) {
  const contacts = data.contacts || [];
  return contacts.map((item) => ({
    ...item,
    _id: item._id,
    type: item.source || "contact",
    slug: item.source || item.email || item._id,
    title: item.subject || item.name || "Contact record",
    summary: item.message || "",
    body: item.message || "",
  }));
}

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedPageItem, setSelectedPageItem] = useState(null);
  const [sections, setSections] = useState(homeSections);
  const [selectedSection, setSelectedSection] = useState(null);
  const [homeSectionData, setHomeSectionData] = useState({});
  const [isSavingSection, setIsSavingSection] = useState(false);
  const [sectionMessage, setSectionMessage] = useState("");


  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleStatusColor = (status) => {
    switch (status) {
      case 'new': return '#2563eb';
      case 'read': return '#0891b2';
      case 'replied': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'published': return '#10b981';
      case 'archived': return '#6b7280';
      default: return '';
    }
  };

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
      const filterConfig = getContentTypeConfig(filter);
      const queryTypes = filterConfig?.queryTypes || (filter ? [filter] : []);

      if (queryTypes.includes("teamMember") && queryTypes.length === 1) {
        const res = await fetch("/api/team-members");
        const data = await res.json();
        if (res.ok) allItems = normalizeTeamMembers(data);
        else throw new Error(data.error || data.message || "Failed to load team members");
      } else if (filterConfig?.contactSource) {
        const res = await fetch(`/api/contact?source=${encodeURIComponent(filterConfig.contactSource)}`);
        const data = await res.json();
        if (res.ok) allItems = normalizeContacts(data);
        else throw new Error(data.error || data.message || "Failed to load contact records");
      } else if (filter) {
        const responses = await Promise.all(
          queryTypes.map(async (type) => {
            const res = await fetch(`/api/admin/content?type=${encodeURIComponent(type)}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.message || "Failed to load content");
            return data.items || [];
          })
        );
        allItems = responses.flat();
      } else {
        const [contentRes, teamRes] = await Promise.all([
          fetch("/api/admin/content"),
          fetch("/api/team-members")
        ]);
        const contentData = await contentRes.json();
        const teamData = await teamRes.json();
        if (contentRes.ok) allItems.push(...(contentData.items || []));
        if (teamRes.ok) allItems.push(...normalizeTeamMembers(teamData));
      }
      setItems(allItems);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleSubmit(event, overrideStatus = null) {
    if (event) event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const currentForm = overrideStatus ? { ...form, status: overrideStatus } : form;

    const isTeamMember = form.type === "teamMember";
    const isContactRecord = contactSources.includes(form.type);
    const baseUrl = isTeamMember ? "/api/team-members" : isContactRecord ? "/api/contact" : "/api/admin/content";
    const url = selectedId && !isContactRecord ? `${baseUrl}/${selectedId}` : baseUrl;
    const method = selectedId ? (isTeamMember ? "PUT" : "PATCH") : "POST";
    const payload = isContactRecord
      ? {
        _id: selectedId,
        name: currentForm.name || currentForm.title,
        email: currentForm.email,
        subject: currentForm.subject || currentForm.title,
        message: currentForm.message || currentForm.body || currentForm.summary,
        source: currentForm.type,
        status: currentForm.status,
      }
      : payloadFromForm(currentForm);

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.error || data.message || "Save failed.");
      return;
    }

    const savedItem = isTeamMember
      ? normalizeTeamMembers({ items: [data.item] })[0]
      : isContactRecord
        ? normalizeContacts({ contacts: [data.contact] })[0]
        : data.item;
    setSelectedId(savedItem._id);
    setIsCreating(false);
    setForm(formFromItem(savedItem));
    setMessage("Saved.");
    if (overrideStatus) {
      handleStatusToast(overrideStatus);
    }
    await loadItems();
  }

  async function handleDelete() {
    if (!selectedId) return;
    const isTeamMember = form.type === "teamMember";
    const isContactRecord = contactSources.includes(form.type);
    const url = isTeamMember ? `/api/team-members/${selectedId}` : isContactRecord ? "/api/contact" : `/api/admin/content/${selectedId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers,
      body: isContactRecord ? JSON.stringify({ _id: selectedId }) : undefined,
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

  async function handleDeleteById(item) {
    const isTeamMember = item.type === "teamMember";
    const isContactRecord = contactSources.includes(item.type);
    const url = isTeamMember ? `/api/team-members/${item._id}` : isContactRecord ? "/api/contact" : `/api/admin/content/${item._id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers,
      body: isContactRecord ? JSON.stringify({ _id: item._id }) : undefined,
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || data.message || "Delete failed.");
      return;
    }

    if (selectedId === item._id) {
      setSelectedId(null);
      setIsCreating(false);
      setForm(emptyForm);
    }

    toast.success(`"${item.title || "Item"}" deleted.`);
    setDeleteTarget(null);
    setOpenMenuId(null);
    await loadItems();
  }

  async function handleArchiveById(item) {
    if (contactSources.includes(item.type)) {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ _id: item._id, status: "archived" }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || data.message || "Archive failed.");
        return;
      }

      if (selectedId === item._id) {
        setForm((f) => ({ ...f, status: "archived" }));
      }

      toast.warning(`"${item.title || "Item"}" archived.`);
      setOpenMenuId(null);
      await loadItems();
      return;
    }

    const isTeamMember = item.type === "teamMember";
    const url = isTeamMember ? `/api/team-members/${item._id}` : `/api/admin/content/${item._id}`;
    const method = isTeamMember ? "PUT" : "PATCH";

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ status: "archived" }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || data.message || "Archive failed.");
      return;
    }

    if (selectedId === item._id) {
      setForm((f) => ({ ...f, status: "archived" }));
    }

    toast.warning(`"${item.title || "Item"}" archived.`);
    setOpenMenuId(null);
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

  async function loadHomeSections() {
    try {
      const res = await fetch("/api/home");
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const map = {};
        data.forEach((s) => { map[s.key] = s; });
        setHomeSectionData(map);
      }
    } catch (err) {
      console.error("Failed to load home sections:", err);
    }
  }

  async function saveHomeSection(payload) {
    setIsSavingSection(true);
    setSectionMessage("");
    try {
      const res = await fetch("/api/home", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setSectionMessage(data.message || "Save failed.");
        toast.error(data.message || "Save failed.");
      } else {
        setSectionMessage("Saved.");
        toast.success("Section saved successfully.");
        await loadHomeSections();
      }
    } catch (err) {
      setSectionMessage(err.message);
      toast.error(err.message);
    } finally {
      setIsSavingSection(false);
    }
  }

  function selectItem(item) {
    setSelectedId(item._id);
    setIsCreating(false);
    setForm(formFromItem(item));
    setMessage("");
  }

  const value = {
    items, setItems,
    selectedId, setSelectedId,
    form, setForm,
    filter, setFilter,
    message, setMessage,
    isSaving, setIsSaving,
    isCreating, setIsCreating,
    search, setSearch,
    deleteTarget, setDeleteTarget,
    openMenuId, setOpenMenuId,
    selectedPageItem, setSelectedPageItem,
    sections, setSections,
    selectedSection, setSelectedSection,
    homeSectionData, setHomeSectionData,
    isSavingSection, sectionMessage, setSectionMessage,
    handleStatusColor,
    handleStatusToast,
    timeAgo,
    loadItems,
    loadHomeSections,
    saveHomeSection,
    handleSubmit,
    handleDelete,
    handleDeleteById,
    handleArchiveById,
    handleSeed,
    selectItem
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
