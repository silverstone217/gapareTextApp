import React, {useState} from 'react';
import "./Sign.css";
import {isMobile} from 'react-device-detect';
import {isTablet} from 'react-device-detect';
import {isDesktop} from 'react-device-detect';
import {HiOutlineMail} from "react-icons/hi";
import {HiOutlineLockClosed} from "react-icons/hi";
import {RiUserLine} from "react-icons/ri";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../Firebase/Firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

function Sign() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [model, setModel] = useState(false);
    const navigate = useNavigate();

    const signin = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {email: email, password: password, name: name}, {merge:true})
        navigate('/main')
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
    }

    const login = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            //const user = userCredential.user;
            navigate('/main')
            // ...
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
  });
    }

   const validate = ()=>{
    if (email !== "" && password !== ""){
        signin();
    }
    else{
        alert("Email or Password is invalid")
    }
   } 
   const validates = ()=>{
    if (email !== "" && password !== ""){
        login();
    }
    else{
       alert("Email or Password is invalid")
    }
   } 
// mobile
  if (isMobile){
    return (
        <div className='Mobile'>
           {
            model === false? 
            <div className='sign'>
                Login в смартфоне
           </div>
             :
             <div className='sign'>
                Sign в смартфоне
           </div>
           }
           <div className='inputCenter'>
                {
                    model === false
                    ?
                    null
                    :
                    <div className='emailCenterM'>
                    <RiUserLine size={25} color='black' />
                    <input  type='text' className='emailM' placeholder='name' name='name' onChange={(e)=>{e.preventDefault(); setName(e.target.value)}} />
                    </div>
                }

                <div className='emailCenterM'>
                    <HiOutlineMail size={25} color='black' />
                    <input  type='email' className='emailM' placeholder='email' name='email' onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}} />
                </div>

                <div  className='emailCenterM'>
                    <HiOutlineLockClosed size={25} color='black' />
                    <input  type='password' className='passwordM' placeholder='password' name='password' onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
                </div>
           </div>
           {
            model === false
            ?
            <>
                <div className='enterM' onClick={validates}>
                Войти
                </div>
                <div className='sub' onClick={()=>setModel(true)}>
                    Если нет аккаунта, создайте!
                </div>
            </>
            :
            <>
                <div className='enterM' onClick={validate}>
                Создать
                </div>
                <div className='sub' onClick={()=>setModel(false)} >
                Если есть аккаунт, Войдите!
                </div>
            </>
           }
        </div>
      )
  }

  // Desktop
  else if (isDesktop){
    return (
        <div className='Deskop'>
           {
            model === false? 
            <div className='sign'>
                Login на ПК
           </div>
             :
             <div className='sign'>
                Sign на ПК
           </div>
           }
           <div className='inputCenter'>
                {
                    model === false
                    ?
                    null
                    :
                    <div className='emailCenter'>
                    <RiUserLine size={25} color='black' />
                    <input required type='text' className='email' placeholder='name' name='name' onChange={(e)=>{e.preventDefault(); setName(e.target.value)}} />
                    </div>
                }

                <div className='emailCenter'>
                    <HiOutlineMail size={25} color='black' />
                    <input type='email' className='email' required placeholder='email' name='email' onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}} />
                </div>
                <div className='emailCenter'>
                    <HiOutlineLockClosed size={25} color='black' />
                    <input type='password' className='password'required placeholder='password' name='password' onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
                </div>
           </div>
           {
            model === false
            ?
            <>
                <div className='enter' onClick={validates}>
                Войти
                </div>
                <div className='sub' onClick={()=>setModel(true)}>
                    Если нет аккаунта, создайте!
                </div>
            </>
            :
            <>
                <div className='enter' onClick={validate}>
                Создать
                </div>
                <div className='sub' onClick={()=>setModel(false)} >
                Если есть аккаунт, Войдите!
                </div>
            </>
           }
           
           
        </div>
      )
  }

  //tablet
  else if (isTablet){
    return (
        <div className='Tablet'>
           {
            model === false? 
            <div className='sign'>
                Login на ПК
           </div>
             :
             <div className='sign'>
                Sign на ПК
           </div>
           }
           <div className='inputCenter'>
                {
                    model === false
                    ?
                    null
                    :
                    <div className='emailCenter'>
                    <RiUserLine size={25} color='black' />
                    <input required type='text' className='email' placeholder='name' name='name' onChange={(e)=>{e.preventDefault(); setName(e.target.value)}} />
                    </div>
                }

                <div className='emailCenter'>
                    <HiOutlineMail size={25} color='black' />
                    <input type='email' className='email' required placeholder='email' name='email' onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}} />
                </div>
                <div className='emailCenter'>
                    <HiOutlineLockClosed size={25} color='black' />
                    <input type='password' className='password'required placeholder='password' name='password' onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
                </div>
           </div>
           {
            model === false
            ?
            <>
                <div className='enter' onClick={validates}>
                Войти
                </div>
                <div className='sub' onClick={()=>setModel(true)}>
                    Если нет аккаунта, создайте!
                </div>
            </>
            :
            <>
                <div className='enter' onClick={validate}>
                Создать
                </div>
                <div className='sub' onClick={()=>setModel(false)} >
                Если есть аккаунт, Войдите!
                </div>
            </>
           }
           
           
        </div>
      )
  }

  else{
    return (
        <div className='Computer'>
            {
            model === false? 
            <div className='sign'>
                Login на ноутбук
           </div>
             :
             <div className='sign'>
                Sign на ноутбук
           </div>
           }
           <div className='inputCenter'>
                {
                    model === false
                    ?
                    null
                    :
                    <div className='emailCenterT'>
                    <RiUserLine size={25} color='black' />
                    <input required type='text' className='email' placeholder='name' name='name' onChange={(e)=>{e.preventDefault(); setName(e.target.value)}} />
                    </div>
                }

                <div className='emailCenterT'>
                    <HiOutlineMail size={25} color='black' />
                    <input type='email' className='email' placeholder='email' name='email'required onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}}/>
                </div>

                <div className='emailCenterT'>
                    <HiOutlineLockClosed size={25} color='black' />
                    <input type='password' className='password' placeholder='password' name='password'required onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}} />
                </div>
           </div>
           {
            model === false
            ?
            <>
                <div className='enter' onClick={validates}>
                Войти
                </div>
                <div className='sub' onClick={()=>setModel(true)}>
                    Если нет аккаунта, создайте!
                </div>
            </>
            :
            <>
                <div className='enter' onClick={validate}>
                Создать
                </div>
                <div className='sub' onClick={()=>setModel(false)} >
                Если есть аккаунт, Войдите!
                </div>
            </>
           }
        </div>
      )
  }
}

export default Sign