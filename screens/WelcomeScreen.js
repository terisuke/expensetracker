import { StyleSheet, Text, View } from 'react-native';
import { useState,useEffect } from 'react';
import Button from '../components/UI/Button';

function WelcomeScreen({ navigation }) {
  return (
      <View style={styles.rootContainer}>
      <Text style={styles.title}>ようこそ！</Text>
      <Text>ログインに成功しました！</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Expenses Overview')}
      >家計簿を見る
      </Button>
      </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 8,
    minWidth: 120,
    color: 'white',
  },
});