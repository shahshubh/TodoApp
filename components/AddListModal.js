import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';
import Colors from '../Colors';
import tempData from '../tempData';

export default AddListModal = (props) => {

    const backgroundColors = ["#000000","#2066ff","#df003c","#ff7420","#f926a3","#d92bf8","#22eab4","#08fb06","#7def6e","#444c8f","#5d3f6a","#93aced"];
    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors[0]);

    const createTodo = () => {
        const list = {name, color};
        props.addList(list);

        setName('');
        props.closeModal();
    }

    const showColors = () => {
        return(
            backgroundColors.map(c => {
                return(
                    <TouchableOpacity 
                        key={c} 
                        style={{
                            ...styles.colorSelect,
                            backgroundColor: c,
                            borderColor: color === c ? Colors.black : 'transparent',
                            borderWidth: color === c ? 2 : 0,
                            elevation: 3
                        }} 
                        onPress={() => setColor(c)} 
                    />
                );
            })
        );
    }


    return(
        <KeyboardAvoidingView style={styles.container} behavior="height" >
            <TouchableOpacity style={{ position: 'absolute', top: 32, right: 32 }} onPress={props.closeModal} >
                <AntDesign name="close" size={24} color={Colors.black} />
            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput style={{...styles.input, borderColor: color}} placeholder="List name..." onChangeText={text => setName(text)} />
                
                    <ScrollView 
                        horizontal={true} 
                        contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', marginTop: 25, paddingVertical: 5 }} 
                        // showsHorizontalScrollIndicator={false}
                    >
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
        borderWidth: 0.5,
        borderColor: Colors.blue,
        borderRadius: 25,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
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