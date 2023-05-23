import React, {useState} from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground, Text, View, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import { styles } from './RegistrationScreen.styled';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import { authSignUpUser } from '../../../../redux/auth/authOperations';
import { uploadPhotoToServer } from '../../../../firebase/firebaseUtils';
import { updateIsLoadAvatarOnServer } from '../../../../redux/auth/authReducer';

import { AntDesign } from '@expo/vector-icons'; 

export const initialState = {
  userName: '',
  userEmail: '',
  password: '',
  avatar: '',
};

export default function RegistrationScreens({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const isLoadAvatarOnServer = useSelector((state) => state.auth.isLoadAvatarOnServer);

  const dispatch = useDispatch();

  const formSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state))
    setState(initialState);
  }

    const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); 
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
    setState((prevS) => ({ ...prevS, avatar: uploadedPhoto }));
    dispatch(updateIsLoadAvatarOnServer(false));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../../images/photoBG.png" )}
        >   
          <KeyboardAvoidingView style={{ ...styles.registarationContainer, paddingBottom: isShowKeyboard ? 10 : 45 }}>
      { isLoadAvatarOnServer && <View><Text>...loading</Text></View>}
      <View style={styles.imgContainer}>
        {!state.avatar ?
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={selectImage}>
            <Image style={styles.imgForm}
                source={require('../../../images/avatar.png')}> 
              </Image>
                <AntDesign name="pluscircleo"
                size={25}
                color="#ff6c00"
                style={styles.addIcon} />
          </TouchableOpacity> :
          <TouchableOpacity
              style={styles.addPhotoIcon}
              activeOpacity={0.8}
              onPress={() =>
                setState((prevS) => ({ ...prevS, avatar: "" }))
              }>
              <Image
          source={{ uri: state.avatar }}
          style={styles.imgForm}/>  
              <AntDesign
                name="closecircleo"
                size={25}
                color="#BDBDBD"
                style={styles.addIcon}
              />
        </TouchableOpacity>}        
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Реєстрація</Text>
    </View>
  
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'Логін'}
        value={state.userName}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({ ...prevState, userName: value }))}
        />
      <TextInput
        style={styles.input}
        placeholder={'Електронна пошта'}
        value={state.userEmail}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({...prevState, userEmail: value})) }/>
      <TextInput style={styles.input}
        placeholder={'Пароль'}
        secureTextEntry={true}
        value={state.password}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({...prevState, password: value})) }/>
      </View>
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={formSubmit}>
        <Text style={styles.btnText}> Зареєструватись</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate("Login", { sessionId: 45, userId: "22e24" })}>
      <Text>Вже є акаунт?<Text style={styles.loginText}> Увійти</Text></Text>
    </TouchableOpacity>

          </KeyboardAvoidingView>
           </ImageBackground>
      {/* <StatusBar style="auto" /> */}
    </View>
    </TouchableWithoutFeedback>
  );
}