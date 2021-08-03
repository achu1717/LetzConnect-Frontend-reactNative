const react = require("react");

import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, ImageBackground,Image, TextInput , Alert, ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class education extends Component {
    render() {
        return (
            
        <ScrollView>
        <View style={styles.v1}>
      </View>
        <View style={styles.v2}>
        
<Text style={styles.banner}>Institution / University</Text>
          <TextInput
            placeholder="Add Education (e.g. MCA)"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
            
          />
          <Text style={styles.banner}>Degree</Text>
          <TextInput
            placeholder="Add Education (e.g. MCA)"
            placeholderTextColor="gray"
            style={
              styles.logintxtbx
             
            }
            
          />
  <Text style={styles.banner}>Field of study</Text>
          <TextInput
            placeholder="Add Education (e.g. MCA)"
            placeholderTextColor="gray"
            style={
              styles.logintxtbx
              }
          />
            <Text style={styles.banner}>Grade</Text>
          <TextInput
            placeholder="Add Education (e.g. MCA)"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
          />
          <Text style={styles.banner}>Activities and Societies</Text>
          <TextInput
            placeholder="Add Education (e.g. MCA)"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
          />
 <View style={styles.yer}>
 <Text style={styles.banner}>Year</Text>
 </View>
          <View style={styles.yer}> 
          <TextInput
            placeholder="Year from"
            placeholderTextColor="gray"
            style={styles.logintxtbx2}
            keyboardType="numeric"
          />
        
           <TextInput
            placeholder="Year To"
            placeholderTextColor="gray"
            style={styles.logintxtbx2}
            keyboardType="numeric"
          />
          </View>
          <Text style={styles.banner}>Description (optional)</Text>
          <TextInput
            placeholder="Description"
            placeholderTextColor="gray"
            style={styles.logintxtbx}
          />

          <View style={styles.v3}>
            <View
              style={styles.signup}
              blurRadius={Platform.OS == "ios" ? 15 : 5}
            >
              <Button
                title="NEXT>>>"
                color="black"
                onPress={() => this.props.navigation.navigate('LOGIN')}
              />
              
            </View>
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
  yer:{
      flexDirection:"row"
  },
  yer1:{
    flexDirection:"row",
    justifyContent: 'space-between'
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
  logintxtbx2: {
    fontSize: 19,
    textAlign: "center",
    height: 50,
    borderWidth: 1,
    width: "40%",
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
