import { blogFetchPage } from '@/api/api';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { PostData } from '../pages/index';

type SSRpostDetailsProp = {
  data: PostData;
};
const BlogDetails = ({ data }: SSRpostDetailsProp) => {
  const { title, body, img } = data;
  return (
    <Main meta={<Meta title={title} description={body} />}>
      <article className='container mx-auto max-w-[1120px] px-[15px] '>
        <div className=''>
          <h1 className='text-5xl'>{title}</h1>
          <span />
          <img
            alt={title}
            className='shadow-blue-gray-900/50 my-[15px] h-96 w-full rounded-lg object-cover object-center shadow-xl'
            src={img ?? 'https://source.unsplash.com/340x130'}
            width={1920}
            height={1080}
          />
          <div>{body}</div>
        </div>
      </article>
    </Main>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const data = await blogFetchPage(id ?? 1);
  return {
    props: {
      posts: data,
    },
  };
}

export default BlogDetails;
