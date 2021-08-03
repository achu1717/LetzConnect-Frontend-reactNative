  onChooseImagePress= async()=>{
      let result=await ImagePicker.launchCameraAsync();
      if(!result.cancelled){
        this.uploadImage(result.uri,"testImage")
       .then(()=>{
  Alert.alert("Success");
       })
       .catch((error)=>{
  Alert.alert("Failed")
       })
      }
    }

      uploadImage = async (uri,imageName)=>{
  const response=await fetch(uri);
  const blob=await response.blob();

  var ref=firebase.storage().ref.child("images/"+imageName);
      return ref.put(blob);
    }