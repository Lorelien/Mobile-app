import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
import ProductCard from "../components/ProductCard.js";

const HomeScreen = ({navigation}) => {


    <ProductCard 
    title=""
    description=""
    price=""
    image={require("../assets")}
    onPress={() => 
        navigation.navigate("Details", {
            title: "viebreuab",
            description: "ergeorg",
            price: "10",
            image: require("../assets/"),
        })
    }
    /> 
}

const styles = StyleSheet.create({
    card: {
        width: 300, 
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
        fontWeiht: "bold", 
        marginTop: 8,
    }, 
    description: {
        fontSize: 14,
        Color: "#555",
        marginTop: 4,
    },
});

export default HomeScreen; // dit moet helemaal vanonder staan 