import React from 'react';
import { useState,useRef } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

import { Button,Box } from "@mui/material";
import styled from '@emotion/styled';

import { signup, useAuth } from "../../src/utils/Firebase";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading,setLoading] = useState(false);
    const currentUser = useAuth();
  
  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
        alert("Successfully Created!");
        router.push("/librarian/Home");
    }catch {
       alert("Error occured!");
     }
    setLoading(false);
  }
      
  const router = useRouter();
  
  const goLogin = () => {
      router.push("/librarian/");
  } 
  
  return (
    <div >
        <OuterBox>
        
        <Box sx={{ display: "flex", 
        flexDirection: "column", 
        backgroundColor:"#d1d1e0", 
        fontFamily: 'Sans-Serif',
        color:"#000",
        borderRadius:"10px", 
        padding: "30px", 
        margin:"2px", 
        maxWidth: "600px" ,
        border:"3px solid #ccc"}}>

        <Image src="/img/logo.png" alt="logo" width={350} height={250}/>
        
        <h2>LIBRARIAN SIGNUP</h2>
        <table>
          <tr>
            <td><label>Email:</label></td>
            <td><input style={name} placeholder="Email" type="email" ref={emailRef} required/></td>
          </tr>
          <tr>
            <td><label>Password:</label></td>
            <td><input style={name} placeholder="Password" type="password" ref={passwordRef} required/></td>
          </tr>
        </table>
        <table>
          <tr>
            <td><Button disabled={ loading || currentUser } onClick={handleSignup} type="submit" variant="contained" 
              sx={{ fontFamily: "Monospace", 
              padding: "10px",
              marginTop:"10px", 
              margin:"2px", 
              borderRadius:"10px",
              width:"100%",
              backgroundColor:"#6600cc" }}>
              Signup
            </Button></td>
        </tr>
        </table>
        <table>
          <tr>
            <td><label>Already have an account?</label></td>
            <td><Button onClick={goLogin} 
            sx={{ fontFamily: "Monospace", 
            width:"100px", 
            borderRadius:"10px" }}>
              Login
            </Button></td>
          </tr>
        </table>

        </Box>
        
        </OuterBox>
    </div>
  );
  };


const OuterBox = styled.div`
    background: linear-gradient(0deg,#26004d 20%, #1a0033 30%, #0d001a 40%);
    display: flex;
    height: 100vh;
    justify-content:center;
    align-items:center;
`;

const name = {
    backgroundColor: 'white',
    padding: "10px",
    color: "black",
    fontFamily: 'Sans-Serif',
    borderborder:"3px solid #ccc",
    borderRadius:"10px",
    margin:"2px",
    width:"100%",
};
