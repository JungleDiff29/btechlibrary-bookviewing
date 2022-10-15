import React from "react";
import { useEffect, useState } from "react";
import { useAuth, upload } from '../../utils/Firebase';
import { Avatar } from "@mui/material";


export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <Avatar sx={{ border:"1px solid #000" ,
        marginTop:"10px" }} 
        src={photoURL} 
        alt="Avatar" 
        height={58} width={58}/>
    </div>
  );
}

