import * as ImageManipulator from "expo-image-manipulator";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";


export const uploadPhotoToServer = async (photo, screenName) => {
    const { uri } = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    const response = await fetch(uri);
    const photoFile = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = screenName === "postScreen"
        ? ref(storage, `postsImages/post_${uniquePostId}`)
        : ref(storage, `avatarPhoto/avatar_${uniquePostId}`);

    try {
      await uploadBytesResumable(storageRef, photoFile);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };