import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

interface MonthItem {
  label: string;
  value: string;
  selected: boolean;
}

const Home = () => {
  const navigation = useNavigation();

  const [months, setMonths] = useState<MonthItem[]>([]);

  useEffect(() => {
    createMonths();
  }, []);

  function createMonths() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const months = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);

      const label = date.toLocaleString('pt-BR', { month:'short' }).substr(0,3);
      const monthNumber = date.toLocaleString('pt-BR', { month:'2-digit' }).substr(0,3);
      const selected = currentMonth == month;
      const value = `${currentYear}${monthNumber}`;

      months.push({ label, value, selected });
    }

    setMonths([...months]);
  }

  function handleOnClickMonth(month: MonthItem) {
    months.forEach(m => m.selected = false);

    const index = months.findIndex(m => m.value === month.value);
    months[index].selected = !month.selected;

    setMonths([...months]);
  }

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
          <Text style={styles.overline}>
            Saldo
          </Text>
          <Text style={styles.heading3}>R$ 12.640,54</Text>
        </View>
      </View>

      <View style={styles.main}>
        <ScrollView style={styles.months} horizontal={true}>

          {months.map(month => { 
            return (
              <TouchableOpacity 
                style={ month.selected ? styles.buttonMonthEnable : styles.buttonMonth} 
                onPress={() => handleOnClickMonth(month)}>
                  <Text style={ month.selected ? styles.buttonMonthTitleEnable : styles.buttonMonthTitle}>
                    { month.label }
                  </Text>
              </TouchableOpacity>
            )
          })}

        </ScrollView>

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
    alignItems: 'center'
  },

  overline: {
    color: '#6C6C80',
    fontSize: 10,
    fontFamily: 'Roboto_400Regular',
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  heading3: {
    color: '#322153',
    fontSize: 48,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center'
  },

  months: {
    flex: 1
  },

  buttonMonth: {
    padding: 8, 
    marginRight: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(132,182,219,0)',
    height: 40
  },

  buttonMonthEnable: {
    padding: 8, 
    marginRight: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#322153',
    height: 40
  },

  buttonMonthTitle: {
    color: '#A0A7B3',
    letterSpacing: 2,
    fontSize: 14,
    textTransform: 'uppercase'
  },

  buttonMonthTitleEnable: {
    color: '#322153',
    letterSpacing: 2,
    fontSize: 14,
    textTransform: 'uppercase'
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
