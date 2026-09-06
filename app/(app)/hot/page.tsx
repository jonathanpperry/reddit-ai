import type { Metadata } from "next";
import PostsList from "@/components/post/PostsList";

export const metadata: Metadata = {
  title: "Hot / Controversial | Reddish",
};

export default function HotPage() {
  return (
    <>
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold">Hot / Controversial</h1>
          <p className="text-sm text-gray-600">
            Posts from the past seven days, ranked by total upvotes and
            downvotes
          </p>
        </div>
      </section>

      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <PostsList sort="hot" />
        </div>
      </section>
    </>
  );
}
