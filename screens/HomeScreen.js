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
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { fetchProducts, fetchBlogs } from "../services/webflow";

const HomeScreen = ({ navigation }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
useEffect(() => {
  const loadData = async () => {
    try {
      const productsData = await fetchProducts();
      const blogsData = await fetchBlogs();

      setProducts(productsData);
      setBlogs(blogsData);
    } catch (err) {
      setError(`Er ging iets mis: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

const categories = [...new Set(products.map((p) => p.category).filter(Boolean))]; 

const filteredProducts = [...products]
  .filter((product) => {
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFavorites = showFavorites
      ? favorites.includes(product.id)
      : true;

    return matchesCategory && matchesSearch && matchesFavorites;
  })
  .sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.rawPrice - b.rawPrice;
    }

    if (sortOption === "price-desc") {
      return b.rawPrice - a.rawPrice;
    }

    if (sortOption === "name-asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "name-desc") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

if (loading) {
  return (
    <View style={styles.center}>
      <Text>Laden...</Text>
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
          placeholder="Zoek een product..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.filterLabel}>Filter op categorie</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
        <Picker.Item label="Alle categorieën" value="" />
          {categories.map((category) => (
        <Picker.Item key={category} label={category} value={category} />
        ))}
        </Picker>
      </View>

      <Text style={styles.filterLabel}>Sorteer producten</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortOption}
          onValueChange={(itemValue) => setSortOption(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
        <Picker.Item label="Prijs oplopend" value="price-asc" />
        <Picker.Item label="Prijs aflopend" value="price-desc" />
        <Picker.Item label="Naam A-Z" value="name-asc" />
        <Picker.Item label="Naam Z-A" value="name-desc" />
      </Picker>
    </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Toon favorieten</Text>
        <Switch value={showFavorites} onValueChange={setShowFavorites} />
      </View>

      <View style={styles.grid}>
      {filteredProducts.map((product) => (
    <View
      style={styles.cardWrapper}
      key={product.id ? `product-${product.id}` : `product-${index}`}>
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
  {blogs.map((blog, index) => (
    <BlogCard
      key={blog.id ? `blog-${blog.id}` : `blog-${index}`}
      {...blog}
    />
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
    backgroundColor: "#f2ece6",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchBarText: {
    fontSize: 16,
    height: 45,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    width: "48%",
    marginBottom: 16,
  },
  blogSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3b2a1f",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b2a1f",
    marginBottom: 6,
    marginTop: 6,
  },
  pickerContainer: {
    backgroundColor: "#f2ece6",
    borderRadius: 10,
    marginBottom: 12,
    width: "100%",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#3b2a1f",
  },
  pickerItem: {
    color: "#3b2a1f",
    fontSize: 16,
  },
});

export default HomeScreen;