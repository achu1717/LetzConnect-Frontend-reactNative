import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Alert, 
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebase from '../../config/config';
export default class Homescreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValdate: true,
      password: "",
      passwordValdate: true,
      displayName:"",
      isLoading: false
    };
  }



  // Validite(text, type) {
  //   alph = /^[a-z1-9@.]+$/;
  //   pass = /^[a-z1-9A-Z]+$/;
  //   if (type == "email") {
  //     if (alph.test(text)) {
  //       this.setState({
  //         emailValdate: true,
  //       });
  //     } else {
  //       this.setState({
  //         emailValdate: false,
  //       });
  //     }
  //   } else if (type == "password") {
  //     if (pass.test(text)) {
  //       this.setState({
  //         passwordValdate: true,
  //       });
  //     } else {
  //       this.setState({
  //         passwordValdate: false,
  //       });
  //     }
  //   }
  // }
  //firebase code
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('EDUCATION')
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
        
<Text style={styles.banner}>Username </Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
            onChangeText={(val) => this.updateInputVal(val, 'displayName')}
          />
          <Text style={styles.banner}>Email ID</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={[
              styles.logintxtbx,
              !this.state.emailValdate ? styles.error : null,
            ]}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
  <Text style={styles.banner}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            style={[
              styles.logintxtbx,
              !this.state.passwordValdate ? styles.error : null,
            ]}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            secureTextEntry
          />
            <Text style={styles.banner}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
            secureTextEntry
          />

          <View style={styles.v3}>
            <View
              style={styles.signup}
            >
              <Button
                title="Sign up"
                color="black"
                onPress={() => this.registerUser()}
              />
              
            </View>
            <Button
              title="Already have an account? Sign in here."
              color="black"
              onPress={() => this.props.navigation.navigate('LOGIN')}
            />
          </View>
        </View></ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logintxtbx: {
    fontSize: 19,
    textAlign: "center",
    height: 50,
    borderWidth: 1,
    width: "90%",
    marginLeft: "5%",
    borderColor: "gray",
    marginBottom: 30,
  },
  banner:{
    marginLeft:"5%",
    fontSize:16
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
  logotxt: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#807EDD",
  },
  signup: {
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "90%",
    marginLeft: 0,
    alignContent: "center",
    backgroundColor:"white",
    height:60,
    justifyContent:"center",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
  },

  v2: {
    flex: 0.9,
    alignContent: "center",
    paddingTop: "0%",
  },
  v3: {
    flex: 0.7,
    width: "100%",
    marginTop: "5%",
    alignItems: "center",
  },
  error: {
    borderWidth: 1,
    borderColor: "red",
  },
});
