import React from 'react';
import { useEffect,useState ,useReducer ,useRef } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import {Button ,Box, Typography, Dialog, DialogTitle, DialogActions,
    DialogContent, TextField, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { getDatabase, ref , get ,query } from "firebase/database";
import { logout,useAuth ,app ,updateBook } from '../../src/utils/Firebase';
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator } from '@mui/x-data-grid';

import BookAdd from '../../src/components/Book-components/book.add';

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
      width: 370,
  
    },
    {
      field: 'author',
      headerName: 'Author',
      headerClassName: 'super-app-theme--header', 
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header', 
      width: 180,
    },
  ];

export default function Book() {
    //tab button
  const router = useRouter();

  const goHome = () => {
    router.push("/librarian/Home");
  }    
  const goBorrower = () => {
    router.push("/librarian/Borrower");
  } 
  const goBook = () => {
      router.push("/librarian/Book");
    } 
  const goEvent = () => {
    router.push("/librarian/Event");
  }     
  const goAccount = () => {
    router.push("/librarian/Account");
  }  

//logout
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      router.push("/librarian/");
    } catch {
      alert("Error!");
  }
    setLoading(false);
  }
  

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


  const [enable, setEnable] = useState(false);
  const id = useState(book.bkId);
  const [currentRow,setCurrentRow] = useState(null);
  const [showDialog,setShowDialog] = useState(false);
  
  
  const handleChange = (e) =>{
   console.log(e);
   setCurrentRow({...currentRow.target , [e.target.name] : [e.target.value] });
  }
  
  const bookCode1 = useRef(null);
  const bookTitle1 = useRef(null);
  const author1 = useRef(null);
  const status1 = useRef(null);
  
  const updateBookData = () => {
    updateBook(
      id,
      bookCode1.current.value,
      bookTitle1.current.value,
      author1.current.value,
      status1.current.value,
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
     display:"flex"  }}>
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
    background:" #0d001a", 
    padding: "12px",
     margin:"2px" ,
     fontSize: "15px"}}>
      Book List
      </Button>

    <Button onClick={goEvent} 
    variant="text" 
    sx={{ color:"white", 
    padding: "12px", 
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
      <Typography variant="h4">BOOK LIST</Typography>
    </>

    <div style={{ marginTop:" 5px", display: "flex" }}>

      <>
         <BookAdd />
      </>

      <>
      <Button 
      sx={{ margin:"5px",
      boxShadow:"2"}} 
      variant="contained" 
      disabled={!currentRow}
      startIcon={<EditIcon />}
      onClick={() => setShowDialog(true)}>
        EDIT
      </Button>
      </>

    </div>
  </div>
 
      <div>
        {currentRow &&(
                  <Dialog open={showDialog}>
                  <DialogTitle>UPDATE</DialogTitle>
                  <DialogContent>
                    <label>{currentRow.bkId}</label>
                    <TextField 
                    value={currentRow.bookCode}
                    style={{margin : "5px"}}
                    ref={bookCode1}
                    name="bookCode"
                    id="outlined-number" 
                    fullWidth
                    label="Book Code"                    
                    onChange={handleChange}/>
                    
                    <TextField 
                    value={currentRow.bookTitle}
                    ref={bookTitle1}
                    style={{margin : "5px"}}
                    name="bookTitle" 
                    id="outlined-number" 
                    fullWidth 
                    label="Book Title"
                    onChange={handleChange} />
          
                    <TextField 
                    value={currentRow.author}
                    style={{margin : "5px"}}
                    ref={author1}
                    name="author"
                    id="outlined-number"
                    fullWidth
                    onChange={handleChange}/>

                    <label>STATUS</label>
                    <br/>

                    <select value={currentRow.status} 
                    style={{width:"200px", 
                    height:"50px"}}
                    name="status"
                    ref={status1}
                    onChange={handleChange}>
                      <option value="Available">Available</option>
                      <option value="Not">Not</option>
                    </select>

                  </DialogContent>
                  <DialogActions>

                    <Button variant="contained" 
                    sx={{ size:"small",
                    margin:"5px"}}
                    onClick={() => {
                      setEnable(!enable);
                      updateBookData();
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
        
      {currentUser &&
      <DataGrid
      sx={{ width:"1025px", 
      height:"800px",
      boxShadow:"10",
      bgcolor:"background.paper",
      '& .super-app-theme--header': {
        backgroundColor: '#9966ff',
        color:"white",
      },
    }}
      
        columns={columns}
        rows={book}
        rowsPerPageOptions={[5, 12, 25]}
        getRowId={(book) => 
          book.bkId}
          onRowClick={(item)=>{
            setCurrentRow(item.row);
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
    background-color: #1a0033; 
    font-family: Sans-Serif;
    font-size: 20px;
`;

  const myStyle = {
    backgroundColor: '#f1f1f1',
    margin:'auto',
};

