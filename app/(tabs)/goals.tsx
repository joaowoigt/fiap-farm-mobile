import theme from "@/design-system/src";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GoalsTableView from "../goals/table/goalsTableView";

export default function GoalsLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Section</Text>
      <GoalsTableView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    paddingTop: theme.spacing["12"],
  },
  title: {
    fontSize: theme.fontSize["2xl"],
    fontFamily: theme.fontFamily.sans,
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: theme.spacing["6"],
    fontWeight: "bold",
  },
});
