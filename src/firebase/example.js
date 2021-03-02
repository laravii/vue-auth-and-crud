import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";

export const firebaseApp = firebase.initializeApp({
  apiKey: "INSIRA AQUI SUA apiKey",
  authDomain: "INSIRA AQUI SEU authDomain",
  projectId: "INSIRA AQUI SEU projectId",
  storageBucket: "INSIRA AQUI SEU storageBucket",
  messagingSenderId: "INSIRA AQUI SUA messagingSenderId",
  appId: "INSIRA AQUI SUA appId",
  measurementId: "INSIRA AQUI SEU measurementId"
});

export default function install(Vue) {
  Object.defineProperty(Vue.prototype, "$firebase", {
    get() {
      return firebaseApp;
    }
  });
}

export const db = firebaseApp.firestore();
