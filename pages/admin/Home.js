import React from 'react';
import { useEffect, useState,useReducer } from 'react';
import { useRouter} from 'next/router';
import Image from "next/image";

import styled from '@emotion/styled';
import { Button,Box, Typography,Paper, Avatar } from "@mui/material";

import { logout, useAuth, app } from '../../src/utils/Firebase';
import { getDatabase, ref , get ,query } from "firebase/database";

import BorrowData from '../../src/components/Home-components/borrow.data';
import EventData from '../../src/components/Home-components/event.data';

export default function Home() {
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


//tabs
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
  const goEvent= () => {
    router.push("/admin/Event");
  }    
  const goAccount = () => {
      router.push("/admin/Account");
  }   

//
const reducerValue = useReducer(x => x + 1, 0);


//read data record data
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

//read data book data
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

//read event data
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
        sx={{ color:"white", 
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
        backgroundColor:" #000d1a", 
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
        margin:"2px" ,
        fontSize: "15px"}}>
          Event Data
          </Button>

        <Button onClick={goAccount} 
        variant="text" 
        sx={{  color:"white",
         padding: "12px", 
         margin:"2px", 
         fontSize: "15px" }}>
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
        marginTop:" 10px",
        color:"black"}}>
    
        <div 
        style={{ display:"flex", 
        flexDirection:"column"}}>

        <Button onClick={goBorrower}>
        <Paper
          elevation={5}
          sx={{
            width: "220px",
            height: "100px",
            marginLeft: "2px",
            background: "#1a0033"}}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            BORROWER DATA
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            {currentUser &&
            <>
            {record.length}
            </>
            }
          </Typography>
        </Paper>
          </Button>

          <Button onClick={goBook}>
        <Paper
          elevation={5}
          sx={{
            width: "220px",
            height: "100px",
            marginLeft: "2px",
            background: "#800000"}}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            BOOK DATA
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            {currentUser &&
            <>
            {book.length}
            </>
            }
          </Typography>
        </Paper>
          </Button>


        <Button onClick={goEvent}>
        <Paper
          elevation={5}
          sx={{
            width: "220px",
            height: "100px",
            marginLeft: "2px",
            background: "#004d00"}}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            EVENT DATA
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: "sans serif", 
            color: "white" }}>
            {currentUser &&
            <>
            {event.length}
            </>
            }
          </Typography>
        </Paper>
        </Button>
      </div>
    
      </Box>

      <>
        {currentUser &&
            <EventData/>
        }
      </>

        <>
        {currentUser &&
          <BorrowData/>
        }
        </>

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
