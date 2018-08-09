import React, {Component} from 'react'
import { Box, Title, Columns, Column, Card, CardContent, Container, Subtitle } from 'bloomer'
// import {EasyForm} from '../../components/search/searchBox';

export default class Home extends Component{
    render(){
        return (
            <Container>
                <Box>
                    <Title>Home</Title>
                </Box>
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