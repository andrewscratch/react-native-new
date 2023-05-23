import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";

export const uploadPostToServer = (posts) => async (_, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, "posts"), {
      ...posts,
      userId: userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
        for (const doc of querySnapshot.docs) {
      const postData = { ...doc.data(), idPost: doc.id };

      const commentsSnapshot = await getDocs(
        collection(db, "posts", postData.idPost, "comments")
      );
      const commentCount = commentsSnapshot.size;

      await updateDoc(doc.ref, { comments: commentCount });

      allPosts.push({
        ...postData,
        comments: commentCount,
      });
    }

    dispatch(postsSlice.actions.updatePosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadComments = (postId, comment) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const commentRef = collection(db, "posts", postId, "comments");
      
      await addDoc(commentRef, {
        ...comment,
        userId: userId,
      });
      dispatch(getPosts());
    } catch (error) {
      console.log(error.message);
    }
  };

export const getCommentsByPostId = (postId) => async (dispatch, getState) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef);
    const commentsSnapshot = await getDocs(q);
    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(postsSlice.actions.updateComments(comments));
  } catch (error) {
    console.log(error.message);
  }
};

    export const changeLikes = (postId) => async (dispatch, getState) => {
      try {
        const postRef = doc(db, "posts", postId);
        const countLikes = (await getDoc(postRef)).data().likes;
    
        await updateDoc(postRef, {
          likes: countLikes + 1,
        });
    
        dispatch(postsSlice.actions.updateLikes({ id: postId, likes: countLikes + 1 }));
      } catch (error) {
        console.log(error.message);
      }
    };
