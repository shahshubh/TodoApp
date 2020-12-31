import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';
import Colors from '../Colors';
import tempData from '../tempData';

export default AddListModal = (props) => {

    const backgroundColors = ["#1e3275","#2066ff","#df003c","#ff7420","#f926a3","#d92bf8","#22eab4","#08fb06","#7def6e","#444c8f","#5d3f6a","#93aced"];
    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors[0]);

    const createTodo = () => {
        tempData.push({
            name,
            color,
            todos: []
        });

        setName('');
        props.closeModal();
    }

    const showColors = () => {
        return(
            backgroundColors.map(c => {
                return(
                    <TouchableOpacity 
                        key={c} 
                        style={{...styles.colorSelect, backgroundColor: c }} 
                        onPress={() => setColor(c)} 
                    />
                );
            })
        );
    }


    return(
        <KeyboardAvoidingView style={styles.container} behavior="height" >
            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={props.closeModal} >
                <AntDesign name="close" size={24} color={Colors.black} />
            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput style={styles.input} placeholder="List Name" onChangeText={text => setName(text)} />
                
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', marginTop: 15 }} >
                        {showColors()}
                    </ScrollView>

                <TouchableOpacity style={{...styles.create, backgroundColor: color}} onPress={createTodo} >
                    <Text style={{ color: Colors.white, fontWeight: '600' }} >Create!</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,

    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginHorizontal: 5
    }
});