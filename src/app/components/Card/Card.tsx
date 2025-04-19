import Image from "next/image";

type CardProps = {
  username?: string;
  likes?: number;
  imageUrl?: string;
};

export function Card({ username, likes, imageUrl }: CardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <Image
        src={imageUrl ?? ""}
        alt={username ?? ""}
        className="w-full aspect-[4/5] object-cover"
      />
      <div className="p-2 flex items-center justify-between text-sm text-gray-600">
        <div className="font-medium truncate">@{username || "김필"}</div>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>{likes ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
