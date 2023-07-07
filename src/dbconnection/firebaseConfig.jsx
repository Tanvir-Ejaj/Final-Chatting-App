// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc2x2xD0qEGuzXFYJIFuhti1xpY33a5IM",
  authDomain: "final-chat-app-918a8.firebaseapp.com",
  projectId: "final-chat-app-918a8",
  storageBucket: "final-chat-app-918a8.appspot.com",
  messagingSenderId: "839356311866",
  appId: "1:839356311866:web:e803820947220ad290c803",
  measurementId: "G-W08WG1TZ2K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
