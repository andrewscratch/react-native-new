import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { changeLikes } from "../../redux/posts/postsOperations";

export default function Posters({ item }) {
  const navigations = useNavigation();
  
  const dispatch = useDispatch();

  const likesQuantity = () => {
    dispatch(changeLikes(item.idPost));
  };
    
  return (
    <View style={styles.container}>
      <Image source={item.photo && {uri: item.photo}} style={styles.photo} />
      <View>
        <Text style={{ ...styles.title, marginBottom: 11 }}>{item.title}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
            onPress={() => navigations.navigate("Comments", {
                  postId: item.idPost,
                  photo: item.photo,
                })}
          >
            <Feather
              name="message-circle"
              size={24}
              color={item.comments === 0 ? "#BDBDBD" : "#FF6C00"}
              style={styles.messageIcon}
             
            />
            <Text
              style={{
                ...styles.title,
                color: item.comments === 0 ? "#BDBDBD" : "#212121",
                marginLeft: 9,
              }}
            >
              {item.comments}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={likesQuantity}
            activeOpacity={0.8}
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={item.likes === 0 ? "#BDBDBD" : "#FF6C00"}
            />
            <Text
              style={{
                ...styles.title,
                color: item.likes === 0 ? "#BDBDBD" : "#212121",
                marginLeft: 9,
              }}
            >
              {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
            onPress={() => navigations.navigate("MapScreen", {
                  locationDescr: item.locationDescr,
                  location: item.location,
                  photo: item.photo,
                })}
            activeOpacity={0.8}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.location}>{item.locationDescr}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 50,
  },
  photo: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  messageIcon: {
    transform: [{ rotate: "270deg" }],
  },
  location: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});