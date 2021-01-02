import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors, backgroundColors } from '../constants/Colors';
import SelectColors from './SelectColors';

export default AddListModal = (props) => {

    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors[0]);
    const [showError, setShowError] = useState(false);


    const createTodo = () => {
        if(name != ''){
            const list = {name, color};
            props.addList(list);

            setName('');
            props.closeModal();
        } else {
            setShowError(true);
        }
        
    }

    const onColorSelectHandler = (selectedColor) => {
        setColor(selectedColor);
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="height" >
            <TouchableOpacity style={{ position: 'absolute', top: 32, right: 32 }} onPress={props.closeModal} >
                <AntDesign name="close" size={24} color={Colors.white} />
            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput 
                    style={{...styles.input, borderColor: color}} 
                    placeholder="List name..." 
                    placeholderTextColor={Colors.white}
                    onChangeText={text => {
                        setShowError(false);
                        setName(text);
                    }}
                />
                { showError && (
                    <Text style={{ color: Colors.red, marginLeft: 10, marginTop: 5 }} >List name cannot be empty</Text>
                )}
                
                <ScrollView 
                    horizontal={true} 
                    contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', marginTop: 25, paddingVertical: 5 }} 
                    // showsHorizontalScrollIndicator={false}
                >
                    <SelectColors color={color} onColorSelect={onColorSelectHandler} />
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
        alignItems: 'center',
        backgroundColor: Colors.darkBlue
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.white,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 25,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.white
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    colorSelect: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginHorizontal: 5,
    }
});