import React, { Component } from 'react'
import { render } from 'react-dom';
import EditView from '../../components/editView/editView'
import {
    Notification, Delete, Container, ModalBackground, CardContent, Select,
    CardHeader, Card, Columns, Column, Button, Field, Label, Control, ModalCard, ModalCardHeader, Modal,
    Icon, Input, Help, Title, Box, Media, MediaContent, CardImage, MediaRight, ModalCardFooter,
    ModalCardTitle,
} from 'bloomer'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import NewProductModel from '../../components/newProductModel/newProductModel';
import { ClipLoader } from 'react-spinners';
import './protectedView.css'

var override = {
    display: 'block',
    margin: '0 auto',
};

class ProtectedView extends Component {
    state = {
        productName: '',
        stock: '',
        type: '',
        details: '',
        myProducts: [],
        is_active: false,
        is_active1: false,
        thisUser: getUserData().id,
        selectedFile: null,
        hideNewProductForm: false,
        selectedProduct: null,
        notificationVisible: false,
        error: ''
    }

    myReload = () => {
        console.log(this.state.thisUser)
        this.setState({ ...this.state, loading: true })
        $.ajax({
            method: "POST",
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
                console.log('my prods ' + JSON.stringify(data));
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

    loadingTrue = () => {
        this.setState({ ...this.state, loading: true })
    }

    loadingFalse = () => {
        this.setState({ ...this.state, loading: false })
    }

    onItemsSelect = (myProduct) => {
        this.state.selectedProduct = myProduct.id
        console.log('sp ' + this.state.selectedProduct)
    }

    fileChangedHandler = (event) => {
        event.preventDefault();
        this.setState({ selectedFile: event.target.files[0] })
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

    toggleNewModal = () => {
        if (!this.state.is_active1) {
            this.setState({ ...this.state, is_active1: true })
        } else {
            this.setState({ ...this.state, is_active1: false })

        }
    }

    hideNotification = () => {
        this.setState({ ...this.state, notificationVisible: false })
    }

    render() {
        if (!this.state.hideNewProductForm) {
            return (
                <Container>
                    <Columns isCentered>
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
                        <Modal isActive={this.state.is_active1}>
                            <ModalBackground />
                            <NewProductModel
                                loadingTrue={this.loadingTrue}
                                loadingFalse={this.loadingFalse}
                                toggleNewModal={this.toggleNewModal}
                                myReload={this.myReload}
                                creatorId={this.state.creatorId}
                                postedBy={this.state.postedBy}
                            />
                        </Modal>
                        <Column isSize={6} >
                            <Title style={{ fontSize: 'calc(20px + .75vw)' }}>My Products
                                <Icon className="onHover" style={{ fontSize: 'calc(20px + 1vw)', float: 'right' }} onClick={this.toggleNewModal} isColor='warning' >
                                    <FontAwesomeIcon icon={['fa', 'plus-square']} />
                                </Icon>
                            </Title>
                            <Card>
                                <CardContent>
                                    <CloudinaryContext>
                                        {this.state.myProducts.map((myProduct) => {
                                            console.log(myProduct)
                                            return (
                                                <Media>
                                                    <MediaContent>
                                                        <Modal isActive={this.state.is_active}>
                                                            <ModalBackground />
                                                            <EditView loadingTrue={this.loadingTrue} loadingFalse={this.loadingFalse} protectedState={this.state} handleEdit={this.handleEdit} toggleModal={this.toggleModal} />
                                                        </Modal>
                                                        <Icon onClick={() => { this.onItemsSelect(myProduct); this.deleteProduct(myProduct); }} className="myProduct-icons onHover" >
                                                                <FontAwesomeIcon style={{ float: 'right' }} icon={['fa', 'minus-circle']} />
                                                            </Icon>
                                                            <Icon onClick={() => { this.onItemsSelect(myProduct); this.toggleModal(); }} className="myProduct-icons onHover">
                                                                <FontAwesomeIcon style={{ float: 'right' }} icon={['fa', 'edit']} />
                                                            </Icon>
                                                        <Title style={{ fontSize: 'calc(7px + 1.75vw)' }}>{`${myProduct.productName}`}</Title>
                                                        <Image style={{ width: "auto" }} cloudName="dozenuld4" secure="true" publicId={myProduct.image} >
                                                            {/* <Transformation width="300" height="100" crop="scale"/> */}
                                                        </Image>
                                                        <ul>
                                                            <li><b>Quantity:</b> {myProduct.stock} </li>
                                                            <li><b>Type:</b> {myProduct.type} </li>
                                                            <li><b>Details:</b> {myProduct.details} </li>
                                                        </ul>
                                                    </MediaContent>
                                                    {/* <Modal isActive={this.state.is_active}>
                                                        <ModalBackground />
                                                        <EditView loadingTrue={this.loadingTrue} loadingFalse={this.loadingFalse} protectedState={this.state} handleEdit={this.handleEdit} toggleModal={this.toggleModal} />
                                                    </Modal>
                                                    <Icon onClick={() => { this.onItemsSelect(myProduct); this.toggleModal(); }} isSize='small' style={{ paddingRight: '15px', paddingLeft: '15px' }}>
                                                        <FontAwesomeIcon icon={['fa', 'edit']} />
                                                    </Icon>
                                                    <Delete onClick={() => { this.onItemsSelect(myProduct); this.deleteProduct(myProduct); }} /> */}
                                                </Media>
                                            )
                                        })}
                                    </CloudinaryContext>
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