import { ImageBackground, View, Image, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Buttons from './Buttons';
import { useState } from 'react';
import { Linking } from 'react-native';

export default function Index() {
  const [image, setImage] = useState("https://webgradients.com/public/webgradients_png/050%20Snow%20Again.png");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ImageBackground style={{ flex: 1 }} source={{ uri: image }}>
        <View style={styles.headerContainer}>
        
          <Text style={styles.title} variant="displayMedium">Carewave</Text>
          <Text variant="titleSmall">Hospital and Trauma Center</Text>

          <View style={styles.gridContainer}>
            <Buttons Name="Book Appointment" myUrl="/Appoint" myIcon="account-check" />
            <Buttons Name="Book Test" myUrl="/Test" myIcon="clipboard-check-outline" />
            <Buttons Name="Pharmacy" myUrl="/pharmacy" myIcon="medical-bag" />
          </View>
        </View>

        <View style={styles.backgroundSelector}>
          {[
            "https://webgradients.com/public/webgradients_png/162%20Perfect%20White.png",
            "https://webgradients.com/public/webgradients_png/161%20Salt%20Mountain.png",
            "https://webgradients.com/public/webgradients_png/092%20Japan%20Blush.png",
          ].map((bg, index) => (
            <TouchableOpacity key={index} onPress={() => setImage(bg)}>
              <Image style={styles.bgThumb} source={{ uri: bg }} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactRow}>
          <IconButton
            style={styles.iconButton}
            icon="google-maps"
            iconColor="white"
            size={30}
            onPress={() => Linking.openURL("https://maps.app.goo.gl/1ssMBYH66qm572fd7")}
          />
          <IconButton
            style={styles.iconButton}
            icon="phone"
            iconColor="white"
            size={30}
            onPress={() => Linking.openURL(`tel:${8299665369}`)}
          />
          <IconButton
            style={styles.iconButton}
            icon="gmail"
            iconColor="white"
            size={30}
            onPress={() => Linking.openURL("mailto:mohsindev798@gmail.com")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '900',
    fontSize:50
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  backgroundSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 40,
  },
  bgThumb: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 90,
    marginTop: 80,
    gap: 10,
  },
  iconButton: {
    backgroundColor: 'black',
    width: 80,
  },
});

