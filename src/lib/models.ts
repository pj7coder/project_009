import mongoose, { Schema, model, models } from 'mongoose';

// ─── Product Schema ───────────────────────────────────────────────────────────
const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    images: { type: [String], required: true },
    origin: { type: String, required: true },
    finishes: { type: [String], required: true },
    applications: { type: [String], required: true },
    thickness: { type: [String], required: true },
    features: { type: [String], required: true },
  },
  { timestamps: true }
);

// ─── Project Schema ───────────────────────────────────────────────────────────
const ProjectSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    stoneUsed: { type: [String], required: true },
    year: { type: String, required: true },
  },
  { timestamps: true }
);

// ─── Blog Schema ──────────────────────────────────────────────────────────────
const BlogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// ─── ContactInfo Schema (single document, singleton pattern) ──────────────────
const ContactInfoSchema = new Schema(
  {
    // We store a fixed key "singleton" so we can always upsert the one record
    key: { type: String, default: 'singleton', unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    address: { type: String, required: true },
    targetMarkets: { type: [String], required: true },
  },
  { timestamps: true }
);

// ─── Model exports (safe for hot-reload in Next.js dev mode) ──────────────────
export const ProductModel = models.Product || model('Product', ProductSchema);
export const ProjectModel = models.Project || model('Project', ProjectSchema);
export const BlogModel = models.Blog || model('Blog', BlogSchema);
export const ContactInfoModel = models.ContactInfo || model('ContactInfo', ContactInfoSchema);
