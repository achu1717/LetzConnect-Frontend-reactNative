import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ImageBackground,
  ImagePickerIOS,
  TouchableOpacity,
} from "react-native";
import firebase from "../../config/config";
import Landing from '../Landing'
import Imagepick from "../../components/Image";
import Location1 from "../../components/Location"
import { NavigationContainer } from '@react-navigation/native';
import Home from '../homepage/Homepage'


export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: "",
    };
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LOGIN");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };


  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      // email:firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
    };
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/back.jpg")}
        blurRadius={Platform.OS == "ios" ? 7 : 5}
      >

        
        <Home/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

});
