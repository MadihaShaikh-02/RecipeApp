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

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchRecipes = async () => {
    try {
      await delay(2000);
      const existingRecipes = await AsyncStorage.getItem("recipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRecipes();
    });

    return unsubscribe;
  }, [navigation]);

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
      await fetchRecipes();
    } catch (error) {
      console.error("Error refreshing recipes:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loading}
          />
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
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Add")}
      >
        <Ionicons name="add-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  searchBox: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 40,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  loading: {
    marginTop: 20,
  },
});

export default HomeScreen;
