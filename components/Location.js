import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function Loc() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');

      }

      let location = await Location.getCurrentPositionAsync({
        
      });
      setLocation(location);
    })();
  });

  let text = 'Waiting for location';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:0.3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "0%",
    marginTop: "10%",
    paddingBottom: "0%",
    backgroundColor:'white',
    borderColor:"gray",
    borderRadius:10,
    borderWidth:2,
    marginLeft:20,
    marginRight:20,
  },
});

