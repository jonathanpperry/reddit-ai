import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export type PostSort = "new" | "popular" | "hot";

export async function getPosts(sort: PostSort = "new") {
  const getAllPostsQuery = defineQuery(`
    *[
      _type == "post" &&
      isDeleted != true &&
      (
        $sort != "hot" ||
        dateTime(coalesce(publishedAt, _createdAt)) >=
          dateTime(now()) - 60 * 60 * 24 * 7
      )
    ] {
      _id,
      title,
      "slug": slug.current,
      body,
      "publishedAt": coalesce(publishedAt, _createdAt),
      "author": author->,
      "subreddit": subreddit->,
      image,
      isDeleted,
      "upvotes": count(*[
        _type == "vote" &&
        post._ref == ^._id &&
        voteType == "upvote"
      ]),
      "downvotes": count(*[
        _type == "vote" &&
        post._ref == ^._id &&
        voteType == "downvote"
      ])
    }
    | order(
      select(
        $sort == "popular" => upvotes - downvotes,
        $sort == "hot" => upvotes + downvotes,
        0
      ) desc,
      publishedAt desc,
      _id asc
    )
  `);

  const posts = await sanityFetch({
    query: getAllPostsQuery,
    params: { sort },
    stega: false,
  });

  return posts.data;
}
