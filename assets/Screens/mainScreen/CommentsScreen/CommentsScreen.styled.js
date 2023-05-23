import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // position: "relative",
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
  },
  photo: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    padding: 13,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputBtn: {
    position: "absolute",
    bottom: 10,
    right: 5,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});