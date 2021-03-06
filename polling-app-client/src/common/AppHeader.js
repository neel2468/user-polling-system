import React, {Component } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import { Layout, Menu, Dropdown } from 'antd';
import  {CaretDownOutlined, HomeOutlined, UserOutlined}  from '@ant-design/icons';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        
        if(key === "logout") {
            
            this.props.onLogout();
        }
        if(key === "profile") {
            this.props.history.push(`/users/${this.props.currentUser.username}`);
        }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <HomeOutlined className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/poll/new">
                    <Link to="/poll/new">
                    <img src={pollIcon} alt="poll" className="poll-icon" />
                    </Link>
                </Menu.Item>,
              <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu 
                        currentUser={this.props.currentUser} 
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                  <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                  <Link to="/signup">Signup</Link>
                </Menu.Item>                  
            ];
        }

        return(
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Polling App</Link>
                    </div>
                    <Menu 
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                            {menuItems}
                        </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu className="profile-dropdown-menu" onClick={props.handleMenuClick}>
            <Menu.Item  key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item   key="profile" className="dropdown-item">
                Profile
            </Menu.Item>
            <Menu.Item  key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
                <a className="ant-dropdown-link" href="#">
                    <UserOutlined className="nav-icon" style={{marginRight: 0}}/>
                    <CaretDownOutlined/>
                </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);