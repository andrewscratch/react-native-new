import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    updatePicture: (state, { payload }) => {
      return { ...state, pictureData: payload };
    },
     updateLikes: (state, { payload }) => {
      const { id, likes } = payload;
      const updatedPosts = state.posts.map((post) => {
        if (post.idPost === id) {
          return { ...post, likes };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
    updateComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    updateCountComments: (state, { payload }) => {
      const { id, comments } = payload;
      const updatedPosts = state.posts.posts.map((post) => {
        if (post.idPost === id) {
          return { ...post, comments };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
  },
});