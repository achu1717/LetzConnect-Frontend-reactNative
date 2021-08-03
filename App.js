import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login/Login";
import Signup from "./screens/signUp/Signup";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from "./screens/dashboard/Dashboard";
import Addata from "./screens/addData/AddData"
import Home from "./screens/home/home";
import Education from "./screens/education/education"
export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const AppNavigator = createStackNavigator({
  HOME:{
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  LOGIN: {
    screen: Login,
    navigationOptions: {
      title: "Sign in",
      
    }
  },
  REGISTER: {
    screen: Signup,
    navigationOptions: {
      title: "Creata an account",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#2C78E4',
      }
    }
  },
  PROFILE: {
    screen: Dashboard,
    navigationOptions: {
      title: "PROFILE",
      headerTintColor: '#fff',
      headerLeft: null,
          
          headerStyle: {
            backgroundColor: '#2C78E4',
          },
    },
  },
  EDUCATION: {
    screen : Education,
    navigationOptions: {
      title: "Add Education",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#2C78E4',
      }
    },
  },
  ADDATA:{
    screen: Addata,
    navigationOptions: {
      headerShown: false,
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);




const styles = StyleSheet.create({});
