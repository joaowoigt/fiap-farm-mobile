import { Text, View } from "react-native";

export default function SalesLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          color: "#333",
        }}
      >
        Sales Screen
      </Text>
    </View>
  );
}
