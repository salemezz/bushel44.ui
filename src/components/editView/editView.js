import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Notification, Delete, ModalCardHeader, ModalCardBody, ModalCardFooter, ModalCard, Select,
    ModalCardTitle, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'
import $ from 'jquery'

class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            stock: '',
            type: '',
            details: '',
            productName: null,
            productStateLoaded: false
        }
    }

    componentWillReceiveProps() {
        console.log('https://bushel44.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)

        fetch('https://bushel44.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + JSON.stringify(data.productName))
                this.setState({
                    ...this.state,
                    productName: data.productName,
                    stock: data.stock,
                    type: data.type,
                    details: data.details
                })
            })
    }

    handleEdit = () => {
        console.log('state ' + JSON.stringify(this.state))

        this.setState({ ...this.state, loading: true })

        console.log('new ' + this.state.productName)
        $.ajax({
            method: "PUT",
            url: "https://bushel44.herokuapp.com/api/products/" + this.props.protectedState.selectedProduct,
            data: JSON.stringify({
                productName: this.state.productName,
                stock: this.state.stock,
                type: this.state.type,
                details: this.state.details
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
                    // notificationVisible: true
                })
            })
    }

    handleProductNameEdit = event => {
        event.preventDefault();
        let productName = event.target.value
        this.setState({ ...this.state, clean: false, productName: productName })
        console.log(this.state.productName)
    }

    handleStockEdit = event => {
        event.preventDefault();
        let stock = event.target.value
        this.setState({ ...this.state, clean: false, stock: stock })
    }
    handleTypeEdit = event => {
        event.preventDefault();
        let type = event.target.value
        this.setState({ ...this.state, clean: false, type: type })
    }

    handleDetailsEdit = event => {
        event.preventDefault();
        let details = event.target.value
        this.setState({ ...this.state, clean: false, details: details })
        console.log(this.state.details)
    }

    render() {
        return (          
            <ModalCard>
                <ModalCardHeader>
                    <ModalCardTitle>ModalCard Title</ModalCardTitle>
                    <Delete onClick={this.props.toggleModal} />
                </ModalCardHeader>
                <ModalCardBody>
                    {/* <Title isSize={6}>Edit Product</Title> */}
                    <Field>
                        <Label>Product Name</Label>
                        <Control hasIcons='left'>
                            <Input isColor='info' placeholder={this.state.productName} onKeyUp={this.handleProductNameEdit.bind(this)} />
                        </Control>
                        {/* <Help isHidden={this.state.productName !== '' || this.state.clean} isColor='danger'>Invalid Username</Help> */}
                    </Field>
                    <Field>
                        <Label>Stock (lb)</Label>
                        <Control hasIcons='left'>
                            <Input isColor='info' placeholder={this.state.stock} onKeyUp={this.handleStockEdit.bind(this)} />
                        </Control>
                        {/* <Help isHidden={this.state.quantity !== '' || this.state.clean} isColor='danger'>Invalid Password</Help> */}
                    </Field>
                    <Field>
                        <Label>Product Type</Label>
                        {/* <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Type' onKeyUp={this.handleTypeChange} />
                                        </Control> */}
                        <Control onChange={this.handleTypeEdit.bind(this)}>
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
                            <Input isColor='info' placeholder={this.state.details} onKeyUp={this.handleDetailsEdit.bind(this)} />
                        </Control>
                    </Field>
                    <Field>
                        <Input type="file" onChange={this.fileChangedHandler} />
                        <Button onClick={this.uploadHandler}>Upload!</Button>
                    </Field>
                    <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                        {this.state.error}
                        <Delete onClick={this.hideNotification} />
                    </Notification>
                </ModalCardBody>
                <ModalCardFooter>
                    <Button onClick={() => { this.handleEdit(); this.props.toggleModal(); }} isColor='success'>Save</Button>
                    {/* <Button onClick={this.props.toggleModal} isColor='warning'>Cancel</Button> */}
                </ModalCardFooter>
            </ModalCard>
        )
    }
}
export default EditView;
