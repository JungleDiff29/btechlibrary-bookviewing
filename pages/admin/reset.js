import { useState } from 'react';
import { Button,Box } from "@mui/material";
import { useRouter } from 'next/router';

import Image from "next/image";
import styled from '@emotion/styled';
import { reset, useAuth } from "../../src/utils/Firebase";

export default function Signup() {
    const [email, setEmail] = useState('')
    const currentUser = useAuth();
    const [loading,setLoading] = useState(false);

  async function handleReset() {
    setLoading(true);
    try {
      await reset(currentUser, email, password);
        alert("Successfully Send!");
    }catch {
       alert("Error!");
     }
    setLoading(false);
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

        <h2>ADMIN SIGNUP</h2>
        <table>
          <tr>
            <td><label>Email:</label></td>
            <td><input style={name} placeholder="Enter email" type="email" 
            value={email} onChange={e => setEmail(e.target.value)} required/></td>
          </tr>
        </table>
        <table>
          <tr>
            <td><Button disabled={ loading || currentUser } onClick={handleReset} type="submit" variant="contained" 
            sx={{ fontFamily: "Monospace", 
            padding: "10px",
            marginTop:"10px", 
            margin:"2px", 
            borderRadius:"10px",
            width:"100%" }}>
              RESET
            </Button></td>
          </tr>
        </table>

        </Box>
        
        </OuterBox>
    </div>
  );
  };


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