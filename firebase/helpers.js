import { firebase } from './config';

const ref = firebase.firestore().collection("todolist");

export const getLists = (callback) => {
    let newRef = ref.orderBy("createdAt", "desc");
    
    newRef.onSnapshot(snapshot => {
        lists = []

        snapshot.forEach(doc => {
            lists.push({
                id: doc.id,
                ...doc.data()
            })
        })

        callback(lists);
    })
}

export const createList = (list) => {
    ref.add(list);
}

export const updateList = (list) => {
    ref.doc(list.id).update(list);
}

export const deleteList = (list) => {
    ref.doc(list.id).delete();
}