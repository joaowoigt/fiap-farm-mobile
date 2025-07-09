import theme from "@/design-system/src";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddSalesModalProps = {
  visible: boolean;
  onClose: () => void;
};

const typeOptions = [
  { label: "Cultura", value: "crops" },
  { label: "Pecuária", value: "livestock" },
  { label: "Laticínios", value: "dairy" },
];

export default function AddSalesModal({
  visible,
  onClose,
}: AddSalesModalProps) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
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
    setUnitValue("");
    setType("crops");
  };

  const handleAddSales = async () => {
    // TODO: Implementar lógica de adicionar venda
    console.log("Adicionar venda:", {
      productName,
      quantity,
      unitValue,
      type,
    });
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
          <Text style={styles.sheetTitle}>Adicionar Venda</Text>

          {/* Product Name */}
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={productName}
            onChangeText={setProductName}
            placeholderTextColor={theme.colors.text.secondary}
          />

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

          {/* Unit Value */}
          <TextInput
            style={styles.input}
            placeholder="Valor unitário"
            value={unitValue}
            onChangeText={handleUnitValueChange}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.text.secondary}
          />

          {/* Product Quantity */}
          <TextInput
            style={styles.input}
            placeholder="Quantidade vendida"
            value={quantity}
            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.text.secondary}
          />

          {/* Add Sales Button */}
          <TouchableOpacity
            style={[styles.addButton, isLoading && styles.disabledButton]}
            onPress={handleAddSales}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adicionando..." : "Adicionar Venda"}
            </Text>
          </TouchableOpacity>

          {/* Close Button */}
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
    minHeight: 380,
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
