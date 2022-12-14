import React, { useEffect, useState } from 'react'
import {db, storage} from '../fbase'
import { doc, deleteDoc,updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Tweet.scss'


function Tweet({tweetObj,isOwner,newPhoto}) {

  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text); 
  const [nowDate, setNoeDate] = useState(tweetObj.createAt);

  const onDeleteClick = async() => {
    const ok = window.confirm('삭제하시겠습니까?');
    //confirm : 삭제 메세지 보여주기
    if(ok){
    //console.log(tweetObj.id);
    //const data = await db.doc(`tweets/${tweetObj.id}`)
    const data = await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`));
    //console.log(data);
    }
    if(tweetObj.photoURL !== ""){
      const desertRef = ref(storage, newPhoto);
      await deleteObject(desertRef);
    }
  }

  const toggleEditng = () => {
    setEditing((prev) => !prev);
  }

  const onNewTweet = e => {
    const {target: {value}} = e;
    setNewTweet(value);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
   //console.log(tweetObj.id, newTweet)
    const newTweetRef = doc(db, "tweets", `/${tweetObj.id}`);
    await updateDoc(newTweetRef, {
        text: newTweet,
        createAt: Date.now()
    });
    setEditing(false);
  }
  useEffect(()=>{
    let timeStamp = tweetObj.createAt;
    const now = new Date(timeStamp);
    setNoeDate(now.toUTCString())
  },[])

  return (
    <div className='tweet'>
          <>
            {tweetObj.photoURL && (
              <img src={tweetObj.photoURL} width="50" height="50"/>
              )}
            <h4>{tweetObj.text}</h4>
            <span>{nowDate}</span>
            {isOwner && (
            <div className='tweet__actions'>
              <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon="fa-solid fa-trash"/>
              </span>
            </div>   
            )} 
          </>
    </div>
  )
}

export default Tweet