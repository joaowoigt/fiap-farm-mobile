import { IconSymbol } from "@/components/ui/IconSymbol";
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

const getTypeLabel = (type: string): string => {
  switch (type) {
    case "crops":
      return "Cultura";
    case "livestock":
      return "Pecuária";
    case "dairy":
      return "Laticínios";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

export default function GoalsTableItem({ goal, type }: Props) {
  const tagColor = typeColors[type] || theme.colors.primary;
  const goalType = goal.type || "default";
  const goalTypeColor = goalTypeColors[goalType] || goalTypeColors.default;

  // Check if goal is completed
  const isCompleted = goal.current >= goal.goal;
  const progressPercentage = Math.min((goal.current / goal.goal) * 100, 100);

  return (
    <View style={[styles.container, isCompleted && styles.completedContainer]}>
      {/* Header with tags and completion status */}
      <View style={styles.header}>
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: tagColor }]}>
            <Text style={styles.tagText}>
              {type === "production" ? "Produção" : "Venda"}
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: goalTypeColor }]}>
            <Text style={styles.tagText}>{getTypeLabel(goalType)}</Text>
          </View>
        </View>

        {/* Completion icon */}
        {isCompleted && (
          <View style={styles.completionIcon}>
            <IconSymbol
              name="checkmark.circle.fill"
              size={24}
              color="#4CAF50"
            />
          </View>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: isCompleted ? "#4CAF50" : tagColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {progressPercentage.toFixed(0)}%
        </Text>
      </View>

      {/* Goal details */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Meta:</Text>
          <Text style={[styles.value, isCompleted && styles.completedValue]}>
            {type === "production"
              ? `${goal.goal.toLocaleString("pt-BR")} unidades`
              : goal.goal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Atual:</Text>
          <Text style={[styles.value, isCompleted && styles.completedValue]}>
            {type === "production"
              ? `${goal.current.toLocaleString("pt-BR")} unidades`
              : goal.current.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Text>
        </View>

        {/* Remaining to goal */}
        {!isCompleted && (
          <View style={styles.row}>
            <Text style={styles.label}>Faltam:</Text>
            <Text style={styles.remainingValue}>
              {type === "production"
                ? `${(goal.goal - goal.current).toLocaleString(
                    "pt-BR"
                  )} unidades`
                : (goal.goal - goal.current).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: theme.spacing["4"],
    marginBottom: theme.spacing["3"],
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedContainer: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing["3"],
  },
  tagsContainer: {
    flexDirection: "row",
    gap: theme.spacing["2"],
    flexWrap: "wrap",
    flex: 1,
  },
  tag: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    color: "#fff",
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "600",
  },
  completionIcon: {
    marginLeft: theme.spacing["2"],
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing["4"],
    gap: theme.spacing["3"],
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.text.secondary,
    minWidth: 35,
    textAlign: "right",
  },
  content: {
    gap: theme.spacing["2"],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "500",
  },
  value: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "600",
  },
  completedValue: {
    color: "#4CAF50",
  },
  remainingValue: {
    fontSize: theme.fontSize.base,
    color: "#F59E0B",
    fontFamily: theme.fontFamily.sans,
    fontWeight: "600",
  },
});
