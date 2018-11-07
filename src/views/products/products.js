import React, { Component } from 'react'
import {
    Title, Media, MediaContent, Columns, Modal,
    Column, Card, CardContent, Container, ModalBackground
} from 'bloomer';
import { Link } from 'react-router-dom'
import { CloudinaryContext, Image } from 'cloudinary-react';
import { ClipLoader } from 'react-spinners';


var override = {
    display: 'block',
    margin: '0 auto',
};

export default class Products extends Component {
    state = {
        products: [],
        selectedProduct: null,
        notificationVisible: false,
        is_active: false,
        loading: false,
        error: ''
    }

    myReload = () => {
        console.log('loading ' + this.state.loading)
        this.setState({ ...this.state, loading: true })
        fetch('https://bushel44.herokuapp.com/api/products')
            // .then()
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + data);
                this.setState({ ...this.state, products: data })
     
                console.log(this.state.products[0].creatorId)
            })
            .then(console.log('loading ' + this.state.loading))
            .catch(err => {
                this.setState({
                    ...this.state,
                    notificationVisible: false,
                    error: err
                })
            })
        this.setState({ ...this.state, loading: false })
    }

    componentDidMount() {
        this.myReload();
    }

    toggleModal = (product) => {
        if (!this.state.is_active) {
            this.setState({ ...this.state, is_active: true })
        } else {
            this.setState({ ...this.state, is_active: false })
        }
    }

    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
        return (
            <Container>
                <Title style={{ textAlign: 'center', fontSize: 'calc(10px + 2vw)' }}>Products</Title>
                <Columns>
                <Modal isActive={this.state.loading}>
                    <ModalBackground />
                    <div className='sweet-loading'>
                        <ClipLoader
                            className={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>
                </Modal>
                    <Column isSize={6} isOffset={3}>
                        <Card style={{ backgroundColor: 'rgba(113, 219, 80, .8)', border: ".75px solid black" }} >
                            <CardContent>
                                {this.state.products.map((product) => {
                                    console.log('image ' + product.productName)
                                    return (
                                        <Media>
                                            <MediaContent>
                                                <CloudinaryContext>
                                                    <Title style={{ textAlign: 'center', fontSize: 'calc(8px + 2vw)' }}>{`${product.productName}`}</Title>
                                                    <Image onClick={this.toggleModal} style={{ border: ".5px solid black", width: "auto", maxHeight: "auto" }} cloudName="dozenuld4" secure="true" publicId={product.image}>
                                                    </Image>
                                                    <ul>
                                                        <li><b>Quantity:</b> {product.stock} </li>
                                                        <li><b>Type:</b> {product.type} </li>
                                                        <li><b>User: </b>
                                                            <Link to={{
                                                                pathname: '/users/' + product.creatorId,
                                                                state: {
                                                                profileUserID: product.creatorId
                                                                }
                                                            }}>{product.postedBy}</Link></li>
                                                        <li><b>Details:</b> {product.details} </li>
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