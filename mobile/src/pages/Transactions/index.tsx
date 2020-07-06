import React, { useState } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';

// import api from '../../services/api';

const Transactions = () => {
  const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState<String>('');
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString('pt-BR')
  );

  function handleNavigateBack() {
    navigation.goBack();
  }

  function getMinDate() {
    let minDate = new Date();
    minDate.setMonth(0);
    minDate.setDate(0);

    return minDate;
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.title}>Adicionar uma transação</Text>

        <Picker
          style={styles.input}
          selectedValue={transactionType}
          onValueChange={setTransactionType}
        >
          <Picker.Item label='Tipo de transação' value='' />
          <Picker.Item label='Receita' value='0' />
          <Picker.Item label='Despesa' value='1' />
        </Picker>

        <DatePicker
          date={date}
          mode='date'
          placeholder='Escolha uma data'
          format='DD/MM/YYYY'
          style={{ width: '100%' }}
          minDate={getMinDate()}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={setDate}
        />

        <TextInput style={styles.input} placeholder='Descrição' />

        <View style={styles.formGroup}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 12 }]}
            placeholder='Parcelas'
            keyboardType='numeric'
          />

          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder='Valor'
            keyboardType='decimal-pad'
          />
        </View>

        <TextInput style={styles.input} placeholder='Tags' />

        <View style={styles.footer}>
          <RectButton style={styles.button}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#fff' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Salvar</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    marginBottom: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  formGroup: {
    flexDirection: 'row',
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

export default Transactions;
