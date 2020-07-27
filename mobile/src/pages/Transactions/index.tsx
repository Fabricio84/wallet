import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

interface Tag {
  id: number;
  name: string;
  selected: boolean;
}

interface Transaction {
  id: number;
  transaction_type_id: number;
  date: string;
  description: string;
  installment: number;
  installment_total: number;
  amount: number;
  tags: number[];
}

export default function Transactions() {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function NavigateToDetail(transaction: Transaction) {
    navigation.navigate('Detail', { transaction });
  }

  async function loadTransaction() {
    if (loading) {
      return;
    }

    if (total > 0 && transaction.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('transactions', {
      params: { page },
    });

    setTransaction([...transaction, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  function transactionTypeParse(transactionTypeId: number) {
    return transactionTypeId === 0 ? 'Receita' : 'Despesa';
  }

  function dateParse(dateStr: string) {
    const timeStamp = Date.parse('2020-07-21T21:00');
    const date = new Date(timeStamp);
    // return date
    //   .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    //   .replace(/de|\./, '')
    //   .toUpperCase();

    return date.toLocaleDateString('pt-BR');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='arrow-left' size={24} color='#ccc' />
        </TouchableOpacity>
        <TextInput style={styles.input} onChangeText={() => {}} />
        <TouchableOpacity onPress={() => {}}>
          <Icon name='search' size={24} color='#ccc' />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={transaction}
        keyExtractor={(transaction: Transaction) => String(transaction.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadTransaction}
        onEndReachedThreshold={0.2}
        renderItem={({ item: transaction }) => (
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.title}>
                {transactionTypeParse(transaction.transaction_type_id)}
              </Text>
              <Text style={styles.date}>{dateParse(transaction.date)}</Text>
            </View>

            <Text style={styles.description}>{transaction.description}</Text>

            <Text style={styles.amount}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(transaction.amount)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
