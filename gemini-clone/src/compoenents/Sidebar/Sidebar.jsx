import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets.js';
import './Sidebar.css';
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(true);
    const { onSent, prevPrompt, setRecentPrompt, loadPrompt, newChat, clearHistory } = useContext(Context);

    return (
        <div className={`sidebar ${!extended ? 'collapsed' : ''}`}>
            <div className="top">
                <img
                    onClick={() => setExtended(prev => !prev)}
                    className="menu"
                    src={assets.menu_icon}
                    alt="menu"
                />

                <div
                    className="new-chat"
                    onClick={newChat}
                    style={{cursor: 'pointer'}}
                >
                    <img src={assets.plus_icon} alt="new chat" />
                    {extended && <p>New Chat</p>}
                </div>

                <div className="recent">
                    {extended && (
                        <>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <p className="recent-title">Recent</p>
                                {prevPrompt.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            color: '#666',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {prevPrompt.map((item, index) => (
                                <div
                                    key={index}
                                    className="recent-entry"
                                    onClick={() => loadPrompt(item)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <img src={assets.message_icon} alt="msg" />
                                    <p>{item.slice(0,18)}...</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="help" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="activity" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="settings" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;