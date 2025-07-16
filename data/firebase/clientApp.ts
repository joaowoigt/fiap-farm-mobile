// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
  Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YPI-farm",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase app (singleton)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth with React Native persistence
const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db: Firestore = getFirestore(app);

export { app, auth, db };
