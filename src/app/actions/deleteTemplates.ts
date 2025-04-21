import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} from "../environments";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

export async function deleteUnsplashImages() {
  const { error } = await supabase
    .from("template")
    .delete()
    .ilike("thumbnail_image_url", "https://source.unsplash.com/300x200%");

  if (error) {
    throw new Error("삭제 실패: " + error.message);
  }

  return "삭제 성공";
}
