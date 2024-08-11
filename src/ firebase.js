import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG4d0tvKVqdfFWg-0WvxxyVg5WxrpoMRk",
  authDomain: "bubel-66fad.firebaseapp.com",
  projectId: "bubel-66fad",
  storageBucket: "bubel-66fad.appspot.com",
  messagingSenderId: "1076211171958",
  appId: "1:1076211171958:web:32d85a0d59f1c0fb625557",
  measurementId: "G-FY9PFP4X5Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };

// Initialize Firebase Authentication and get a reference to the service

