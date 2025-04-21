"use server";

import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} from "../environments";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

const keywords = [
  "running",
  "jogging",
  "marathon",
  "fitness",
  "trail",
  "sports",
  "training",
  "run",
  "athlete",
  "exercise",
  "outdoor run",
  "track",
  "healthy",
  "urban run",
  "sprint",
  "race",
  "morning run",
  "night run",
  "park run",
  "mountain run",
  "treadmill",
  "group run",
  "run clothes",
  "shoes",
  "race day",
  "running man",
  "runner",
  "active",
  "lifestyle",
  "stretching",
];

export async function insertMockTemplates() {
  const mockData = keywords.map((kw, idx) => ({
    name: `Runner ${idx + 1}`,
    thumbnail_image_url: `https://source.unsplash.com/300x200/?${encodeURIComponent(
      kw
    )}&sig=${idx}`,
    description: kw,
  }));

  const { data, error } = await supabase.from("template").insert(mockData);

  if (error) {
    throw new Error("삽입 실패: " + error.message);
  }

  return data;
}
