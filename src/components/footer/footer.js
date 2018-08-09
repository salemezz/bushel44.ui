import React from 'react'
import {Footer, Container, Content, Column, Columns} from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
    <Footer id='footer'>
        <Container>
            <Content>
                <Columns>
                    <Column isFull>
                        <p>
                            Example by Joshua Pinos
                        </p>
                    </Column>
                </Columns>
                <Content isSize='medium'>
                    <a href='https://github.com/pinosjxp/FSAExamples'>
                        <FontAwesomeIcon icon={['fab','github']}/>
                        {' Github'}
                    </a>
                </Content>
            </Content>
        </Container>
    </Footer>
)