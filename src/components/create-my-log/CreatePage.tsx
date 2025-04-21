import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/app/lib/supabaseClient";

export type Post = {
  id: string;
  image_url: string;
  tags: string[];
  song?: string;
  description?: string;
};

interface CreatePageProps {
  initialPost: Post;
  onDone?: () => void;
}

export default function CreatePage({ initialPost, onDone }: CreatePageProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [song, setSong] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialPost) {
      setImageUrl(initialPost.image_url);
      setTags(initialPost.tags ?? []);
      setSong(initialPost.song ?? "");
      setDescription(initialPost.description ?? "");
    }
  }, [initialPost]);

  const mutation = useMutation({
    mutationFn: async () => {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const filePath = `posts/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile);

        if (uploadError) throw new Error("이미지 업로드 실패");

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      if (initialPost) {
        const { error } = await supabase
          .from("posts")
          .update({ image_url: finalImageUrl, tags, song, description })
          .eq("id", initialPost.id);

        if (error) throw new Error("수정 실패");
      } else {
        const { error } = await supabase.from("posts").insert({
          image_url: finalImageUrl,
          tags,
          song,
          description,
        });

        if (error) throw new Error("등록 실패");
      }
    },
    onSuccess: () => {
      alert(initialPost ? "수정 완료" : "작성 완료");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onDone?.();
    },
  });

  const handleSubmit = () => {
    if (!imageFile && !imageUrl) {
      alert("이미지를 등록해주세요.");
      return;
    }
    mutation.mutate();
  };

  const handleTagAdd = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
      />
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="태그 추가"
        />
        <Button onClick={handleTagAdd}>추가</Button>
      </div>
      <Input
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="노래 입력"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="기록 설명"
      />
      <Button onClick={handleSubmit}>
        {initialPost ? "수정하기" : "작성하기"}
      </Button>
    </div>
  );
}
