import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Switch,
  TextInput,
} from "react-native";

const ProductCard = ({
  id,
  title,
  description,
  price,
  image,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState("1");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>€{price.toFixed(2)}</Text>

      <Text style={styles.label}>Aantal</Text>
      <TextInput
        style={styles.input}
        placeholder="Voer aantal in"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Abonnement</Text>
        <Switch value={subscribed} onValueChange={setSubscribed} />
      </View>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(id)}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate("Details", {
            title,
            description,
            price,
            image,
          })
        }
      >
        <Text style={styles.buttonText}>Bekijk product</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#3b2a1f",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#8b4513",
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
  },
  favoriteButton: {
    backgroundColor: "#d8c3a5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  favoriteButtonText: {
    color: "#3b2a1f",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6f4e37",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductCard;