import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const RecipeCard = ({ recipe, navigation }) => {
  const handleViewRecipe = () => {
    navigation.navigate("RecipeDetails", { recipe });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleViewRecipe} style={styles.touchable}>
        <View style={styles.header}></View>
        {recipe.imageUri ? (
          <Image source={{ uri: recipe.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={styles.title}>{recipe.name}</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    height: 300, 
  },
  touchable: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "85%", 
    borderRadius: 5,
    marginTop: 10,
  },
  placeholderImage: {
    width: "100%",
    height: "75%", 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 10,
  },
  recipeText: {
    fontSize: 16,
    marginTop: 10,
  },
  toggleText: {
    marginTop: 10,
    fontSize: 14,
    color: "blue",
    textAlign: "center",
  },
});

export default RecipeCard;
