import { initializeApp } from "firebase/app";
import { getDatabase, ref, set , update } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail, signOut,updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref as sref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCgDMwB1TZZoAGxMXbHO8iyJ_jxi0kAk0c",
  authDomain: "web-system-2c128.firebaseapp.com",
  databaseURL: "https://web-system-2c128-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-system-2c128",
  storageBucket: "web-system-2c128.appspot.com",
  messagingSenderId: "373462671422",
  appId: "1:373462671422:web:2c45c654f9419533eb316f",
  measurementId: "G-XJXP141M6N",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();

 //auth
 export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
 
 export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
   }
 
 export function logout() {
   return signOut(auth);
 }

 export function reset(email){
  return sendPasswordResetEmail(auth, email)
 }

 // Custom Hook
 export function useAuth() {
   const [ currentUser, setCurrentUser ] = useState();
 
   useEffect(() => {
     const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
     return unsub;
   }, [])
   return currentUser;
 
 }


 //storage
 export async function upload(file,currentUser,setLoading){
  const fileRef = sref(storage, currentUser.uid +'.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef,file);

  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("Uploaded file!");
 }



//write borrow data
export function writeBorrowData(
  bId,
  type,
  status, 
  lastName, 
  firstName,
  middleInitial, 
  booksData,
  dateBorrowed,
  dateReturned,
  address,
  contact,
  email
  ) {

  const db = getDatabase(app);
  set(ref(db, 'borrow/' + bId), {
    bId: bId,
    type:type,
    status:status,
    lastName: lastName,
    firstName: firstName,
    middleInitial: middleInitial,
    booksData: booksData,
    dateBorrowed: dateBorrowed,
    dateReturned: dateReturned,
    address: address,
    contact: contact,
    email: email,

  });
}

//update borrow
export function updateBorrow(
  bId,
  type,
  status, 
  lastName, 
  firstName,
  middleInitial,
  booksData,
  dateBorrowed,
  dateReturned,
  address,
  contact,
  email
) {
  const db = getDatabase(app);

  update(ref(db, "borrow/" + bId), {
    type1 : type,
    status1: status,
    lastName1 : lastName, 
    firstName1 : firstName,
    middleInitial1 : middleInitial,
    booksData1 : booksData,
    dateBorrowed1 : dateBorrowed,
    dateReturned1 : dateReturned,
    address1 : address,
    contact1 : contact,
    email1 : email
  });
}

//write book data
export function writeBookData(
  bkId, 
  bookTitle, 
  bookCode, 
  author, 
  status
  ) {

  const db = getDatabase(app);
  set(ref(db, 'book/' + bkId), {
    bkId:bkId, 
    bookTitle: bookTitle,
    bookCode: bookCode,
    author:author,
    status:status,
  });
}

//update book
export function updateBook(
  bkId,
  bookCode, 
  bookTitle,
  author,
  status
) {
  const db = getDatabase(app);

  update(ref(db, "book/" + bkId),  {
    bookCode1 : bookCode, 
    bookTitle1 : bookTitle,
    author1 : author,
    status1 : status,
  });
}

//write event data
export function writeEventData(
  eId,
  eventTitle,
  timeStart,
  timeEnd, 
  dateStart, 
  dateEnd, 
  description
  ) {

  const db = getDatabase(app);
  set(ref(db, 'event/'+ eId), {
    eId: eId,
    eventTitle: eventTitle,
    timeStart: timeStart,
    timeEnd: timeEnd,
    dateStart: dateStart,
    dateEnd: dateEnd,
    description: description,
  });
}

//update event data
export function updateEvents(
  eId,
  eventTitle,
  timeStart,
  timeEnd, 
  dateStart, 
  dateEnd, 
  description
  ) {

  const db = getDatabase(app);
  update(ref(db, 'event/'+ eId), {
    eventTitle1: eventTitle,
    timeStart1: timeStart,
    timeEnd1: timeEnd,
    dateStart1: dateStart,
    dateEnd1: dateEnd,
    description1: description,
  });
}



