import { blogFetchPost } from "@/api/api";
import BlogDetails from "@/components/BlogDetails";

import type { PostData } from "../index";

type SSRpostDetailsProp = {
  postDetails: PostData;
};

const Blog = ({ postDetails }: SSRpostDetailsProp) => {
  return <BlogDetails data={postDetails} />;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const data = await blogFetchPost(id ?? 1);
  return {
    props: {
      postDetails: data,
    },
  };
}

export default Blog;
