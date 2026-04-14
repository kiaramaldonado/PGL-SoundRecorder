import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../theme/palette";

const TitleInput = () => {
  return (
    <View>
      <TextInput placeholder="Título del nuevo audio" style={styles.input} />
      <View style={[{ height: 4 }, { backgroundColor: COLORS.primary }]} />
    </View>
  );
};

export default TitleInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 26,
    textAlign: "center",
  },
});
