import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GoalsTableItem from "./tableItem/goalsTableItem";

export default function GoalsTableView() {
  const { goals } = useUser();

  // Combine production and sales goals with their type for rendering
  const allGoals = [
    ...goals.productionGoals.map((goal) => ({
      goal,
      type: "production" as const,
    })),
    ...goals.salesGoals.map((goal) => ({ goal, type: "sale" as const })),
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={allGoals}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <GoalsTableItem goal={item.goal} type={item.type} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma meta cadastrada.</Text>
        }
        contentContainerStyle={
          allGoals.length === 0 ? styles.emptyContainer : undefined
        }
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
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize["xl"],
    fontFamily: theme.fontFamily.sans,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: theme.spacing["4"],
    textAlign: "center",
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.base,
    textAlign: "center",
    marginTop: theme.spacing["6"],
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
