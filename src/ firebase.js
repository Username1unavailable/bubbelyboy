import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "replace",
  authDomain: "replace",
  projectId: "replace",
  storageBucket: "replace",
  messagingSenderId: "replace",
  appId: "replace",
  measurementId: "replace"
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

