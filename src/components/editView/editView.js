import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Notification, Delete, Container, CardHeaderTitle, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image,
} from 'bloomer'



class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count
        }
    }

    componentWillReceiveProps () {
        console.log(this.props.protectedState)

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
    // increament(){
    //   console.log("this.props.count");
    //   console.log(this.props.count);
    //   let count = this.state.count
    //   count.push("new element");
    //   this.setState({ count: count})
    // }

    render() {
        if (!this.state.hideNewProductForm) {
            return (
                <Container>
                    {/* <Title isSize={6}>Edit Product</Title> */}


                    <Field>
                        <Label>Product Name</Label>
                        <Control hasIcons='left'>
                            <Input isColor='info' placeholder='dd' onKeyUp={this.handleProductNameChange} />
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
                    <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                        {this.state.error}
                        <Delete onClick={this.hideNotification} />
                    </Notification>
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
export default EditView;