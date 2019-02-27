import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SearchBox from '../searchBox/searchBox'
import {
    Navbar, NavbarEnd, NavbarBrand, NavbarItem,
    NavbarMenu, NavbarStart, NavbarBurger, Title,
    Button, Image, Container
} from 'bloomer'
import { getUserData, checkIfAuthenticated, deauthenticate } from '../../libraries/authentication'
import logo from '../../herballist.png'
import './navigation.css'
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';

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
                    <Button style={{ backgroundColor: '#9CCB66'}}  isOutlined>
                        <Link style={{ color: '#598254' }} to='/login'>
                            Login
                        </Link>
                    </Button>
                </NavbarItem>
            </NavbarEnd>
        )

        if (checkIfAuthenticated()) {
            item = (
                <NavbarEnd>
                    <NavbarItem style={{marginLeft: '50px' }}>
                        <Link to='/protected'>
                            <Title hasTextAlign='centered' isSize={6} style={{ color: 'white' }} >{this.state.userData.username}</Title>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button style={{ color: '#598254', backgroundColor: '#9CCB66'}} isOutlined onClick={this.handleLogOut}>Log Out</Button>
                    </NavbarItem>
                </NavbarEnd>
            )
        }

        let logolink = (
            <NavbarItem>
                <Link to='/'>
                    {
                        <Image className="logo" src={logo} />
                    }
                </Link>
            </NavbarItem>
        )
        return (

                <Navbar className="navbar is-fixed-top">
                    <NavbarBrand className="navbar-brand" style={{ backgroundColor: '#598254' }}>
                        {logolink}
                        <NavbarBurger isColor='white' isActive={this.state.isActive} onClick={this.onClickNav} />
                    </NavbarBrand>
                    <NavbarMenu style={{ backgroundColor: '#598254' }} isActive={this.state.isActive}>
                        <NavbarStart style={{ marginLeft: "auto"}}>
                            <NavbarItem>
                                <SearchBox />
                            </NavbarItem>
                            <NavbarItem>
                                <Link to='/products'>
                                    {<Title isSize={4} style={{ color: 'white' }} className='mainTitle' hasTextAlign='centered'>Products</Title>}
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                {item}
                            </NavbarItem>
                        </NavbarStart>
                    </NavbarMenu>
                </Navbar>
        )
    }
}

const NavigationWithRouter = withRouter(Navigation)
export default NavigationWithRouter
