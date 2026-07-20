"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import * as FaIcons from "react-icons/fa6";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Archive, Bold, ChevronDown,
  Code2, Copy, Image, Italic, Link, Link2, MessageSquareQuote, Palette,
  PanelTop, Plus, Quote, Save, Send, Tag, Trash2, Underline as UnderlineIcon,
} from "lucide-react";
import { getContentApiLink } from "../context/AdminContext";

const blockOptions = [
  ["title", "Label", Tag], ["image", "Image", Image], ["content", "Content", AlignLeft],
  ["accordion", "Accordion", ChevronDown], ["button", "Button", PanelTop],
  ["embedLink", "Embed", Code2], ["quote", "Quote", MessageSquareQuote],
  ["icon", "Icon", Plus], ["link", "Link", Link], ["card", "Card", PanelTop],
];

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100";
const roundButton = "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:opacity-50";

function RichText({ value = "", onChange }) {
  const [, refreshToolbar] = useState(0);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      TiptapLink.configure({ openOnClick: false }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-36 outline-none",
      },
    },
    content: value,
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
      refreshToolbar((version) => version + 1);
    },
    onSelectionUpdate: () => refreshToolbar((version) => version + 1),
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);
  if (!editor) return null;
  const iconButton = (active = false) => `grid h-8 w-8 place-items-center rounded-full transition ${active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-white hover:text-blue-600"}`;
  const currentHeading = [1, 2, 3, 4].find((level) => editor.isActive("heading", { level })) || "paragraph";
  const currentList = editor.isActive("bulletList") ? "bullet" : editor.isActive("orderedList") ? "numbered" : "none";
  function setHeading(nextValue) {
    const chain = editor.chain().focus();
    if (nextValue === "paragraph") chain.setParagraph().run();
    else chain.setHeading({ level: Number(nextValue) }).run();
  }
  function setList(nextValue) {
    if (nextValue === "bullet") editor.chain().focus().toggleBulletList().run();
    else if (nextValue === "numbered") editor.chain().focus().toggleOrderedList().run();
    else if (currentList === "bullet") editor.chain().focus().toggleBulletList().run();
    else if (currentList === "numbered") editor.chain().focus().toggleOrderedList().run();
  }
  function editLink() {
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter link URL (leave empty to remove):", previousUrl);
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
    <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 bg-slate-50 p-2">
      <select aria-label="Heading style" title="Heading style" value={currentHeading} onChange={(event) => setHeading(event.target.value)} className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none focus:border-blue-400">
        <option value="paragraph">Paragraph</option>
        <option value="1">Heading 1</option><option value="2">Heading 2</option>
        <option value="3">Heading 3</option><option value="4">Heading 4</option>
      </select>
      <select aria-label="List style" title="List style" value={currentList} onChange={(event) => setList(event.target.value)} className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none focus:border-blue-400">
        <option value="none">No list</option><option value="bullet">Bullet list</option><option value="numbered">Numbered list</option>
      </select>
      <span className="mx-0.5 h-5 w-px bg-slate-200" />
      <button type="button" title="Bold" aria-pressed={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} className={iconButton(editor.isActive("bold"))}><Bold size={15} /></button>
      <button type="button" title="Italic" aria-pressed={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} className={iconButton(editor.isActive("italic"))}><Italic size={15} /></button>
      <button type="button" title="Underline" aria-pressed={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} className={iconButton(editor.isActive("underline"))}><UnderlineIcon size={15} /></button>
      <button type="button" title="Blockquote" aria-pressed={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} className={iconButton(editor.isActive("blockquote"))}><Quote size={15} /></button>
      <button type="button" title="Add or edit link" aria-pressed={editor.isActive("link")} onClick={editLink} className={iconButton(editor.isActive("link"))}><Link2 size={15} /></button>
      <label title="Text color" className={`${iconButton(Boolean(editor.getAttributes("textStyle").color))} relative cursor-pointer`}><Palette size={15} /><input aria-label="Text color" type="color" value={editor.getAttributes("textStyle").color || "#0f172a"} onChange={(event) => editor.chain().focus().setColor(event.target.value).run()} className="absolute inset-0 cursor-pointer opacity-0" /></label>
      <span className="mx-0.5 h-5 w-px bg-slate-200" />
      {[["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight], ["justify", AlignJustify]].map(([alignment, Icon]) => <button key={alignment} type="button" title={`Align ${alignment}`} aria-pressed={editor.isActive({ textAlign: alignment })} onClick={() => editor.chain().focus().setTextAlign(alignment).run()} className={iconButton(editor.isActive({ textAlign: alignment }))}><Icon size={15} /></button>)}
    </div>
    <EditorContent
      editor={editor}
      className="min-h-44 px-4 py-3 text-sm text-slate-700 [&_.tiptap_a]:text-blue-600 [&_.tiptap_a]:underline [&_.tiptap_blockquote]:my-3 [&_.tiptap_blockquote]:border-l-4 [&_.tiptap_blockquote]:border-blue-300 [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_h1]:mb-3 [&_.tiptap_h1]:mt-5 [&_.tiptap_h1]:text-3xl [&_.tiptap_h1]:font-bold [&_.tiptap_h2]:mb-2 [&_.tiptap_h2]:mt-4 [&_.tiptap_h2]:text-2xl [&_.tiptap_h2]:font-bold [&_.tiptap_h3]:mb-2 [&_.tiptap_h3]:mt-3 [&_.tiptap_h3]:text-xl [&_.tiptap_h3]:font-semibold [&_.tiptap_h4]:mb-2 [&_.tiptap_h4]:mt-3 [&_.tiptap_h4]:text-lg [&_.tiptap_h4]:font-semibold [&_.tiptap_ol]:my-3 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_p]:my-2 [&_.tiptap_ul]:my-3 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6"
    />
  </div>;
}

function Field({ label, children }) {
  return <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><span>{label}</span>{children}</label>;
}

function ImageFields({ block, update }) {
  const fileRef = useRef(null);
  function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ url: String(reader.result), fileName: file.name });
    reader.readAsDataURL(file);
  }
  return <div className="grid gap-3 sm:grid-cols-2">
    <Field label="Image URL"><input className={inputClass} value={block.url || ""} onChange={(e) => update({ url: e.target.value })} placeholder="https://…" /></Field>
    <div className="flex items-end"><button type="button" onClick={() => fileRef.current?.click()} className={`${roundButton} border border-slate-200 bg-white hover:bg-slate-50`}><Image size={15} /> Upload image</button><input ref={fileRef} hidden type="file" accept="image/*" onChange={upload} /></div>
    <Field label="Alt text 1"><input className={inputClass} value={block.alt1 || ""} onChange={(e) => update({ alt1: e.target.value })} /></Field>
    <Field label="Alt text 2"><input className={inputClass} value={block.alt2 || ""} onChange={(e) => update({ alt2: e.target.value })} /></Field>
    {block.url && <img src={block.url} alt={block.alt1 || ""} className="col-span-full max-h-56 w-full rounded-xl border border-slate-100 object-cover" />}
  </div>;
}

