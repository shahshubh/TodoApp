import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { deleteList } from '../firebase/helpers';
import SelectColors from './SelectColors';


export default ShowListModal = ({ list, closeModal, updateList }) => {

    const [newTodo, setNewTodo] = useState("");
    const [color, setColor] = useState(list.color);

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;

    const toggleTodoCompleted = (index) => {
        let updatedList = list;
        updatedList.todos[index].completed = !updatedList.todos[index].completed;
        if(updatedList.todos[index].completed){
            updatedList.todos.push(updatedList.todos.splice(index, 1)[0]);
        } else {
            updatedList.todos.unshift(updatedList.todos.splice(index, 1)[0]);
        }
        // updatedList.updatedOn = Date.now();
        updateList(updatedList);
    }

    const addTodo = () => {
        let updatedList = list;
        updatedList.todos.push({ title: newTodo, completed: false });
        // updatedList.updatedOn = Date.now();
        updateList(updatedList);
        setNewTodo("");
        // Keyboard.dismiss();
    }

    const deleteTodo = (index) => {
        let updatedList = list;
        list.todos.splice(index, 1);
        updateList(updatedList);
    }

    const deleteTodoListHandler = () => {
        Alert.alert(
            'Are you sure?',
            'Do you want to delete this Todo List?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        deleteList(list);
                        closeModal();
                    }
                }
            ]
        )
    }

    const renderTodo = (todo, index) => {
        return (
            <View style={{ ...styles.todoContainer }} >
                <TouchableOpacity onPress={() => toggleTodoCompleted(index)} >
                    <Ionicons
                        name={todo.completed ? 'checkmark-circle' : 'radio-button-off-outline'}
                        size={24}
                        color={Colors.gray}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...styles.todo,
                        color: todo.completed ? Colors.gray : Colors.white,
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                    }}
                >
                    {todo.title}
                </Text>

                <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => deleteTodo(index)} >
                    <MaterialIcons
                        name="delete"
                        size={20}
                        color={Colors.red}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    const onColorSelectHandler = (selectedColor) => {
        updateList({ ...list, color: selectedColor });
        setColor(selectedColor);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} >
            <SafeAreaView style={styles.container} >
                <TouchableOpacity style={{ position: 'absolute', top: 32, right: 32, zIndex: 10 }} onPress={closeModal} >
                    <AntDesign name="close" size={24} color={Colors.white} />
                </TouchableOpacity>

                <View style={{ ...styles.section, ...styles.header, borderBottomColor: list.color }} >
                    <View>
                        <Text style={styles.title} >{list.name}</Text>
                        <Text style={styles.taskCount} >
                            {completedCount} of {taskCount} tasks completed
                        </Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 30 }} onPress={deleteTodoListHandler} >
                        <MaterialIcons
                            name="delete-sweep"
                            size={28}
                            color={Colors.red}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.section, flex: 3 }}>
                    <View>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', paddingVertical: 5, marginTop: 10 }}
                            style={{ marginHorizontal: 20 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            <SelectColors color={color} onColorSelect={onColorSelectHandler} />
                        </ScrollView>
                    </View>
                    <FlatList
                        data={list.todos}
                        renderItem={({ item, index }) => renderTodo(item, index)}
                        keyExtractor={(_, index) => index.toString()}
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
                        placeholderTextColor={Colors.white}
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
        alignItems: 'center',
        backgroundColor: Colors.darkBlue
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
        color: Colors.white
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
        paddingHorizontal: 14,
        color: Colors.white
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
        color: Colors.white,
        fontWeight: "700",
        fontSize: 16
    },

    colorSelect: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginHorizontal: 5,
    }
});