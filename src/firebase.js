import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyiHWzo-MMbTwhf9hfct1e6XMJi69drtM",
    authDomain: "viaroprueba.firebaseapp.com",
    projectId: "viaroprueba",
    storageBucket: "viaroprueba.appspot.com",
    messagingSenderId: "52209129333",
    appId: "1:52209129333:web:afe1f0af680b4ac5f7253c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export { firebase }