import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../components/ToastComponent";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          navigation.replace("Welcome");
        } else {
          setShowToast(true);
          setToastMessage("Invalid username or password. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setShowToast(true);
        setToastMessage("Error fetching users. Please try again later.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/login_background.jpeg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text style={styles.header}>Login</Text>
          <Ionicons
            style={styles.headerIcon}
            name="person-circle-outline"
            size={44}
            color="black"
          />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {showToast && (
        <ToastComponent
          type={username && password ? "success" : "error"}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#000",
    textAlign: "center",
  },
  headerIcon: {
    alignSelf: "center",
    marginBottom: 24,
    color: "#ffd858",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#ffd858",
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});

export default LoginScreen;
