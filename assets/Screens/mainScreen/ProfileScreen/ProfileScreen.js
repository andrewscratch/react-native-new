import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Posters from "../../../Components/Posters";
import { updateIsLoadAvatarOnServer } from "../../../../redux/auth/authReducer";
import { uploadPhotoToServer } from '../../../../firebase/firebaseUtils';

import { styles } from "./ProfileScreen.styled"
import { authSignOutUser, authUpdateAvatar } from "../../../../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const { posts } = useSelector((state) => state.posts);
  const { userName } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.auth);
  
  const isLoadAvatarOnServer = useSelector((state) => state.auth.isLoadAvatarOnServer);

  const dispatch = useDispatch();
  
  const signOut = () => {
dispatch(authSignOutUser())
  }

   const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
      }
          let imgResult = await ImagePicker.launchImageLibraryAsync();
    dispatch(updateIsLoadAvatarOnServer(true));

    if (imgResult.canceled === true) {
      return;
    }
    const source = imgResult.assets[0].uri;
    const uploadedPhoto = await uploadPhotoToServer(source, "avatars");
    dispatch(authUpdateAvatar(uploadedPhoto));
    dispatch(updateIsLoadAvatarOnServer(false));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../../../images/photoBG.png")}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <View style={styles.form}>
            
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginBottom: 30,
                paddingRight: 16,
              }}
              onPress={signOut}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"/>
            </TouchableOpacity>

            <View style={styles.photoDef}>
             { isLoadAvatarOnServer && <Text>...loading</Text>}
              {avatar ?
                <Image
                source={{ uri: avatar }}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
                /> :
                <Image style={{ width: "100%", height: "100%", borderRadius: 16 }}
                source={require('../../../images/avatar.png')}>
                </Image>
              }
               { !avatar ? 
                <TouchableOpacity
                  style={styles.addPhotoIcon}
                  activeOpacity={0.8}
                  onPress={selectImage}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
                : 
                <TouchableOpacity
                  style={styles.addPhotoIcon}
                  activeOpacity={0.8}
                  onPress={() => dispatch(authUpdateAvatar(null))}>
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#dad9d9"
                    style={{ backgroundColor: "#fff", borderRadius: 50 }}
                    onPress={() => dispatch(authUpdateAvatar(null))}/>
                </TouchableOpacity>
               } 
            </View>
              <Text style={styles.title}>{userName}</Text>
         
            { posts.length === 0 && <Text>Create your first poster!</Text>}
              
            <SafeAreaView>
                <FlatList
                  data={posts}
                  renderItem={({ item }) => <Posters item={item} />}
                  keyExtractor={(item) => item.idPost}
                  style={{ gap: 34 }}
                />
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}