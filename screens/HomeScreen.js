import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import ProductCard from "../component/ProductCard";
import BlogCard from "../components/BlogCard";

const HomeScreen = ({navigation}) => {
   const [showFavorites, setShowFavorites] = useState(false);
   const [favorites, setFavorites] = useState([]);
  
  const products = [
    {
      id: "1",
      title: "Liberica",
      description: "Onze Liberica koffiebonen zijn er voor wie iets anders durft dan de klassieke Arabica.",
      price: "5.00",
      image: require("../images/Liberica.jpg"),
    },
    {
      id: "2",
      title: "Robusta",
      description: "",
      price: "$5.00",
      image: require("../images/Robusta.jpg"),
    },
    {
      id: "3",
      title: "Arabica",
      description: "",
      price: "$5.00",
      image: require("../images/Arabica.jpg"),
    },
  ];

  const blogs = [
    {
      id: "1",
      title: "5 manieren om thuis koffie te zetten die smaakt als in je favoriete koffiezaak",
      description:
        "5 januari, 2026",
      longDescription:
        "Je betaalt €4 voor een flat white in je favoriete zaak, maar thuis smaakt €12 specialty koffie nergens naar. Het ligt niet aan de boon. Het ligt aan hoe je zet.",
      image: require("../images/blog1.jpg"),
    },
    {
      id: "2",
      title: "De beste koffiebonen voor beginners: kies je eerste specialty koffie",
      description:
        "8 januari, 2026",
      longDescription:
        "Je hebt 'specialty koffie' horen zoemen in koffiebars en op Instagram. Score 80+, single origin, vers gebrand. Klinkt goed, maar waar begin je?",
      image: require("../images/blog1.jpg"),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.H1}>Koffie</Text>
    
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarText}
          placeholder="Waar ben je naar op zoek?"
        />
      </View>

       {/* Switch */}
      <View style={styles.switchRow}>
        <Text>Toon favorieten</Text>
        <Switch value={showFavorites} onValueChange={setShowFavorites} />
      </View>

      {/* Producten */}
      <View style={styles.grid}>
        {products
          .filter((product) => {
            if (showFavorites) {
              return favorites.includes(product.id);
            }
            return true;
          })
          .map((product) => (
            <View style={styles.card} key={product.id}>
              <ProductCard
                {...product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={(id) => {
                  setFavorites((prev) =>
                    prev.includes(id)
                      ? prev.filter((fav) => fav !== id)
                      : [...prev, id],
                  );
                }}
              />
            </View>
          ))}

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              paddingLeft: 10,
            }}
          >
            Blogs
          </Text>

          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
  },
});

export default HomeScreen;