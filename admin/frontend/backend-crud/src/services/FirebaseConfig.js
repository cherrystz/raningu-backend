import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCzPc5yTwV7kwRWrQUqyGJjldP-AB-K9-Y",
    authDomain: "websitename-csc361.firebaseapp.com",
    projectId: "websitename-csc361",
    storageBucket: "websitename-csc361.appspot.com",
    messagingSenderId: "263414724563",
    appId: "1:263414724563:web:d74750a3c5ab43f2e46126",
    measurementId: "G-2MBXH53V8D"
});

export const auth = firebase.auth();

export const signOut = () => {
    firebase.auth().signOut().then(function () {
        console.log("signOut")
        window.alert("Sign out successfully");
    }).catch(function (error) {
        console.log(error)
    });
}

//google
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
GoogleAuthProvider.setCustomParameters({ prompt: "select_account" });
//facebook
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
FacebookAuthProvider.setCustomParameters({ prompt: "select_account" })
//github
const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
GithubAuthProvider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(GoogleAuthProvider);
export const signInWithFacebook = () => auth.signInWithPopup(FacebookAuthProvider);
export const singInWithGithub = () => auth.signInWithPopup(GithubAuthProvider);

export default firebaseConfig;



import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("task")
      .where("userId", "==", "a24f0ccdd660485fab245837b7bb223c");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where(
            "projectId",
            "==",
            "selectedProject"
          ))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (tasks) =>
                moment(tasks.data, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                tasks.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks((task) => task.archived !== false));
    });
    return () => unsubscribe();
  }, [selectedProject]);
  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "a24f0ccdd660485fab245837b7bb223c")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);
  return { projects, setProjects };
};
