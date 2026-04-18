import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const BlogDetail = () => {
  const route = useRoute();

  const {
    title = "Blog titel",
    description = "Korte beschrijving",
    longDescription = "Lange tekst van de blog...",
    image = require("../assets/images/blog1.jpg"),
  } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.longText}>{longDescription}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fffaf5",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3b2a1f",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  longText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});

export default BlogDetail;