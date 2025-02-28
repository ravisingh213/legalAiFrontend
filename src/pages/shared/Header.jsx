/* eslint-disable */
/* eslint-disable no-console */

import { useState } from "react";
import '../styles/Header.scss';

import { MenuOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
//import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

// const items: MenuProps['items'] = [
//     {
//         key: '1',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="#">
//                 My Profile
//             </a>
//         ),
//         icon: <UserOutlined />,
//     },
//     {
//         key: '2',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="#">
//                 Settings
//             </a>
//         ),
//         icon: <SmileOutlined />,
//     },
// ];

function Header() {

    return (
        <div className='top-header'>
            <header>
                <div className='LogoName'>Legal AI</div>

                <div className='profile-manu'>
                    <a href='/Settings' className='userprofile'>
                        <UserOutlined />
                    </a>
                </div>

            </header>
        </div>
    )
}

export default Header