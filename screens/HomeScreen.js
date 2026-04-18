import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Switch,
} from "react-native";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

const HomeScreen = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");

  const products = [
    {
      id: "1",
      title: "Liberica",
      description:
        "Onze Liberica koffiebonen zijn er voor wie iets anders durft dan de klassieke Arabica.",
      price: 5.0,
      image: require("../assets/images/Liberica.jpg"),
    },
    {
      id: "2",
      title: "Robusta",
      description: "Een krachtige koffie met een volle en intense smaak.",
      price: 5.0,
      image: require("../assets/images/Robusta.jpg"),
    },
    {
      id: "3",
      title: "Arabica",
      description: "Een zachte en aromatische koffie met verfijnde toetsen.",
      price: 5.0,
      image: require("../assets/images/Arabica.jpg"),
    },
  ];

  const blogs = [
    {
      id: "1",
      title:
        "5 manieren om thuis koffie te zetten die smaakt als in je favoriete koffiezaak",
      description: "5 januari 2026",
      longDescription:
        "Je betaalt €4 voor een flat white in je favoriete zaak, maar thuis smaakt specialty koffie vaak anders. Het ligt niet alleen aan de boon, maar ook aan hoe je zet.",
      image: require("../assets/images/blog1.jpg"),
    },
    {
      id: "2",
      title: "De beste koffiebonen voor beginners: kies je eerste specialty koffie",
      description: "8 januari 2026",
      longDescription:
        "Specialty koffie klinkt vaak ingewikkeld, maar je hoeft niet alles meteen te kennen. Begin met een zachte koffie en ontdek stap voor stap wat jij lekker vindt.",
      image: require("../assets/images/blog1.jpg"),
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesFavorites = showFavorites ? favorites.includes(product.id) : true;
    const matchesSearch =
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());

    return matchesFavorites && matchesSearch;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.h1}>Koffie</Text>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarText}
          placeholder="Waar ben je naar op zoek?"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Toon favorieten</Text>
        <Switch value={showFavorites} onValueChange={setShowFavorites} />
      </View>

      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <View style={styles.cardWrapper} key={product.id}>
            <ProductCard
              {...product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={(id) => {
                setFavorites((prev) =>
                  prev.includes(id)
                    ? prev.filter((fav) => fav !== id)
                    : [...prev, id]
                );
              }}
            />
          </View>
        ))}
      </View>

      <View style={styles.blogSection}>
        <Text style={styles.sectionTitle}>Blogs</Text>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf5",
  },
  contentContainer: {
    padding: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3b2a1f",
  },
  searchBar: {
    backgroundColor: "#f2ebe5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchBarText: {
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color: "#3b2a1f",
  },
  grid: {
    flexDirection: "column",
  },
  cardWrapper: {
    marginBottom: 16,
  },
  blogSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3b2a1f",
  },
});

export default HomeScreen;