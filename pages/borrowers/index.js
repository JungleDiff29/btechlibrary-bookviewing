import React ,{ useReducer, useState, useEffect} from 'react'
import { Box ,Card, Typography, AppBar,IconButton,Divider } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import BookIcon from '@mui/icons-material/Book';

import Image from "next/image";
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator} from '@mui/x-data-grid';
import { getDatabase, ref , get ,query,equalTo,orderByChild } from "firebase/database";
import {app} from '../../src/utils/Firebase';

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
      field: 'bkId', 
      headerName: 'ID', 
      headerClassName: 'super-app-theme--header', 
      width: 70,
    },
    {
      field: 'bookCode',
      headerName: 'Book Code',
      headerClassName: 'super-app-theme--header', 
      width: 150,
    },
    { 
      field: 'bookTitle',
      headerName: 'Book Title',
      headerClassName: 'super-app-theme--header', 
      width: 300,
  
    },
    {
      field: 'author',
      headerName: 'Author',
      headerClassName: 'super-app-theme--header', 
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header', 
      width: 150,
    },
  ];

export default function Bookborrow() {

  //
  const reducerValue = useReducer(x => x + 1, 0);

//read data
const [available, setAvailable] = useState([]);

function getAvailableData() {
  const db = getDatabase(app);
  const empRef = query(
    ref(db, "book"),orderByChild("status"),equalTo("Available"));

  get(empRef).then((snapshot) => {
    var available = [];

    snapshot.forEach((childSnapshot) => {
      available.push(childSnapshot.val());
    });
    setAvailable(available);
  });
}

useEffect(() =>{
  getAvailableData();   
  },[reducerValue]);

  return (
    <div style={myStyle}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor:"#1f1f2e" }}>
        <Toolbar variant="dense">
          <Box>
            <Image 
            src="/img/page.png" 
            alt="logo" 
            width={110} 
            height={90}/>
          </Box>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ m: 5 }}>
            <BookIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
              BTECH LIBRARY BOOK LIST
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>


        <Card 
        sx={{ margin:"auto" ,
              height:"100vh",
              width:"600px",
              justifyContent:"center",
              alignItems:"center",
              display:"flex"}}>

        <Divider/>

        <DataGrid 
            sx={{ width:"600px", 
            height:"600px",
            boxShadow:"10",
            padding:"10px",
            margin:"auto",
            bgcolor:"background.paper",
            '& .super-app-theme--header': {
              backgroundColor: '#1f1f2e',
              color:"white",
            },
          }}
            
                columns={columns}
                rows={available}
                rowsPerPageOptions={[5, 12, 25]}
                getRowId={(available) => available.bkId}
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
        </Card>
    </div>
  )
}

  const myStyle = {
    backgroundColor: 'white',
    margin: "auto",
};

