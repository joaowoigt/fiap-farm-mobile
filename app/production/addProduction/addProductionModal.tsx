import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import Product from "@/domain/models/farm/product/Product";
import { Type } from "@/domain/models/farm/product/Type";
import Production from "@/domain/models/farm/production/Production";
import { Status } from "@/domain/models/farm/production/Status";
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

type AddProductionModalProps = {
  visible: boolean;
  onClose: () => void;
};

const statusOptions = [
  { label: "Em progresso", value: Status.inProgress },
  { label: "Aguardando", value: Status.waiting },
  { label: "Concluído", value: Status.done },
];

const typeOptions = [
  { label: "Cultura", value: "crops" },
  { label: "Pecuária", value: "livestock" },
  { label: "Laticínios", value: "dairy" },
];

export default function AddProductionModal({
  visible,
  onClose,
}: AddProductionModalProps) {
  const { addProduction } = useUser();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("inProgress");
  const [unitValue, setUnitValue] = useState("");
  const [type, setType] = useState("crops");
  const [isLoading, setIsLoading] = useState(false);

  // Format currency input for unit value
  const handleUnitValueChange = (text: string) => {
    // Remove non-digit chars
    const numeric = text.replace(/\D/g, "");
    // Format as BRL currency
    const floatValue = (parseInt(numeric || "0", 10) / 100).toFixed(2);
    setUnitValue(
      Number(floatValue).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const resetForm = () => {
    setProductName("");
    setQuantity("");
    setStatus("inProgress");
    setUnitValue("");
    setType("crops");
  };

  const handleAddProduction = async () => {
    // Validate form
    if (!productName.trim()) {
      Alert.alert("Erro", "Nome do produto é obrigatório");
      return;
    }
    if (!quantity.trim()) {
      Alert.alert("Erro", "Quantidade é obrigatória");
      return;
    }
    if (!unitValue.trim()) {
      Alert.alert("Erro", "Valor unitário é obrigatório");
      return;
    }

    setIsLoading(true);

    try {
      // Parse unit value from formatted string
      const numericValue = parseFloat(
        unitValue.replace(/[^\d,]/g, "").replace(",", ".")
      );

      // Create Product object
      const product: Product = {
        name: productName.trim(),
        type: type as Type,
        unitValue: numericValue,
      };

      // Create Production object
      const production: Production = {
        product,
        quantity: parseInt(quantity, 10),
        status: status as Status,
      };

      // Call addProduction from UserContext
      const success = await addProduction(production);

      if (success) {
        Alert.alert("Sucesso", "Adicionado com sucesso!");
        resetForm();
        onClose();
      } else {
        Alert.alert("Erro", "Falha ao adicionar produção. Tente novamente.");
      }
    } catch (error) {
      console.error("Error adding production:", error);
      Alert.alert("Erro", "Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Adicionar Produção</Text>
          {/* Product Name */}
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={productName}
            onChangeText={setProductName}
            placeholderTextColor={theme.colors.text.secondary}
          />
          {/* Product Quantity */}
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantity}
            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.text.secondary}
          />
          {/* Product Status */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              style={styles.picker}
              dropdownIconColor={theme.colors.primary}
            >
              {statusOptions.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>
          {/* Unit Value */}
          <TextInput
            style={styles.input}
            placeholder="Valor unitário"
            value={unitValue}
            onChangeText={handleUnitValueChange}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.text.secondary}
          />{" "}
          {/* Product Type */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={type}
              onValueChange={setType}
              style={styles.picker}
              dropdownIconColor={theme.colors.primary}
            >
              {typeOptions.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>
          {/* Add Production Button */}
          <TouchableOpacity
            style={[styles.addButton, isLoading && styles.disabledButton]}
            onPress={handleAddProduction}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adicionando..." : "Adicionar Produção"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
    minHeight: 420,
    alignItems: "stretch",
  },
  sheetTitle: {
    fontSize: theme.fontSize["xl"],
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.colors.primary,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    backgroundColor: theme.colors.background.default,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: theme.colors.background.default,
  },
  picker: {
    width: "100%",
    color: theme.colors.text.default,
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
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "stretch",
    marginBottom: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: theme.fontSize.base,
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
