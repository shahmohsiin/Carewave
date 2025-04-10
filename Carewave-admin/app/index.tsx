import { ImageBackground, View, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useState } from "react";
import Buttons from "./Buttons";

export default function Index() {
  const [image, setImage] = useState("https://webgradients.com/public/webgradients_png/050%20Snow%20Again.png");

  const gradientOptions = [
    "https://webgradients.com/public/webgradients_png/162%20Perfect%20White.png",
    "https://webgradients.com/public/webgradients_png/161%20Salt%20Mountain.png",
    "https://webgradients.com/public/webgradients_png/092%20Japan%20Blush.png",
  ];

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={{ uri: image }}>

        <View style={styles.titleContainer}>
          <Text variant="displayMedium" style={{fontSize:40,marginBottom:-10}}>Admin</Text>
          <Text variant="displayMedium" style={styles.title}>Carewave</Text>
          <Text variant="titleSmall" style={styles.subtitle}>Hospital and Trauma Center</Text>
        </View>

        <Buttons Name="Appointments" myUrl="/AppointmentsList" myIcon="calendar-check" />
        <Buttons Name="Blood Tests" myUrl="/BloodTestsList" myIcon="flask-outline" />

        <View style={styles.gradientPicker}>
          {gradientOptions.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => setImage(uri)}>
              <Image source={{ uri }} style={styles.gradientThumbnail} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.contactRow}>
          <IconButton
            style={styles.iconBtn}
            icon="gmail"
            iconColor={"white"}
            size={30}
            onPress={() => Linking.openURL("mailto:mohsindev798@gmail.com")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  titleContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
  },
  gradientPicker: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    gap: 12,
  },
  gradientThumbnail: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 90,
    gap: 20,
  },
  iconBtn: {
    backgroundColor: "black",
    width: 150,
    height:50,
    borderRadius: 25,
  },
});
