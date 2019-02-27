import './products.css'
import React, { Component } from 'react'
import {
    Title, Media, MediaContent, Columns, Modal,
    Column, Card, CardContent, Box, Container, ModalBackground
} from 'bloomer';
import { Link } from 'react-router-dom'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import LinesEllipsis from 'react-lines-ellipsis'
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
        fetch('https://herballist.herokuapp.com/api/products')
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

    toggleModal = () => {
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
                <Box style={{ borderRadius: '0px', backgroundColor: '#FCFCFC' }} isSize='large'>
                    <Title style={{ textAlign: 'center', fontSize: 'calc(10px + 2vw)' }}>Products</Title>
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
                    <Columns isMultiline>
                        {this.state.products.map((product) => {
                            return (
                                <Column isSize={3}>
                                    <Card id="cardDiv">
                                        <CardContent>
                                            <Media>
                                                <MediaContent>
                                                    <Title style={{ textAlign: 'center', fontSize: 'calc(12px + .4vw)' }}>{`${product.productName}`}</Title>
                                                    <CloudinaryContext style={{ textAlign: 'center' }} cloudName="dozenuld4" >
                                                        <Image publicId={product.image}>
                                                            <Transformation width="auto" height="180" gravtiy="center" crop="fill" />
                                                        </Image>
                                                    </CloudinaryContext>

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
                                                        <li>
                                                            <LinesEllipsis
                                                                text={product.details}
                                                                maxLine='10'
                                                                ellipsis='...'
                                                                trimRight
                                                                basedOn='letters'
                                                            />
                                                        </li>
                                                    </ul>
                                                </MediaContent>
                                            </Media>
                                        </CardContent>
                                    </Card>
                                </Column>
                            )
                        })}
                    </Columns>
                </Box>
            </Container >
        )
    }
}