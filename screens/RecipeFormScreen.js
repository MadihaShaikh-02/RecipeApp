import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView,Platform ,Modal} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeFormScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [recipe, setRecipe] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      console.log("Selected Image URI:", selectedImageUri);
    } else {
      console.log("Image selection cancelled or no assets found.");
    }
  };

  const saveRecipe = async () => {
    const newRecipe = {
      id: new Date().toISOString(),
      name,
      recipe,
      imageUri,
      ingredients,
    };

    try {
      const existingRecipes = await AsyncStorage.getItem('recipes');
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      console.log("Recipe saved successfully:", newRecipe);
      setModalVisible(true); 
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput
          placeholder="Recipe Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Recipe"
          value={recipe}
          onChangeText={setRecipe}
          style={[styles.input, styles.recipeInput]} 
          multiline
          textAlignVertical="top" 
        />
        <TextInput
          placeholder="Ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text>Select an Image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button title="Save Recipe" onPress={saveRecipe} />
        </View>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Recipe saved successfully!</Text>
            <Button
              title="OK"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Welcome'); 
              }}
            />
          </View>
        </View>
      </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  recipeInput: {
    height: 200, 
    textAlignVertical: 'top', 
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default RecipeFormScreen;
