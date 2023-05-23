import {
  View,
  Image,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { UserComment } from "../../../Components/UserComment";
import { AvtorComment } from "../../../Components/AvtorComment";
import { uploadComments, getCommentsByPostId } from "../../../../redux/posts/postsOperations";

import { styles } from './CommentsScreen.styled';

export default function CommentsScreen({ route }) {
  const userId = useSelector((state) => state.auth.userId);
  const avatar = useSelector((state) => state.auth.avatar);
  const postId = route.params.postId;
  const photo = route.params.photo;
  const comments = useSelector((state) => state.posts.comments);
  const [comment, setComment] = useState();
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getCommentsByPostId(postId));
    }, [postId]);
  
    const updateTime = () => {
    const currentDate = new Date();
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const formattedDate = currentDate.toLocaleDateString("uk-UA", options);
    return formattedDate;
  };

  const submitComment = () => {
    const commentTime = updateTime();
    const commentInfo = {
      comment,
      commentTime,
      photo: avatar,
    };
    dispatch(uploadComments(postId, commentInfo));
    Keyboard.dismiss();
    setComment("");
    dispatch(getCommentsByPostId(postId));
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <Image source={{uri: photo}} style={styles.photo} />
       
           <FlatList
          data={comments}
          renderItem={({ item }) =>
            item.userId === userId ? (
              <AvtorComment comment={item} />
            ) : (
              <UserComment comment={item} />
            )
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
        />
          <TextInput
            style={styles.input}
            value={comment}
            placeholder="Write comment..."
            placeholderColor=" #BDBDBD"
            onBlur={() => Keyboard.dismiss()}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity activeOpacity={0.8}
            style={styles.inputBtn}
            onPress={() => comment && submitComment()}>
            <Feather name="arrow-up" size={24} color="#fff" />
          </TouchableOpacity>
      </View>
    </View>
  );
}