function BlockFields({ block, update }) {
  if (block.type === "title") return <Field label="Label"><input className={`${inputClass} text-lg font-semibold`} value={block.value || ""} onChange={(e) => update({ value: e.target.value })} placeholder="Add a label" /></Field>;
  if (block.type === "content") return <RichText value={block.value} onChange={(value) => update({ value })} />;
  if (block.type === "image") return <ImageFields block={block} update={update} />;
  if (block.type === "accordion") return <div className="grid gap-3"><Field label="Accordion title"><input className={inputClass} value={block.title || ""} onChange={(e) => update({ title: e.target.value })} /></Field><Field label="Accordion content"><RichText value={block.content} onChange={(content) => update({ content })} /></Field></div>;
  if (block.type === "button") return <div className="grid gap-3 sm:grid-cols-3"><Field label="Label"><input className={inputClass} value={block.label || ""} onChange={(e) => update({ label: e.target.value })} /></Field><Field label="Link"><input className={inputClass} value={block.url || ""} onChange={(e) => update({ url: e.target.value })} /></Field><Field label="Color"><input className={`${inputClass} h-10 p-1`} type="color" value={block.color || "#2563eb"} onChange={(e) => update({ color: e.target.value })} /></Field></div>;
  if (block.type === "embedLink" || block.type === "link") return <div className="grid gap-3 sm:grid-cols-2">{block.type === "link" && <Field label="Label"><input className={inputClass} value={block.label || ""} onChange={(e) => update({ label: e.target.value })} /></Field>}<Field label={block.type === "embedLink" ? "Embed URL" : "URL"}><input className={inputClass} value={block.url || ""} onChange={(e) => update({ url: e.target.value })} placeholder="https://…" /></Field></div>;
  if (block.type === "quote") return <div className="grid gap-3"><Field label="Quote"><textarea rows={3} className={inputClass} value={block.content || ""} onChange={(e) => update({ content: e.target.value })} /></Field><Field label="Attribution"><input className={inputClass} value={block.attribution || ""} onChange={(e) => update({ attribution: e.target.value })} /></Field></div>;
  if (block.type === "icon") {
    const Icon = FaIcons[block.name] || FaIcons.FaRegStar;
    return <div className="grid items-end gap-3 sm:grid-cols-[1fr_120px_120px_64px]"><Field label="React icon name"><input className={inputClass} value={block.name || ""} onChange={(e) => update({ name: e.target.value })} placeholder="FaLocationDot" /></Field><Field label="Size"><input className={inputClass} type="number" min="8" max="240" value={block.size || 32} onChange={(e) => update({ size: Number(e.target.value) })} /></Field><Field label="Color"><input className={`${inputClass} h-10 p-1`} type="color" value={block.color || "#0f172a"} onChange={(e) => update({ color: e.target.value })} /></Field><div className="grid h-10 place-items-center"><Icon size={block.size || 32} color={block.color || "#0f172a"} /></div></div>;
  }
  if (block.type === "card") return <div className="grid gap-3 sm:grid-cols-2"><Field label="Image URL"><input className={inputClass} value={block.image || ""} onChange={(e) => update({ image: e.target.value })} /></Field><Field label="Label"><input className={inputClass} value={block.label || ""} onChange={(e) => update({ label: e.target.value })} /></Field><Field label="Content"><textarea rows={3} className={inputClass} value={block.content || ""} onChange={(e) => update({ content: e.target.value })} /></Field><div className="grid gap-3"><Field label="Social link"><input className={inputClass} value={block.socialUrl || ""} onChange={(e) => update({ socialUrl: e.target.value })} /></Field><Field label="Social icon"><input className={inputClass} value={block.socialIcon || ""} onChange={(e) => update({ socialIcon: e.target.value })} placeholder="FaLinkedin" /></Field></div></div>;
  return null;
}

export default function UnifiedContentEditor({ form, setForm, message, isSaving, updatedLabel, onSubmit }) {
  const [copied, setCopied] = useState(false);
  const blocks = Array.isArray(form.blocks) ? form.blocks : [];
  const apiLink = getContentApiLink(form.type, form.slug);
  function addBlock(type) {
    setForm({ ...form, blocks: [...blocks, { id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`, type }] });
  }
  function updateBlock(id, patch) { setForm({ ...form, blocks: blocks.map((block) => block.id === id ? { ...block, ...patch } : block) }); }
  function removeBlock(id) { setForm({ ...form, blocks: blocks.filter((block) => block.id !== id) }); }
  async function copyApi() { await navigator.clipboard.writeText(`${window.location.origin}${apiLink}`); setCopied(true); setTimeout(() => setCopied(false), 1600); }
  return <form onSubmit={onSubmit} className="flex min-h-full flex-col bg-slate-50">
    <div className="grid flex-1 xl:grid-cols-[minmax(0,1fr)_320px]">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-5 p-6 pb-20">
        <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{form.type}</p><h2 className="text-2xl font-bold text-slate-900">Content editor</h2></div><div className="text-right text-xs text-slate-500">{updatedLabel}{message && <p className="mt-1 font-semibold text-blue-600">{message}</p>}</div></div>
        <Field label="Slug"><input required className={inputClass} value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="page-slug" /></Field>
        {blocks.length === 0 && <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-16 text-center"><Plus className="mx-auto mb-3 text-slate-300" /><p className="font-semibold text-slate-700">Build your content</p><p className="mt-1 text-sm text-slate-400">Choose a block from the form sidebar.</p></div>}
        {blocks.map((block, index) => <section key={block.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">{index + 1}</span><span className="text-sm font-bold capitalize text-slate-700">{block.type === "title" ? "Label" : block.type === "embedLink" ? "Embed link" : block.type}</span></div><button type="button" onClick={() => removeBlock(block.id)} className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div>
          <BlockFields block={block} update={(patch) => updateBlock(block.id, patch)} />
        </section>)}
      </main>
      <aside className="border-l border-slate-200 bg-white p-5 xl:sticky xl:top-0 xl:h-[calc(100vh-113px)] xl:overflow-y-auto">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">actions</p>
        <button type="button" onClick={copyApi} className={`${roundButton} mb-5 w-full bg-slate-100 text-slate-700 hover:bg-slate-200`}><Copy size={15} /> {copied ? "API copied" : "Copy API link"}</button>
        <div className="grid grid-cols-2 gap-2">{blockOptions.map(([type, label, Icon]) => <button key={type} type="button" onClick={() => addBlock(type)} className={`${roundButton} border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700`}><Icon size={15} /> {label}</button>)}</div>
        <div className="my-5 h-px bg-slate-100" />
        <div className="grid gap-2"><button disabled={isSaving} type="button" onClick={(e) => onSubmit(e, "archived")} className={`${roundButton} bg-slate-100 text-slate-700 hover:bg-slate-200`}><Archive size={15} /> Archive</button><button disabled={isSaving} type="button" onClick={(e) => onSubmit(e, "draft")} className={`${roundButton} bg-amber-50 text-amber-700 hover:bg-amber-100`}><Save size={15} /> Save draft</button><button disabled={isSaving} type="button" onClick={(e) => onSubmit(e, "published")} className={`${roundButton} bg-blue-600 text-white hover:bg-blue-700`}><Send size={15} /> Publish</button></div>
      </aside>
    </div>
  </form>;
}
