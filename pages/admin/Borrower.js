import React from 'react';
import { useEffect, useState, useRef, useReducer} from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { Button, Box, Typography, Dialog, DialogTitle, DialogActions,
    DialogContent , TextField, Avatar} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import emailjs from 'emailjs-com';

import { getDatabase, ref , get ,query } from "firebase/database";
import { logout, useAuth, app, updateBorrow } from '../../src/utils/Firebase';
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator } from '@mui/x-data-grid';

import BorrowerAdd from '../../src/components/Borrower-components/borrower.add';

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
      field: 'bId', 
      headerName: 'BID', 
      headerClassName: 'super-app-theme--header', 
      width: 70,
    },
    { 
      field: 'type',
      headerName: 'Borrower Type',
      headerClassName: 'super-app-theme--header', 
      width: 110, 
    },
    { 
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header', 
      width: 110,
    },
    { 
      field: 'lastName',
      headerName: 'Last Name',
      headerClassName: 'super-app-theme--header', 
      width: 130, 
    },
    { 
      field: 'firstName',
      headerName: 'First Name',
      headerClassName: 'super-app-theme--header', 
      width: 130, 
    },
    { 
      field: 'middleInitial',
      headerName: 'Middle Initial',
      headerClassName: 'super-app-theme--header', 
      width: 130,
    },
    { 
      field: 'booksData',
      headerName: 'Book Code/Book Title/Author',
      headerClassName: 'super-app-theme--header', 
      width: 400,
    },
    {
      field: 'dateBorrowed',
      headerName: 'Date Borrowed',
      headerClassName: 'super-app-theme--header', 
      type: 'date',
      width: 120,
    },
    {
      field: 'dateReturned',
      headerName: 'Date Returned',
      headerClassName: 'super-app-theme--header', 
      type: 'date',
      width: 120,
    },
    {
      field: 'address',
      headerName: 'Address',
      headerClassName: 'super-app-theme--header', 
      width:300,
    },
      {
      field: 'contact',
      headerName: 'Contact',
      headerClassName: 'super-app-theme--header', 
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email/Gsuite',
      headerClassName: 'super-app-theme--header', 
      width: 200,
    },
  ];

