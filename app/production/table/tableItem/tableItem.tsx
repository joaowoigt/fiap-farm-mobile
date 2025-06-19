import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Production from "@/domain/models/farm/production/Production";
import theme from "@/design-system/src";

type TableItemProps = {
  production: Production;
};

const statusColors: Record<string, string> = {
  waiting: theme.colors.secondary,
  inProgress: theme.colors.primaryLight,
  done: theme.colors.primary,
};

const statusLabels: Record<string, string> = {
  waiting: "Aguardando",
  inProgress: "Em Progresso",
  done: "Concluído",
};

export default function TableItem({ production }: TableItemProps) {
  const statusKey =
    typeof production.status === "string"
      ? production.status
      : String(production.status);

  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.text}>{production.product.name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{production.quantity}</Text>
      </View>
      <View style={styles.cell}>
        <View
          style={[
            styles.statusTag,
            {
              backgroundColor:
                statusColors[statusKey] || theme.colors.secondary,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {statusLabels[statusKey] || statusKey}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: theme.spacing["2"],
    padding: theme.spacing["3"],
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    fontFamily: theme.fontFamily.sans,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
  },
});
