import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground,Image, TextInput , Alert, ActivityIndicator} from 'react-native';
import firebase from '../../config/config';

import Homepg from '../dashboard/BottomTabNav'
import { ScrollView } from 'react-native-gesture-handler';
export default class Homescreen extends Component {

//firebase code for login
constructor() {
  super();
  this.state = { 
    email: '', 
    password: '',
    isLoading: false
  }
}

updateInputVal = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
}

userLogin = () => {
  if(this.state.email === '' && this.state.password === '') {
    Alert.alert('Enter details to signin!')
  } else {
    
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      console.log(res)
      console.log('User logged-in successfully!')
      this.setState({
        isLoading: false,
        email: '', 
        password: ''
      })
      this.props.navigation.navigate('PROFILE')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }
}

  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    } 

    return (
     <ScrollView>
      <View style={styles.v1}>
      <Text style={styles.logotxt}>Letz Connect</Text>
      </View>
      <View style={styles.v2}>
        <Text style={styles.banner}>Username / Email ID</Text>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="gray"
          style={styles.logintxtbx}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Text style={styles.banner}>Password</Text>
        <TextInput
          placeholder="******"
          placeholderTextColor="gray"
          style={styles.logintxtbx}
          secureTextEntry
          onChangeText={(val) => this.updateInputVal(val, 'password')}
        />

        <View style={styles.v3}>
        <View
          style={styles.loginbtn}
          
        >
          <Button title="Sign in" color="black" 
          onPress={() => this.userLogin()}
          />
        </View>
          <View
            style={styles.signup}
            
          >
            <Button
              title="New to LetzConnect? Create new Account"
              color="black"
              onPress={() => this.props.navigation.navigate('REGISTER')}
            />
          </View>
        </View>
      </View>
   </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logotxt: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#807EDD",
  },
  logintxtbx: {
    fontSize: 19,
    textAlign: "center",
    height: 50,
    borderWidth: 1,
    width: "90%",
    marginLeft:"5%",
    borderColor: "gray",
    marginBottom: 20,
  },
  banner:{
    marginLeft:"5%",
    fontSize:16
  },
  loginbtn: {
    borderColor: "#C0C0C0",
    borderWidth: 1,
    backgroundColor:"white",
    width: "90%",
    marginLeft: 0,
    alignContent: "center",
    height:60,
    
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
justifyContent:"center",
  },


  v1: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "0%",
    marginTop: "10%",
    paddingBottom: "0%",
  },
  v2: {
    flex: 0.7,
    alignContent: "center",
    paddingTop: "0%",
    marginTop:"10%"
  },
  v3: {
    flex: 0.7,
    width: "100%",
    marginTop: "5%",
    alignItems: "center",
    alignContent:"flex-end",
    justifyContent:"flex-end"
  },
  nruy: {
    fontSize: 20,
    fontFamily: "Arial",
    color: "white",
  },
});