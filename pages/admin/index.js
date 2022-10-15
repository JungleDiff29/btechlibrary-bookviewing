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

    //sign up
    const router = useRouter();
  
    const goSignup = () => {
      router.push("/admin/Signup");
  } 
    const goLibrarian = () => {
      router.push("/librarian/");
  } 
  
    async function handleLogin() {
      setLoading(true);
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        alert("Successfully Login!");
      router.push("/admin/Home");
      } catch {
        alert("Error!");
      }
      setLoading(false);
    }

  return (
    <div>
        <OuterBox>
        
        <Box 
        sx={{ display: "flex", 
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

        <h2>ADMIN LOGIN</h2>
        <table>
          <tr>
            <td><label>Email:</label></td>
            <td><input style={name} placeholder="Enter your email" type="email" ref={emailRef} required/></td>
          </tr>
          <tr>
            <td><label>Password:</label></td>
            <td><input style={name} placeholder="Enter your password" type="password" ref={passwordRef} required/></td>
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
              width:"100%"}}>
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
            <td><Button onClick={goLibrarian} 
            sx={{ fontFamily: "Monospace", 
            width:"100px",
            color:"white",
            backgroundColor:"#6600cc",
            borderRadius:"10px" }}>
              Librarian
            </Button></td>
          </tr>
          </table>
        </Box>
        
        </OuterBox>
    </div>
  )
}
const OuterBox = styled.div`
    background: linear-gradient(0deg, #00264d 20%, #001a33 30%, #000d1a 40%);
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