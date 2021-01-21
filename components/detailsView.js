import React, {useState, useEffect} from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, TextInput } from 'react-native';

const DetailsView = ({contact}) => {

    const [transactions, setTransactions] = useState([]);

    const transactionView = name =>{

        var RNFS = require('react-native-fs');
        var contactsPath = RNFS.ExternalDirectoryPath + '/' + name + '.txt';
        console.log(name);

        /*
        RNFS.readFile(contactsPath, 'utf8')
        .then((contents) => {
            // log the file contents
            var oldContacts = contacts;
            oldContacts[oldContacts.length] = { "name": contactBody.name, "hisab": parseInt(contactBody.hisab)};
            RNFS.writeFile(contactsPath, JSON.stringify(oldContacts), 'utf8');

            const readData = JSON.parse(contents);
            setContacts(readData);

            GetContacts();
        })
        */
    }

    const openHistory = name =>{
      window.alert(name)
    }

    return(
      <Pressable style={styles.history_contact} onPress={()=>openHistory(contact)}>
        <Text style={{fontSize: 16, textAlign: 'center', color: '#fcfcfc'}}>History</Text>
      </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fcfcfc',
      height: '100%',
      paddingTop: 'auto',
    },
    navbar:{
      top: 0,
      height: 72,
      width: '100%',
      backgroundColor: '#0e1e1e',
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.69,
      shadowRadius: 9,
      elevation: 10,
    },
    navTitle:{
      fontSize: 36,
      padding: 12,
      color: '#fcfcfc',
    },
    body:{
      minHeight: '80%',
      width: '100%',
      backgroundColor: '#2e2e2e',
      padding: 10,
    },
    neulist:{
      width: '90%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 16,
      backgroundColor: '#3e3e3e',
      minHeight: 100,
      borderRadius: 10,
      shadowColor: "#acacac",
      shadowOffset: {
        width: 4,
        height: 8,
      },
      shadowOpacity: 0.79,
      shadowRadius: 9,
      elevation: 6,
      padding: 10,
    },
    contact_name:{
      color: '#fcfcfc',
      fontSize: 32,
      display: 'flex',
    },
    contact_updated_price:{
      color: '#fcfcfc',
      fontSize: 26,
      display: 'flex',
    },
    delete_contact:{
      display: 'flex',
      marginLeft: 'auto',
      marginTop: -30,
      width: 'auto',
      height: 'auto',
      backgroundColor: '#cc2936',
      padding: 6,
      borderRadius: 3,
    },
    history_contact:{
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 70,
      marginTop: -36,
      width: 'auto',
      height: 'auto',
      backgroundColor: '#0e1e1e',
      padding: 8,
      borderRadius: 5,
    },
    add_btn:{
      width: 60,
      height: 60,
      borderRadius: 90,
      backgroundColor: '#0e1e1e',
      position: 'absolute',
      top: '88%',
      right: 10,
      elevation: 7,
    },
    cancel_btn:{
      width: 60,
      height: 60,
      borderRadius: 90,
      backgroundColor: '#cc2936',
      position: 'absolute',
      top: '88%',
      right: 10,
      elevation: 7,
    },
    addContactModal:{
      padding: 20,
      display: 'flex',
      height: '100%',
      backgroundColor: '#2e2e2e',
    },
    textInput:{
      height: 50,
      width: '80%',
      borderColor: '#8c8c8c',
      borderWidth: 1,
      fontSize: 22,
      color: '#fcfcfc',
      borderRadius: 6,
    },
    label:{
      color: '#fcfcfc',
      margin: 6,
      marginLeft: 0,
      fontSize: 18,
    },
    addContactButton:{
      width: 80,
      fontSize: 28,
      backgroundColor: '#3e3e3e',
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 6,
      shadowColor: "#acacac",
      shadowOffset: {
        width: 4,
        height: 8,
      },
      shadowOpacity: 0.79,
      shadowRadius: 9,
      elevation: 6,
    }
  });

export default DetailsView;