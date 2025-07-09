import theme from "@/design-system/src";
import Goal from "@/domain/models/farm/goals/Goal";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  goal: Goal;
  type: "production" | "sale";
};

const typeColors: Record<string, string> = {
  production: theme.colors.primary,
  sale: theme.colors.secondary,
};

const goalTypeColors: Record<string, string> = {
  crops: "#4CAF50",
  livestock: "#FF9800",
  dairy: "#2196F3",
  default: theme.colors.secondary,
};

export default function GoalsTableItem({ goal, type }: Props) {
  const tagColor = typeColors[type] || theme.colors.primary;
  const goalType = goal.type || "default";
  const goalTypeColor = goalTypeColors[goalType] || goalTypeColors.default;

  return (
    <View style={styles.container}>
      {/* Tag for goal type (production/sale) */}
      <View style={[styles.tag, { backgroundColor: tagColor }]}>
        <Text style={styles.tagText}>
          {type === "production" ? "Produção" : "Venda"}
        </Text>
      </View>
      {/* Tag for goal category (crops, livestock, dairy) */}
      <View
        style={[
          styles.tag,
          { backgroundColor: goalTypeColor, marginBottom: theme.spacing["1"] },
        ]}
      >
        <Text style={styles.tagText}>
          {goalType.charAt(0).toUpperCase() + goalType.slice(1)}
        </Text>
      </View>{" "}
      {/* Goal setted */}
      <View style={styles.row}>
        <Text style={styles.label}>Meta:</Text>
        <Text style={styles.value}>
          {type === "production"
            ? `${goal.goal.toLocaleString("pt-BR")} unidades`
            : goal.goal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </Text>
      </View>
      {/* Current value */}
      <View style={styles.row}>
        <Text style={styles.label}>Atual:</Text>
        <Text style={styles.value}>
          {type === "production"
            ? `${goal.current.toLocaleString("pt-BR")} unidades`
            : goal.current.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    borderRadius: 8,
    padding: theme.spacing["4"],
    marginBottom: theme.spacing["3"],
    elevation: 1,
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: theme.spacing["2"],
  },
  tagText: {
    color: "#fff",
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing["1"],
  },
  label: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    fontFamily: theme.fontFamily.sans,
  },
  value: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
  },
});
