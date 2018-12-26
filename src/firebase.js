import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyB3R2c8uTQKclQ28CLIjpACgCy0vER4wgg",
  authDomain: "s4log-150bd.firebaseapp.com",
  databaseURL: "https://s4log-150bd.firebaseio.com",
  projectId: "s4log-150bd",
  storageBucket: "s4log-150bd.appspot.com",
  messagingSenderId: "656384014854"
})

export default firebase