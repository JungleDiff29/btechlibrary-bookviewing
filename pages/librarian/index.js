import React from 'react';
import { useState,useRef } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

import { Button,Box } from "@mui/material";
import styled from '@emotion/styled';

import { login, useAuth } from '../../src/utils/Firebase';

export default function Login() {
    const [ loading, setLoading ] = useState(false);
    const currentUser = useAuth();
  
    const emailRef = useRef();
    const passwordRef = useRef();
  
    async function handleLogin() {
      setLoading(true);
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        alert("Successfully Login!");
      router.push("/librarian/Home");
      } catch {
        alert("Error occured!");
      }
      setLoading(false);
    }

//sign up
    const router = useRouter();
  
    const goSignup = () => {
      router.push("/librarian/Signup");
  } 
    const goAdmin = () => {
      router.push("/admin/");
  } 

  return (
    <div>
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
        
        <h2>LIBRARIAN LOGIN</h2>
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
            <td><Button disabled={ loading || currentUser } onClick={handleLogin} type="submit" variant="contained" 
            sx={{ fontFamily: "Monospace", 
            padding: "10px",
            marginTop:"10px", 
            margin:"2px", 
            borderRadius:"10px",
            width:"100%",
            backgroundColor:"#6600cc" }}>
              Login
            </Button></td>
          </tr>
        </table>
        <table>
          <tr>
            <td><label>Doesnt have an account?</label></td>
            <td><Button onClick={goSignup} 
            sx={{ fontFamily: "Monospace", 
            width:"100px", 
            borderRadius:"10px" }}>
              Sign Up
            </Button></td>
          </tr>
          <tr>
            <td><Button onClick={goAdmin}  variant="contained"
            sx={{ fontFamily: "Monospace", 
            color:"white",
            width:"100px", 
            borderRadius:"10px" }}>
              Admin
            </Button></td>
          </tr>
        </table>
        
        </Box>
        
        </OuterBox>
    </div>
  )
}
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