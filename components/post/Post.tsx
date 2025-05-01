import {
  GetAllPostsQueryResult,
  //   GetPostsForSubredditQueryResult,
} from "@/sanity.types";
// import { getPostComments } from "@/sanity/lib/vote/getPostComments";
// import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";
// import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
// import TimeAgo from "../TimeAgo";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MessageSquare } from "lucide-react";
// import CommentInput from "../comment/CommentInput";
// import CommentList from "../comment/CommentList";
// import PostVoteButtons from "./PostVoteButtons";
// import ReportButton from "../ReportButton";
// import DeleteButton from "../DeleteButton";

interface PostProps {
  post: GetAllPostsQueryResult[number];
  userId: string | null;
}

async function Post({ post, userId }: PostProps) {
  return <div>Post</div>;
}

export default Post;
