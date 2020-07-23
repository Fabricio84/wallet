import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import api from '../../services/api';

interface Tag {
  id: number;
  name: string;
  selected: boolean;
}

interface Transaction {
  transaction_type_id: Number;
  date: String;
  description: String;
  installment_total: String;
  amount: String;
  tags: Number[];
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
    loadTags();
  }, []);

  function loadTags() {
    api
      .get('tags')
      .then((response) => {
        let tags = response.data.map((item: any) => ({
          ...item,
          selected: false,
        }));
        setTags(tags);
      })
      .catch(() => Alert.alert('Houve um erro no carregamento das tags!'));
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleTagSelected(tag: Tag) {
    tag.selected = !tag.selected;
    setTags([...tags]);
  }

  function getPayload(): Transaction {
    return {
      transaction_type_id: Number(transactionType),
      date: [year, month, day].join('-'),
      description,
      installment_total: installment,
      amount,
      tags: tags.filter((tag) => tag.selected).map((tag) => tag.id),
    };
  }

  function validate({ installment_total, amount, tags }: Transaction) {
    if (installment_total.length === 0) {
      Alert.alert('Tipo de transação é obrigatório');
      return false;
    }

    if (amount.length === 0) {
      Alert.alert('Valor é obrigatório');
      return false;
    }

    if (tags.length === 0) {
      Alert.alert('Escolha pelos menos uma Tag');
      return false;
    }

    return true;
  }

  async function save() {
    const payload = getPayload();
    if (validate(payload)) {
      api
        .post('transactions', payload)
        .then((response) => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert(
            'Houve um erro ao tentar salvar sua transação, por favor tente mais tarde!'
          );
        });
    }
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
            onValueChange={(itemValue) => setTransactionType(itemValue)}
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

export default Transactions;
