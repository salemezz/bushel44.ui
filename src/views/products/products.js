import React, { Component } from 'react'
import {
    Box, Title, Modal, Media, ModalBackground, Icon, FontAwesomeIcon,
    MediaContent, Subtitle, CardHeaderTitle, Columns,
    Column, Card, CardContent, Container, Notification, Delete, Control
} from 'bloomer';
import { Link, withRouter } from 'react-router-dom'
import { getUserData } from '../../libraries/authentication'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';



export default class Products extends Component {
    state = {
        products: [],
        selectedProduct: null,
        notificationVisible: false,
        error: ''
    }

    componentDidMount() {
        fetch('https://bushel44.herokuapp.com/api/products')
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + data);
                this.setState({ ...this.state, products: data })
                console.log(this.state.products[0].creatorId)
            })
            .then(console.log(`products: ${this.state.products}`))
            .catch(err => {
                this.setState({
                    ...this.state,
                    notificationVisible: false,
                    error: err
                })
            })
    }

    // componentDidMount(){
    //     fetch('/api/products')
    //     .then(response=>response.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({...this.state, products:data})
    //     })
    //     .then(console.log(`products: ${this.state.products}`))
    //     .catch(err=>{
    //         this.setState({
    //             ...this.state, 
    //             notificationVisible:false,
    //             error: err
    //         })
    //     })
    // }

    selectProduct = () => {

    }
    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }
    render() {
        return (
            <Container>
                <Box>
                    <Title>Products</Title>
                </Box>
                <Box>
                    <Columns>
                        <Column isSize={6} isOffset={3}>
                            <Card>
                                <CardContent>
                                    {this.state.products.map((product) => {
                                        return (
                                            <Media>
                                                    <MediaContent>
                                                        <Title isSize={4}>{`${product.productName}`}</Title>
                                                        <Image style={{ width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={product.image} >
                                                            {/* <Transformation width="300" height="100" crop="scale"/> */}
                                                        </Image>                                                      
                                                            <ul>
                                                                <li><b>Quantity:</b> {product.stock} </li>
                                                                <li><b>Type:</b> {product.type} </li>
                                                                <li><b>Details:</b> {product.details} </li>
                                                                <li><b>User: </b>  
                                                           <Link to={{
                                                                pathname: '/users/' + product.creatorId,
                                                                state: {
                                                                    profileUserID: product.creatorId
                                                                }
                                                            }}>{product.postedBy}</Link></li>
                                                            </ul>                                                     
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