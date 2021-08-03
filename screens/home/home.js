const react = require("react");

import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, ImageBackground,Image, TextInput , Alert, ActivityIndicator} from 'react-native';

export default class home extends Component {
    render() {
        return (
            <View style={styles.container}
          >
            <View style={styles.v1}>
             
              <Text style={styles.logotxt}>Letz Connect</Text>
            </View>
           
              <View
                style={styles.loginbtn}
            
              >
                <Button title="Sign up" color="black" 
                onPress={() => this.props.navigation.navigate('REGISTER')}
                />
              </View>
              <View style={styles.v3}>
                <View
                  style={styles.signup}
              
                >
                  <Button
                    title="Sign in"
                    color="black"
                    onPress={() => this.props.navigation.navigate('LOGIN')}
                  />
                </View>
              </View>
          </View>
          )
        }
      }
      const styles = StyleSheet.create({
        container:{
flex:1,
marginTop:"30%"
        },
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
          fontSize: 25,
          textAlign: "center",
          height: 50,
          borderWidth: 1,
          width: "70%",
          marginLeft: 60,
          borderTopColor: 0,
          borderRightColor: 0,
          borderLeftColor: 0,
          borderColor: "white",
          marginBottom: 30,
        },
        loginbtn: {
          borderColor: "#C0C0C0",
          borderWidth: 1,
          width: "90%",
          marginLeft: "5%",
          alignContent: "center",
          justifyContent:"center",
          backgroundColor:"white",
          height:60,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.30,
          shadowRadius: 4.65,
          
          elevation: 8,
        },
  
        signup: {
            borderColor: "#C0C0C0",
            borderWidth: 1,
            width: "90%",
            justifyContent:"center",
            alignContent: "center",
            backgroundColor:"white",
            height:60,
          marginTop: "1%",
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
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
        },
        v3: {
          flex: 0.6,
          width: "100%",
          marginTop: "5%",
          alignItems: "center",
          alignContent:"flex-end"
        },
        nruy: {
          fontSize: 20,
          fontFamily: "Arial",
          color: "white",
        },
      });



