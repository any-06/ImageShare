import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import mountain from './assets/mountain-water.jpg'
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { useState } from "react";

export default function App() {

  const [image, setImage] = useState(null);

  const openSharing = async () => {
    const canIShare = await Sharing.isAvailableAsync();

    if (Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(image);
    }
    else
    {
      alert("You cannot share on your platform !");
    }
  }

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permission);

    if (permission.granted === false) {
      alert("Permission to access your library is required !");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled) {
      return;
    }
    setImage(pickerResult.uri);
  }

  if (image !== null) {
    return (
      <View style={styles.container}>
        <Image source={ mountain } style={ {width: 300, height: 300} } />
        <Text style={ {color: "#000", fontSize: 20} }>To share a photo please press the button below !</Text>
        <TouchableOpacity 
          onPress={ openSharing }
          style={ styles.button } >
          <Text style={ styles.textWite } >Share your photo</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        
        <TouchableOpacity 
          onPress={ ()=> { setImage(null) } }
          style={ styles.button } >
          <Text style={ styles.textWite } >Cancel</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={ mountain } style={ {width: 300, height: 300} } />
      <Text style={ {color: "#000", fontSize: 20} }>To share a photo please press the button below !</Text>
      <TouchableOpacity 
        onPress={ openImagePicker }
        style={ styles.button } >
        <Text style={ styles.textWite } > Pick a photo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#70e000", 
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  textWite: {
    color: "#fff"
  }
});

