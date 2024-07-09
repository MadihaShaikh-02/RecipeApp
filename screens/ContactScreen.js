// screens/ContactScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact Us</Text>
      <Text style={styles.text}>Email: contact@example.com</Text>
      <Text style={styles.text}>Phone: +1234567890</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ContactScreen;
