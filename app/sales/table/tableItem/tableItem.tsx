import theme from "@/design-system/src";
import SalesItem from "@/domain/models/farm/sales/SalesItem";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TableItemProps = {
  sale: SalesItem;
};

const typeColors: Record<string, string> = {
  crops: "#4CAF50",
  livestock: "#FF9800",
  dairy: "#2196F3",
  // Add more types as needed
  default: theme.colors.secondary,
};

export default function TableItem({ sale }: TableItemProps) {
  const typeKey = sale.product.type || "default";
  const typeColor = typeColors[typeKey] || typeColors.default;

  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.text}>{sale.product.name}</Text>
      </View>
      <View style={styles.cell}>
        <View style={[styles.typeTag, { backgroundColor: typeColor }]}>
          <Text style={styles.typeText}>{sale.product.type}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>
          {sale.income.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
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
  typeTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
