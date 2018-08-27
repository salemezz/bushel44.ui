import React, { Component } from 'react'
import EditView from '../../components/editView/editView'
import {
    Notification, Delete, Container, ModalBackground, CardContent, Select, ModalCardBody,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control, ModalCard, ModalCardHeader, Modal,
    Icon, Input, Help, Title, Box, Media, MediaContent, Subtitle, MediaRight, Image, ModalCardFooter,
    ModalCardTitle,
} from 'bloomer'
import { getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import $ from 'jquery'


class ProtectedView extends Component {

    // constructor(props) {
    //     super(props);

    //     // this.addActiveClass= this.addActiveClass.bind(this);
    //     this.state = {
    //       isActive: false
    //     }
    //   }

    // export default class UnprotectedView extends Component {
    state = {
        productName: '',
        stock: '',
        type: '',
        details: '',
        myProducts: [],
        is_active: false,
        // productToBeEdited: {},
        creatorId: getUserData().id,
        postedBy: getUserData().username,
        thisUser: getUserData().id,
        selectedFile: null,
        hideNewProductForm: false,
        selectedProduct: null,       
        notificationVisible: false,
        error: ''
    }

    myReload = () => {
        $.ajax({
            method: "GET",
            url: "https://bushel44.herokuapp.com/api/myProducts",
            data:
                JSON.stringify({
                    thisUser: this.state.thisUser
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                console.log(data);
                this.state.myProducts = data
                this.setState({ ...this.state, loading: false })
                this.setState({ ...this.state, hideResult: false })
            })
            .catch(err => {
                console.log('fail1')
                this.setState({
                    ...this.state,
                    loading: false,
                    error: err.message,
                    notificationVisible: true,
                    hideResult: false
                })
            })
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
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = event => {
    }

    onItemsSelect = (myProduct)=> {
        this.state.selectedProduct = myProduct.id
        console.log('sp ' + this.state.selectedProduct)
        // let x = myProduct.id
        // console.log(myProduct.id, 'sp');
        // // console.log('is' + JSON.stringify(myProduct.id)) 
        // // this.setState({ ...this.state, selectedProduct: x })
        // // console.log('sp' +  this.state.selectedProduct)
        // this.setState({ ...this.state, selectedProduct : x }, () => {
     
        //   }); 
        // this.myReload()
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

    toggleModal = () => {
        if (!this.state.is_active) {
        this.setState({ ...this.state, is_active: true })
        } else {
        this.setState({ ...this.state, is_active: false })
        }
    }

    handleSubmit = (event) => {
        this.setState({ ...this.state, loading: true })
        event.preventDefault();

            const data = new FormData();
            data.append('image', this.state.selectedFile);
            data.append('productName', this.state.productName);
            data.append('stock', this.state.stock);
            data.append('type', this.state.type);
            data.append('details', this.state.details);
            data.append('creatorId', this.state.creatorId);
            data.append('postedBy', this.state.postedBy);
    
            fetch('https://bushel44.herokuapp.com/api/products', {
                method: 'POST',
                body: data,
            }).then(() => {
                this.setState({ ...this.state,
                    loading: false
                })
                this.setState({ ...this.state,
                    hideNewProductForm: true
                })
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

    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
        if (!this.state.hideNewProductForm) {
            return (
                <Container>



                    <Columns isCentered>
                        <Column isSize={6}>
                            <Title isSize={6}>New Product</Title>
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
                        <Column isSize={6} >
                            <Title isSize={6}>My Products</Title>
                            <Card>
                                <CardContent>
                                    {this.state.myProducts.map((myProduct) => {
                                        console.log(myProduct)
                                        return (
                                            <Media key={myProduct.toString()}>
                                                <MediaContent>
                                                    <Title isSize={4}>{`${myProduct.productName}`}</Title>
                                                    <Label>
                                                        <ul>
                                                            <li>Quantity: {myProduct.stock} </li>
                                                            <li>Type: {myProduct.type} </li>
                                                            <li>Details: {myProduct.details} </li>
                                                        </ul>
                                                    </Label>
                                                </MediaContent>
                                                <MediaRight>
                                                    <Image isSize='300x150' src={myProduct.image} />
                                                </MediaRight>
                                                {/* <Link to='/protected/edit'> */}

                                                <Modal isActive={this.state.is_active}>
                                                    <ModalBackground />
                                                 
                                            
                                               
                                                               <EditView protectedState={this.state} handleEdit={this.handleEdit} toggleModal={this.toggleModal} />
                                                      
                                                    
                                            
                                                   
                                                </Modal>
                                                <Icon onClick={(e) => { this.onItemsSelect(myProduct); this.toggleModal(); }}  isSize='small' style={{ paddingRight: '15px', paddingLeft: '15px' }}>
                                                    <FontAwesomeIcon icon={['fa', 'edit']} />
                                                </Icon>
                                                {/* </Link> */}
                                                <Delete onClick={(e) => { this.onItemsSelect(myProduct); this.deleteProduct(myProduct); }} />
                                                {/* <Delete  isLoading={this.state.loading} onClick={e => this.onItemsSelect(myProduct)}/> */}
                                            </Media>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        </Column>

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

export default withRouter(ProtectedView)