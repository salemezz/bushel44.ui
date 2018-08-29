import React, { Component } from 'react'
import { Box, Title, Columns, Column, Section, Image, Container, Subtitle } from 'bloomer'
// import {EasyForm} from '../../components/search/searchBox';
import './home.css'
import Background from '../../images/bushel44_homepage.png';


export default class Home extends Component {
    render() {
        return (
                <Container>
                         <Image style={{ width: 'auto', height: 'auto', margin: 'auto' }} src={Background} />
                    <Box>
                        <Columns>
                            <Column isSize={8} isOffset={2}>
                                <Title className='has-text-centered'>
                                    News to come!
                                </Title>
                            </Column>
                        </Columns>
                    </Box>
                </Container>
        )
    }
}