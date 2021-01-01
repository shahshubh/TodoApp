import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../constants/Colors';
import ShowListModal from './ShowListModal';
import { Ionicons } from '@expo/vector-icons';


export default TodoList = ({ list, updateList }) => {

    const [showListVisible, setShowListVisible] = useState(false);

    let date = new Date(list.createdAt);

    const toggleShowListModal = () => {
        setShowListVisible(prevState => !prevState);
    }

    if (list.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <TouchableOpacity
            style={[styles.item, { backgroundColor: list.color }]}
            onPress={() => toggleShowListModal()}
        >
            <Modal animationType="slide" visible={showListVisible} onRequestClose={() => toggleShowListModal()}>
                <ShowListModal list={list} closeModal={() => toggleShowListModal()} updateList={updateList} />
            </Modal>
            <Text style={styles.listTitle} numberOfLines={1} >{list.name}</Text>
            <View style={{ position: 'absolute', left: 10, bottom: 15, flexDirection: 'row', }} >
                <Ionicons name="time" size={12} color={Colors.white} style={{ marginRight: 5, marginTop: 1.75 }} />
                <Text style={{ fontSize: 12, color: Colors.lightGray }} >{date.toDateString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        paddingVertical: 50,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }
});