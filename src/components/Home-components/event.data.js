import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { Box , Card ,Typography} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Calendar from 'react-calendar'; 

import { getDatabase, ref , get ,query } from "firebase/database";
import { app } from '../../../src/utils/Firebase';


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
      width: 130,
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
      type: 'time',
      headerClassName: 'super-app-theme--header',
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


export default function EventData() {
//
const reducerValue = useReducer(x => x + 1, 0);

      //read data record data
      const [event, setEvent] = useState([]);

      function getEventData () {
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

//calendar date
  const [date, setDate] = useState(new Date())

  return (
    <Box 
    sx={{ position: "absolute", 
    display: "flex",
    marginLeft: "550px", 
    marginTop:" 10px",
    maxWidth:"126vh",
    color:"#000",
    border:"1px solid #f1f1f1"}}>

        <Card 
        sx={{ width:"550px",
        marginRight:"5px",
        marginLeft:"5px" }}>

              <Typography variant="h4"
              sx={{ fontFamily: "sans serif", 
              padding:"5px" }}>
                EVENT 
              </Typography>
            
              <DataGrid
              sx={{ bgcolor:"background.paper",
              maxWidth:"550px",
              height:"400px",
              '& .super-app-theme--header': {
                backgroundColor: '#008B8B',
                color:"white",
              },
            }}
                columns={columns}
                rows={event}
                pageSize={5}
                getRowId={(event) =>
                  event.eId}
              />

            </Card>

            <Card 
            sx={{maxWidth:"350px",
            padding:"10px"}}>
              <div align="center" 
              style={{ fontFamily: "Monospace" }}>
                <Calendar onChange={setDate} value={date}/>
              </div>
              <div align="center">
                  <Typography variant="h6"               
                  sx={{ fontFamily: "sans serif", 
                  padding:"5px" }}>
                    Selected date:{date.toDateString()}
                    </Typography> 
              </div>
            </Card>

    </Box>
  )
}

