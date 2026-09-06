import type { Metadata } from "next";
import PostsList from "@/components/post/PostsList";

export const metadata: Metadata = {
  title: "Popular | Reddish",
};

export default function PopularPage() {
  return (
    <>
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold">Popular</h1>
          <p className="text-sm text-gray-600">
            Top posts across all communities, ranked by net votes
          </p>
        </div>
      </section>

      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <PostsList sort="popular" />
        </div>
      </section>
    </>
  );
}
