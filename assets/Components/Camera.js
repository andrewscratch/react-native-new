import React, { useState } from "react";
import {
  View,
    StyleSheet,
    Text, Image, TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    
    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);
  }
  
  const sentPhoto = () => {
    navigation.navigate("Posts", {photo})
  }
    return (
      <View style={styles.container}>
        <View style={{ borderRadius: 8, borderWidth: 1, backgroundColor: "#000000", height: 240, justifyContent: "center"}}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: photo }} style={{ height: 150,
                      width: 270, borderRadius: 8,}} />
                </View>
                )}
                <TouchableOpacity onPress={takePhoto} style={styles.snap}>
                    <MaterialIcons name="camera" size={35} color="#BDBDBD" />
                </TouchableOpacity>
          </Camera>
          </View>
        <TouchableOpacity onPress={sentPhoto} activeOpacity={0.8} style={styles.loadImg}>
            <Text style={styles.text}>Завантажте фото</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  camera: {
        alignItems: "center",
        height: 230,
      justifyContent: "flex-end",
      borderRadius: 8,
      borderWidth: 1,
        
    },
    snap: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: "#BDBDBD",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    }, 
    takePhotoContainer: {
        position: "absolute",
        top: 10,
        left: 45,
        borderColor: "#fff",
      borderWidth: 1,
        borderRadius: 5, 
  },
  loadImg: {
      marginTop: 5,
    height: 25,
    }
})