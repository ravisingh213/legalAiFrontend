/* eslint-disable */
/* eslint-disable no-console */

import React, { useState } from 'react'
import '../styles/Chat.scss';
import { Input, Button } from "antd";
import { MenuOutlined, CloseOutlined, LinkOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import logoLI from '../../li-logo.png';
import SidePanel from '../shared/SidePanel';
import Header from '../shared/Header';


function Messages() {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className='chat-container'>
            {isVisible && (
                <SidePanel/>
            )}

            <div className='desktop-view'>
                <SidePanel/>
            </div>
            

            <div className='right-section'>
                <button onClick={() => setIsVisible(!isVisible)} className="mobiletogglenav navhmse">
                    {isVisible ? <CloseOutlined /> : <MenuOutlined />}
                </button>

                <Header/>
                <div className='chatbox-front messages-txt'>
                    <div className='chat-dashboard'>

                        <div className='user-message'>
                            Expain superconductor like i am five year old
                        </div>

                        <div className='site-message'>
                            <div className='sitelogo'><img src={logoLI} /></div>
                            <div className='txt-msg'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>

                        <div className='user-message'>
                            Expain superconductor like i am five year old
                        </div>

                        <div className='site-message'>
                            <div className='sitelogo'><img src={logoLI} /></div>
                            <div className='txt-msg'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>

                        <div className='user-message'>
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book..
                        </div>

                        <div className='site-message'>
                            <div className='sitelogo'><img src={logoLI} /></div>
                            <div className='txt-msg'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='chatInput-box'>
                    <Link className='attchedment'><LinkOutlined /></Link>
                    <Input placeholder='Type Message' />
                    <Link to={"/"}><Button className='btn-send' type='primary'><ArrowUpOutlined /></Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Messages