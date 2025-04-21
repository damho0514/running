"use client";

import React, { useEffect, useRef } from "react";
import FeedCard from "../components/Feeds/FeedCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTemplates } from "../lib/fetchTemplates";

function Page() {
  const loadMoreRef = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["templates"],
      queryFn: fetchTemplates,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });
  console.log({ fetchTemplates });
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
    <>
      <FeedCard data={data?.pages.flatMap((res) => res.templates) || []} />

      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
}

export default Page;
