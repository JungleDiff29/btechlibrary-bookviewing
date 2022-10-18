import React ,{ useReducer, useState, useEffect} from 'react'
import styled from '@emotion/styled';
import { Box ,Card, Typography} from "@mui/material";

import Image from "next/image";
import { DataGrid  ,
   GridToolbarQuickFilter,
  GridLinkOperator} from '@mui/x-data-grid';
import { getDatabase, ref , get ,query } from "firebase/database";
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
      width: 200,
    },
  ];

export default function Bookborrow() {

  //
  const reducerValue = useReducer(x => x + 1, 0);

//read data
const [book, setBook] = useState([]);

function getBookData() {
  const db = getDatabase(app);
  const bookRef = query(ref(db, "book"));

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

  return (
    <div style={myStyle}>
    <OuterBox>

    <Box           
    sx={{ marginLeft:"10px" }}>
          <Image 
          src="/img/page.png" 
          alt="logo" 
          width={100} 
          height={90}/>
    </Box>

    <Typography 
	variant="h3" 
   	sx={{ color:"#f1f1f1",
   	marginLeft:"20px" }}>
      BOOK LIST
    </Typography>
    </OuterBox>

        <Card 
	variant="outlined" 
        sx={{ margin:"5px" ,
	height:"100vh",
        justifyContent:"center",
        alignItems:"center", 
	display: "flex", 
	flexDirection:"column" }}>

        <DataGrid 
            sx={{ width:"600px", 
            height:"500px",
	    autoHeight={true}
     	    disableExtendRowFullWidth={true}
            boxShadow:"10",
            padding:"10px",
            bgcolor:"background.paper",
            '& .super-app-theme--header': {
              backgroundColor: '#009933',
              color:"white",
            },
          }}
            
                columns={columns}
                rows={book}
                rowsPerPageOptions={[5, 12, 25]}
                getRowId={(book) => 
                book.bkId}
                initialState={{
                  filter: {
                    filterModel: {
                      items: [
                        { columnField: 'status', operatorValue: 'contains', value: "Available" },
                      ],
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

const OuterBox = styled.div`
    display: flex;
    height: 90px;
    width: 100%;
    background-color: #003311; 
    font-family: Sans-Serif;
    font-size: 20px;
`;
  

  const myStyle = {
    backgroundColor: 'white',
};

