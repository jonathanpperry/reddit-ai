import { getPosts, type PostSort } from "@/sanity/lib/post/getPosts";
import { currentUser } from "@clerk/nextjs/server";
import type { GetAllPostsQueryResult } from "@/sanity.types";
import Post from "@/components/post/Post";

interface PostsListProps {
  sort?: PostSort;
}

async function PostsList({ sort = "new" }: PostsListProps) {
  const [posts, user] = await Promise.all([getPosts(sort), currentUser()]);

  if (!posts.length) {
    return (
      <p className="rounded-md border bg-white p-6 text-sm text-gray-600">
        {sort === "hot"
          ? "No posts in the past seven days. Start a conversation!"
          : "No posts yet. Be the first to share something!"}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post: GetAllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} userId={user?.id ?? null} />
      ))}
    </div>
  );
}

export default PostsList;
