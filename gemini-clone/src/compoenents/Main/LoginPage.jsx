import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="LoginPage">
            <div className="loginbox">
                <h1 className="item1">Login</h1>

                <div className="item2">
                    <p>Email</p>
                    <input className='input' type="email" placeholder="Enter your email" />
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
                    <a href="#" className="forgot-password">Forgot password?</a>
                </div>

                <div className="item4">
                    <button className="login-btn">Submit</button>
                </div>

                <div className="item5">
                    <p>or continue with Google</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
