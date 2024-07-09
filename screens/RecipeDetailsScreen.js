import React from 'react';
import { View, Text, Image, StyleSheet,ScrollView } from 'react-native';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Image source={{ uri: recipe.imageUri }} style={styles.image} />
      <Text style={styles.subtitle}>Ingredients:</Text>
      <Text style={styles.ingredients}>{recipe.ingredients}</Text>
      <Text style={styles.subtitle}>Recipe:</Text>
      <Text style={styles.recipeText}>{recipe.recipe}</Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  recipeText: {
    fontSize: 16,
  },
});

export default RecipeDetailsScreen;
