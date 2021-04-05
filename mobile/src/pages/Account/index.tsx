import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import api from '../../services/api';

const Account = () => {
  const navigation = useNavigation();

  const [inputPassword, setInputPassword] = useState<TextInput>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function storeAuthDataAndRedirectToHome(data: any) {
    const { name, accessToken } = data

    await SecureStore.setItemAsync('user', name)
    await SecureStore.setItemAsync('auth', accessToken)

    navigation.navigate('Home')
  }

  function handleOnSubmitEmail() {
    if (inputPassword)
      inputPassword.focus()
  }

  async function handleSigin() {
    if (validate()) {
      api.post('sigin', { email, password })
        .then(response => storeAuthDataAndRedirectToHome(response.data))
        .catch((error) => Alert.alert(error.response.data.message))
    }
  }

  function validate() {
    if (email.length === 0) {
      Alert.alert('Email é obrigatório');
      return false;
    }

    if (password.length === 0) {
      Alert.alert('Senha é obrigatório');
      return false;
    }

    return true;
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={{ flex: 1 }}
      imageStyle={{ width: 274, height: 368 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.header}>
            <Image source={require('../../assets/logo.png')} />

            <View>
              <Text style={styles.title}>Wallet uma carteira inteligente</Text>
              <Text style={styles.description}>
                Auxiliando sua saúde financeira para que você não fique doente.
                </Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder='E-mail'
              keyboardType='email-address'
              returnKeyType="next"
              onSubmitEditing={handleOnSubmitEmail}
              blurOnSubmit={false}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              ref={(input) => { if (input) setInputPassword(input) }}
              style={styles.input}
              placeholder='Senha'
              secureTextEntry={true}
              maxLength={6}
              onSubmitEditing={handleSigin}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <RectButton
            style={styles.button}
            onPress={handleSigin}
          >
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#fff' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  scrollView: {
    overflow: 'hidden',
  },

  header: {
    marginBottom: 48
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
