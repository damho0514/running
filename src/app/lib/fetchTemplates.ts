import { supabase } from "./supabaseClient";

export const fetchTemplates = async ({ pageParam = 1 }) => {
  const pageSize = 20;
  const from = (pageParam - 1) * pageSize;
  const to = pageParam * pageSize - 1;

  const { data, error } = await supabase
    .from("template")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error("Failed to fetch");

  return {
    templates: data,
    nextPage: data.length === pageSize ? pageParam + 1 : undefined,
  };
};
