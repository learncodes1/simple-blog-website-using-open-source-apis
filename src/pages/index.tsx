import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import type { AppStore } from 'store';
import { wrapper } from "store";
import { fetchBlogData, selectBlogData } from "store/slices/blog";

import BlogList from "@/components/BlogList";
import LoadingList from "@/components/Loading";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

export interface PostData {
  id: number;
  body: string;
  img: string;
  title: string;
}

type SSRpostsProp = {
  posts: { posts: PostData[] };
  status: number;
};

const Index = ({ posts, status }: SSRpostsProp) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pageQuery = router.query.page ? Number(router.query.page) : 1;
    setPage(pageQuery);
    setLoading(false);
  }, [router.query.page]);

  const handleClickNext = () => {
    setLoading(true);
    const nextPage = page + 1;
    router.push({
      pathname: "/",
      query: { page: nextPage },
    });
  };

  const handleClickPrevious = () => {
    setLoading(true);
    if (page > 1) {
      const previousPage = page - 1;
      router.push({
        pathname: "/",
        query: { page: previousPage },
      });
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next.js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="mx-auto my-0 grid w-9/12 grid-cols-4 gap-1 xl:w-11/12 xl:gap-2 lg:grid-cols-3 md:grid-cols-2 sm:!flex sm:grid-cols-1 sm:flex-col sm:items-center">
        {loading ? (
          <LoadingList />
        ) : status !== 500 ? (
          <BlogList posts={posts.posts} />
        ) : (
          <div className="">No Post Found</div>
        )}
      </div>
      <div className="my-2 flex justify-center">
        <button
          disabled={page === 1}
          onClick={handleClickPrevious}
          type="button"
          className={`mr-2 rounded bg-black px-3 py-1 font-black text-white ${
            page === 1 ? "opacity-50" : ""
          }`}
        >
          {"<"}
        </button>
        <button
          onClick={handleClickNext}
          type="button"
          className="ml-2 rounded bg-black px-3 py-1 font-black text-white"
        >
          {">"}
        </button>
      </div>
    </Main>
  );
};

// with redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;
    await store.dispatch(fetchBlogData(page)); // Assuming fetchBlogData is an imported action creator
    const posts = selectBlogData(store.getState()); // Assuming selectBlogData is an imported selector function

    return {
      props: {
        posts,
      },
    };
  },
);

// export async function getServerSideProps(context: any) {
//   const { page } = context.query;
//   const data = await blogFetchPage(page ?? 1);
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }

export default Index;
