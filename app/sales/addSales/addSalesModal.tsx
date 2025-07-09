import { useUser } from "@/context/UserContext";
import theme from "@/design-system/src";
import Product from "@/domain/models/farm/product/Product";
import { Type } from "@/domain/models/farm/product/Type";
import { getAllAvailableProducts } from "@/domain/models/farm/production/Production";
import { createSalesItem } from "@/domain/models/farm/sales/SalesItem";
import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import {
  Alert,
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

// Helper function to get type label in Portuguese
const getTypeLabel = (type: Type): string => {
  switch (type) {
    case Type.crops:
      return "Cultura";
    case Type.livestock:
      return "Pecuária";
    case Type.dairy:
      return "Laticínios";
    default:
      return type;
  }
};

export default function AddSalesModal({
  visible,
  onClose,
}: AddSalesModalProps) {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addSalesItem, productionList } = useUser();

  // Get unique products from production list
  const availableProducts = useMemo(() => {
    return getAllAvailableProducts(productionList);
  }, [productionList]);

  // Get unique products (remove duplicates by name and type)
  const uniqueProducts = useMemo(() => {
    const uniqueMap = new Map<string, Product>();
    availableProducts.forEach((product) => {
      const key = `${product.name}-${product.type}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, product);
      }
    });
    return Array.from(uniqueMap.values());
  }, [availableProducts]);
  const selectedProduct =
    selectedProductIndex >= 0 ? uniqueProducts[selectedProductIndex] : null;

  const resetForm = () => {
    setSelectedProductIndex(-1);
    setQuantity("");
    setIsLoading(false);
  };

  const validateForm = (): string | null => {
    if (selectedProductIndex < 0 || !selectedProduct) {
      return "Selecione um produto";
    }
    if (!quantity || parseInt(quantity) <= 0) {
      return "Quantidade deve ser maior que zero";
    }
    return null;
  };
  const handleAddSales = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert("Erro de Validação", errorMessage);
      return;
    }

    if (!selectedProduct) {
      Alert.alert("Erro", "Produto não encontrado");
      return;
    }

    setIsLoading(true);

    try {
      // Use the selected product as is (without modifying it)
      const salesItem = createSalesItem(selectedProduct, parseInt(quantity));

      // Add sales item using UserContext
      const success = await addSalesItem(salesItem);

      if (success) {
        Alert.alert("Sucesso", "Venda adicionada com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              resetForm();
              onClose();
            },
          },
        ]);
      } else {
        Alert.alert("Erro", "Falha ao adicionar venda. Tente novamente.");
      }
    } catch (error) {
      console.error("Error adding sales:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    const hasFormData = selectedProductIndex >= 0 || quantity;

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Adicionar Venda</Text>

          {/* Product Selection */}
          {uniqueProducts.length === 0 ? (
            <View style={styles.noProductsContainer}>
              <Text style={styles.noProductsText}>
                Nenhum produto disponível. Adicione produtos na aba de Produção
                primeiro.
              </Text>
            </View>
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedProductIndex}
                onValueChange={(itemValue) =>
                  setSelectedProductIndex(itemValue)
                }
                style={styles.picker}
                dropdownIconColor={theme.colors.primary}
              >
                <Picker.Item label="Selecione um produto..." value={-1} />
                {uniqueProducts.map((product, index) => (
                  <Picker.Item
                    key={`${product.name}-${product.type}-${index}`}
                    label={`${product.name} (${getTypeLabel(
                      product.type
                    )}) - ${product.unitValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                    value={index}
                  />
                ))}
              </Picker>
            </View>
          )}

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
            style={[
              styles.addButton,
              (isLoading || uniqueProducts.length === 0) &&
                styles.disabledButton,
            ]}
            onPress={handleAddSales}
            disabled={isLoading || uniqueProducts.length === 0}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adicionando..." : "Adicionar Venda"}
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
  noProductsContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  noProductsText: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.base,
    textAlign: "center",
    fontStyle: "italic",
  },
});
