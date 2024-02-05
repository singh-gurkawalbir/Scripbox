import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB9PWLVZmyasf0IAD7-c34-JhJs5OZoSQ4',
  authDomain: 'hiringbullapp.firebaseapp.com',
  projectId: 'hiringbullapp',
  storageBucket: 'hiringbullapp.appspot.com',
  messagingSenderId: '34777622436',
  appId: '1:34777622436:web:ecd3d4fd1b5f89e0324331',
};

//* init firebase
initializeApp(firebaseConfig);

//* init firestore
const db = getFirestore();

//* init firebase auth
const auth= getAuth()
export { db , auth};
