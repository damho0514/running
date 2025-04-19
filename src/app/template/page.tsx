"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchTemplates } from "../lib/fetchTemplates";
import Image from "next/image";

export default function InfiniteTemplates() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["templates"],
      queryFn: fetchTemplates,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const loadMoreRef = useRef(null);
  console.log({ data });

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="p-4 space-y-4">
      {data?.pages.map((page) =>
        page.templates.map((template) => {
          const src = template.thumbnail_image_url?.trim();
          console.log({ src });
          return (
            <div key={template.id} className="border rounded p-2">
              <h2 className="text-lg font-semibold">{template.name}</h2>
              <p className="text-sm text-gray-500">{template.description}</p>
              {src ? (
                <Image
                  src={src}
                  alt={template.name}
                  width={300}
                  height={300}
                  className="rounded mt-2"
                />
              ) : (
                <p className="text-sm text-red-400 mt-2">이미지 없음</p>
              )}
            </div>
          );
        })
      )}

      {isFetchingNextPage && <p>Loading more...</p>}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
