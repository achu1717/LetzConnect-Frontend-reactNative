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
  Image,
} from "react-native";
import firebase from '../../config/config'
import Imagepick from "../../components/Image";
import AddData from "../addData/AddData"
import { ScrollView } from "react-native-gesture-handler";


export default class Welcome extends Component {
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
          this.navigation.navigate("LOGIN");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    };
   
  
    render() {
      this.state = {
        displayName: firebase.auth().currentUser.displayName,
    
      };
      return (
      <ScrollView>
          <View style={styles.container}>
         
            
          <Image source={require('../../assets/user.png')} 
          style={styles.usericn}/>
          
         
            <Text style={styles.reguser1}>{this.state.displayName}</Text>
           
            <Text style={styles.reguser1}>Higher Education</Text>
            <Text style={styles.reguser1}>Current working company or Fresher</Text>
            <View style={styles.b1}>
              <Text style={styles.reguser}>Experience</Text>
              <Text>FullStack Developer (or) Job Roll</Text>
              <Text>Current Working Company (or) Fresher</Text>
              <Text>Mar 2019 - Present 1year 7 months</Text>
              <Text></Text>
             
                          </View>
                          <View style={styles.b1}>
              <Text style={styles.reguser}>Education</Text>
              <Text>College Name</Text>
              <Text>Course Name</Text>
              <Text>2017 - 2019</Text>
              <Text></Text>
                          </View>
          </View>
</ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 5,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "flex-start",
      marginBottom: "0%",
      marginTop: "10%",
      paddingBottom: "0%",
      backgroundColor: "white",
      marginLeft: 20,
      flexDirection: 'column',
      marginRight: 20,
      marginBottom:"8%"

    },
    b1:{
backgroundColor:"#F7F7FA",
width:"90%",
marginBottom:3
    },
    v4: {
      flex: 0.7,
      alignContent: "center",
      paddingTop: "0%",
    },
    usericn:{
      height:100,
      width:100
    },
    logoutbtn: {
      borderColor: "red",
      borderWidth: 1,
      width: "27%",
      borderRadius: 10,
      alignSelf:"flex-end",
      marginRight:5,
      marginTop:5
      
    },
    background: {
      flex: 1,
      justifyContent: "flex-end",
    },
    reguser: {
      fontSize: 20,
      marginBottom: 20,
      color: "#2C78E4",
      marginTop:10,
      marginLeft:2
    },
    reguser1: {
      fontSize: 18,
      marginBottom:3,
      color: "black",
      marginTop:10,
      fontWeight: "bold"
    },
  });