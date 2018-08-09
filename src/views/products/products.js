import React, { Component } from 'react'
import {
    Box, Title, CardHeader, Media, MediaLeft, Label, MediaRight,
    MediaContent, Subtitle, CardHeaderTitle, Columns, Image,
    Column, Card, CardContent, Container, Notification, Delete, Control
} from 'bloomer';
import { Link, withRouter } from 'react-router-dom'
import { getUserData } from '../../libraries/authentication'



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
                        <Column isSize={8} isOffset={2}>
                            <Card>
                                <CardContent>
                                    {this.state.products.map((product) => {
                                        return (
                                            <Media key={product.toString()}>

                                                {/* <MediaLeft>
                                                    <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
                                                </MediaLeft> */}
                                                <MediaContent>
                                                    <Title isSize={4}>{`${product.productName}`}</Title>
                                                    <Label>                                                                              
                                                        <p>User:  
                                                       <Link to={{
                                                            pathname: '/users/' + product.creatorId
                                                        }}>{product.postedBy}</Link></p>
                                                        <p>Quantity:{product.stock} </p>
                                                        <p>Details: {product.details} </p>
                                                    </Label>
                                                </MediaContent>
                                                <MediaRight>
                                                    <Image isSize='300x150' src='http://via.placeholder.com/350x150' />
                                                </MediaRight>
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