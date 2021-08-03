import * as React from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";


export default class Imagepick extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  render() {
    let { image } = this.state;

    return (
      <View
        style={{
          flex: 0.3,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 20,
          borderRadius: 10,
          marginBottom: 2,
          borderWidth:0,
padding:0,
    marginTop:0,
        }}
      >{image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 ,borderRadius:50 }} />
      )}
        <Button
          title="."
          onPress={this._pickImage}
        />
        
      </View>
    );
  }

 
}
