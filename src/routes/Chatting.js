import React, { useEffect, useState } from 'react'
import '../styles/Chatting.scss'
import { FaPlane, FaWifi,FaMoon, FaBluetoothB, FaBatteryFull, FaCog, FaAngleLeft, FaSearch, FaBars, FaSmile, FaMicrophone, FaPlus } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import ChattingList from '../item/ChattingList';
import { collection, addDoc, query, getDoc, onSnapshot, orderBy, } from "firebase/firestore";
import {db, storage} from "../fbase";
import TweetFactory from './TweetFactory';
import Tweet from './Tweet';

export default function Chatting({userObj}) {
    console.log(userObj)
    const location = useLocation();
    console.log(location);
    const {images,name,texts} = location.state; 
    //-----------------------------------------------------------------
    console.log(userObj)
    const [tweets, setTweets] = useState([]); 

    useEffect(()=>{ //실시간 데이터베이스 문서들 가져오기
        // getTweets();
        const q = query(collection(db, "tweets" ),
                    orderBy("createAt","asc")); //시간을 내림차순정렬
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newArray = [];
          querySnapshot.forEach((doc) => {
            newArray.push({...doc.data(), id:doc.id});
          })
          console.log(newArray)
          setTweets(newArray)
        })
      },[]);

  return (
    <div className='Chatting'>
        <header className='header'>
            <div className="status-bar">
                <div className="left-item">
                <FaPlane/>
                <FaWifi/>
                </div>
                <div className="center-item">
                    <span>15</span>:<span>33</span>
                </div>
                <div className="right-item">
                    <FaMoon/>
                    <FaBluetoothB/>
                    <span><span>100</span>%</span>
                    <FaBatteryFull/>
                </div>
            </div>
            <div className="title-bar">
                <h1>{name}</h1>
                <div className="left-item"><Link to='/chats'><FaAngleLeft/></Link></div>
                <div className="right-item"><a href="#"><FaSearch/><FaBars/></a></div>
            </div>
        </header>

        <main className='chatting'>
            <span className="date_info">Monday,Octover 17, 2022</span>
            <div className="chat_box my">
                <span><TweetFactory  userObj={userObj}/></span>
                    {tweets.map(tweet => (
                    <Tweet 
                    key={tweet.id}
                    tweetObj={tweet}
                    isOwner={tweet.createId === userObj.uid}
                    />
                    ))}
            </div>
            {/* <!-- other --> */}
            <div class="chat_box other">
                <div class="other_box">
                    <Link to='/profile'><span class="profile_img empty"><img src={images} alt={images} /></span></Link>
                    <span class="profile_name">{name}</span>
                </div>
                <span class="chat">And this is an answer</span>
                <span class="chat">And this is an answer And this is an answer</span>
                <span class="chat">And this is an answer</span>
                <span class="chat_time"><span>17</span>:<span>33</span></span>
            </div>
        </main>
    </div> 
  )
}
