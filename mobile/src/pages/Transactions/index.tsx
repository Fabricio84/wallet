import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import api from '../../services/api';

interface Tag {
  id: number;
  name: string;
  selected: boolean;
}

const Transactions = () => {
  const navigation = useNavigation();

  const [transactionType, setTransactionType] = useState<String>('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [installment, setInstallment] = useState('');
  const [amount, setAmount] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // load current date
    const currentDate = new Date().toISOString().split('T')[0];
    setDay(currentDate.split('-')[2]);
    setMonth(currentDate.split('-')[1]);
    setYear(currentDate.split('-')[0]);

    // load tags
    setTags([
      { id: 1, name: 'Transporte', selected: false },
      { id: 2, name: 'Combustivel', selected: false },
      { id: 3, name: 'Manutenção', selected: false },
      { id: 4, name: 'Documentação', selected: false },
      { id: 5, name: 'Seguro', selected: false },
      { id: 6, name: 'Carro', selected: false },
      { id: 7, name: 'Moto', selected: false },
      { id: 8, name: 'Saúde', selected: false },
      { id: 9, name: 'Educação', selected: false },
      { id: 10, name: 'Lanche', selected: false },
      { id: 11, name: 'Igreja', selected: false },
      { id: 12, name: 'Presente', selected: false },
      { id: 13, name: 'Mercado', selected: false },
      { id: 14, name: 'Alimentação', selected: false },
      { id: 15, name: 'Feira', selected: false },
      { id: 16, name: 'Imóvel', selected: false },
      { id: 17, name: 'Cartão Taxa', selected: false },
      { id: 18, name: 'Banco', selected: false },
      { id: 19, name: 'Dinheiro', selected: false },
      { id: 20, name: 'Debito', selected: false },
      { id: 21, name: 'Credito', selected: false },
    ]);
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleTagSelected(tag: Tag) {
    tag.selected = !tag.selected;
    setTags([...tags]);
  }

  function getPayload() {
    return {
      transactionType: Number(transactionType),
      date: [year, month, day].join('-'),
      description,
      installment,
      amount,
      tags: tags.filter((tag) => tag.selected).map((tag) => tag.id),
    };
  }

  function save() {
    console.log(getPayload());
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name='arrow-left' size={24} color='#34cb79' />
            </TouchableOpacity>
            <Text style={styles.title}>Adicionar uma transação</Text>
            <TouchableOpacity onPress={save}>
              <Icon name='check-circle' size={24} color='#34cb79' />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Tipo de transação</Text>
          <Picker
            style={styles.input}
            selectedValue={transactionType}
            onValueChange={setTransactionType}
          >
            <Picker.Item label='Tipo de transação' value='' />
            <Picker.Item label='Receita' value='0' />
            <Picker.Item label='Despesa' value='1' />
          </Picker>

          <View style={styles.formGroup}>
            <TextInput
              style={[
                styles.input,
                { flex: 1, marginRight: 12, textAlign: 'center' },
              ]}
              placeholder='Dia'
              keyboardType='numeric'
              maxLength={2}
              defaultValue={day}
              onChangeText={(text) => setDay(text)}
            />

            <TextInput
              style={[
                styles.input,
                { flex: 1, marginRight: 12, textAlign: 'center' },
              ]}
              placeholder='Mês'
              keyboardType='numeric'
              maxLength={2}
              defaultValue={month}
              onChangeText={(text) => setMonth(text)}
            />

            <TextInput
              style={[styles.input, { flex: 2, textAlign: 'center' }]}
              placeholder='Ano'
              keyboardType='numeric'
              maxLength={4}
              defaultValue={year}
              onChangeText={(text) => setYear(text)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder='Descrição'
            defaultValue={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 12 }]}
              placeholder='Parcelas'
              keyboardType='numeric'
              defaultValue={installment}
              onChangeText={(text) => setInstallment(text)}
            />

            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder='R$ Valor'
              keyboardType='decimal-pad'
              defaultValue={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <Text style={styles.subTitle}>Escolha as tags</Text>
          <View style={styles.tagList}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                onPress={() => handleTagSelected(tag)}
                style={[
                  styles.tagItem,
                  tag.selected ? styles.tagItemSelected : {},
                ]}
              >
                <Text
                  style={[
                    styles.tagItemText,
                    tag.selected ? styles.tagItemTextSelected : {},
                  ]}
                >
                  {tag.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5 + Constants.statusBarHeight,
  },

  scrollView: {
    marginHorizontal: 24,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    marginBottom: 24,
  },

  subTitle: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 12,
  },

  label: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },

  tagItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagItemSelected: {
    backgroundColor: '#34CB79',
  },

  tagItemText: {
    margin: 8,
    alignSelf: 'center',
  },

  tagItemTextSelected: {
    color: '#FFF',
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
    marginBottom: 24,
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
