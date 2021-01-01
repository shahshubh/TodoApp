import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6a8FczCf57EPtma0kQ08qoJmaZpDPQ3I",
    authDomain: "todoapp-e9501.firebaseapp.com",
    projectId: "todoapp-e9501",
    storageBucket: "todoapp-e9501.appspot.com",
    messagingSenderId: "841613131678",
    appId: "1:841613131678:web:658d4a7f8a2dfc9c51208f"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };