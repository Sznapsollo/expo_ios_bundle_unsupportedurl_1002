
import { Alert, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

export default function App() {

  const [textMsg , setTextMsg] = useState('trying ....');

  useEffect(() => {
  
    const initAndCheckDb= async () => {
      try {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
          console.log('Creating SQLite folder');
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        console.log('Copying db');
        await FileSystem.downloadAsync(
          Asset.fromModule(require('./assets/test_database.db3')).uri,
          FileSystem.documentDirectory + 'SQLite/test_database.db3'
        );
        const database =  SQLite.openDatabase('test_database.db3');

        database.transaction((tx) => {
          tx.executeSql(`SELECT * FROM test_table`,

              [],
              (transaction, result) => { console.log('db init done');setTextMsg(result.rows._array[0].text); },
              (transaction, error) => { console.log('db init error', error); }
          );
      });

        console.log('db init done');
      } catch(e) {
        console.warn('db init error', e);
        Alert.alert(
          'oops',
          e.toString(),
          [
              { text: 'ok', onPress: () => {}, style: 'cancel' },
          ],
          { cancelable: false }
      );
      }
    }
    
    initAndCheckDb();
  }, [])

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{textMsg}</Text>
    </View>
  );
}
