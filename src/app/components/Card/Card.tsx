import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface CardProps {
  post: {
    id: string;
    image_url: string;
    tags: string[];
    song?: string;
    description?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function Card({ post, onEdit, onDelete }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden max-w-sm border border-gray-200 relative">
      <Image
        src={post.image_url}
        alt="러닝 이미지"
        width={400}
        height={400}
        className="object-cover w-full aspect-[4/5]"
      />
      <div className="p-4 space-y-2">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-rose-200 text-white rounded-full px-2 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {post.song && (
          <p className="text-sm text-gray-700">
            🎵 <strong>노래:</strong> {post.song}
          </p>
        )}
        {post.description && (
          <p className="text-sm text-gray-800">{post.description}</p>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
