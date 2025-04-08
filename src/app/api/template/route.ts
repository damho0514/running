/**
 * @file 스코어 게임 목록 조회용 라우트 핸들러 파일
 */

import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  try {
    const { data: games, error } = await supabase
      .from("template")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(games, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching games:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Erroxr";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
