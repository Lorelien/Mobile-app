import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const BlogCard = ({ title, description, longDescription, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={
          image
            ? { uri: image }
            : require("../assets/images/blog1.jpg")
        }
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate("BlogDetails", {
            title,
            description,
            longDescription,
            image,
          })
        }
      >
        <Text style={styles.buttonText}>Meer lezen</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#3b2a1f",
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#d8c3a5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#3b2a1f",
    fontWeight: "bold",
  },
});

export default BlogCard;