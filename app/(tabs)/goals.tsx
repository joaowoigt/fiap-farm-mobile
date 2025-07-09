import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddGoalModal from "../goals/table/addGoal/addGoalModal";
import GoalsTableView from "../goals/table/goalsTableView";

export default function GoalsLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const { addGoal } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas</Text>
      <GoalsTableView />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Add Goal Modal */}
      <AddGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddGoal={addGoal}
      />
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
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -2,
  },
});
