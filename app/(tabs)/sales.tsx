import theme from "@/design-system/src";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SalesTableView from "../sales/table/tableView";

export default function SalesLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Section</Text>
      <SalesTableView />
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
