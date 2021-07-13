import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDFbUV1VmFke70weU_grhXgTsnihaamLa0",
  authDomain: "slack-clone-react-161cd.firebaseapp.com",
  projectId: "slack-clone-react-161cd",
  storageBucket: "slack-clone-react-161cd.appspot.com",
  messagingSenderId: "212025787224",
  appId: "1:212025787224:web:2751a7a04ebfc3cbae5b2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;