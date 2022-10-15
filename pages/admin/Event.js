import React from 'react';
import { useEffect, useState, useRef,useReducer } from 'react';
import Image from "next/image";
import {useRouter} from 'next/router';

import styled from '@emotion/styled';
import { Button, Box, Typography, Dialog, DialogTitle, DialogActions,
    DialogContent, TextField, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import emailjs from 'emailjs-com';
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator } from '@mui/x-data-grid';

import { getDatabase, ref , get,query  } from 'firebase/database';
import { logout, useAuth,app ,updateEvent } from '../../src/utils/Firebase';

import EventAdd from '../../src/components/Event-components/event.add';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}
  //table
  const columns = [
    { 
      field: 'eId',
     headerName: 'EID',
      headerClassName: 'super-app-theme--header', 
      width: 70, 
    },
    { 
      field: 'eventTitle',
      headerName: 'Event Title',
      headerClassName: 'super-app-theme--header', 
      width: 200,
    },
    { 
      field: 'timeStart',
      headerName: 'Time Start',
      headerClassName: 'super-app-theme--header', 
      type: 'time',
      width: 110,
    },
    { 
      field: 'timeEnd',
      headerName: 'Time End',
      headerClassName: 'super-app-theme--header', 
      type: 'time',
      width: 110,
    },
    { 
      field: 'dateStart',
      headerName: 'Date Start',
      headerClassName: 'super-app-theme--header', 
      type: 'date',
      width: 110,
    },
    { 
      field: 'dateEnd',
      headerName: 'Date End',
      headerClassName: 'super-app-theme--header', 
      width: 110,
      type: 'date',
    },
    {
      field: 'description',
      headerName: 'Description',
      headerClassName: 'super-app-theme--header', 
      width: 400,
    },
  ];

export default function Event() {
    //logout
    const [ loading, setLoading ] = useState(false);
    const currentUser = useAuth();
  
    async function handleLogout() {
      setLoading(true);
      try {
        await logout();
        router.push("/admin/");
      } catch {
        alert("Error!");
    }
      setLoading(false);
    }
    
//tab buttons
const router = useRouter();
  
const goHome = () => {
  router.push("/admin/Home");
}    
const goBorrower = () => {
  router.push("/admin/Borrower");
}   
const goBook = () => {
  router.push("/admin/Book");
} 
const goEvent = () => {
router.push("/admin/Event");
}    
const goAccount = () => {
  router.push("/admin/Account");
}  
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

    //send email
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm( 'service_borrowbook','template_74ne2e4',e.target, 'mZ9JhUbr5bBJ2fNct')
        .then((result) => {
            console.log(result.text);
            alert("Send Successfully");
        }, (error) => {
            console.log(error.text);
            alert("Error");
        });
        e.target.reset();
    };


//edit
const [showDialog,setShowDialog] = useState(false);
const [showDialog2,setShowDialog2] = useState(false);
const [currentRow,setCurrentRow] = useState(null);
const [currentRow2,setCurrentRow2] = useState(null);

const [enable, setEnable] = useState(false);
const id = useState(event.eId)

const handleChange = (e) =>{
  setCurrentRow({...currentRow , [e.target.name] : [e.target.value] });
 }
 
 const eventTitle1 =  useRef(null);
 const timeStart1 =  useRef(null);
 const timeEnd1 =  useRef(null);
 const dateStart1 =  useRef(null);
 const dateEnd1 =  useRef(null);
 const description1 =  useRef(null);

