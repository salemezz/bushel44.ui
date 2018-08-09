import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SearchBox from '../searchBox/searchBox'
import {
    Navbar, Icon, NavbarEnd, NavbarBrand, NavbarItem, NavbarLink,
    NavbarMenu, NavbarStart, NavbarBurger, Title,
    NavbarDropdown, Button, Image, Label, Control, Input, FieldLabel
} from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                    <Button isColor='info' isOutlined>
                        <Link to='/login'>
                            Login
                        </Link>
                    </Button>
                </NavbarItem>
            </NavbarEnd>
        )
        if (checkIfAuthenticated()) {
            item = (
                <NavbarEnd>
                    <NavbarItem>{this.state.userData.username}</NavbarItem>
                    <NavbarItem>
                        <Button isColor='info' isOutlined onClick={this.handleLogOut}>Log Out</Button>
                    </NavbarItem>
                </NavbarEnd>
            )
        }
        return (
            <Navbar style={{ height: '100px', margin: '0px', padding: '0px'  }}>
                <NavbarBrand>
                    <Image style={{ width: '200px', height: 'auto', margin: 20, marginLeft: 25 }} src={logo} />
                    <NavbarItem>
                        <Link to='/'>
                            {
                                <NavbarItem className='title'>
                                    <Title className='mainTitle' hasTextAlign='centered' isSize={3}>Bushel 44</Title>
                                </NavbarItem>
                            }
                        </Link>
                    </NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
                    <NavbarStart style={{ float: '15px' }}>

                        {/* <NavbarItem hasDropdown isHoverable>
                            <NavbarLink>Views</NavbarLink>
                            <NavbarDropdown>
                                <NavbarItem>
                                    <Link to='/unprotected'>
                                        {'Unprotected View'}
                                        <Icon isSize='small' style={{ paddingLeft: '10px' }}>
                                            <FontAwesomeIcon icon={['fas', 'unlock']} />
                                        </Icon>
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Link to='/protected'>
                                        {'Protected View'}
                                        <Icon isSize='small' style={{ paddingLeft: '10px' }}>
                                            <FontAwesomeIcon icon={['fas', 'lock']} />
                                        </Icon>
                                    </Link>
                                </NavbarItem>
                            </NavbarDropdown>
                        </NavbarItem> */}

                        <NavbarItem>
                            <SearchBox />
                        </NavbarItem>
                        <NavbarItem>
                            <Link to='/products'>
                                {<Title className='mainTitle' hasTextAlign='centered' isSize={6}>Products</Title>}
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to='/protected'>
                                {<Title className='mainTitle' hasTextAlign='centered' isSize={6}>Account</Title>}
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
