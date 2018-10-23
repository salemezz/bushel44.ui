import React, { Component } from 'react'
import { Box, Title, Columns, Column, Image, Container } from 'bloomer'
import './home.css'
import Background from '../../images/bushel44_homepage.png';


export default class Home extends Component {
    render() {
        return (
                <Container>
                         <Image style={{ maxWidth: '500px', width: 'auto', height: 'auto', padding: '25px', marginLeft: 'auto', marginRight: 'auto' }} src={Background} />
                </Container>
        )
    }
}