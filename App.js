import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './Colors';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import tempData from './tempData';

// const formatData = (data, numColumns) => {
//   const numberOfFullRows = Math.floor(data.length / numColumns);

//   let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
//   while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
//     data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow++;
//   }

//   return data;
// };

const numColumns = 2;
export default function App() {

  const [addTodoVisible, setAddTodoVisible] = useState(false);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={addTodoVisible} onRequestClose={() => toggleAddTodoModal()} >
        <AddListModal closeModal={() => toggleAddTodoModal()} />
      </Modal>
      <View style={{ flexDirection: 'row', marginVertical: 40}}>
        <View style={styles.divider} ></View>
        <Text style={styles.title} >
          Todo <Text style={{ fontWeight: "300", color: Colors.blue }} > App </Text>
        </Text>
        <View style={styles.divider} ></View>
      </View>

      {/* <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList} >
          <AntDesign name="plus" size={16} color={Colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View> */}
      
        <FlatList 
          // data={formatData(tempData, numColumns)}
          data={tempData}
          // style={styles.container}
          keyExtractor={item => item.name}
          numColumns={numColumns}
          renderItem={({item}) => (
            <TodoList item={item} />
          )}
        />

      <TouchableOpacity style={styles.fixedView} onPress={() => toggleAddTodoModal()} >
        <AntDesign name="plus" size={16} color={Colors.white} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
    paddingHorizontal: 64
  },
  // addList: {
  //   borderColor: Colors.lightBlue,
  //   borderWidth: 2,
  //   borderRadius: 4,
  //   padding: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // add: {
  //   color: Colors.blue,
  //   fontWeight: '600',
  //   fontSize: 14,
  //   marginTop: 8
  // },
  fixedView : {
    position: 'absolute',
    right: 30,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.blue,
    padding: 20,
    borderRadius: 50
  },
});
