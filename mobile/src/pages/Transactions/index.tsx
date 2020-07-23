import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
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
    // setTotal(response.headers['x-total-count']);
    // setPage(page + 1);
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
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de
          <Text style={styles.headerTextBold}> {total} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={transaction}
        keyExtractor={(transaction: Transaction) => String(transaction.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadTransaction}
        onEndReachedThreshold={0.2}
        renderItem={({ item: transaction }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentPropery}>TIPO:</Text>
            <Text style={styles.incidentValue}>
              {transactionTypeParse(transaction.transaction_type_id)}
            </Text>

            <Text style={styles.incidentPropery}>DATA:</Text>
            <Text style={styles.incidentValue}>
              {dateParse(transaction.date)}
            </Text>

            <Text style={styles.incidentPropery}>DESCRIÇÂO:</Text>
            <Text style={styles.incidentValue}>{transaction.description}</Text>

            <Text style={styles.incidentPropery}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(transaction.amount)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => NavigateToDetail(transaction)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
