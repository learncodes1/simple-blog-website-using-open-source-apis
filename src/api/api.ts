const postBaseUrl: string = 'https://jsonplaceholder.typicode.com/posts';
const imageBaseUrl: string = 'https://picsum.photos/v2/list';

const fetchReq = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
};
export const blogFetchPost = async (id?: number) => {
  const postUrl: string = `${postBaseUrl}/${id}`;
  try {
    const response = await fetch(postUrl, fetchReq);

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const blogFetchPage = async (pageNo?: number) => {
  const postUrl: string = `${postBaseUrl}?_page=${pageNo}`;
  const imageUrl: string = `${imageBaseUrl}?page=${pageNo}&limit=10`;

  try {
    const [postResponse, imageResponse] = await Promise.all([
      fetch(postUrl, fetchReq),
      fetch(imageUrl, fetchReq),
    ]);
    if (!postResponse.ok || !imageResponse.ok) {
      throw new Error('Failed to fetch data.');
    }
    const postData = await postResponse.json();
    const imageData = await imageResponse.json();
    const imageLink = imageData.map((item: any) => {
      return { img: item.download_url };
    });

    const blogData = postData.map((item: any, i: number) => {
      return { ...item, ...imageLink[i] };
    });

    return blogData;
  } catch (error) {
    return { status: 500 };
  }
};

export const searchBlog = async (params?: string) => {
  const newParams = params?.split(' ').join('-');
  try {
    const response = await fetch(postBaseUrl, fetchReq);
    const data = await response.json();
    const filteredData = data.filter(
      (item: any) =>
        !!(item.title.includes(newParams) || item.body.includes(newParams)),
    );

    const imageUrl: string = `${imageBaseUrl}?page=1&limit=${newParams}`;
    const imageResponse = await fetch(imageUrl, fetchReq);
    const imageData = await imageResponse.json();
    const imageLink = imageData.map((item: any) => {
      return { img: item.download_url };
    });
    const blogData = filteredData.map((item: any, i: number) => {
      return { ...item, ...imageLink[i] };
    });
    return blogData;
  } catch (error) {
    return error;
  }
};
