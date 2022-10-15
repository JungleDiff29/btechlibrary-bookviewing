import React from 'react';
import { useState, useRef, useReducer,useEffect } from 'react';

import styled from '@emotion/styled';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import { getDatabase, ref , get ,query } from "firebase/database";
import { writeEventData , app } from '../../../src/utils/Firebase';

export default function EventAdd() {
//
const reducerValue = useReducer(x => x + 1, 0);

//read data
const [event, setEvent] = useState([]);

function getEventData() {
  const db = getDatabase(app);
  const eventRef = query(
    ref(db, "event"));

  get(eventRef).then((snapshot) => {
    var event = [];

    snapshot.forEach((childSnapshot) => {
      event.push(childSnapshot.val());
    });
    setEvent(event);
  });
}

useEffect(() =>{
  getEventData();

  },[reducerValue]);

//dialog
const [showDialog,setShowDialog] = useState(false);


//error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //data
  const eventTitleRef =  useRef(null);
  const timeStartRef =  useRef(null);
  const timeEndRef = useRef(null);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  const descriptionRef =  useRef(null);

  const setInitialState = () => {
    eventTitleRef.current.value = "";
    timeStartRef.current.value = "";
    timeEndRef.current.value = "";
    dateStartRef.current.value = "";
    dateEndRef.current.value = "";
    descriptionRef.current.value = "";
  }  

    //save data
    const saveData = () => {
        if(eventTitleRef.current.value === "" || timeStartRef.current.value === "" || timeEndRef.current.value === "" || dateStartRef.current.value === "" || dateEndRef.current.value === "" || descriptionRef.current.value === ""){
          setErrorMessage("Incomplete Details!");
          setError(true);
          return;
        }
        writeEventData(event.length,eventTitleRef.current.value,timeStartRef.current.value,timeEndRef.current.value,dateStartRef.current.value,dateEndRef.current.value,descriptionRef.current.value,);
        setInitialState();
        alert("Successfully Saved!");
        }

  return (
    <div>
      <Button 
      sx={{ margin:"3px", 
      boxShadow:"2"}} 
      variant="contained" 
      startIcon={<AddIcon />} 
      onClick={() => setShowDialog(true)}>
        ADD
      </Button>
      
      <Dialog open={showDialog}>
        <DialogTitle>EVENT INFORMATION</DialogTitle>
        <DialogContent>
        {
                error && (
                  <Error><p>{errorMessage}</p></Error>
                )
              }

            <TextField inputRef={eventTitleRef} 
            sx={{ size:"small", 
            margin: "3px" }}
            fullWidth
            id="outlined-basic" 
            label="Event Title" />

            <TextField inputRef={timeStartRef} 
            sx={{ size:"small", 
            margin: "3px" }} 
            id="outlined-number" 
            label="Time Start" 
            type="time" 
            InputLabelProps={{ shrink: true,}}/>

            <TextField inputRef={timeEndRef} 
            sx={{ size:"small", 
            margin: "3px" }} 
            id="outlined-number" 
            label="Time End" 
            type="time" 
            InputLabelProps={{ shrink: true,}}/>
            <br/>
            <TextField inputRef={dateStartRef} 
            sx={{ size:"small", 
            margin: "3px" }} 
            id="outlined-number" 
            label="Date Start" 
            type="date" 
            InputLabelProps={{ shrink: true,}}/>

            <TextField inputRef={dateEndRef} 
            sx={{ size:"small", 
            margin: "3px" }} 
            id="outlined-number" 
            label="Date End" 
            type="date" 
            InputLabelProps={{ shrink: true,}}/>

            <TextField inputRef={descriptionRef} 
            sx={{ size:"small", 
            margin: "3px" }} 
            fullWidth
            id="outlined-basic" 
            label="Description" />

          </DialogContent>
          <DialogActions>
            <Button 
            onClick={saveData} 
            startIcon={<SaveIcon />} 
             sx={{ size:"small", 
             margin:"5px"}}
            variant="contained">
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