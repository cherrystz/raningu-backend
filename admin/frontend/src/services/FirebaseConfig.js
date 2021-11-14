import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
var CryptoJS = require("crypto-js");

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyANJJvFGIHxR3VEfqhxvpvdyrNT9l6Jr9s",
  authDomain: "raningu-95d67.firebaseapp.com",
  projectId: "raningu-95d67",
  storageBucket: "raningu-95d67.appspot.com",
  messagingSenderId: "836718238821",
  appId: "1:836718238821:web:4a145595bbd3d848613a8c",
  measurementId: "G-X4Q34NG336",
});

export const auth = firebase.auth();
export const storage = firebase.storage();

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return { res: "success" };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { res: "error", err: errorCode, errMsg: errorMessage };
    });
};

export const signOut = () => {
  sessionStorage.removeItem("token");
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.alert("Sign out successfully");
      console.log("signOut");
      return window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const authCheck = async () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    await fetch("https://raningu-api.glitch.me/data/auth/admin_login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.result === "success") {
          console.log("admin");
          sessionStorage.setItem(
            "token",
            CryptoJS.AES.encrypt(
              JSON.stringify({ user: user, level: "admin" }),
              "raningu@7712219"
            ).toString()
          );
          return window.location.reload();
        } else if (result.detail === "access") {
          console.log("normal");
          sessionStorage.setItem(
            "token",
            CryptoJS.AES.encrypt(
              JSON.stringify({ user: user, level: "normal" }),
              "raningu@7712219"
            ).toString()
          );
          return window.location.reload();
        } else {
          sessionStorage.removeItem("token");
          return window.location.reload();
        }
      });
  });
};

//google
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
GoogleAuthProvider.setCustomParameters({ prompt: "select_account" });
//facebook
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
FacebookAuthProvider.setCustomParameters({ prompt: "select_account" });
//github
const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
GithubAuthProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () => {
  return await auth
    .signInWithPopup(GoogleAuthProvider)
    .then(() => {
      return { res: "success" };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { res: "error", err: errorCode, errMsg: errorMessage };
    });
};
export const signInWithFacebook = async () => {
  return await auth
    .signInWithPopup(FacebookAuthProvider)
    .then(() => {
      return { res: "success" };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { res: "error", err: errorCode, errMsg: errorMessage };
    });
};
export const singInWithGithub = async () => {
  return await auth
    .signInWithPopup(GithubAuthProvider)
    .then(() => {
      return { res: "success" };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { res: "error", err: errorCode, errMsg: errorMessage };
    });
};

export default firebaseConfig;
