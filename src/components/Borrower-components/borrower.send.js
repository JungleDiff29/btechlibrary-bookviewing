import React,{ useState } from 'react';
import { Button,Box, 
    Typography,Modal,
    Fade,Backdrop} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import emailjs from 'emailjs-com';

export default function BorrowerSend() {

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

  //modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  
  return (
    <div>
    <Button sx={{ margin:"5px",boxShadow:"2"}} variant="contained" endIcon={<SendIcon />} onClick={handleOpen2}>SEND</Button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open2}>
      <Box sx={style2}>
      <Button sx={{ color:"black", float:"right"}} onClick={handleClose2}>X</Button>
        <Typography id="transition-modal-title" variant="h6" component="h1">
            SEND BORROWER MESSAGE
        </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2}}>
            <form onSubmit={sendEmail}>
              <label>Name of Borrower:</label>
              <br/>
              <input type="text" style={name} name="name" required/>
              <br/>
              <label>Email:</label>
              <br/>
              <input type="email" style={name} name="email" required/>
              <br/>
              <label>Date of Return:</label>
              <br/>
              <textarea style={name} name="message" />
              <br/>
              <input style={submit} type="submit"  value="SEND" required/>
            </form>
          </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  bgcolor: '#9fbfdf',
  border: '2px solid #ccc',
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
};

const name = {
  backgroundColor: '#f1f1f1',
  padding: "8px",
  fontFamily: 'Sans-Serif',
  borderborder:"3px solid #ccc",
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
