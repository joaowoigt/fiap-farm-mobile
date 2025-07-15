import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TableItem from "./tableItem/tableItem";

export default function TableView() {
  const { productionList } = useUser();

  // Empty state component
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhuma produção cadastrada</Text>
      <Text style={styles.emptyMessage}>
        Você ainda não possui itens de produção.{"\n"}
        Toque no botão + para adicionar sua primeira produção.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Headers - only show if there's data */}
      {productionList.length > 0 && (
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
      )}
      {/* Table Rows */}
      <FlatList
        data={productionList}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <TableItem production={item} />}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={
          productionList.length === 0 ? styles.emptyList : styles.list
        }
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 100, // Extra padding to avoid FAB overlap
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing["6"],
  },
  emptyTitle: {
    fontSize: theme.fontSize["xl"],
    fontWeight: "bold",
    color: theme.colors.text.default,
    marginBottom: theme.spacing["3"],
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
