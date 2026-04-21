import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";

const ProductCard = ({ 
  title, 
  description, 
  price, 
  image, 
  category,
  isFavorite, 
  onToggleFavorite, id }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={
          image
            ? { uri: image }
            : require("../assets/images/Liberica.jpg")
        }
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(id)}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "Verwijder favoriet" : "Voeg toe aan favorieten"}
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
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#e8d8c3",
    color: "#7a5332",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
},
});

export default ProductCard;