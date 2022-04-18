import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text,ScrollView,TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [data, setData] = useState([]);
  const [kontak, onChangeText] = useState("");

  useEffect(() => {
   
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          const contact = data;
          setData(contact)
        }
      }
    })();
  }, []);

let i=1;

  return (
    <View >
      <View style={styles.name}>
        <Text style={styles.textName}>Nama Kontak</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={kontak}
        placeholder="Cari Kontak"

      />
      <ScrollView style={styles.scroll}>
      {
         data.length > 0  &&  data
         .filter(kk=> kk.name
         .toLowerCase()
         .includes(kontak
         .toLowerCase()))
         .map((item ,index)=> {
          return (
            <View>
             <Text key={index}>{i++}.{" "}{item.name}</Text>
            </View>
          )
      })
        
      }
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  name:{
   height: 80,
   width: '100%',
  },
  textName:{
    textAlign:'center',
    marginTop: '15%',
    fontWeight:'bold',
  },
  scroll: {
    margin:5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});