import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';

interface Props {
  Name: string;
  myUrl: string;
  myIcon: string;
}

const Buttons = ({ Name, myUrl, myIcon }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Link href={myUrl} asChild>
        <TouchableOpacity style={styles.card}>
          <MaterialCommunityIcons name={myIcon} size={28} color="white" />
          <Text style={styles.label}>{Name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '97%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'black',
    paddingVertical: 20,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    height: 100,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Buttons;
