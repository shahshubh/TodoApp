import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  TouchableOpacity, 
  FlatList,
  Modal, 
  SafeAreaView, 
  ActivityIndicator, 
  LogBox
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from './constants/Colors';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import { StatusBar } from 'expo-status-bar';

import { getLists, createList, updateList } from './firebase/helpers';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};
const numColumns = 2;

LogBox.ignoreAllLogs();

export default function App() {

  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    getLists(lists => {
      setLists(lists);
      setIsLoading(false);
    })
  }, []);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(prevState => !prevState);
  }

  const renderList = (list) => {
    return (
      <TodoList list={list} updateList={updateListHandler} />
    );
  }

  const addListHandler = (list) => {
    // let updatedList = lists;
    // if(updatedList[updatedList.length - 1].empty){
    //   updatedList.splice(updatedList.length - 1, 1);
    // }
    // updatedList = [...updatedList, {...list, todos: [], id: updatedList.length + 1 }];
    // setLists(updatedList);
    createList({
      name: list.name,
      color: list.color,
      todos: [],
      createdAt: Date.now()
    });
  }

  const updateListHandler = (list) => {
    // let updatedList = lists;
    // updatedList = updatedList.map(l => l.id === list.id ? list : l);
    // setLists(updatedList);
    updateList(list);
  }


  if (isLoading) {
    return (
      <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }} >
        <ActivityIndicator size={50} color={Colors.white} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Modal animationType="slide" visible={addTodoVisible} onRequestClose={() => toggleAddTodoModal()} >
        <AddListModal closeModal={() => toggleAddTodoModal()} addList={addListHandler} />
      </Modal>
      <View style={styles.header}>
        <Text style={styles.title} >Todo </Text>
        <Text style={{ fontSize: 30, color: Colors.lightBlue }} >Lists </Text>
      </View>

      {lists.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.white }} >No Todo Lists</Text>
          <Text style={{ fontSize: 18, color: Colors.white }} >Start by creating some now !!</Text>
        </View>

      ) : (
        <FlatList
          data={formatData(lists, numColumns)}
          // style={styles.container}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      )}
      
      

      <TouchableOpacity style={styles.fixedView} onPress={() => toggleAddTodoModal()} >
        <AntDesign name="plus" size={16} color={Colors.white} />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  header: {
    flexDirection: 'row', 
    marginTop: 20, 
    marginBottom: 10, 
    paddingVertical: 10, 
    justifyContent: 'center', 
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightBlue 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
    // paddingHorizontal: 64,
  },

  fixedView: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightBlue,
    padding: 20,
    borderRadius: 50
  },
});
