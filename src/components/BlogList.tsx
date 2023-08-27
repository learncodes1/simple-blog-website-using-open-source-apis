import { useRouter } from "next/router";
import React from "react";
// '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
// According .eslintrc line no:50
const excerpt = (text: string): string => {
  const words = text.split(" ");
  const filteredWords = words.filter((word) => word.length <= 15);
  return (
    filteredWords.join(" ").trim() +
    (filteredWords.length < words.length ? " ..." : "")
  );
};

type PostData = {
  id: number;
  body: string;
  img: string;
  title: string;
};

type BlogListProps = {
  posts: PostData[];
};

const BlogList = ({ posts }: BlogListProps) => {
  const router = useRouter();
  return (
    <>
      {posts.map(({ id, title, body, img }) => (
        <div
          key={id}
          className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <img
            className="rounded-t-lg"
            src={img ?? "https://source.unsplash.com/380x260"}
            alt=""
          />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {excerpt(body)}
            </p>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: `/blog/${title.split(" ").join("-")}`,
                  query: { id: JSON.stringify(id) },
                });
              }}
              className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogList;
