import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TitleInput from "../TitleInput";
import RecordButton from "../RecordButton";

const NewAudioForm = () => {
  return (
    <View style={styles.container}>
      <TitleInput />
      <RecordButton />
    </View>
  );
};

export default NewAudioForm;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    marginVertical: 30,
  },
});
