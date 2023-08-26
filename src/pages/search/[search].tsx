import { useState } from 'react';
// import type { AppStore } from 'store';
import { wrapper } from 'store';
import { fetchBlog, filteredData } from 'store/slices/search';

import BlogList from '@/components/BlogList';

import type { PostData } from '..';

type SSRpostListProp = {
  posts:{posts: PostData[];}
};

// with redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: any) => {
    const { params } = context;
    await store.dispatch(fetchBlog(params.search));

    const posts = filteredData(store.getState());

    return {
      props: {
        posts,
      },
    };
  },
);

// without redux
// export async function getStaticProps(context: any) {
//   const { params } = context;
//   const posts = await searchBlog(params.search);
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 1800,
//   };
// }

// export async function getStaticPaths() {
//   const posts = await searchBlog();

//   const paths =
//     posts.length !== undefined &&
//     posts.map((item: any) => ({
//       params: { search: item.title.toLowerCase().replace(/ /g, '-') },
//     }));

//   return { paths, fallback: 'blocking' };
// }

const Search = ({ posts }: SSRpostListProp) => {
  const itemsPerPage = 10;
  const [displayedData, setDisplayedData] = useState(
    posts.posts.slice(0, itemsPerPage),
  );

  const handleLoadMore = () => {
    const nextDataStartIndex = displayedData.length;
    const nextDataEndIndex = nextDataStartIndex + itemsPerPage;
    const nextData = posts.posts.slice(nextDataStartIndex, nextDataEndIndex);
    setDisplayedData([...displayedData, ...nextData]);
  };

  return posts.posts.length !== 0 ? (
    <>
      <div className="mb-10  mt-28 flex justify-center text-lg text-slate-600">
        Total: <span className="mx-1 font-bold"> {posts.posts.length} </span> result
        found
      </div>
      <div className="mx-auto my-0 grid w-9/12 grid-cols-4 gap-1 xl:w-11/12 xl:gap-2 lg:grid-cols-3 md:grid-cols-2 sm:!flex sm:grid-cols-1 sm:flex-col sm:items-center ">
        <BlogList posts={displayedData} />
      </div>
      <div className="flex justify-center">
        {posts.posts.length !== displayedData.length ? (
          <button
            type="button"
            onClick={handleLoadMore}
            className="my-5 mb-2 mr-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Load More
          </button>
        ) : (
          <div className="my-5 rounded bg-gray-300 px-36 py-5 text-2xl font-semibold text-darkgray">
            No more result
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="flex justify-center">
      <div className="mt-28 rounded bg-gray-300 px-36 py-5 text-2xl font-semibold text-darkgray">
        No result Found
      </div>
    </div>
  );
};

export default Search;
