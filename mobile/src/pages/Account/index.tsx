import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, ImageBackground, TextInput, } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateToHome() {
    navigation.navigate('Home');
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <View>
          <Text style={styles.title}>Wallet uma carteira inteligente</Text>
          <Text style={styles.description}>
            Auxiliando sua saúde financeira para que você não fique doente.
          </Text>
        </View>

        <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={(text) => setLogin(text)}
            />

            <TextInput
              style={styles.input}
              placeholder='Senha'
              secureTextEntry={true}
              maxLength={6}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={handleNavigateToHome}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right' color='#fff' size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
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

  formGroup: {
    flex: 1,
    justifyContent: 'center',
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  footer: {},

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Account;
