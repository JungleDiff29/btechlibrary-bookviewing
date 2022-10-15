import React from 'react';
import { useState, useRef, useReducer,useEffect } from 'react';

import styled from '@emotion/styled';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent ,TextField, 
  FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { getDatabase, ref , get ,query } from "firebase/database";
import { writeBookData, app } from '../../../src/utils/Firebase';

export default function BookAdd() {

//
const reducerValue = useReducer(x => x + 1, 0);


//read data
const [book, setBook] = useState([]);

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
  const bookCodeRef =  useRef(null);
  const bookTitleRef =  useRef(null);
  const authorRef =  useRef(null);
  const [status, setStatus] = useState("");

  const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      }

const setInitialState = () => {
  bookCodeRef.current.value = "";
  bookTitleRef.current.value = "";
  authorRef.current.value = "";
  setStatus("");
}

  //save data
  const saveData = () => {
    if( bookCodeRef.current.value === "" || bookTitleRef.current.value === "" ||   authorRef.current.value === ""){
      setErrorMessage("Incomplete Details!");
      setError(true);
      return;
    }
    if(status === "" ){
      setErrorMessage("Choose the Book Status")
      setError(true);
      return;
    }
    writeBookData(book.length,bookCodeRef.current.value,bookTitleRef.current.value,authorRef.current.value,status);
      setInitialState();
      alert("Successfully Saved!");
    }
  
    return (
    <div>

    <Button 
    sx={{ margin:"5px",
    boxShadow:"2"}} 
    variant="contained" 
    startIcon={<AddIcon />} 
    onClick={() => setShowDialog(true)}>
      ADD
    </Button>
        <Dialog open={showDialog}>
          <DialogTitle>BOOK INFORMATION</DialogTitle>
          <DialogContent>
          {
                error && (
                  <Error><p>{errorMessage}</p></Error>
                )
              }
            
            <TextField inputRef={bookCodeRef} 
            sx={{ size:"small",
             margin: "3px",
             backgroundColor: "#f1f1f1" }} 
            id="outlined-basic"
            fullWidth
            label="Book Code" />
            
            <TextField inputRef={bookTitleRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}
            fullWidth 
            id="outlined-basic" 
            label="Book Title" />
            
            <TextField inputRef={authorRef} 
            sx={{ size:"small", 
            margin: "3px", 
            backgroundColor: "#f1f1f1" }}
            fullWidth
            id="outlined-basic" 
            label="Author" />

            <FormControl 
            sx={{ minWidth: 120 }} 
            size="small">

            <InputLabel 
            id="demo-select-small">
              Status
              </InputLabel>

            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              fullWidth
              value={status}
              label="status"
              onChange={handleChangeStatus}
              sx={{ bgcolor:"#f1f1f1" }}>

              <MenuItem value={"Available"}>Available</MenuItem>
              <MenuItem value={"Not"}>Not</MenuItem>

            </Select>

          </FormControl>

          </DialogContent>
          <DialogActions>
            
            <Button variant="contained" 
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