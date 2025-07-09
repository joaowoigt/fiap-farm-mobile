import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import GoalsTableItem from "./tableItem/goalsTableItem";

export default function GoalsTableView() {
  const { goals } = useUser();

  const hasProductionGoals = goals.productionGoals.length > 0;
  const hasSalesGoals = goals.salesGoals.length > 0;
  const hasAnyGoals = hasProductionGoals || hasSalesGoals;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {!hasAnyGoals ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma meta cadastrada.</Text>
        </View>
      ) : (
        <>
          {/* Production Goals Section */}
          {hasProductionGoals && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Metas de Produção</Text>
              <View style={styles.sectionContent}>
                {goals.productionGoals.map((goal, index) => (
                  <GoalsTableItem
                    key={`production-${index}`}
                    goal={goal}
                    type="production"
                  />
                ))}
              </View>
            </View>
          )}

          {/* Sales Goals Section */}
          {hasSalesGoals && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Metas de Vendas</Text>
              <View style={styles.sectionContent}>
                {goals.salesGoals.map((goal, index) => (
                  <GoalsTableItem
                    key={`sales-${index}`}
                    goal={goal}
                    type="sale"
                  />
                ))}
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  contentContainer: {
    padding: theme.spacing["4"],
    paddingBottom: 100, // Extra space for FAB
  },
  section: {
    marginBottom: theme.spacing["6"],
  },
  sectionTitle: {
    fontSize: theme.fontSize["lg"],
    fontFamily: theme.fontFamily.sans,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: theme.spacing["3"],
    paddingHorizontal: theme.spacing["2"],
  },
  sectionContent: {
    gap: theme.spacing["3"],
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.base,
    textAlign: "center",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing["12"],
  },
});
