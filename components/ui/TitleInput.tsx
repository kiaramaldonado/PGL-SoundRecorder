import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../theme/palette";

interface TitleInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const TitleInput = ({ value, onChangeText }: TitleInputProps) => {
  return (
    <View>
      <TextInput
        placeholder="Título del nuevo audio"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={{ height: 4, backgroundColor: COLORS.primary }} />
    </View>
  );
};

export default TitleInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 8,
  },
});
