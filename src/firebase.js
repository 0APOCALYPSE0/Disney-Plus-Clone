import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyA9BnlX96fMf7XiUVCFRsoQzG8DGERJkeY",
//   authDomain: "disneyplus-clone-a33d5.firebaseapp.com",
//   projectId: "disneyplus-clone-a33d5",
//   storageBucket: "disneyplus-clone-a33d5.appspot.com",
//   messagingSenderId: "37918794208",
//   appId: "1:37918794208:web:dbe9842dfe1dda522a4b85",
//   measurementId: "G-DRVLJKWRWG",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCHbuqDUd16mwIFsm1hZqPh0YaC7LqK-Js",
//   authDomain: "disney-plus-3d0d3.firebaseapp.com",
//   projectId: "disney-plus-3d0d3",
//   storageBucket: "disney-plus-3d0d3.appspot.com",
//   messagingSenderId: "1047475014592",
//   appId: "1:1047475014592:web:0db8daeda2688414359625",
//   measurementId: "G-YNNXD62SV3"
// }

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
console.log(firebaseApp.name);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
