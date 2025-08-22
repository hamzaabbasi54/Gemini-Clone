import React from 'react';
import './ProfileDropDown_DoLogin.css';
import { useNavigate } from 'react-router-dom';

const ProfileDropDown_DoLogin = () => {
    const navigate = useNavigate();

    return (
        <div className='root'>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/create-account')}>Create Account</button>
        </div>
    );
};

export default ProfileDropDown_DoLogin;
