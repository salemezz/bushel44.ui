import React, { Component } from 'react'
import {
    Box, Title, Modal, Media, ModalBackground, ModalContent, ModalClose,
    MediaContent, Columns, Column, Card, CardContent, Container,
} from 'bloomer';
import { Link, withRouter } from 'react-router-dom'
import { getUserData } from '../../libraries/authentication'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';


export default class Products extends Component {
    state = {
        products: [],
        selectedProduct: null,
        notificationVisible: false,
        is_active: false,
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

    toggleModal = () => {
        if (!this.state.is_active) {
            this.setState({ ...this.state, is_active: true })
        } else {
            this.setState({ ...this.state, is_active: false })
        }
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
                <Title style={{ textAlign: 'center', fontSize: 'calc(10px + 2vw)'  }}>Products</Title>
                <Columns>
                    <Column isSize={6} isOffset={3}>
                        <Card>
                            <CardContent>
                                {this.state.products.map((product) => {
                                    console.log('image ' + product.productName)
                                    return (
                                        <Media>
                                            <MediaContent>
                                                <CloudinaryContext>
                                                    <Title style={{ textAlign: 'center', fontSize: 'calc(8px + 2vw)' }}>{`${product.productName}`}</Title>            
                                                    <Image onClick={this.toggleModal} style={{ width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={product.image}>
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