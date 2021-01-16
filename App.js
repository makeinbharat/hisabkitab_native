import React, {useState, useEffect} from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, TextInput } from 'react-native';

const App = () => {
  const [contacts, setContacts] = useState ([]);
  const [addContactModal, openAddNewContactModal] = useState(false);

  const [newContactName, setNewContactName] = useState ('')
  const [newContactHisab, setNewContactHisab] = useState ('')
  const [newContactNote, setNewContactNote] = useState ('')

  const validateNewContactFields = () =>{
    if(!newContactName.trim()){
      window.alert("Name is Required");
    }
    else if(newContactName.search(/^[a-z0-9_]+$/)){
      window.alert("Only small case letters allowed and spaces not allowed in Name")
    }
    else if(!newContactHisab.trim()){
      window.alert("Balance is Required")
    }
    else if(newContactHisab.search(/^-?[0-9]+$/)){
      window.alert("Only Numbers allowed and spaces not allowed in Balance")
    }
    else{
//      window.alert("New Contact Added Successfuly");
      addNewContact();
    }
  }

  const addNewContact = () =>{
    var newType="";
    if(newContactHisab<0)
        newType="credit";
    else
        newType="debit";

    const contactBody = { 
      name: newContactName,
      hisab: newContactHisab,
    };

    const transactionBody = { 
      name: newContactName,
      hisab: newContactHisab,
      type: newType,
      note: newContactNote,
    };

    window.alert(JSON.stringify(transactionBody));


    var RNFS = require('react-native-fs');
    var contactsPath = RNFS.ExternalDirectoryPath + '/contacts.txt';
    console.log(contactsPath);

    RNFS.readFile(contactsPath, 'utf8')
    .then((contents) => {
      // log the file contents
      var oldContacts = contacts;
      oldContacts[oldContacts.length] = { "name": contactBody.name, "hisab": parseInt(contactBody.hisab)};
      console.log(JSON.stringify(oldContacts));
      RNFS.writeFile(contactsPath, JSON.stringify(oldContacts), 'utf8');

      const readData = JSON.parse(contents);
      setContacts(readData);

      GetContacts();
    })
    
    var transactionPath = RNFS.ExternalDirectoryPath + '/contacts/' + transactionBody.name + '.txt';
    console.log(transactionPath);


  }
  const GetContacts = () =>{
    
    var RNFS = require('react-native-fs');
    var path = RNFS.ExternalDirectoryPath + '/contacts.txt';
  
    //Write Part Below

    RNFS.exists(path)
    .then((exists) =>{
      if(!exists){
        const data = [{"name": "name", "hisab": 0}]

        RNFS.writeFile(path, JSON.stringify(data), 'utf8')
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });            
      }
    })

    //Read Part Below
  
    RNFS.readFile(path, 'utf8')
    .then((contents) => {
      // log the file contents
      console.log(contents);
      const readData = JSON.parse(contents);
      setContacts(readData);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });

  }
  
  useEffect(() => {
      GetContacts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Hisab Kitab</Text>
      </View>
      <ScrollView style={styles.body}>
      {contacts.slice(1).map(contact=>(
          <Pressable style={styles.neulist} key={contact.name}>
            <Text style={styles.contact_name}>{contact.name}</Text>
            <Text style={styles.contact_updated_price}>₹ {contact.hisab}</Text>
            <Pressable style={styles.delete_contact} onPress={()=>window.alert("Delete")}>
              <Text style={{fontSize: 16, textAlign: 'center', color: '#fcfcfc'}}>Delete</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable style={styles.add_btn} onPress={() => openAddNewContactModal(true)}>
        <Text style={{fontSize: 42, textAlign: 'center', color: '#fcfcfc', fontWeight: 'bold' }}>+</Text>
      </Pressable>

      <Modal visible={addContactModal} animationType="slide">
        <View style={styles.navbar}>
            <Text style={styles.navTitle}>Add New Contact</Text>
        </View>
        <View style={styles.addContactModal}>
          <Text>{'\n'}</Text>
          <Text style={styles.label}>Name (Don't Include Spaces)</Text>
          <TextInput style={styles.textInput} onChangeText={name => setNewContactName(name)} value={newContactName} />
          <Text>{'\n'}</Text>
          <Text style={styles.label}>Balance</Text>
          <TextInput style={styles.textInput} onChangeText={name => setNewContactHisab(name)} value={newContactHisab} keyboardType="number-pad" />
          <Text>{'\n'}</Text>
          <Text style={styles.label}>Note (If Any)</Text>
          <TextInput style={styles.textInput} onChangeText={name => setNewContactNote(name)} value={newContactNote} />
          <Text>{'\n'}</Text>
          <Pressable style={styles.addContactButton} onPress={validateNewContactFields}>
              <Text style={{fontSize: 16, textAlign: 'center', color: '#fcfcfc'}}>Add</Text>
          </Pressable>

        </View>

        <Pressable style={styles.cancel_btn} onPress={() => openAddNewContactModal(false)}>
          <Text style={{fontSize: 38, textAlign: 'center', color: '#fcfcfc', fontWeight: 'bold' }}>x</Text>
        </Pressable>
      </Modal>
    </View>
  );
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


export default App;