import React, {useContext} from 'react';
import {assets} from "../../assets/assets.js";
import { Typewriter } from 'react-simple-typewriter';
import './main.css'
import {useState} from "react";
import ProfileDropDown_DoLogin from "./ProfileDropDown_DoLogin.jsx";
import ProfileDropDown_DoLogout from "./ProfileDropDown_DoLogout.jsx";
import { Context } from '../../context/Context.jsx';

const Main = () => {

    const [toggledropdown,settoggledropdown] = useState(false);
    const[loggedOut,setLoggedOut] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const {prevPrompt,setPrevPrompt, onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setinput}=useContext(Context);

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            onSent(input);
        }
    }

    // Handle send button click
    const handleSendClick = () => {
        if (input.trim() !== '') {
            onSent(input);
        }
    }

    let div = <>
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" onClick={() => settoggledropdown(!toggledropdown)}/>
                {loggedOut && toggledropdown && <ProfileDropDown_DoLogin/>}
                {!loggedOut && toggledropdown && <ProfileDropDown_DoLogout/>}

            </div>

            <div className="main-container">

                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span className='glow-text'>Hello,Dev</span></p>

                            <p className="typewriter-text">
                                <Typewriter
                                    words={['How can I help you😊']}
                                    loop={1}
                                    cursor={showCursor}
                                    cursorStyle="|"
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                    onLoopDone={() => setShowCursor(false)}
                                />
                            </p>
                        </div>
                        <div className="cards">

                            <div className="card">
                                <p>suggest beautiful places to see on a unique upcoming road trip</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>

                            <div className="card">
                                <p>briefly summarize this concept:urban plannig</p>
                                <img src={assets.bulb_icon} alt=""/>
                            </div>

                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt=""/>
                            </div>

                            <div className="card">
                                <p>improve the readability of the following code</p>
                                <img src={assets.code_icon} alt=""/>
                            </div>
                        </div>
                    </> : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt=""/>
                            {loading ? <div className="loader">
                                <hr/>
                                <hr/>
                                <hr/>
                            </div> : <p dangerouslySetInnerHTML={{__html: resultData}}></p>}

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setinput(e.target.value)}
                            value={input}
                            type="text"
                            name=""
                            id=""
                            placeholder='Enter a prompt here'
                            onKeyPress={handleKeyPress}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt=""/>
                            <img src={assets.mic_icon} alt=""/>
                            <img onClick={handleSendClick} src={assets.send_icon} alt=""/>
                        </div>
                    </div>
                    <p className="bottom-info">
                        it is a clone,don't take it serious😊
                    </p>
                </div>
            </div>
        </div>
    </>;
    return div;
};

export default Main;