import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SearchBox from '../searchBox/searchBox'
import {
    Navbar, NavbarEnd, NavbarBrand, NavbarItem,
    NavbarMenu, NavbarStart, NavbarBurger, Title,
    Button, Image,
} from 'bloomer'
import { getUserData, checkIfAuthenticated, deauthenticate } from '../../libraries/authentication'
import logo from '../../bushel.png'
import './navigation.css'

class Navigation extends Component {
    state = {
        isActive: false,
        userData: getUserData()
    }

    onClickNav = () => {
        this.setState({
            isActive: !this.state.isActive,
            userData: getUserData()
        })
    }

    handleLogOut = () => {
        deauthenticate()
            .then(() => {
                this.props.history.push('/')
            })
            .catch(err => {
                this.props.history.push('/')
            })
    }

    render() {
        let item = (
            <NavbarEnd>
                <NavbarItem>
                    <Button isColor='black' isOutlined>
                        <Link style={{ color: 'black' }} to='/login'>
                            Login
                        </Link>
                    </Button>
                </NavbarItem>
            </NavbarEnd>
        )
        if (checkIfAuthenticated()) {
            item = (
                <NavbarEnd>
                    <NavbarItem>
                        <Link to='/protected'>
                            <Title hasTextAlign='centered' isSize={6}>{this.state.userData.username}</Title>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button isColor='black' isOutlined onClick={this.handleLogOut}>Log Out</Button>
                    </NavbarItem>
                </NavbarEnd>
            )
        }
        return (
            <Navbar className="navbar">
                <NavbarBrand style={{ backgroundColor: 'rgba(113, 219, 80, 1)' }}>
                        <Link to='/'>
                            {
                                <Image className="logo" src={logo} />
                            }
                        </Link>
                    <NavbarItem>
                        <Link to='/'>
                            {
                                <NavbarItem className='title'>
                                    <Title className='mainTitle' hasTextAlign='centered' style={{ fontSize: 'calc(14px + 1vw)' }}>Bushel 44</Title>
                                </NavbarItem>
                            }
                        </Link>
                    </NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu style={{ backgroundColor: 'rgba(113, 219, 80, 1)' }} isActive={this.state.isActive} >
                    <NavbarStart style={{ float: '15px' }}>
                        <NavbarItem>
                            <SearchBox />
                        </NavbarItem>
                        <NavbarItem>
                            <Link to='/products'>
                                {<Title className='mainTitle' hasTextAlign='centered' isSize={6}>Products</Title>}
                            </Link>
                        </NavbarItem>
                    </NavbarStart>
                    {item}
                </NavbarMenu>
            </Navbar >
        )
    }
}

const NavigationWithRouter = withRouter(Navigation)
export default NavigationWithRouter
