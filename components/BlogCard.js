import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const BlogCard = ({ id, title, description, longDescription, image }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
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
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#CFD8EE",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default BlogCard;