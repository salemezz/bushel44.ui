import React, { Component } from 'react'
import {
    Notification, Delete, ModalCardHeader, ModalCardBody, ModalCardFooter, ModalCard, Select,
    ModalCardTitle, TextArea, Button, Field, Label, Control, Input,
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
            photoUploading: false,
            selectedFile: null,
            productName: null,
            productStateLoaded: false
        }
    }

    componentWillReceiveProps() {
        console.log('https://herballist.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)

        fetch('https://herballist.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct)
            //.then(response => response.json())
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

    handlePhotoEdit = () => {
        this.setState({ ...this.state, photoUploading: true })
        const data = new FormData();
        data.append('image', this.state.selectedFile);
        fetch('https://herballist.herokuapp.com/api/products/' + this.props.protectedState.selectedProduct + '/imageUpload', {
            method: 'PUT',
            body: data,
        })
            .then(() => {
                this.setState({ ...this.state, photoUploading: false })
            })
            .catch(err => {
                console.log('test')
                this.setState({
                    ...this.state,
                    loading: false,
                    error: err.message,
                    notificationVisible: true
                })
            });
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.props.loadingTrue()
        $.ajax({
            method: "PUT",
            url: "https://herballist.herokuapp.com/api/products/" + this.props.protectedState.selectedProduct,
            data: JSON.stringify({
                productName: this.state.productName,
                stock: this.state.stock,
                type: this.state.type,
                details: this.state.details
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.props.loadingFalse()
        }).then(() => {
            window.location.reload()
        })
            .catch(err => {
                console.log('test')
                this.setState({
                    ...this.state,
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

    fileChangedHandler = (event) => {
        event.preventDefault();
        this.setState({ selectedFile: event.target.files[0] })
    }

    render() {
        return (
            <ModalCard>
                <ModalCardHeader>
                    <ModalCardTitle>Edit Product</ModalCardTitle>
                    <Delete onClick={this.props.toggleModal} />
                </ModalCardHeader>
                <ModalCardBody>
                    {/* <Title isSize={6}>Edit Product</Title> */}
                    <Field>
                        <Label>Product Name</Label>
                        <Control hasIcons='left'>
                            <Input isColor='info' placeholder={this.state.productName} onKeyUp={this.handleProductNameEdit} />
                        </Control>
                        {/* <Help isHidden={this.state.productName !== '' || this.state.clean} isColor='danger'>Invalid Username</Help> */}
                    </Field>
                    <Field>
                        <Label>Stock</Label>
                        <Control hasIcons='left'>
                            <Input isColor='info' placeholder={this.state.stock} onKeyUp={this.handleStockEdit} />
                            <p style={{fontSize: '9pt'}}>*Unit decided upon product type selection.</p>
                        </Control>
                        {/* <Help isHidden={this.state.quantity !== '' || this.state.clean} isColor='danger'>Invalid Password</Help> */}
                    </Field>
                    <Field>
                        <Label>Product Type</Label>
                        <Control onChange={this.handleTypeEdit}>
                            <Select>
                            <option>Select Product Type...</option>
                            <option>Dried Loose Leaf/Flower (lb) </option>
                            <option>Essential oil (pc.)</option>
                            </Select>
                        </Control>
                    </Field>
                    <Field>
                        <Label>Details</Label>
                        <Control hasIcons='left'>
                            <TextArea isColor='info' placeholder={this.state.details} onKeyUp={this.handleDetailsEdit} />
                        </Control>
                    </Field>
                    <Field>
                        <Input type="file" onChange={this.fileChangedHandler} />
                        <Button isColor='info' style={{ marginTop: '10px' }} isLoading={this.state.photoUploading} onClick={this.handlePhotoEdit}>Upload!</Button>
                    </Field>
                    <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                        {this.state.error}
                        <Delete onClick={this.hideNotification} />
                    </Notification>
                </ModalCardBody>
                <ModalCardFooter>
                    <Button onClick={(event) => { this.handleEdit(event); this.props.toggleModal(); }} isColor='success'>Save</Button>
                </ModalCardFooter>
            </ModalCard>
        )
    }
}
export default EditView;
