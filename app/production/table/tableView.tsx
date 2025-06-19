import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Production from "@/domain/models/farm/production/Production";
import theme from "@/design-system/src";
import TableItem from "./tableItem/tableItem";

type TableViewProps = {
  productions: Production[];
};

export default function TableView({ productions }: TableViewProps) {
  return (
    <View style={styles.container}>
      {/* Table Headers */}
      <View style={styles.headerRow}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Produto</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Quantidade</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Status</Text>
        </View>
      </View>
      {/* Table Rows */}
      <FlatList
        data={productions}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <TableItem production={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing["4"],
    backgroundColor: theme.colors.background.default,
    borderRadius: 8,
    padding: theme.spacing["2"],
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.background.dark,
    borderRadius: 8,
    paddingVertical: theme.spacing["3"],
    marginBottom: theme.spacing["2"],
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: theme.spacing["2"],
  },
});
