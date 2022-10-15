import React from 'react';
import { useState, useReducer, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField,
    FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import { getDatabase, ref , get ,query } from "firebase/database";
import { writeBorrowData,app } from '../../../src/utils/Firebase';

export default function BorrowerAdd() {
//
const reducerValue = useReducer(x => x + 1, 0);

//read data
const [record, setRecord] = useState([]);

function getBorrowData() {
  const db = getDatabase(app);
  const borrowRef = query(
    ref(db, "borrow"));

  get(borrowRef).then((snapshot) => {
    var borrow = [];

    snapshot.forEach((childSnapshot) => {
      borrow.push(childSnapshot.val());
    });
    setRecord(borrow);
  });
}

useEffect(() =>{
  getBorrowData();

  },[reducerValue]);
  
    //read data
const [book, setBook] = useState([]);
const bookdata = useState(book);

function getBookData() {
  const db = getDatabase(app);
  const bookRef = query(
    ref(db, "book"));

  get(bookRef).then((snapshot) => {
    var book = [];

    snapshot.forEach((childSnapshot) => {
      book.push(childSnapshot.val());
    });
    setBook(book);
  });
}

useEffect(() =>{
  getBookData();

  },[reducerValue]);
    
    //dialog
    const [showDialog,setShowDialog] = useState(false);


  //error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


//data
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const lastNameRef =  useRef(null);
  const firstNameRef =  useRef(null);
  const middleInitialRef =  useRef(null);
  const booksDataRef =  useRef(null);
  const dateBorrowedRef =  useRef(null);
  const dateReturnedRef =  useRef(null);
  const addressRef =  useRef(null);
  const contactRef =  useRef(null);
  const emailRef =  useRef(null);


const setInitialState = () => {
  setType("");
  setStatus("");
  lastNameRef.current.value = "";
  firstNameRef.current.value = "";
  middleInitialRef.current.value = "";
  booksDataRef.current.value = "";
  dateBorrowedRef.current.value = "";
  dateReturnedRef.current.value = "";
  addressRef.current.value ="";
  contactRef.current.value ="";
  emailRef.current.value = "";
}

const handleChangeType = (event) => {
  setType(event.target.value);
  }

  const handleChangeStatus = (event) => {
  setStatus(event.target.value);
  }
  
    //save data
const saveData = () => {
    if( lastNameRef.current.value === "" || firstNameRef.current.value === "" || middleInitialRef.current.value === "" ||  
    booksDataRef.current.value === "" || dateBorrowedRef.current.value === "" || dateReturnedRef.current.value === "" || 
    addressRef.current.value === "" || contactRef.current.value === "" || emailRef.current.value === ""){
      setErrorMessage("Incomplete Details!");
      setError(true);
      return;
    }
    if(type === "" ){
      setErrorMessage("Choose the Type")
      setError(true);
      return;
    }
    if(status === "" ){
      setErrorMessage("Choose the Book Status")
      setError(true);
      return;
    }
    writeBorrowData(record.length,type,status,lastNameRef.current.value,firstNameRef.current.value,middleInitialRef.current.value,
      booksDataRef.current.value,dateBorrowedRef.current.value,dateReturnedRef.current.value,
      addressRef.current.value,contactRef.current.value,emailRef.current.value);
      setInitialState();
      alert("Successfully Saved!");
    }

    
  

  return (
    <div>
    <Button 
    sx={{ margin:"5px", boxShadow:"2"}} 
    variant="contained" 
    startIcon={<AddIcon />} 
    onClick={() => setShowDialog(true)}>
      ADD
    </Button>

        <Dialog open={showDialog}>
          <DialogTitle>BORROWER INFORMATION</DialogTitle>
            <DialogContent>
              {
                error && (
                  <Error><p>{errorMessage}</p></Error>
                )
              }

            <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={type}
              label="type"
              onChange={handleChangeType}
              sx={{bgcolor:"#f1f1f1"}}>
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Faculties"}>Faculties</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={status}
              label="status"
              onChange={handleChangeStatus}
              sx={{bgcolor:"#f1f1f1"}}>
              <MenuItem value={"Borrowed"}>Borrowed</MenuItem>
              <MenuItem value={"Returned"}> Returned</MenuItem>
              <MenuItem value={"Not Returned"}>Not Returned</MenuItem>
            </Select>
          </FormControl>
          <br/>

            <TextField inputRef={lastNameRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}
            id="outlined-number" 
            fullWidth
             label="Last Name"/>

            <TextField inputRef={firstNameRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}
            id="outlined-number" 
            fullWidth
             label="First Name"/>

            <TextField inputRef={middleInitialRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }} 
            id="outlined-number" 
            fullWidth
            label="Middle Initial" />
            
            <Typography sx={{ fontSize:"15px" }}>BOOK CODE/BOOK TITLE/AUTHOR</Typography>
            <select
              ref={booksDataRef}
              style={{width:"500px", 
              height:"40px",
              marginBottom:"10px"}}>
              {book.map((row) => 
               <option key={book.bkId} value={bookdata.row} > 
                  {row.bookCode} + 
                  {row.bookTitle} +  
                  {row.author}
               </option>
           )}
            </select>
            <br/>

            <TextField inputRef={dateBorrowedRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }} 
            id="outlined-number" 
            label="Date Borrowed" 
            type="date"
            InputLabelProps={{ shrink: true,}}/>

            <TextField inputRef={dateReturnedRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }} 
            id="outlined-number" 
            label="Date Return" 
            type="date"
            InputLabelProps={{ shrink: true,}}/>

            <TextField inputRef={addressRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }} 
            id="outlined-number" 
            fullWidth 
            label="Address" />

            <TextField inputRef={contactRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}  
            id="outlined-number" 
            label="Contact Number" />

            <TextField inputRef={emailRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}  
            label="Email Address/Gsuite"
            type="email" />

            </DialogContent>
            <DialogActions>

            <Button 
            variant="contained" 
            startIcon={<SaveIcon />} 
            onClick={saveData} 
            sx={{ size:"small", 
            margin:"5px"}}>
              SAVE
            </Button>

            <Button 
            variant="contained" 
            onClick={() => setShowDialog(false)}
            sx={{ size:"small", 
            margin:"5px"}}>
              BACK
            </Button>

            </DialogActions>
            </Dialog>
    </div>
  )
}
const Error = styled.div`
    color:red;
    margin: auto;
`;