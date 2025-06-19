import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TableView from "../production/table/tableView";

export default function ProductionLayout() {
  const { productionList } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Production Section</Text>
      <TableView productions={productionList} />
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
