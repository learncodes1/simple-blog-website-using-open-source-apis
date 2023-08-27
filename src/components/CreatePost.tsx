import type { ChangeEvent } from "react";
import { useState } from "react";

type PostData = {
  userId: number;
  title: string;
  body: string;
  img: string;
};
const initialData: PostData = {
  userId: Math.floor(Math.random() * 100),
  title: "",
  body: "",
  img: "",
};

const CreatePost = () => {
  const [postData, setPostData] = useState(initialData);
  const [fetchStatus, setFetchStatus] = useState({ status: 0 });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, title: e.target.value });
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, body: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, img: e.target.value });
  };

  const { title, body, img, userId } = postData;

  const handleAddPost = async () => {
    if (!title || !body || !img) {
      setFetchStatus({ status: 400 });
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            img,
            userId,
          }),
        },
      );

      setPostData(initialData);

      if (!response.ok) {
        throw new Error("Failed to add post");
      } else {
        setFetchStatus({ status: 201 });
      }
      // const data = await response.json();
    } catch (error) {
      setFetchStatus({ status: 500 });
    }
  };

  return (
    <>
      <div className="mx-auto mt-28  max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Add Post</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 w-full rounded-md border p-2"
            value={postData.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            className="mt-1 w-full rounded-md border p-2"
            rows={4}
            value={postData.body}
            onChange={handleBodyChange}
          />

          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
            id="file_input"
            type="file"
            value={postData.img}
            onChange={handleImageChange}
          />
        </div>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>
      {fetchStatus.status === 201 ? (
        <div className="my-5 rounded bg-gray-300 px-36 py-5 text-2xl font-semibold text-darkgray">
          Successfully added
        </div>
      ) : fetchStatus.status === 500 ? (
        <div className="my-5 rounded bg-red-500 px-36 py-5 text-2xl font-semibold text-darkgray">
          Failed to add post
        </div>
      ) : fetchStatus.status === 400 ? (
        <div className="my-5 rounded bg-red-500 px-36 py-5 text-2xl font-semibold text-darkgray">
          Validation error: Please fill all fields
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CreatePost;
