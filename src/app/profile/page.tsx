"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Card } from "../components/Card/Card";
import { Button } from "@/components/ui/button";
import CreatePage from "@/components/create-my-log/CreatePage";

export type Post = {
  id: string;
  image_url: string;
  tags: string[];
  song?: string;
  description?: string;
};
export default function FlipCardWrapper() {
  const [flipped, setFlipped] = useState(false);
  const [editTarget, setEditTarget] = useState<Post | null>(null); // 수정할 post 저장
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw new Error("게시글 조회 실패");
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw new Error("삭제 실패");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("삭제 완료");
    },
  });

  const handleEdit = (post: Post) => {
    setEditTarget(post);
    setFlipped(true);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div>
        {posts?.length && !flipped ? (
          posts.map((item) => (
            <Card
              key={item.id}
              post={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteMutation.mutate(item.id)}
            />
          ))
        ) : (
          <div className="p-4">
            <CreatePage
              initialPost={editTarget}
              onDone={() => {
                setFlipped(false);
                setEditTarget(null);
              }}
            />
            <Button
              className="mt-4 text-sm text-blue-500 underline"
              onClick={() => {
                setFlipped(false);
                setEditTarget(null);
              }}
            >
              ← 돌아가기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
