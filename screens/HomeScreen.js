import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Switch,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { fetchProducts, fetchBlogs } from "../services/webflow";

const HomeScreen = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
  const loadData = async () => {
    try {
      const [productsData, blogsData] = await Promise.all([
        fetchProducts(),
        fetchBlogs(),
      ]);

      setProducts(productsData);
      setBlogs(blogsData);
    } catch (err) {
      setError("Er ging iets mis bij het ophalen van de Webflow data.");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

const filteredProducts = products.filter((product) => {
    const matchesFavorites = showFavorites
      ? favorites.includes(product.id)
      : true;

    const matchesSearch =
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());

    return matchesFavorites && matchesSearch;
  });

if (loading) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#6f4e37" />
      <Text>Data laden...</Text>
    </View>
  );
}

if (error) {
  return (
    <View style={styles.center}>
      <Text>{error}</Text>
    </View>
  );
}

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