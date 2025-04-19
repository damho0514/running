import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Hero Section */}
      <section className="bg-orange-100 text-center py-12 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          오늘도 가볍게, 러닝 한 걸음
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          초보 러너도 쉽게 시작하는 건강한 습관
        </p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
          지금 시작하기
        </button>
      </section>

      {/* 개인 기록 or 목표 */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-2">나의 러닝</h2>
        <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-600">이번 주 목표</p>
            <p className="text-lg font-bold">15km / 30km</p>
          </div>
          <button className="text-sm text-blue-500 underline">기록 보기</button>
        </div>
      </section>

      {/* 커뮤니티 인증 피드 */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">함께 달린 사람들</h2>
        {/* <RunningFeed /> */}
      </section>
    </HydrationBoundary>
  );
}
