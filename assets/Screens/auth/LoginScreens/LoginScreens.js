import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  View, TextInput,
  TouchableOpacity, Keyboard
} from 'react-native';
import { authSignInUser } from "../../../../redux/auth/authOperations";
import { styles } from './LoginScreens.styled';

export const initialState = {
  userEmail: '',
  password: '',
};

export default function LoginScreens({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const BgImage = {uri: 'https://pibig.info/uploads/posts/2022-11/1669841130_1-pibig-info-p-altai-oboi-na-telefon-krasivo-1.jpg'};

    const formSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  }

     const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); 
  }
  return (
     <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={BgImage}
        >
    <KeyboardAvoidingView style={{ ...styles.loginContainer, paddingBottom: isShowKeyboard ? 10 : 45 }} >
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Увійти</Text>
      </View>
        
    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Електронна пошта'}
          value={state.userEmail}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, userEmail: value})) }
        />
        <TextInput style={styles.input}
          placeholder={'Пароль'}
          secureTextEntry={true}
          value={state.password}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
        />
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={formSubmit}>
        <Text style={styles.btnText}> Увійти</Text>
      </TouchableOpacity>

    <TouchableOpacity style={styles.loginBlock} onPress={() => {navigation.navigate("Registration")}}>
      <Text>Немає акаунту?<Text style={styles.loginText}> Зареєструватись</Text></Text>
    </TouchableOpacity>

          </KeyboardAvoidingView>
          </ImageBackground>
      {/* <StatusBar style="auto" /> */}
    </View>
    </TouchableWithoutFeedback>
  );
}