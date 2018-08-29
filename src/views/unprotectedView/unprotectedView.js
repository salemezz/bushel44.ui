import React, { Component } from 'react';
import {
    Notification, Delete, Container, CardHeaderTitle, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight,
} from 'bloomer'
import withRouter from '../../../node_modules/react-router-dom/withRouter';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import $ from 'jquery'

class UnprotectedView extends Component {
    // export default class UnprotectedView extends Component {
    state = {
        productName: '',
        userPageData: [],
        username: null,
        email: null,
        businessName: null,
        thisUser: null,
        userProducts: [],
        selectedFile: null,
        hideNewProductForm: false,
        notificationVisible: false,
        error: ''
    }

    myReload = () => {
        const { profileUserID } = this.props.location.state
        // console.log('l ' + this.props.location.state)
        console.log('v ' + profileUserID)
        fetch('https://bushel44.herokuapp.com/api/users/' + profileUserID)
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + JSON.stringify(data));
                console.log(this.state.userID);                
                this.setState({
                    ...this.state,
                    // userPageData: JSON.stringify(data)
                    username: data.username,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    businessName: data.business_name,
                    email: data.email,
                    userID: profileUserID
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    notificationVisible: false,
                    error: err
                })
            })

        $.ajax({
            method: "GET",
            url: "https://bushel44.herokuapp.com/api/myProducts",
            data:
                JSON.stringify({
                    thisUser: profileUserID
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                this.state.userProducts = data
                this.setState({ ...this.state, loading: false })
                this.setState({ ...this.state, hideResult: false })
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
    };

    componentDidMount() { 
        this.myReload()
    }


    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
            return (
                <Container>
                    <Columns isCentered>
                        <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                            {this.state.error}
                            <Delete onClick={this.hideNotification} />
                        </Notification>
                        <Column isSize={6}>    
                            <Card>
                                <CardContent>                   
                                    <Title isSize={4}>{this.state.username}</Title>
                                    <Label>
                                        <Subtitle isSize={6}><b>Email:</b> {this.state.email} <br/>
                                            <b>Business:</b> {this.state.businessName} </Subtitle>
                                    </Label>
                                </CardContent>
                            </Card>
                        </Column>

                    </Columns>
               
                    <Columns isCentered>
                        <Column isSize={6}>
                        <Title isSize={6}>{this.state.username}'s Products</Title>
                            <Card>
                                <CardContent>
                                {this.state.userProducts.map((userProduct) => {
                                            console.log(userProduct)
                                            return (
                                                <Media>
                                                    <MediaContent style={{ paddingLeft: "50px" }}>
                                                        <Title isSize={4}>{`${userProduct.productName}`}</Title>
                                                        <Image style={{ width: "auto", minHeight: "200px" }} cloudName="dozenuld4" secure="true" publicId={userProduct.image} >
                                                            {/* <Transformation width="300" height="100" crop="scale"/> */}
                                                        </Image>
                                                        <ul>
                                                            <li><b>Quantity:</b> {userProduct.stock} </li>
                                                            <li><b>Type:</b> {userProduct.type} </li>
                                                            <li><b>Details:</b> {userProduct.details} </li>
                                                        </ul>
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

export default withRouter(UnprotectedView)