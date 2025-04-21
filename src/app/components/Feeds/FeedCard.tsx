import React from "react";
import { Card } from "../Card/Card";
import { Template } from "@/app/types/supabase";

const mockData = [
  {
    username: "runner_01",
    likes: 12,
    imageUrl: "https://source.unsplash.com/random/300x400?running,1",
  },
  {
    username: "jogger_king",
    likes: 34,
    imageUrl: "https://source.unsplash.com/random/300x400?jogging,2",
  },
  {
    username: "night_runner",
    likes: 56,
    imageUrl: "https://source.unsplash.com/random/300x400?night,3",
  },
  {
    username: "citystrides",
    likes: 8,
    imageUrl: "https://source.unsplash.com/random/300x400?city,4",
  },
  {
    username: "run4life",
    likes: 21,
    imageUrl: "https://source.unsplash.com/random/300x400?fitness,5",
  },
  {
    username: "dailyjog",
    likes: 19,
    imageUrl: "https://source.unsplash.com/random/300x400?health,6",
  },
  {
    username: "weekend_runner",
    likes: 42,
    imageUrl: "https://source.unsplash.com/random/300x400?park,7",
  },
  {
    username: "springsteps",
    likes: 14,
    imageUrl: "https://source.unsplash.com/random/300x400?spring,8",
  },
  {
    username: "tracklover",
    likes: 77,
    imageUrl: "https://source.unsplash.com/random/300x400?track,9",
  },
  {
    username: "sunset_run",
    likes: 33,
    imageUrl: "https://source.unsplash.com/random/300x400?sunset,10",
  },
  {
    username: "forestjog",
    likes: 10,
    imageUrl: "https://source.unsplash.com/random/300x400?forest,11",
  },
  {
    username: "chillrunner",
    likes: 25,
    imageUrl: "https://source.unsplash.com/random/300x400?relax,12",
  },
];

type FeedCardProps = {
  data: {
    created_at: string;
    description: string;
    id: number;
    name: string;
    thumbnail_image_url: string;
  }[];
};
function FeedCard({ data }: FeedCardProps) {
  return (
    // TODO: 마이페이지에서 게시물 올리기 -> 올린 게시물 조회 되는 카드로 생각.
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pl-10 pr-10">
      {data.map((item, index) => (
        <Card
          key={index}
          username={item.name}
          // likes={item.likes}
          imageUrl={item.thumbnail_image_url ?? ""}
        />
      ))}
    </div>
  );
}

export default FeedCard;