export default function Borrower() {

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
  
//tab button
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

        //send email
        const sendEmail = (e) => {
          e.preventDefault();
          emailjs.sendForm( 'service_borrowbook','template_z66l30o',e.target, 'mZ9JhUbr5bBJ2fNct')
            .then((result) => {
                console.log(result.text);
                alert("Send Successfully");
            }, (error) => {
                console.log(error.text);
                alert("Error");
            });
            e.target.reset();
        };

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


  //dialog
  const [showDialog,setShowDialog] = useState(false);
  const [showDialog2,setShowDialog2] = useState(false);
  const [currentRow,setCurrentRow] = useState(null);
  const [currentRow2,setCurrentRow2] = useState(null);

const [enable, setEnable] = useState(false);
const id = useState(record.bId);

  const handleChange = (e) =>{
    console.log(e);
    setCurrentRow({...currentRow , [e.target.name] : [e.target.value] });
   }

   const type1 =  useRef(null);
   const status1 =  useRef(null);
   const lastName1 =  useRef(null);
   const firstName1 =  useRef(null);
   const middleInitial1 =  useRef(null);
   const booksData1 =  useRef(null);
   const dateBorrowed1 =  useRef(null);
   const dateReturned1 =  useRef(null);
   const address1 =  useRef(null);
   const contact1=  useRef(null);
   const email1 =  useRef(null);

const updateBorrowData = () => {
  updateBorrow(
    id,
    type1.current.value,
    status1.current.value,
    lastName1.current.value,
    firstName1.current.value,
    middleInitial1.current.value,
    booksData1.current.value,
    dateBorrowed1.current.value,
    dateReturned1.current.value,
    address1.current.value,
    contact1.current.value,
    email1.current.value,
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
    background:" #000d1a", 
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
      <Typography variant="h4" sx={{ fontFamily: "Sans Serif" }} >BORROWER LIST</Typography>
    </>

    <div style={{ marginTop:" 5px", display: "flex" }}>

      <>
         <BorrowerAdd />
      </>

      <>
      <Button 
    sx={{ margin:"5px",
    boxShadow:"2"}} 
    variant="contained" 
    disabled={!currentRow2}
    startIcon={<SendIcon />} 
    onClick={() => setShowDialog2(true)}>
      SEND
    </Button>
    {currentRow && (
    <Dialog open={showDialog2}>
        <DialogTitle>SEND BORROWER MESSAGE</DialogTitle>
        <DialogContent>
        <label>{currentRow2.id}</label>

            <form onSubmit={sendEmail}>
              <table>
                <tr>
                  <td><label>Name of Borrower:</label></td>
                  <td><input type="text" style={name} value={currentRow2.firstName} name="name" required/></td>
                </tr>
                <tr>
                  <td><label>Email:</label></td>
                  <td><input type="email" style={name} value={currentRow2.email} name="email" required/></td>
                </tr>
                <tr>
                  <td><label>Date of Return:</label></td>
                  <td><textarea style={name} name="message" value={currentRow2.dateReturned} /></td>
                </tr>
                <tr>
                  <td><input style={submit} type="submit"  value="SEND" required/></td>
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
      </>

      <>
          <Button 
          sx={{ margin:"5px", 
          boxShadow:"2"}} 
          variant="contained" 
          disabled={!currentRow}
          startIcon={<EditIcon />}
          onClick={() => setShowDialog(true)}
          >
            EDIT
            </Button>
      </>
      
      </div> 
</div>

      <div>
        {currentRow && (
                  <Dialog open={showDialog}>
                  <DialogTitle>UPDATE</DialogTitle>
                  <DialogContent>
                  <label>{currentRow.bId}</label>
                    <br/>
                    <Typography>TYPE</Typography>
                    <select value={currentRow.type}
                    ref={type1}
                    style={{width:"200px", 
                    height:"40px"}}
                    onChange={handleChange}>
                      <option value="Students">Students</option>
                      <option value="Faculties">Faculties</option>
                      <option value="Other">Other</option>
                    </select>
                      <Typography>STATUS</Typography>
                    <select value={currentRow.status}
                    ref={status1}
                    style={{width:"200px", 
                    height:"40px",
                    marginBottom:"10px"}}>
                      <option value="Borrowed">Borrowed</option>
                      <option value="Returned">Returned</option>
                      <option value="Not Returned">Not Returned</option>
                    </select>
                    <br/>

                    <TextField 
                    value={currentRow.lastName} 
                    ref={lastName1}
                    sx={{ size:"small", 
                    margin:"5px"}}
                    fullWidth
                    id="outlined-basic" 
                    label="Last Name"                     
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.firstName}
                    ref={firstName1} 
                    sx={{ size:"small", 
                    margin:"5px"}}
                    fullWidth
                    id="outlined-basic" 
                    label="First Name" 
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.middleInitial} 
                    ref={middleInitial1}
                    sx={{ size:"small", 
                    margin:"5px"}}
                    fullWidth
                    id="outlined-basic" 
                    label="Middle Initial" 
                    onChange={handleChange}/>

                  <Typography sx={{ fontSize:"15px" }}>BOOK DATA</Typography>
                  <select value={currentRow.booksData}
                    ref={booksData1}
                    style={{width:"500px", 
                    height:"40px",
                    marginBottom:"10px"}}
                    onChange={handleChange}>
                    {book.map((row) => 
                    <option key={book.bookId} value={bookdata.row}> 
                        {row.bookCode} + 
                        {row.bookTitle} +  
                        {row.author}
                    </option>
                )}
                  </select>
                  <br/>

                    <TextField 
                    value={currentRow.dateBorrowed} 
                    ref={dateBorrowed1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Date Borrowed" 
                    type="date" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.dateReturned} 
                    ref={dateReturned1}
                    sx={{ size:"small", 
                    margin:"5px"}} 
                    label="Date Return" 
                    type="date" 
                    InputLabelProps={{ shrink: true,}}
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.address} 
                    ref={address1}
                    sx={{ size:"small", 
                    margin:"5px"}}
                    fullWidth
                    id="outlined-basic" 
                    label="Address" 
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.contact}
                    ref={contact1}
                    sx={{ size:"small",
                    margin:"5px"}}
                    id="outlined-basic" 
                    label="Contact Number" 
                    onChange={handleChange}/>

                    <TextField 
                    value={currentRow.email}
                    ref={email1}
                    sx={{ size:"small", 
                    margin:"5px"}}
                    label="Email Address/Gsuite"
                    id="outlined-basic" 
                    type="email" 
                    onChange={handleChange}/>
                  
                  </DialogContent>
                  <DialogActions>

                    <Button 
                    variant="contained"
                    onClick={() => {
                      setEnable(!enable);
                      updateBorrowData();
                    }}>
                      UPDATE
                    </Button>

                    <Button 
                    onClick={() => setShowDialog(false)}
                    variant="contained">
                      CANCEL
                    </Button>

                  </DialogActions>
                </Dialog>
        )}
      </div>


        { currentUser &&
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
        
        onRowClick={(item)=>{
          setCurrentRow(item.row);
          setCurrentRow2(item.row);
          console.log(item.row);
        }}
        columns={columns}
        rows={record}
        rowsPerPageOptions={[5, 12, 25]}
        getRowId={(record) =>
           record.bId}
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

const name = {
  backgroundColor: '#f1f1f1',
  padding: "8px",
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

const myStyle = {
  backgroundColor: '#f1f1f1',
  margin:'auto',
};


