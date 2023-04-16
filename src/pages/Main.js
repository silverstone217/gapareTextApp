import React, {useState, useEffect} from 'react';
import "./Main.css"
import {isMobile} from 'react-device-detect';
import {isDesktop} from 'react-device-detect';
import {isTablet} from 'react-device-detect';
import { auth, db } from '../Firebase/Firebase';
import {CiLogout} from 'react-icons/ci';
import { signOut } from "firebase/auth";
import {AiOutlinePlus} from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs';
import {BsTrash} from 'react-icons/bs';
import { collection, addDoc, doc , query, onSnapshot, deleteDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {RiUserLine} from "react-icons/ri";

function Main() {
    const user = auth.currentUser;
    const [newText, setNewText] = useState(false);
    const [modText, setModText] = useState(false);
    const [title, setTitle] = useState('');
    const [ text, setText ] = useState('');
    const [titleM, setTitleM] = useState('');
    const [ textM, setTextM ] = useState('');
    const [ id, setId ] = useState('');
    const navigate = useNavigate();
    const [dataText, setDataText] = useState([{}]);


    const signout = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/sign');
          }).catch((error) => {
            // An error happened.
            alert(error.message);
          });
    }

    useEffect(()=>{
        let q = query(collection(db, "texts", user.uid, "text", ));
    const unsub = onSnapshot(q ,(snapshot) => {
      setDataText(snapshot.docs.map((doc) => {return({ id: doc.id,...doc.data() }
      );  
      
    }));
        //console.log("messages: ",dataText);
  });
        return () => unsub();
    }, [user])

    const sendText = async ()=>{
        const textRef = collection(db, "texts", user.uid, "text") ;
        await addDoc(textRef, {
            title:title,
            text:text,
            time: new Date()
        }).then( ()=>{
            setText('');
            setTitle("");
            setNewText(false);
        }).catch(err=>{
            if(err){
                alert(err.message)
            }
        })
    }
    const sendTextM = async ()=>{
        await setDoc(doc(db, "texts", user.uid, "text", id), {title: titleM, text: textM}, {merge:true});
        setModText(false);
    }
    const goProfile = ()=>{
        navigate("/profile")
    }

  if(isMobile) {
    return (
        <div className="MobileM">
            <header className="header">
            <div className='welcome'>
                    Welcome {user.email} on Mobile
                </div>
                <div className='logoutM'>
                {
                        user.photoURL
                        ?
                        <img src={user.photoURL} alt="user_profile" onClick={goProfile} className='userProfile'/>
                        :
                        <RiUserLine  color='black' size={30} onClick={goProfile} />
                    }
                    <CiLogout onClick={signout}  color='crimson' size={25}/>
                </div>
            </header>
            
            <div className='centerMainM'>
                <h3 className="textMain">Тексты</h3>
                <div className='content'>
                    {
                        dataText.map((data, index)=>{
                            return(
                                <div className='idxM' key={index}>
                                    <div className='hdtxtM'>
                                        <div className='txtTitleM'> {data.title} </div>
                                        <div>{
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toDateString()
                }
                {
                    " "
                }
                {
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toLocaleTimeString()
                }</div>
                                    </div>
                                    <div className='txtContentM'>{data.text}</div>
                                    <div className='bsBtnM'>
                                    <BsPencilSquare  onClick={()=>{
                                        setModText(true);
                                        setTextM(data.text);
                                        setTitleM(data.title);
                                        setId(data.id);
                                       
                                    }} color='black' size={20}/>

                                        <BsTrash onClick={
                                            async ()=>{
                                                await deleteDoc(doc(db, "texts", user.uid , "text", `${data.id}`))
                                                .then(()=>alert(`${data.title} deleted`))
                                                .catch((err)=>console.log(err))
                                            }
                                        } color="crimson" size={20}/>
                                    </div>
                                    <div className='txtsepM'></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                modText === false 
                ? 
                null
                :
                <div className='textContent1'>
                    <input type='text' value={titleM} name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitleM(e.target.value)}}/>
                    <textarea name='text' value={textM} placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setTextM(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setModText(false)}>Cancel</div>
                        <div className='btnv' onClick={()=>{
                            if(titleM !=="" && textM !== "" && id !== null){
                                sendTextM();
                            }
                            else{
                                alert("Please enter a title and text");
                            }
                        }}>modify</div>
                    </div>
                </div>
            }
            
            {
                newText === false 
                ?
                <footer className='footer'>
                <AiOutlinePlus onClick={()=>setNewText(true)} color='black' size={45}/>
                </footer>
                :
                <div className='textContent'>
                    <input type='text' name='title' placeholder='Title' className='titleMainM' required onChange={(e)=>{e.preventDefault(); setTitle(e.target.value)}}/>
                    <textarea name='text' placeholder='text' className='textareaM' required onChange={(e)=>{e.preventDefault(); setText(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btncM' onClick={()=>setNewText(false)}>Cancel</div>
                        <div className='btnvM' onClick={sendText}>validate</div>
                    </div>
                </div>
            }
        </div>
    )
  }
  else if(isDesktop) {
    return (
        <div className="DeskopM">
            <header className="header">
                <div className='welcome'>
                    Welcome {user.email} on Deskop
                </div>
                <div className='logout'>
                    {
                        user.photoURL
                        ?
                        <img src={user.photoURL} alt="user_profile" onClick={goProfile} className='userProfile'/>
                        :
                        <RiUserLine  color='black' size={30} onClick={goProfile} />
                    }
                    <CiLogout onClick={signout}  color='crimson' size={30}/>
                </div>
            </header>

            <div className='centerMain'>
                <h3 className="textMain"> Тексты: </h3>
                <div className='content'>
                    {
                        dataText.map((data, index)=>{
                            return(
                                <div className='idx' key={index}>
                                    <div className='hdtxt'>
                                        <div className='txtTitle'> {data.title} </div>
                                        <div>{
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toDateString()
                }
                {
                    " "
                }
                {
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toLocaleTimeString()
                }</div>
                                    </div>
                                    <div className='txtContent'>{data.text}</div>
                                    <div className='bsBtn'>
                                    <BsPencilSquare  onClick={()=>{
                                        setModText(true);
                                        setTextM(data.text);
                                        setTitleM(data.title);
                                        setId(data.id);
                                       
                                    }} color='black' size={20}/>
                                        <BsTrash onClick={
                                            async ()=>{
                                                await deleteDoc(doc(db, "texts", user.uid , "text", `${data.id}`))
                                                .then(()=>alert(`${data.title} deleted`))
                                                .catch((err)=>console.log(err))
                                            }
                                        } color="crimson" size={20}/>
                                    </div>
                                    <div className='txtsep'></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                modText === false 
                ? 
                null
                :
                <div className='textContent1'>
                    <input type='text' value={titleM} name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitleM(e.target.value)}}/>
                    <textarea name='text' value={textM} placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setTextM(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setModText(false)}>Cancel</div>
                        <div className='btnv' onClick={()=>{
                            if(titleM !=="" && textM !== "" && id !== null){
                                sendTextM();
                            }
                            else{
                                alert("Please enter a title and text");
                            }
                        }}>modify</div>
                    </div>
                </div>
            }
    
            {
                newText === false 
                ?
                <footer className='footer'>
                <AiOutlinePlus onClick={()=>setNewText(true)} color='black' size={45}/>
                </footer>
                :
                <div className='textContent'>
                    <input type='text' name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitle(e.target.value)}}/>
                    <textarea name='text' placeholder='Text' className='textarea' required onChange={(e)=>{e.preventDefault(); setText(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setNewText(false)}>Cancel</div>
                        <div className='btnv' onClick={sendText}>validate</div>
                    </div>
                </div>
            }
        </div>
    )
  }
  else if(isTablet){
    return (
        <div className="TabletM">
           <header className="header">
                <div className='welcome'>
                    Welcome {user.email} on Tablet
                </div>
                <div className='logout'>
                {
                        user.photoURL
                        ?
                        <img src={user.photoURL} alt="user_profile" onClick={goProfile} className='userProfile'/>
                        :
                        <RiUserLine  color='black' size={30} onClick={goProfile} />
                    }
                    <CiLogout onClick={signout}  color='crimson' size={30}/>
                </div>
            </header>
            
            <div className='centerMain'>
                <h3 className="textMain">Тексты</h3>
                <div className='content'>
                    {
                        dataText.map((data, index)=>{
                            return(
                                <div className='idx' key={index}>
                                    <div className='hdtxt'>
                                        <div className='txtTitle'> {data.title} </div>
                                        <div className='txtTime'> {
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toDateString()
                }
                {
                    " "
                }
                {
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toLocaleTimeString()
                }</div>
                                    </div>
                                    <div className='txtContent'>{data.text}</div>
                                    <div className='bsBtn'>
                                    <BsPencilSquare  onClick={()=>{
                                        setModText(true);
                                        setTextM(data.text);
                                        setTitleM(data.title);
                                        setId(data.id);
                                       
                                    }} color='black' size={20}/>
                                        <BsTrash onClick={
                                            async ()=>{
                                                await deleteDoc(doc(db, "texts", user.uid , "text", `${data.id}`))
                                                .then(()=>alert(`${data.title} deleted`))
                                                .catch((err)=>console.log(err))
                                            }
                                        } color="crimson" size={20}/>
                                    </div>
                                    <div className='txtsep'></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                modText === false 
                ? 
                null
                :
                <div className='textContent1'>
                    <input type='text' value={titleM} name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitleM(e.target.value)}}/>
                    <textarea name='text' value={textM} placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setTextM(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setModText(false)}>Cancel</div>
                        <div className='btnv' onClick={()=>{
                            if(titleM !=="" && textM !== "" && id !== null){
                                sendTextM();
                            }
                            else{
                                alert("Please enter a title and text");
                            }
                        }}>modify</div>
                    </div>
                </div>
            }

            {
                newText === false 
                ?
                <footer className='footer'>
                <AiOutlinePlus onClick={()=>setNewText(true)} color='black' size={45}/>
                </footer>
                :
                <div className='textContent'>
                    <input type='text' name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitle(e.target.value)}}/>
                    <textarea name='text' placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setText(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setNewText(false)}>Cancel</div>
                        <div className='btnv' onClick={sendText}>validate</div>
                    </div>
                </div>
            }
        </div>
    )
  }
  else{
    return (
        <div className="ComputerM">
           <header className="header">
                <div className='welcome'>
                    Welcome {user.email} on Laptop 
                </div>
                <div className='logout'>
                {
                        user.photoURL
                        ?
                        <img src={user.photoURL} alt="user_profile" onClick={goProfile} className='userProfile'/>
                        :
                        <RiUserLine  color='black' size={30} onClick={goProfile} />
                    }
                    <CiLogout onClick={signout}  color='crimson' size={30}/>
                </div>
            </header>
            
            <div className='centerMain'>
                <h3 className="textMain">Тексты</h3>
                <div className='content'>
                    {
                        dataText.map((data, index)=>{
                            return(
                                <div className='idx' key={index}>
                                    <div className='hdtxt'>
                                        <div className='txtTitle'> {data.title} </div>
                                        <div className='txtTime'>{
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toDateString()
                }
                {
                    " "
                }
                {
                  new Date ( data.time?.nanoseconds/1000000 + data.time?.seconds*1000).toLocaleTimeString()
                }</div>
                                    </div>
                                    <div className='txtContent'>{data.text}</div>
                                    <div className='bsBtn'>
                                    <BsPencilSquare  onClick={()=>{
                                        setModText(true);
                                        setTextM(data.text);
                                        setTitleM(data.title);
                                        setId(data.id);
                                       
                                    }} color='black' size={20}/>
                                    <BsTrash onClick={
                                        async ()=>{
                                            await deleteDoc(doc(db, "texts", user.uid , "text", `${data.id}`))
                                            .then(()=>alert(`${data.title} deleted`))
                                            .catch((err)=>console.log(err))
                                            }
                                        } color="crimson" size={20}/>
                                    </div>
                                    <div className='txtsep'></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                modText === false 
                ? 
                null
                :
                <div className='textContent1'>
                    <input type='text' value={titleM} name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitleM(e.target.value)}}/>
                    <textarea name='text' value={textM} placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setTextM(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setModText(false)}>Cancel</div>
                        <div className='btnv' onClick={()=>{
                            if(titleM !=="" && textM !== "" && id !== null){
                                sendTextM();
                            }
                            else{
                                alert("Please enter a title and text");
                            }
                        }}>modify</div>
                    </div>
                </div>
            }
            
            {
                modText === false 
                ? 
                null
                :
                <div className='textContent'>
                    <input type='text' name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitleM(e.target.value)}}/>
                    <textarea name='text' placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setTextM(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setModText(false)}>Cancel</div>
                        <div className='btnv' onClick={sendText}>modify</div>
                    </div>
                </div>
            }
            {
                newText === false 
                ?
                <footer className='footer'>
                <AiOutlinePlus onClick={()=>setNewText(true)} color='black' size={45}/>
                </footer>
                :
                <div className='textContent'>
                    <input type='text' name='title' placeholder='Title' className='titleMain' required onChange={(e)=>{e.preventDefault(); setTitle(e.target.value)}}/>
                    <textarea name='text' placeholder='text' className='textarea'required onChange={(e)=>{e.preventDefault(); setText(e.target.value)}}/>
                    <div className='btn'>
                        <div className='btnc' onClick={()=>setNewText(false)}>Cancel</div>
                        <div className='btnv' onClick={sendText}>validate</div>
                    </div>
                </div>
            }
        </div>
    )
  }
}

export default Main