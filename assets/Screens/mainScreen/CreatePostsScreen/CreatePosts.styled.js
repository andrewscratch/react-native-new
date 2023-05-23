import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
  },
  cameraWrap: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#000000",
    height: 240,
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 30,
  },
  btnText: {
    // fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    alignSelf: "center",
    marginTop: "auto",
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
        // marginTop: 300,
    }, 
  takePhotoContainer: {
      flex: 1,
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
});