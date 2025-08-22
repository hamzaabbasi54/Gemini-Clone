import React, { useState } from 'react';
import './createaccountpage.css';

const CreateAccountPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="CreateAccountPage">
            <div className="createbox">
                <h1 className="item1">Create Account</h1>

                <div className="item2">
                    <p>Name</p>
                    <input   className='input' type="text" placeholder="Enter your name" />
                </div>

                <div className="item3">
                    <p>Email</p>
                    <input  className='input' type="email" placeholder="Enter your email" />
                </div>

                <div className="item3">
                    <p>Password</p>
                    <div className="input-icon">
                        <input className='input'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className="eye-icon"
                        >
      {showPassword ? '🙈' : '👁️'}
    </span>
                    </div>
                </div>


                <div className="item5">
                    <button className="create-btn">Create Account</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
