import React from 'react';
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { Button, Box, Typography, Card, Avatar } from '@mui/material';

import { logout, useAuth } from '../../src/utils/Firebase';

import Profile from "../../src/components/Account-components/Profile"; 

export default function Account() {
    const router = useRouter();
    //tab button
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
  
  
    const [loading,setLoading] = useState(false);
    const currentUser = useAuth();
    //logout
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
    marginTop:"3px" ,
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
    sx={{ color:"white",
     background:" #000d1a", 
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
     color:"black" }}>
    

    <Card sx={{ bgcolor:"background.paper",
     padding:"20px",
     width:"70vh",
     color:"#000d1a", 
     fontFamily: "Sans-Serif",
     borderRadius:"10px",
     border: "1px solid #ccc"}} >
      
      <Typography variant="h4" sx={{ fontFamily:"Sans Serif" , marginBottom:"20px"}}>ADD PHOTO</Typography>
      {currentUser && 
        <>
          <Profile />
        </>
      }    

      <Button sx={{ marginTop:"10px" }}variant="contained">Reset Password</Button>

    </Card>

    <Card 
    sx={{ marginTop:"10px" }}>
      {currentUser &&
    <table align="center" border='1px solid #000' 
    style={{ borderRadius:"5px"}}>
        <tr     
        style={{backgroundColor:"#336699" , 
        color:"white"}} >
          <th><Typography><h3>AVATAR:</h3></Typography></th>
          <th><Typography><h3>UID:</h3></Typography></th>
          <th><Typography><h3>EMAIL:</h3> </Typography></th>
          <th><Typography><h3>STATUS:</h3> </Typography></th>
        </tr>
        <tr align ="center">
          <td><Avatar  sx={{ border:"1px solid #000"}}width={58} height={58} src={currentUser?.photoURL }/></td>
          <td>{ currentUser?.uid } </td>
          <td>{ currentUser?.email }</td>
          <td>Currently Login</td>
        </tr>
      </table>
}
      </Card>

    <div>
      <Typography 
      variant= "h5"
      sx={{ margin:"20px",
      color:"#132639"}}>
        ALL USER ACCOUNT
      </Typography>
    </div>



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