const updateEventData = () => {
updateEvent(
  id,
  eventTitle1.current.value,
  timeStart1.current.value,
  timeEnd1.current.value,
  dateStart1.current.value,
  dateEnd1.current.value,
  description1.current.value,
);
clear();
};

  return (
    <div style={myStyle}> 
<OuterBox>
    <Box>
          <Image 
          src="/img/page.png" 
          alt="logo" 
          width={400} 
          height={250}/>
    </Box>

    <Typography 
    sx={{ color:"#9fbfdf",
     padding:"20px", 
     textAlign:"center",
     fontSize: "15px", 
     backgroundColor:" inherit",
     display:"flex" }}>
     <Avatar 
     src={currentUser?.photoURL} 
     sx={{ border:"1px solid #000", 
     backgroundColor:"#ccc", 
     marginRight:"20px"}}/>
     { currentUser?.email }
    </Typography>

    <Button onClick={goHome} 
    variant="text" 
    sx={{ color:"white", 
    padding: "12px", 
    margin:"2px" ,
    fontSize: "15px"}}>
      Dashboard
    </Button>

    <Button onClick={goBorrower} 
    variant="text" 
    sx={{ color:"white", 
    padding: "12px", 
    margin:"2px" ,
    fontSize: "15px"}}>
      Borrower List
      </Button>

    <Button onClick={goBook} 
    variant="text" 
    sx={{ color:"white",
    padding: "12px",
     margin:"2px" ,
     fontSize: "15px"}}>
      Book List
      </Button>

    <Button onClick={goEvent} 
    variant="text" 
    sx={{ color:"white", 
    padding: "12px", 
    background:" #000d1a", 
    margin:"2px" ,
    fontSize: "15px"}}>
      Event Data
      </Button>

    <Button onClick={goAccount} 
    variant="text" 
    sx={{ color:"white", 
    padding: "12px", 
    margin:"2px" ,
    fontSize: "15px"}}>
      Account
      </Button>
    
    <Button disabled={ loading || !currentUser } 
    onClick={handleLogout} 
    sx={{ color:"white",  
    padding: "12px", 
    marginTop:"400px" ,
    fontSize: "15px"}}>
      Log Out
      </Button>
      
    </OuterBox> 

    <Box 
    sx={{ position: "absolute", 
    marginLeft: "300px", 
    marginTop:" 30px",
    backgroundColor:"white",
    color:"black"}}>

  <div style={{  marginBottom:"15px"}}>
    <>
      <Typography variant="h4" sx={{ fontFamily: "Sans Serif" }}>EVENT LIST</Typography>
    </>

    <div style={{ marginTop:" 5px", display: "flex" }}>

      <>
         <EventAdd />
      </>

      <>
      <Button 
      sx={{ margin:"5px", 
      boxShadow:"2"}} 
      variant="contained" 
      startIcon={<SendIcon />}
      disabled={!currentRow2}
      onClick={() => setShowDialog2(true)}>
      SEND
      </Button>
      </>

      <div>
      {currentRow &&(
      <Dialog open={showDialog2}>
        <DialogTitle>SEND EVENT NOTIFY</DialogTitle>
        <DialogContent>

            <form onSubmit={sendEmail}>
              <table>
                <tr>
                    <td><label>Email: </label></td>
                    <td><input type="email" style={name} name="email" required /></td>
                </tr>
                <tr>
                    <td><label>Event Title: </label></td>
                    <td><input type="text" style={name} value={currentRow2.eventTitle} name="eventTitle" required/></td>
                </tr>
                <tr>
                    <td><label>Time: </label></td>  
                    <td><input type="time" style={name} value={currentRow2.timeStart} name="timeStart" required/></td>
                    <td><input type="time" style={name} value={currentRow2.timeEnd} name="timeEnd" required/></td>
                </tr>
                <tr>
                    <td><label>Date: </label></td>
                    <td><input type="date" style={name} name="dateStart" value={currentRow2.dateStart} required/></td>
                    <td><input type="date" style={name} name="dateEnd" value={currentRow2.dateEnd} required/></td>
                </tr>
                <tr>
                    <td><label>Description: </label></td>
                    <td><textarea style={name} name="message" value={currentRow2.description} required/></td>
                </tr>
                <tr>
                    <td><input style={submit} type="submit"  value="SEND" /></td>
                </tr>
              </table>
                
              </form>
              
            </DialogContent>
            <DialogActions>
              <Button 
                    variant="contained" 
                    onClick={() => setShowDialog2(false)}
                    sx={{ size:"small", 
                    margin:"5px"}}>
                      BACK
                    </Button>

                </DialogActions>
              </Dialog>
      )}
      </div>

      <>
      <Button 
            sx={{ margin:"5px", 
            boxShadow:"2"}} 
            variant="contained" 
            startIcon={<EditIcon />}  
            disabled={!currentRow}
            onClick={() => setShowDialog(true)}>
              EDIT
            </Button>
      </>

      </div>
 
      <div>
        {currentRow &&(
                  <Dialog open={showDialog}>
                  <DialogTitle>UPDATE</DialogTitle>
                  <DialogContent>
                    <label>{currentRow.eId}</label>
                    <TextField 
                    value={currentRow.eventTitle}
                    ref={eventTitle1}
                    style={{margin : "5px"}}
                    id="outlined-number"
                    fullWidth
                    name="EventTitle"
                    label="Event Title"                    
                    onChange={handleChange}/>
                    
                    <TextField 
                    value={currentRow.timeStart}
                    ref={timeStart1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Time Start" 
                    name="TimeStart"
                    type="time" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.timeEnd}
                    ref={timeEnd1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Time End" 
                    name="TimeEnd"
                    type="time" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>
                    <br/>
                    <TextField 
                    value={currentRow.dateStart}
                    ref={dateStart1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Date Start" 
                    name="DateStart"
                    type="date" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.dateEnd} 
                    ref={dateEnd1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Date End" 
                    name="DateEnd"
                    type="date" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>
          
                    <TextField 
                    value={currentRow.description}
                    ref={description1}
                    style={{margin : "5px"}}
                    id="outlined-number"
                    name="Description"
                    fullWidth
                    label="Description" 
                    placeholder="Description"
                    onChange={handleChange}/>

                  </DialogContent>
                  <DialogActions>

                    <Button variant="contained" 
                    sx={{ size:"small",
                    margin:"5px"}}
                    onClick={() => {
                      setEnable(!enable);
                      updateEventData();
                    }}>
                      UPDATE
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
        )}
      </div>
      </div>
      
        {currentUser &&
      <DataGrid
      sx={{ width:"1025px", 
      height:"800px",
      boxShadow:"10",
      bgcolor:"background.paper",
      '& .super-app-theme--header': {
        backgroundColor: '#336699',
        color:"white",
      },
    }}

        columns={columns}
        rows={event}
        rowsPerPageOptions={[5, 12, 25 ]}
        getRowId={(event) =>
           event.eId}
        onRowClick={(item)=>{
          setCurrentRow(item.row);
          setCurrentRow2(item.row);
          console.log(item.row);
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        components={{ Toolbar: QuickSearchToolbar }}
      />
      }

      </Box>
    </div>

)
}

const OuterBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 1000px;
    justify-content:center;
    position: absolute;
    width: 280px;
    background-color: #132639; 
    font-family: Sans-Serif;
    font-size: 20px;
`;

  const myStyle = {
    backgroundColor: '#f1f1f1',
    margin:'auto',
};

const name = {
  backgroundColor: '#f1f1f1',
  padding: "10px",
  fontFamily: 'Sans-Serif',
  border:"1px solid #ccc",
  borderRadius:"10px",
  margin:"2px",
};

const submit  = {
  backgroundColor: '#336699',
  color: 'white',
  padding: "12px",
  fontFamily: 'Sans-Serif',
  border:"1px solid #ccc",
  borderRadius:"10px",
  margin:"2px",
};