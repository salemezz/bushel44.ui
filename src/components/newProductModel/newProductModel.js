import React, { Component } from 'react'
import {
    Delete, ModalCardHeader, ModalCardBody, ModalCardFooter, ModalCard, Select,
    ModalCardTitle, TextArea, Button, Field, Label, Control, Input,
} from 'bloomer'
import { getUserData } from '../../libraries/authentication'
import $ from 'jquery'

class newProductModel extends Component {
    state= {
        creatorId: getUserData().id,
        postedBy: getUserData().username
    }

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
    console.log('id ' + this.state.creatorId)
}


handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', this.state.selectedFile);
    data.append('productName', this.state.productName);
    data.append('stock', this.state.stock);
    data.append('type', this.state.type);
    data.append('details', this.state.details);
    data.append('creatorId', this.state.creatorId);
    data.append('postedBy', this.state.postedBy);

    fetch('https://herballist-api.herokuapp.com/api/products', {
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
                            <option>Dried Loose Leaf/Flower (lb) </option>
                            <option>Essential oil (pc.)</option>
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
                <Button style={{ float: 'right' }} isLoading={this.props.loading} onClick={(event) => { this.handleSubmit(event); this.props.toggleNewModal(); this.props.loadingTrue();}} isColor='success'>Submit</Button>
            </ModalCardFooter>
        </ModalCard>
    )
}
}
export default newProductModel;