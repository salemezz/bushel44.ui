import React, { Component } from 'react'
import {
    Title, Media,
    MediaContent, Columns,
    Column, Card, CardContent, Container
} from 'bloomer';
import { Link } from 'react-router-dom'

import { Image, CloudinaryContext } from 'cloudinary-react';
import withRouter from '../../../node_modules/react-router-dom/withRouter';
import $ from 'jquery'


class Search extends Component {

    state = {
        clean: true,
        searchTerm: this.props.location.search.split("=")[1],
        searchResults: [],
        loading: false,
        notificationVisible: false,
        error: '',
        hideResult: true
    }

    componentDidMount() {
        this.setState({ ...this.state, loading: true })
        this.setState({ ...this.state, hideResult: false })

        $.ajax({
            method: "POST",
            url: "https://herballist-api.herokuapp.com/api/search",
            data:
                JSON.stringify({
                    searchTerm: this.state.searchTerm,
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                this.state.searchResults = data
                this.setState({ ...this.state, loading: false })
                this.setState({ ...this.state, hideResult: false })
                // this.props.history.push('/login')
            })

            .catch(err => {
                console.log('fail1')
                this.setState({
                    ...this.state,
                    loading: false,
                    error: err.message,
                    notificationVisible: true,
                    hideResult: false
                })
            })
    }
    // authenticate(this.state.username, this.state.password)
    // .then(()=>{
    //     this.props.history.push('/login')
    // })
    // .catch(err=>{
    //     this.setState({
    //         ...this.state, 
    //         loading: false,
    //         error: err,
    //         notificationVisible: true
    //     })
    // })
    //}

    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
        return (
            <Container>
                <Title style={{ textAlign: 'center', fontSize: 'calc(20px + 2vw)' }}>Results</Title>
                <Columns>
                    <Column isSize={6} isOffset={3}>
                        <Card>
                            <CardContent>
                            {this.state.searchResults.map((searchResult) => {
                                    console.log('image ' + searchResult.productName)
                                    return (
                                        <Media>
                                            <MediaContent>
                                                <CloudinaryContext>
                                                    <Title style={{ textAlign: 'center', fontSize: 'calc(8px + 2vw)' }}>{`${searchResult.productName}`}</Title>            
                                                    <Image onClick={this.toggleModal} style={{ width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={searchResult.image}>
                                                    </Image>
                                                    {/* <Modal isActive={this.state.is_active}>
                                                        <ModalBackground />
                                                        <ModalContent>
                                                            <Image style={{ width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={product.image}>
                                                            </Image>
                                                        </ModalContent>
                                                        <ModalClose onClick={this.toggleModal} />
                                                    </Modal> */}
                                                    <ul>
                                                        <li><b>Quantity:</b> {searchResult.stock} </li>
                                                        <li><b>Type:</b> {searchResult.type} </li>
                                                        <li><b>User: </b>
                                                            <Link to={{
                                                                pathname: '/users/' + searchResult.creatorId,
                                                                state: {
                                                                    profileUserID: searchResult.creatorId
                                                                }
                                                            }}>{searchResult.postedBy}</Link></li>
                                                        <li><b>Details:</b> {searchResult.details} </li>                                     
                                                    </ul>
                                                </CloudinaryContext>
                                            </MediaContent>
                                        </Media>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </Column>
                </Columns>
            </Container>
        )
    }
}


export default withRouter(Search)
