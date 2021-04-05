import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToTransactions() {
    navigation.navigate('Transactions');
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Painel</Text>
          <Text style={styles.description}>
            Auxiliando sua saúde financeira para que você não fique doente.
          </Text>
        </View>
      </View>

      <View style={styles.main}>
        <View>
          <Text style={styles.title}>Receitas</Text>
          <Text style={styles.description}>
            Auxiliando sua saúde financeira para que você não fique doente.
          </Text>
        </View>

        <View>
          <Text style={styles.title}>Despesas</Text>
          <Text style={styles.description}>
            Auxiliando sua saúde financeira para que você não fique doente.
          </Text>
        </View>

      </View>
      <View style={styles.footer}>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
  },

  main: {
    flex: 4,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},
});

export default Home;
