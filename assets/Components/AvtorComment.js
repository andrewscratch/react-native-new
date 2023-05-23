import { Image, Text, View, StyleSheet } from "react-native";

export const AvtorComment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.commentTime}>{comment.commentTime}</Text>
      </View>
         {comment.photo ?
        <Image source={{ uri: comment.photo }} style={styles.image} /> :
        <Image style={{ width: 30, height: 30, borderRadius: 16 }}
        source={require('../images/avatar.png')}>
      </Image>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 28,
    height: 28,
  },
    textWrap: {
    height: 80,
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentTime: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
});