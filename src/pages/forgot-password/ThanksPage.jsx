/* eslint-disable */
/* eslint-disable no-console */

import React from 'react'
import '../styles/Login.scss';
import { Flex, Input, Button, Form } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


function ThanksPage() {

    return (
        <div className='login-container'>
            <div className='thanks-page'>
                <div className='successfully-reset'>
                    <h2>Password Reset Successfully</h2>
                    <p>Your password created successfully. Now go ahead and login with new credential</p>
                    <Link to={"/"} className='btn-primary'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ThanksPage