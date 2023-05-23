import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  innerBox: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: 392,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    borderColor: '#212121',
  },

  titleContainer: {
    margin: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#212121',
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,

  },
  inputContainer: {
  gap: 16,  
  },

  input: {
    height: 50,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#f6f6f6',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },

  button: {
    backgroundColor: '#FF6C00',
    height: 50,
    borderRadius: 100,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  loginBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    // marginBottom: 45,
  },
  loginText: {
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19
  },
});