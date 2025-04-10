import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../config';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appointmentsRef = ref(db, 'PatientDetails');
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value,
        }));
        setAppointments(loaded.reverse());
      } else {
        setAppointments([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = (id: string, status: string) => {
    update(ref(db, `PatientDetails/${id}`), { status })
      .then(() => console.log(`Updated to ${status}`))
      .catch((err) => console.error('Update failed:', err));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {appointments.length === 0 ? (
          <Text style={styles.emptyText}>No appointments found.</Text>
        ) : (
          appointments.map((appt) => (
            <View key={appt.id} style={styles.card}>
              <Text style={styles.name}>{appt.fullname}</Text>

              <View style={styles.detailRow}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{appt.phone}</Text></View>
              <View style={styles.detailRow}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{appt.address}</Text></View>
              <View style={styles.detailRow}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{appt.age}</Text></View>
              <View style={styles.detailRow}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{appt.gender}</Text></View>
              <View style={styles.detailRow}><Text style={styles.label}>Blood Test:</Text><Text style={styles.value}>{appt.blood}</Text></View>
              <View style={styles.detailRow}><Text style={styles.label}>Symptoms:</Text><Text style={styles.value}>{appt.symptoms}</Text></View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Appointment:</Text>
                <Text style={styles.value}>
                  {new Date(appt.appointmentDate).toLocaleString('en-IN', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              <View style={[styles.detailRow, { marginTop: 10 }]}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, {
                  fontWeight: 'bold',
                  color: appt.status === 'Complete' ? '#16a34a' : '#dc2626'
                }]}>
                  {appt.status || 'Not Complete'}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.completeBtn]}
                  onPress={() => handleStatusChange(appt.id, 'Complete')}
                >
                  <Text style={styles.btnText}>Mark Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.incompleteBtn]}
                  onPress={() => handleStatusChange(appt.id, 'Not Complete')}
                >
                  <Text style={styles.btnText}>Mark Incomplete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    color: '#333',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  headerTitle: {
    color: '#111',
    fontSize: 28,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 110,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBtn: {
    backgroundColor: '#e6fbe8',
    borderColor: '#16a34a',
    borderWidth: 1.2,
  },
  incompleteBtn: {
    backgroundColor: '#ffeaea',
    borderColor: '#dc2626',
    borderWidth: 1.2,
  },
  btnText: {
    color: '#111',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default AppointmentsList;
