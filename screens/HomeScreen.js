import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "../components/RecipeCard";
import ToastContainer from "../components/ToastContainer";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await delay(2000);
        const existingRecipes = await AsyncStorage.getItem("recipes");
        const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
        setRecipes(recipes);
        setFilteredRecipes(recipes);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error fetching recipes. Please try again later.",
        });
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  const renderItem = ({ item }) => (
    <RecipeCard recipe={item} navigation={navigation} />
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const existingRecipes = await AsyncStorage.getItem("recipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error refreshing recipes. Please try again later.",
      });
      console.error("Error refreshing recipes:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Home</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Add")}
        >
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Contact")}
        >
          <Ionicons name="call-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : filteredRecipes.length === 0 ? (
        <Text style={styles.noRecipesText}>No recipes found.</Text>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <ToastContainer />
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 5,
  },
  searchBox: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  noRecipesText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  loading: {
    marginTop: 20,
  },
});

export default HomeScreen;
