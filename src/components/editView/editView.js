import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Notification, Delete, Container, ModalCardBody, ModalCardFooter, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'
import $ from 'jquery'


// export function handleEditE(){
//     console.log(this.state.hideNewProductForm)
//     console.log(this.state.postedBy)
//     this.setState({ ...this.state, loading: true })
//     this.setState({ ...this.state, 
//         productToBeEdited: {
//             productName: this.state.productName,
//             stock: this.state.stock,
//             type: this.state.type,
//         } 
//     })
//     console.log('new ' + this.state.productToBeEdited)
// }


class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // count: this.props.count,
            productToBeEdited: {},
            productName: null,
        }
    }



    componentWillReceiveProps() {
        console.log('https://bushel44.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)

        fetch('https://bushel44.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)
            .then(response => response.json())
            .then(data => {
                console.log('data: ' + JSON.stringify(data.productName))
                // this.setState({ ...this.state, products: data })
                // this.state.productToBeEdited = data    
                this.setState({ ...this.state, productToBeEdited: data })
                console.log('data1: ' + JSON.stringify(this.state.productToBeEdited))
            })
        // fetch('https://bushel44.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)
        // .then(response => response.json())
        // .then(data => {
        //     console.log('data: ' + data);
        //     this.setState({ ...this.state, productToBeEdited: data })
        //     // console.log(this.state.products[0].creatorId)
        // })
        // .then(console.log(`products: ${this.state.productToBeEdited}`))
        // .catch(err => {
        //     this.setState({
        //         ...this.state,
        //         notificationVisible: false,
        //         error: err
        //     })
        // })
    }

    handleEdit = () => {
        console.log('state ' + JSON.stringify(this.state.productToBeEdited))
        // console.log(this.state.hideNewProductForm)
        // console.log(this.state.postedBy)
        // this.setState({ ...this.state, loading: true })
        this.setState({ ...this.state,
            productToBeEdited: {
                productName: this.state.productName,
                stock: this.state.stock,
                type: this.state.type,
                details: this.state.details,
                image: null
            } 
        })
        console.log('new ' + this.state.productToBeEdited.productName)
        $.ajax({
            method: "PUT",
            url: "https://bushel44.herokuapp.com/api/products/" + this.props.protectedState.selectedProduct,
            data: {productName: JSON.stringify(this.state.productToBeEdited.productName)},
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            console.log('spss' + this.state.productName)
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

    handleProductNameEdit = event => {
        let productName = event.target.value
        if (productName === '') {
            event.preventDefault();
        } else {
            this.setState({ ...this.state, clean: false, productName })
        }        
    }

    handleStockEdit = event => {
        let stock = event.target.value
        if (stock === '') {
            event.preventDefault();
        } else {
            this.setState({ ...this.state, clean: false, stock })
        }   
    }
    handleTypeEdit = event => {
        let type = event.target.value
        console.log(type)
        if (type === 'Select Product Type...') {
            event.preventDefault();
        } else {
            this.setState({ ...this.state, clean: false, type })
        }   
    }

    handleDetailsEdit = event => {
        let details = event.target.value
        if (details === '') {
            event.preventDefault();
        } else {
            this.setState({ ...this.state, clean: false, details })
        }   
    }
    // increament(){
    //   console.log("this.props.count");

    //   console.log(this.props.count);
    //   let count = this.state.count
    //   count.push("new element");
    //   this.setState({ count: count})
    // }

    render() {
        return (
            <ModalCardBody>
                {/* <Title isSize={6}>Edit Product</Title> */}
                <Field>
                    <Label>Product Name</Label>
                    <Control hasIcons='left'>
                        <Input isColor='info' placeholder={this.state.productToBeEdited.productName} onKeyUp={this.handleProductNameEdit} />
                    </Control>
                    {/* <Help isHidden={this.state.productName !== '' || this.state.clean} isColor='danger'>Invalid Username</Help> */}
                </Field>
                <Field>
                    <Label>Stock (lb)</Label>
                    <Control hasIcons='left'>
                        <Input isColor='info' placeholder={this.state.productToBeEdited.stock} onKeyUp={this.handleStockEdit} />
                    </Control>
                    {/* <Help isHidden={this.state.quantity !== '' || this.state.clean} isColor='danger'>Invalid Password</Help> */}
                </Field>
                <Field>
                    <Label>Product Type</Label>
                    {/* <Control hasIcons='left'>
                                            <Input isColor='info' placeholder='Type' onKeyUp={this.handleTypeChange} />
                                        </Control> */}
                    <Control onChange={this.handleTypeEdit}>
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
                        <Input isColor='info' placeholder={this.state.productToBeEdited.details} onKeyUp={this.handleDetailsEdit} />
                    </Control>
                </Field>
                <Field>
                    <Input type="file" onChange={this.fileChangedHandler} />
                    <Button onClick={this.uploadHandler}>Upload!</Button>
                </Field>
                <Button disabled={(this.state.productName === '' || this.state.quantity === '')} isColor='info' isOutlined onClick={this.handleSubmit}>Submit</Button>
                <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                    {this.state.error}
                    <Delete onClick={this.hideNotification} />
                </Notification>
                <Button onClick={this.handleEdit} isColor='success'>Save</Button>
                <Button onClick={this.props.toggleModal} isColor='warning'>Cancel</Button>
            </ModalCardBody>
        )
    }
}
export default EditView;