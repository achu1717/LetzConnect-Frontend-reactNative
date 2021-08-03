import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'firebase'

export const addItem =  (item) => {
    firebase
    .database()
    .ref('/userdetails').push({
        name: item
    });
}
