import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDCyUI16kynixvShAap3Z1sNFjwF-TLcRk",
  authDomain: "disney-clone-d1e27.firebaseapp.com",
  projectId: "disney-clone-d1e27",
  storageBucket: "disney-clone-d1e27.appspot.com",
  messagingSenderId: "763167560019",
  appId: "1:763167560019:web:924ac13cb208fd28f691a6",
  measurementId: "G-VS811EQRDJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
