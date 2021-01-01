import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../Colors';

export default ShowListModal = ({list, closeModal, updateList}) => {

    const [newTodo, setNewTodo] = useState("");

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;

    const toggleTodoCompleted = (index) => {
        let updatedList = list;
        updatedList.todos[index].completed = !updatedList.todos[index].completed

        updateList(updatedList);
    }

    const addTodo = () => {
        let updatedList = list;
        updatedList.todos.push({ title: newTodo, completed: false });

        updateList(updatedList);
        setNewTodo("");

        Keyboard.dismiss();
    }

    const renderTodo = (todo, index) => {
        return(
            <TouchableOpacity style={styles.todoContainer} onPress={() => toggleTodoCompleted(index)} >
                <Ionicons 
                    name={todo.completed ? 'checkmark-circle' : 'radio-button-off-outline'} 
                    size={24} 
                    color={Colors.gray} 
                    style={{ width: 32 }} 
                />

                <Text 
                    style={{
                        ...styles.todo, 
                        color: todo.completed ? Colors.gray : Colors.black , 
                        textDecorationLine: todo.completed ? 'line-through' : 'none', 
                    }} 
                >
                    {todo.title}
                </Text>
            </TouchableOpacity>
        );
    }

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} >
            <SafeAreaView style={styles.container} >
                <TouchableOpacity style={{ position: 'absolute', top: 32, right: 32, zIndex: 10 }} onPress={closeModal} >
                    <AntDesign name="close" size={24} color={Colors.black} />
                </TouchableOpacity>

                <View style={{...styles.section, ...styles.header, borderBottomColor: list.color}} >
                    <View>
                        <Text style={styles.title} >{list.name}</Text>
                        <Text style={styles.taskCount} >
                            {completedCount} of {taskCount} tasks completed
                        </Text>
                    </View>
                </View>

                <View style={{ ...styles.section, flex: 3 }}>
                    <FlatList 
                        data={list.todos}
                        renderItem={({item, index}) => renderTodo(item, index)}
                        keyExtractor={item => item.title}
                        contentContainerStyle={{ padding: 32 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View style={{ ...styles.footer }} >
                    <TextInput 
                        style={{ ...styles.input, borderColor: list.color }} 
                        onChangeText={text => setNewTodo(text)} 
                        value={newTodo}
                        placeholder="New task..." 
                    />
                    <TouchableOpacity 
                        style={{ ...styles.addTodo, backgroundColor: list.color }} 
                        onPress={() => addTodo()}
                    >
                        <AntDesign name="plus" size={16} color={Colors.white} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',

    },
    header: {
        justifyContent: 'flex-end',
        // marginLeft: 64,
        marginHorizontal: 20,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 0.5,
        borderRadius: 24,
        marginRight: 8,
        paddingHorizontal: 14
    },
    addTodo: {
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 16
    }
});