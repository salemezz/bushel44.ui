import React, { Component } from 'react'
import { Box, Title } from 'bloomer'
import './home.css'


export default class Home extends Component {
    render() {
        return (
            <Box style={{ borderRadius: '0px', backgroundColor: '#FCFCFC' }} isSize='large'>
                {/* <Image style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: '10px' }} src={scale} />
                <Columns className="resp-container" isMobile isCentered>
                <div class="video-responsive">
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/oSiSUQYEXGw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                </Columns> */}
                <Title style={{ textAlign: 'center', fontSize: 'calc(10px + 2vw)' }}>more to come.</Title>
            </Box>
        )
    }
}