import React, { Component } from 'react';
import {
    Notification, Delete, Container, CardContent,
    Card, Columns, Column, Label,
    Title, Media, MediaContent, Subtitle
} from 'bloomer'
import withRouter from '../../../node_modules/react-router-dom/withRouter';
import { CloudinaryContext, Image } from 'cloudinary-react';
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
        fetch('https://herballist-api.herokuapp.com/api/users/' + profileUserID)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ...this.state,
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
            method: "POST",
            url: "https://herballist-api.herokuapp.com/api/myProducts",
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
                        <Card style={{ backgroundColor: '#FCFCFC', border: ".75px solid black" }}>
                            <CardContent>
                                <Title isSize={4}>{this.state.username}</Title>
                                <Label>
                                    <Subtitle isSize={6}><b>Email:</b> {this.state.email} <br />
                                        <b>Business:</b> {this.state.businessName} </Subtitle>
                                </Label>
                            </CardContent>
                        </Card>
                    </Column>
                </Columns>
                <Columns isCentered>
                    <Column isSize={6}>
                        <Title style={{ textAlign: 'center', fontSize: 'calc(8px + 1.5vw)' }} isSize={6}>{this.state.username}'s Products</Title>
                        <Card style={{ backgroundColor: '#FCFCFC', border: ".75px solid black" }}>
                            <CardContent>
                                {this.state.userProducts.map((userProduct) => {
                                    console.log('image ' + userProduct.productName)
                                    return (
                                        <Media>
                                            <MediaContent>
                                                <Title style={{ textAlign: 'center', fontSize: 'calc(8px + 2vw)' }}>{`${userProduct.productName}`}</Title>
                                                <CloudinaryContext style={{ textAlign: 'center' }}>
                                                    <Image onClick={this.toggleModal} style={{ width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={userProduct.image}>
                                                    </Image>
                                                </CloudinaryContext>
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