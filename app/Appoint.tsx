import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Alert,ScrollView,ActivityIndicator
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  SegmentedButtons,
} from 'react-native-paper';
import Dropdown from './DropDown';
import { db } from '../config';
import { ref, set } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';

const Appoint = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState<Date | null>(null);
  
  const handleDateTimeChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) {
      if (mode === 'date') {
        // For Android: after date, show time picker
        if (Platform.OS === 'android') {
          setMode('time');
          setShow(true);
          setData((prev) => ({ ...prev, appointmentDate: selectedDate }));
        } else {
          setData((prev) => ({ ...prev, appointmentDate: selectedDate }));
        }
      } else {
        // Time mode
        const current = data.appointmentDate || new Date();
        const updatedDateTime = new Date(
          current.setHours(selectedDate.getHours(), selectedDate.getMinutes())
        );
        setData((prev) => ({ ...prev, appointmentDate: updatedDateTime }));
      }
    }
  };
  
  

  const [data, setData] = useState<{
    id: number;
    fullname: string;
    address: string;
    phone: string;
    age: string;
    blood: string;
    gender: string;
    symptoms: string;
    appointmentDate: Date | null;
  }>({
    id: Date.now(),
    fullname: '',
    address: '',
    phone: '',
    age: '',
    blood: '',
    gender: '',
    symptoms: '',
    appointmentDate: null,
  });

  const handleSubmit = async () => {
    if (!data.appointmentDate) {
      Alert.alert('Error', 'Please select an appointment date.');
      return;
    }
  
    const hasEmptyField = Object.entries(data).some(
      ([key, value]) =>
        key !== 'id' && key !== 'appointmentDate' && String(value).trim() === ''
    );
  
    if (hasEmptyField) {
      Alert.alert('Error', 'Please fill in all the fields. ❗️ ');
      return;
    }
  
    const uniqueName = data.fullname+data.phone
  
    try {
      await set(ref(db, 'PatientDetails/' + uniqueName), {
        ...data,
        id: Date.now(),
        appointmentDate: data.appointmentDate.toISOString(),
      });
  
      Alert.alert('Success', 'Appointment submitted successfully!'+ `Your Appointment is booked on ${data.appointmentDate} ✅ `); 
      console.log('Submitted:', {
        ...data,
        appointmentDate: data.appointmentDate.toISOString(),
      });
  
      // Reset state
      setData({
        id: Date.now(),
        fullname: '',
        address: '',
        phone: '',
        age: '',
        blood: '',
        gender: '',
        symptoms: '',
        appointmentDate: null,
      });
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'Failed to submit appointment. Please try again. 🟥 ');
    }

    finally {
      setLoading(false); // End loading
    }
  };
  
  
  return (
    <View style={{ marginTop: 90, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <Text style={{ fontWeight: '300' }} variant="displaySmall">Book</Text>
          <Text style={{ fontWeight: '300' }} variant="displaySmall">Appointment.</Text>
        </View>

        <ScrollView
  style={{ maxHeight: '60%' }}
  contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
  showsVerticalScrollIndicator={true}
>
  <TextInput
    mode="outlined"
    theme={{ colors: { primary: 'purple' }, roundness: 15 }}
    style={styles.input}
    value={data.fullname}
    onChangeText={(name) => setData({ ...data, fullname: name })}
    label="First and Last Name"
  />

  <TextInput
    mode="outlined"
    theme={{ colors: { primary: 'purple' }, roundness: 15 }}
    style={styles.input}
    value={data.address}
    onChangeText={(address) => setData({ ...data, address })}
    label="Address"
  />

  <TextInput
    style={styles.input}
    mode="outlined"
    theme={{ colors: { primary: 'purple' }, roundness: 15 }}
    value={data.phone}
    onChangeText={(phone) => setData({ ...data, phone })}
    label="Phone Number"
    keyboardType="numeric"
  />

  <TextInput
    style={styles.input}
    mode="outlined"
    theme={{ colors: { primary: 'purple' }, roundness: 15 }}
    value={data.age}
    onChangeText={(age) => setData({ ...data, age })}
    label="Your Age"
    keyboardType="numeric"
  />

  <TextInput
    style={styles.textarea}
    mode="outlined"
    theme={{ colors: { primary: 'purple' }, roundness: 15 }}
    value={data.symptoms}
    onChangeText={(symptoms) => setData({ ...data, symptoms })}
    label="Symptoms"
    multiline
  />

  <View style={styles.input}>
    <Dropdown
      data={[
        { value: 'A+', label: '(A+) A positive' },
        { value: 'A-', label: '(A-) A negative' },
        { value: 'B+', label: '(B+) B positive' },
        { value: 'B-', label: '(B-) B Negative' },
        { value: 'O+', label: '(O+) O positive' },
        { value: 'O-', label: '(O-) O Negative' },
        { value: 'AB+', label: '(AB+) AB Positive' },
        { value: 'AB-', label: '(AB-) AB Negative' },
      ]}
      placeholder="Blood Group"
      onChange={(selected) =>
        setData((prevData) => ({ ...prevData, blood: selected.value }))
      }
    />
  </View>

  <View style={styles.row}>
    <SegmentedButtons
      value={data.gender}
      onValueChange={(value) => setData({ ...data, gender: value })}
      buttons={[
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
      ]}
      style={styles.segmentedButtons}
    />
  </View>

 
</ScrollView>
<View style={{ alignItems: 'center', marginTop: 10, borderRadius: 10, padding: 10 , }}>
  <Button
  labelStyle={{color:"#00000"}}
    mode="outlined"
    onPress={() => {
      setMode('date');
      setShow(true);
    }}
  >
    {data.appointmentDate
      ? data.appointmentDate.toLocaleString([], {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : 'Select Appointment Date'}
  </Button>

  {show && (
    <DateTimePicker
      value={tempDate || new Date()}
      mode={mode}
      is24Hour={false}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      minimumDate={new Date()}
      onChange={(_event, selectedDate) => {
        if (Platform.OS === 'android') {
          if (mode === 'date') {
            setShow(false);
            if (selectedDate) {
              setTempDate(selectedDate);
              setTimeout(() => {
                setMode('time');
                setShow(true);
              }, 200);
            }
          } else {
            setShow(false);
            if (selectedDate && tempDate) {
              const finalDateTime = new Date(
                tempDate.getFullYear(),
                tempDate.getMonth(),
                tempDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes()
              );
              setData((prev) => ({ ...prev, appointmentDate: finalDateTime }));
              setTempDate(null);
            }
          }
        } else {
          if (selectedDate) {
            setData((prev) => ({ ...prev, appointmentDate: selectedDate }));
          }
        }
      }}
    />
  )}
</View>

{loading ? (
  <ActivityIndicator size="large" color="purple" style={{ margin: 20 }} />
) : (
  <Button
    style={{ width: 250, margin: 20 }}
    buttonColor="black"
    mode="contained"
    onPress={handleSubmit}
    disabled={loading}
  >
    Submit
  </Button>
)}

      </SafeAreaView>
    </View>
  );
};

export default Appoint;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 270,
    margin: 10,
    borderRadius: 20,
  },
  textarea: {
    height: 70,
    width: 270,
    margin: 10,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  segmentedButtons: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },
});
