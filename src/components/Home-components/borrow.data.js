import React from 'react';
import { useEffect, useState , useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getDatabase, ref , get ,query } from "firebase/database";

import { Typography,Box,Card } from "@mui/material";
import { app } from '../../../src/utils/Firebase';


//table
const columns = [
    {  
      field: 'bId', 
      headerName: 'BID', 
      headerClassName: 'super-app-theme--header', 
      width: 70,},
    { 
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 110, 
    },
    { 
      field: 'booksData',
      headerName: 'Book Code/Book Title/Author',
      headerClassName: 'super-app-theme--header',
      width: 300,
  
    },
    {
      field:"dateReturned",
      headerName: 'Date Returned',
      headerClassName: 'super-app-theme--header',
      width :150,
    }
  ];

export default function BorrowData() {

//
const reducerValue = useReducer(x => x + 1, 0);

    //read data record data
  const [record, setRecord] = useState([]);

  function getBorrowData () {
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

  return (
    <div>
      <Box 
      sx={{ position: "absolute", 
      marginLeft: "300px", 
      marginTop:" 470px", 
      color:"black",
      border:"1px solid #ccc"}}>
        
        <div 
        style={{ width: "1040px", 
        height: "500px", 
        display:"flex", 
        boxShadow: "20"}}>

        <Card 
        sx={{ marginLeft: "2px"}}>

            <Typography
            variant="h4"
            sx={{ fontFamily: "sans serif", padding:"5px" }}>
            BOOK BORROWED
            </Typography>

        <DataGrid
        sx={{ width:"500px", 
        height:"450px", 
        marginLeft: "10px", 
        bgcolor:"background.paper",
        '& .super-app-theme--header': {
          backgroundColor: '#483D8B',
          color:"white",
        },
      }}
        columns={columns}
        rows={record}
        pageSize={5}
        getRowId={(record) =>
            record.bId}
        filterModel={{
            items: [
            { columnField: 'status', operatorValue: 'contains', value: "Borrowed" },
            ],
        }}
        
        />

        </Card>

        <hr 
        style={{ backgroundColor:"#ccc",
        border:"none",
        height:"100%",
        padding:"2px"}}/>

        <Card 
        sx={{ marginLeft: "2px" }}>
            <Typography
            variant="h4"
            sx={{ fontFamily: "sans serif", padding:"5px" }}
            >
            BOOK NOT RETURNED
            </Typography>

        <DataGrid
        sx={{ width:"500px", 
        height:"450px", 
        marginRight: "10px" ,
        bgcolor:"background.paper",
        '& .super-app-theme--header': {
          backgroundColor: '#2f4f4f',
          color:"white",
        },
      }}
        columns={columns}
        rows={record}
        pageSize={5}
        getRowId={(record) =>
            record.bId}
        filterModel={{
            items: [
            { columnField: 'status', operatorValue: 'contains', value: "Not Returned" },
            ],
        }}
        />

        </Card>

        </div>
        </Box>
    </div>
  )
}
