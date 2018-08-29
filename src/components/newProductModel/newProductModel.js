import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Notification, Delete, ModalCardHeader, ModalCardBody, Container, ModalCardFooter, ModalCard, Select,
    ModalCardTitle, TextArea, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'
import $ from 'jquery'

class newProductModel extends Component {

handleProductNameChange = event => {
    event.preventDefault();
    let productName = event.target.value
    this.setState({ ...this.state, clean: false, productName })
}

handleStockChange = event => {
    event.preventDefault();
    let stock = event.target.value
    this.setState({ ...this.state, clean: false, stock })
}
handleTypeChange = event => {
    event.preventDefault();
    let type = event.target.value
    this.setState({ ...this.state, clean: false, type })
}

handleDetailsChange = event => {
    event.preventDefault();
    let details = event.target.value
    this.setState({ ...this.state, clean: false, details })
}

fileChangedHandler = (event) => {
    event.preventDefault();
    this.setState({ selectedFile: event.target.files[0] })
}


componentDidMount() {
    console.log('props' + this.props.loading)
}


handleSubmit = (event) => {
    this.props.loadingTrue()
    event.preventDefault();

    const data = new FormData();
    data.append('image', this.state.selectedFile);
    data.append('productName', this.state.productName);
    data.append('stock', this.state.stock);
    data.append('type', this.state.type);
    data.append('details', this.state.details);
    data.append('creatorId', this.props.creatorId);
    data.append('postedBy', this.props.postedBy);

    fetch('https://bushel44.herokuapp.com/api/products', {
        method: 'POST',
        body: data,
    }).then(() => {
        this.props.myReload()
        this.props.loadingFalse()
    }).then(() => {
        window.location.reload()
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

render() {
    return (
        <ModalCard>
            <ModalCardHeader>
                <ModalCardTitle>New Product</ModalCardTitle>
                <Delete onClick={this.props.toggleNewModal} />
            </ModalCardHeader>
            <ModalCardBody>
                <Field>
                    <Label>Product Name</Label>
                    <Control hasIcons='left'>
                        <Input isColor='info' placeholder='Name' onKeyUp={this.handleProductNameChange} />
                    </Control>
                    {/* <Help isHidden={this.state.productName !== '' || this.state.clean} isColor='danger'>Invalid Username</Help> */}
                </Field>
                <Field>
                    <Label>Stock</Label>
                    <Control hasIcons='left'>
                        <Input isColor='info' placeholder='Stock' onKeyUp={this.handleStockChange} />
                        <p style={{fontSize: '9pt'}}>*Unit decided upon product type selection.</p>
                    </Control>
                    {/* <Help isHidden={this.state.quantity !== '' || this.state.clean} isColor='danger'>Invalid Password</Help> */}
                </Field>
                <Field>
                    <Label>Product Type</Label>
                    <Control onChange={this.handleTypeChange}>
                        <Select>
                            <option>Select Product Type...</option>
                            <option>Flower (lb) </option>
                            <option>Oil (pc.)</option>
                            <option>Editable (pc.)</option>
                        </Select>
                    </Control>
                </Field>
                <Field>
                    <Label>Details</Label>
                    <Control hasIcons='left'>
                        <TextArea placeholder='Details' onKeyUp={this.handleDetailsChange} />
                    </Control>
                </Field>
                <Field>
                    <Input type="file" onChange={this.fileChangedHandler} />
                </Field>
            </ModalCardBody>
            <ModalCardFooter>
                <Button onClick={(event) => { this.handleSubmit(event); this.props.toggleNewModal(); }} isColor='success'>Submit</Button>
            </ModalCardFooter>
        </ModalCard>
    )
}
}
export default newProductModel;