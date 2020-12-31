import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Colors';


// export default TodoList = ({list}) => {

//     const completedCount = list.todos.filter(todo => todo.completed).length;
//     const remainingCount = list.todos.length - completedCount;


//     return(
//         <View style={[styles.listContainer, {backgroundColor: list.color}]} >
//             <Text style={styles.listTitle} numberOfLines={1} >{list.name}</Text>

//             <View>
//                 <View style={{ alignItems: "center" }} >
//                     <Text style={styles.count}>{remainingCount}</Text>
//                     <Text style={styles.subtitle}>Remaining</Text>
//                 </View>
//                 <View style={{ alignItems: "center" }} >
//                     <Text style={styles.count}>{completedCount}</Text>
//                     <Text style={styles.subtitle}>Completed</Text>
//                 </View>
//             </View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     listContainer: {
//         paddingVertical: 32,
//         paddingHorizontal: 16,
//         borderRadius: 6,
//         marginHorizontal: 12,
//         alignItems: 'center',
//         width: 200
//     },
//     listTitle: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: Colors.white,
//         marginBottom: 18
//     },
//     count: {
//         fontSize: 48,
//         fontWeight: "200",
//         color: Colors.white
//     },
//     subtitle: {
//         fontSize: 12,
//         fontWeight: "700",
//         color: Colors.white
//     }
// });



export default TodoList = ({ item }) => {
    if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <View
            style={[styles.item, { backgroundColor: item.color }]}
        >
            <Text style={styles.listTitle} numberOfLines={1} >{item.name}</Text>
            <View>
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.count}>{item.todos.filter(e => e.completed).length}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                </View>
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.count}>{item.todos.filter(e => !e.completed).length}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        // height: Dimensions.get('window').width / numColumns,
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
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