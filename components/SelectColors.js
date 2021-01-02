import React from 'react';
import { Colors, backgroundColors } from '../constants/Colors';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default SelectColors = (props) => {
    return (
        backgroundColors.map(c => {
            return (
                <TouchableOpacity
                    key={c}
                    style={{
                        ...styles.colorSelect,
                        backgroundColor: c,
                        borderColor: props.color === c ? Colors.white : 'transparent',
                        borderWidth: props.color === c ? 2 : 0,
                        elevation: 3
                    }}
                    onPress={() => {
                        props.onColorSelect(c)
                    }}
                />
            );
        })
    );
}


const styles = StyleSheet.create({
    colorSelect: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginHorizontal: 5,
    }
})