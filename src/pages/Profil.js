import React, {useState, useEffect} from 'react';
import "./Profil.css";
import {isMobile} from 'react-device-detect';
import {isTablet} from 'react-device-detect';
import {isDesktop} from 'react-device-detect';
import {BsPencilSquare} from 'react-icons/bs';
import {RxCross1} from 'react-icons/rx';
import {AiOutlineHome} from 'react-icons/ai';
import {auth} from '../Firebase/Firebase';
import {  updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Profil() {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photourl, setPhotourl] = useState(null);
  const [modif, setModif] = useState(false);
  const navigate = useNavigate();


  const modify = ()=>{
    updateProfile(auth.currentUser, {
      displayName: name , photoURL: photourl, 
    }).then(async () => {

      // Profile updated!
      setModif(false)
      setName('')
      setPhoto(null)
      setPhotourl(null)
      alert("Profile updated");
      // ...
    }).catch((error) => {
      // An error occurred
      alert("An error occurred");
      // ...
    });
  }
  
  useEffect(() => {
    if(photo !== null){
      setPhotourl(URL.createObjectURL(photo));
    }
  }, [photo])

  if(isMobile) {
    return (
      modif === false
      ?
      <div className='Mobile'>
        <AiOutlineHome color='lightgreen' size={40} className='hompage' onClick={()=>{
          navigate("/main")
        }}/>
        <div className='d1'>
          <div className='d11'>Profile</div>
          <BsPencilSquare  onClick={()=>{ setModif(true); }} color='black' size={20}/>
        </div>
        <div className='d12'>
          {
            user.photoURL ? <img className='photop' src = {user.photoURL} alt='profile'/>: <div className='photop'>
              <div>Profile picture</div>
            </div>
          }
          {
            user.displayName ? <div className='emailp'>{user.displayName}</div>: <div className='emailp'>Profile name</div>
          }
          {
            user.email ? <div className='emailp'>{user.email}</div>: <div className='emailp'>Profile Email</div>
          }
          <div className='passwordp'>*********</div>
        </div>
      </div>
      :
      <div className='Mobile'>
        <div className='d1s'>
          <div className='d11'>Profile</div>
        </div>
        <div className='d12'>
          {
            photo === null
            ?
              <input type="file" accept='image/*' className= "emailpp" placeholder="Profile Photo"alt='profile picture' onChange={(e)=>{
                e.preventDefault();
                setPhoto(e.target.files[0]);
              }} />
          
            :
            <>
              <img src={photourl} className='photop' alt='profile'/>
              <RxCross1 className='dlt'  onClick={()=>{ setPhoto(null); setPhotourl(null) }} color='crimson' size={20}/>
            </>
          } 
          <input type= "text" className= "emailpp" placeholder='name' onChange={(e)=>{
            e.preventDefault();
            setName(e.target.value);
          }}/>
        
        </div>
        <div className='btnprofileM'>
        <div className='d3M' onClick={()=> setModif(false)}>cancel
         </div>
        <div className='d2M' onClick={()=>{
          if(name !==""  && photourl !== null){modify()}
         }}>validate
         </div>
        </div>
      </div>
    )
  }
  else if(isDesktop) {
    return (
      modif === false
      ?
      <div className='Deskop'>
        <AiOutlineHome color='lightgreen' size={40} className='hompage' onClick={()=>{
          navigate("/main")
        }}/>
        <div className='d1'>
          <div className='d11'>Profile</div>
          <BsPencilSquare  onClick={()=>{ setModif(true); }} color='black' size={20}/>
        </div>
        <div className='d12'>
          {
            user.photoURL ? <img className='photop' src = {user.photoURL} alt='profile'/>: <div className='photop'>
              <div>Profile picture</div>
            </div>
          }
          {
            user.displayName ? <div className='emailp'>{user.displayName}</div>: <div className='emailp'>Profile name</div>
          }
          {
            user.email ? <div className='emailp'>{user.email}</div>: <div className='emailp'>Profile Email</div>
          }
          <div className='passwordp'>*********</div>
        </div>
      </div>
      :
      <div className='Deskop'>
        <div className='d1s'>
          <div className='d11'>Profile</div>
        </div>
        <div className='d12'>
          {
            photo === null
            ?
              <input type="file" accept='image/*' className= "emailpp" placeholder="Profile Photo"alt='profile picture' onChange={(e)=>{
                e.preventDefault();
                setPhoto(e.target.files[0]);
              }} />
          
            :
            <>
              <img src={photourl} className='photop' alt='profile'/>
              <RxCross1 className='dlt'  onClick={()=>{ setPhoto(null); setPhotourl(null) }} color='crimson' size={20}/>
            </>
          } 
          <input type= "text" className= "emailpp" placeholder='name' onChange={(e)=>{
            e.preventDefault();
            setName(e.target.value);
          }}/>
        
        </div>
        <div className='btnprofile'>
        <div className='d3' onClick={()=> setModif(false)}>cancel
         </div>
        <div className='d2' onClick={()=>{
          if(name !==""  && photourl !== null){modify()}
         }}>validate
         </div>
        </div>
      </div>
    )
  }
  else if(isTablet) {
    return (
      modif === false
      ?
      <div className='Tablet'>
        <AiOutlineHome color='lightgreen' size={40} className='hompage' onClick={()=>{
          navigate("/main")
        }}/>
        <div className='d1'>
          <div className='d11'>Profile</div>
          <BsPencilSquare  onClick={()=>{ setModif(true); }} color='black' size={20}/>
        </div>
        <div className='d12'>
          {
            user.photoURL ? <img className='photop' src = {user.photoURL} alt='profile'/>: <div className='photop'>
              <div>Profile picture</div>
            </div>
          }
          {
            user.displayName ? <div className='emailp'>{user.displayName}</div>: <div className='emailp'>Profile name</div>
          }
          {
            user.email ? <div className='emailp'>{user.email}</div>: <div className='emailp'>Profile Email</div>
          }
          <div className='passwordp'>*********</div>
        </div>
      </div>
      :
      <div className='Tablet'>
        <div className='d1s'>
          <div className='d11'>Profile</div>
        </div>
        <div className='d12'>
          {
            photo === null
            ?
              <input type="file" accept='image/*' className= "emailpp" placeholder="Profile Photo"alt='profile picture' onChange={(e)=>{
                e.preventDefault();
                setPhoto(e.target.files[0]);
              }} />
          
            :
            <>
              <img src={photourl} className='photop' alt='profile'/>
              <RxCross1 className='dlt'  onClick={()=>{ setPhoto(null); setPhotourl(null) }} color='crimson' size={20}/>
            </>
          } 
          <input type= "text" className= "emailpp" placeholder='name' onChange={(e)=>{
            e.preventDefault();
            setName(e.target.value);
          }}/>
        
        </div>
        <div className='btnprofile'>
        <div className='d3' onClick={()=> setModif(false)}>cancel
         </div>
        <div className='d2' onClick={()=>{
          if(name !==""  && photourl !== null){modify()}
         }}>validate
         </div>
        </div>
      </div>
    )
  }
  else{
    return (
      modif === false
      ?
      <div className='Computer'>
        <AiOutlineHome color='lightgreen' size={40} className='hompage' onClick={()=>{
          navigate("/main")
        }}/>
        <div className='d1'>
          <div className='d11'>Profile</div>
          <BsPencilSquare  onClick={()=>{ setModif(true); }} color='black' size={20}/>
        </div>
        <div className='d12'>
          {
            user.photoURL ? <img className='photop' src = {user.photoURL} alt='profile'/>: <div className='photop'>
              <div>Profile picture</div>
            </div>
          }
          {
            user.displayName ? <div className='emailp'>{user.displayName}</div>: <div className='emailp'>Profile name</div>
          }
          {
            user.email ? <div className='emailp'>{user.email}</div>: <div className='emailp'>Profile Email</div>
          }
          <div className='passwordp'>*********</div>
        </div>
      </div>
      :
      <div className='Computer'>
        <div className='d1s'>
          <div className='d11'>Profile</div>
        </div>
        <div className='d12'>
          {
            photo === null
            ?
              <input type="file" accept='image/*' className= "emailpp" placeholder="Profile Photo"alt='profile picture' onChange={(e)=>{
                e.preventDefault();
                setPhoto(e.target.files[0]);
              }} />
          
            :
            <>
              <img src={photourl} className='photop' alt='profile'/>
              <RxCross1 className='dlt'  onClick={()=>{ setPhoto(null); setPhotourl(null) }} color='crimson' size={20}/>
            </>
          } 
          <input type= "text" className= "emailpp" placeholder='name' onChange={(e)=>{
            e.preventDefault();
            setName(e.target.value);
          }}/>
        
        </div>
        <div className='btnprofile'>
        <div className='d3' onClick={()=> setModif(false)}>cancel
         </div>
        <div className='d2' onClick={()=>{
          if(name !==""  && photourl !== null){modify()}
         }}>validate
         </div>
        </div>
      </div>
    )
  }
}

export default Profil