import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHbuqDUd16mwIFsm1hZqPh0YaC7LqK-Js",
  authDomain: "disney-plus-3d0d3.firebaseapp.com",
  projectId: "disney-plus-3d0d3",
  storageBucket: "disney-plus-3d0d3.appspot.com",
  messagingSenderId: "1047475014592",
  appId: "1:1047475014592:web:0db8daeda2688414359625",
  measurementId: "G-YNNXD62SV3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
