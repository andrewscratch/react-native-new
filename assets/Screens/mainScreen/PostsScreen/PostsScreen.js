import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
} from "react-native";

import { getPosts } from "../../../../redux/posts/postsOperations";
import { useDispatch, useSelector } from "react-redux";

import Posters from "../../../Components/Posters";

export default function PostScreen({ route, navigation }) {

  const { posts } = useSelector((state) => state.posts);
  const { userName } = useSelector((state) => state.auth);
  const { userEmail } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [])
  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20, position: "relative" }}>
      <View style={styles.container}>
        <Image source={{uri: avatar}} style={styles.photo} />
    <View>
          <Text style={styles.userName}>{ userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <SafeAreaView>
          <FlatList
          data={posts}
          renderItem={({ item }) => <Posters item={item} />}
          keyExtractor={(item) => item.idPost}
          style={{ paddingTop: 32,  marginBottom: 70, }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: 16,
    paddingBottom: 20
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  userName: {
    fontSize: 15,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontSize: 12,
    lineHeight: 13,
  },
});