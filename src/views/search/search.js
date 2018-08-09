import React, { Component } from 'react'
import {
    Box, Title, Field, Media, Control, Input,
    MediaContent, Subtitle, Button, Columns,
    Column, Card, CardContent, Container, Notification, Delete
} from 'bloomer';

import withRouter from '../../../node_modules/react-router-dom/withRouter';
import SearchResults from './searchResults';
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

    // handleSearchChange = event => {
    //     let searchTerm = event.target.value
    //     this.setState({ ...this.state, clean: false, searchTerm: searchTerm })
    //     console.log(this.state.searchTerm)
    // }

    componentDidMount(){
        this.setState({ ...this.state, loading: true })
        this.setState({ ...this.state, hideResult: false })
        //  console.log(this.state.searchTerm);
        //  console.log(this.state.loading);
        // console.log("hide result", this.state.hideResult);

        $.ajax({
            method: "POST",
            url: "https://bushel44.herokuapp.com/api/search",
            data:
                JSON.stringify({
                    searchTerm: this.state.searchTerm,
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                // console.log('test1')
                console.log(this.state.searchResults)
                console.log(this.props.location.search.split("=")[1])
                console.log(this.state.searchTerm)
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
        console.log('term:' + this.state.searchTerm);
        console.log('test');
        console.log(this.props);
            return (
                <Container>
                        <Box>
                            <Title>Results</Title>
                        </Box>
                        <Box>
                            <Columns>
                                <Column isSize={8} isOffset={2}>
                                    <Card>
                                        <CardContent>
                                            {this.state.searchResults.map(searchResult => {
                                                return (
                                                    <Media>
                                                        <MediaContent>
                                                            <Title isSize={4}>{`${searchResult.productName}`}</Title>
                                                            <Subtitle isSize={6}><b>Details:</b> {searchResult.details}</Subtitle>
                                                            <Subtitle isSize={6}><b>Quantity:</b> {searchResult.stock}</Subtitle>
                                                        </MediaContent>
                                                    </Media>
                                                )
                                            })}
                                        </CardContent>
                                    </Card>
                                </Column>
                            </Columns>
                        </Box>
                    </Container>
            )
        }
    }


export default withRouter(Search)
