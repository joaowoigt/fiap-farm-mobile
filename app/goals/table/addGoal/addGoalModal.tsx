import theme from "@/design-system/src";
import Goal from "@/domain/models/farm/goals/Goal";
import { Type } from "@/domain/models/farm/product/Type";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddGoalModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddGoal: (goal: Goal, goalType: "production" | "sales") => Promise<boolean>;
};

const productTypeOptions = [
  { label: "Cultura", value: Type.crops },
  { label: "Pecuária", value: Type.livestock },
  { label: "Laticínios", value: Type.dairy },
];

const goalTypeOptions = [
  { label: "Meta de Produção", value: "production" },
  { label: "Meta de Vendas", value: "sales" },
];

export default function AddGoalModal({
  visible,
  onClose,
  onAddGoal,
}: AddGoalModalProps) {
  const [productType, setProductType] = useState<Type>(Type.crops);
  const [goalType, setGoalType] = useState<"production" | "sales">(
    "production"
  );
  const [goalValue, setGoalValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Format currency input for sales goals
  const handleGoalValueChange = (text: string) => {
    if (goalType === "sales") {
      // Remove non-digit chars
      const numeric = text.replace(/\D/g, "");
      // Format as BRL currency
      const floatValue = (parseInt(numeric || "0", 10) / 100).toFixed(2);
      setGoalValue(
        Number(floatValue).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      );
    } else {
      // For production goals, only allow numbers
      setGoalValue(text.replace(/[^0-9]/g, ""));
    }
  };

  // Parse goal value based on goal type
  const parseGoalValue = (formattedValue: string): number => {
    if (goalType === "sales") {
      const cleanValue = formattedValue
        .replace(/[R$\s.]/g, "")
        .replace(",", ".");
      return parseFloat(cleanValue) || 0;
    } else {
      return parseInt(formattedValue) || 0;
    }
  };

  const resetForm = () => {
    setProductType(Type.crops);
    setGoalType("production");
    setGoalValue("");
    setIsLoading(false);
  };

  const validateForm = (): string | null => {
    if (!goalValue || parseGoalValue(goalValue) <= 0) {
      return "Valor da meta deve ser maior que zero";
    }
    return null;
  };

  const handleAddGoal = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert("Erro de Validação", errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      // Create Goal object
      const goal: Goal = {
        type: productType,
        goal: parseGoalValue(goalValue),
        current: 0, // Start with 0 current value
      };

      // Add goal using the provided function
      const success = await onAddGoal(goal, goalType);

      if (success) {
        Alert.alert("Sucesso", "Meta adicionada com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              resetForm();
              onClose();
            },
          },
        ]);
      } else {
        Alert.alert("Erro", "Falha ao adicionar meta. Tente novamente.");
      }
    } catch (error) {
      console.error("Error adding goal:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const hasFormData = goalValue;

    if (hasFormData && !isLoading) {
      Alert.alert(
        "Descartar alterações?",
        "Você tem dados não salvos. Deseja descartar as alterações?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Descartar",
            style: "destructive",
            onPress: () => {
              resetForm();
              onClose();
            },
          },
        ]
      );
    } else {
      resetForm();
      onClose();
    }
  };

  // Update goal value format when goal type changes
  const handleGoalTypeChange = (newGoalType: "production" | "sales") => {
    setGoalType(newGoalType);

    // If there's a value, reformat it for the new goal type
    if (goalValue) {
      const currentValue = parseGoalValue(goalValue);
      if (newGoalType === "sales") {
        // Convert to currency format
        setGoalValue(
          currentValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        );
      } else {
        // Convert to plain number
        setGoalValue(currentValue.toString());
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Adicionar Meta</Text>

          {/* Product Type Selection */}
          <Text style={styles.label}>Tipo de Produto</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={productType}
              onValueChange={setProductType}
              style={styles.picker}
              dropdownIconColor={theme.colors.primary}
            >
              {productTypeOptions.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>

          {/* Goal Type Selection */}
          <Text style={styles.label}>Tipo de Meta</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={goalType}
              onValueChange={handleGoalTypeChange}
              style={styles.picker}
              dropdownIconColor={theme.colors.primary}
            >
              {goalTypeOptions.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>

          {/* Goal Value Input */}
          <Text style={styles.label}>
            {goalType === "production" ? "Quantidade (unidades)" : "Valor (R$)"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={
              goalType === "production"
                ? "Digite a quantidade em unidades"
                : "Digite o valor em reais"
            }
            value={goalValue}
            onChangeText={handleGoalValueChange}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.text.secondary}
          />

          {/* Add Goal Button */}
          <TouchableOpacity
            style={[styles.addButton, isLoading && styles.disabledButton]}
            onPress={handleAddGoal}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adicionando..." : "Adicionar Meta"}
            </Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 450,
    alignItems: "stretch",
  },
  sheetTitle: {
    fontSize: theme.fontSize["xl"],
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.primary,
    textAlign: "center",
  },
  label: {
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
    color: theme.colors.text.default,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    backgroundColor: theme.colors.background.default,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: theme.colors.background.default,
  },
  picker: {
    width: "100%",
    color: theme.colors.text.default,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "stretch",
    marginBottom: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.fontSize.base,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.fontSize.base,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
