import React, { Component } from 'react'
import {
    Notification, Delete, Container, CardHeaderTitle, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'
import { getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class EditView extends Component {

    // export default class UnprotectedView extends Component {
    state = {
        productName: '',
        stock: '',
        type: '',
        details: '',
        currentProductName: null,
        currentStock: null,
        currentType: null,
        currentDetails: null,
        myProducts: [],
        creatorId: getUserData().id,
        postedBy: getUserData().username,
        thisUser: getUserData().id,
        editingProduct: false,
        selectedFile: null,
        hideNewProductForm: false,
        selectedProduct: null,
        notificationVisible: false,
        error: ''
    }
    myReload = () => {
        // $.ajax({
        //     method: "GET",
        //     url: "/api/products/3",
 
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then((data) => {
        //         console.log('2' + JSON.stringify(data))
        //         // this.setState({ ...this.state, 
        //         //     loading: false, 
        //         //     currentProductName: null,
        //         //     currentStock: null,
        //         //     currentType: null,
        //         //     currentDetails: null,
        //         // })
        //         this.setState({ ...this.state, loading: false })
        //         this.setState({ ...this.state, hideResult: false })
        //     })
        //     .catch(err => {
        //         console.log('fail1')
        //         this.setState({
        //             ...this.state,
        //             loading: false,
        //             error: err.message,
        //             notificationVisible: true,
        //             hideResult: false
        //         })
        //     })
    };

    componentDidMount() {
        this.myReload()
    }

    handleProductNameChange = event => {
        let productName = event.target.value
        this.setState({ ...this.state, clean: false, productName })
    }

    handleStockChange = event => {
        let stock = event.target.value
        this.setState({ ...this.state, clean: false, stock })
    }
    handleTypeChange = event => {
        let type = event.target.value
        this.setState({ ...this.state, clean: false, type })
    }

    handleDetailsChange = event => {
        let details = event.target.value
        this.setState({ ...this.state, clean: false, details })
    }

    fileChangedHandler = (event) => {
        // this.setState({ selectedFile: event.target.files[0] })
    }

    onItemsSelect = myProduct => {
        // let selectedProduct = JSON.stringify(myProduct.id)
        // // console.log('is' + selectedProduct) 
        // this.setState({ ...this.state, clean: false, selectedProduct})
        // console.log('state' + this.state.selectedProduct)
    }

    deleteProduct = myProduct => {
        this.setState({ ...this.state, loading: true })
        $.ajax({
            method: "DELETE",
            url: "https://bushel44.herokuapp.com/api/products/" + JSON.stringify(myProduct.id)
        })
            .catch(() => {
                this.setState({ ...this.state, loading: false })
                this.myReload()
            })
        // .catch(err => {
        //     console.log('test')
        //     this.setState({
        //          ...this.state,
        //         loading: false,
        //         error: err.message,
        //         notificationVisible: true
        //     })
        // })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    }

    handleSubmit = () => {
        console.log("check")
        console.log(this.state.hideNewProductForm)
        console.log(this.state.postedBy)
        this.setState({ ...this.state, loading: true })
        $.ajax({
            method: "PUT",
            url: "https://bushel44.herokuapp.com/api/products/3",
            data:
                JSON.stringify({
                    productName: this.state.productName,
                    stock: this.state.stock,
                    type: this.state.type,
                    details: this.state.details,
                    creatorId: this.state.creatorId,
                    postedBy: this.state.postedBy
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({ ...this.state, loading: false })
                this.setState({ ...this.state, hideNewProductForm: true })
            })
            .catch(err => {
                console.log('test')
                this.setState({
                    ...this.state,
                    loading: false,
                    error: err.message,
                    notificationVisible: true
                })
            })
    }

    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }


    render() {
        if (!this.state.hideNewProductForm) {
            return (
                <Container> 
                    <Columns isCentered>
                        <Column isSize={6}>
                            <Title isSize={6}>Edit Product</Title>
                            <Card>
                                <CardContent>
                                    <Field>
                                        <Label>Product Name</Label>
                                        <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Name' onKeyUp={this.handleProductNameChange} />
                                        </Control>
                                        {/* <Help isHidden={this.state.productName !== '' || this.state.clean} isColor='danger'>Invalid Username</Help> */}
                                    </Field>
                                    <Field>
                                        <Label>Stock (lb)</Label>
                                        <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Stock' onKeyUp={this.handleStockChange} />
                                        </Control>
                                        {/* <Help isHidden={this.state.quantity !== '' || this.state.clean} isColor='danger'>Invalid Password</Help> */}
                                    </Field>
                                    <Field>
                                        <Label>Product Type</Label>
                                        {/* <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Type' onKeyUp={this.handleTypeChange} />
                                        </Control> */}
                                        <Control onChange={this.handleTypeChange}>
                                            <Select>
                                                <option>Select Product Type...</option>
                                                <option>Flower</option>
                                                <option>Oil</option>
                                                <option>Editable</option>
                                                {/* <input type='submit' onChange={this.handleTypeChange}/> */}
                                            </Select>
                                        </Control>
                                    </Field>
                                    <Field>
                                        <Label>Details</Label>
                                        <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Details' onKeyUp={this.handleDetailsChange} />
                                        </Control>
                                    </Field>
                                    <Field>
                                        <Input type="file" onChange={this.fileChangedHandler} />
                                        <Button onClick={this.uploadHandler}>Upload!</Button>
                                    </Field>
                                    <Button disabled={(this.state.productName === '' || this.state.quantity === '')} isColor='info' isOutlined onClick={this.handleSubmit}>Submit</Button>
                                </CardContent>
                            </Card>
                        </Column>
                        <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                            {this.state.error}
                            <Delete onClick={this.hideNotification} />
                        </Notification>
                      

                    </Columns>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Box>
                        <Title>Product Posted!</Title>
                    </Box>
                </Container>
            )
        } 
    }
}

export default withRouter(EditView)