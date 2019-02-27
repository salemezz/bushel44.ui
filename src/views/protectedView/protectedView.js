import React, { Component } from 'react'
import EditView from '../../components/editView/editView'
import {
    Container, ModalBackground, CardContent,
    Card, Columns, Column, Modal,
    Title, Box, Media, MediaContent,
} from 'bloomer'
import { CloudinaryContext, Image } from 'cloudinary-react';
import { getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter'
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
            url: "https://herballist.herokuapp.com/api/myProducts",
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
            url: "https://herballist.herokuapp.com/api/products/" + JSON.stringify(myProduct.id)
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
                                loading={this.state.loading}
                                toggleNewModal={this.toggleNewModal}
                                myReload={this.myReload}
                                creatorId={this.state.creatorId}
                                postedBy={this.state.postedBy}
                            />
                        </Modal>
                        <Column isSize={6}>
                            <Title style={{ fontSize: 'calc(25px + .75vw)' }}>My Products
                                {/* <Icon className="onHover" style={{ fontSize: 'calc(20px + 1vw)', float: 'right' }} onClick={this.toggleNewModal} isColor='warning'>
                                    <FontAwesomeIcon icon={['fas', 'plus-square']} />
                                </Icon> */}
                                <svg height="calc(20px + 1.75vw)" onClick={this.toggleNewModal} class="onHover svg-inline--fa fa-plus-square fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z">
                                </path></svg>
                            </Title>
                            <Card style={{ backgroundColor: '#FCFCFC', border: ".75px solid black" }}>
                                <CardContent>
                                    {this.state.myProducts.map((myProduct) => {
                                        console.log(myProduct)
                                        return (
                                            <Media>
                                                <MediaContent>
                                                    <Modal isActive={this.state.is_active}>
                                                        <ModalBackground />
                                                        <EditView loadingTrue={this.loadingTrue} loadingFalse={this.loadingFalse} protectedState={this.state} handleEdit={this.handleEdit} toggleModal={this.toggleModal} />
                                                    </Modal>
                                                    {/* <Icon onClick={() => { this.onItemsSelect(myProduct); this.deleteProduct(myProduct); }} className="myProduct-icons onHover" >
                                                        <FontAwesomeIcon style={{ float: 'right' }} icon={['fa', 'minus-circle']} />
                                                    </Icon> */}
                                                    <svg class="onHover svg-inline--fa fa-minus-circle fa-w-16" onClick={() => { this.onItemsSelect(myProduct); this.deleteProduct(myProduct); }} height="calc(15px + 1vw)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z">
                                                    </path></svg>
                                                    {/* <Icon onClick={() => { this.onItemsSelect(myProduct); this.toggleModal(); }} className="myProduct-icons onHover">
                                                        <FontAwesomeIcon style={{ float: 'right' }} icon={['fa', 'edit']} />
                                                    </Icon> */}
                                                    <svg class="onHover svg-inline--fa fa-edit fa-w-18" onClick={() => { this.onItemsSelect(myProduct); this.toggleModal(); }} height="calc(15px + 1vw)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
                                                    </path></svg>
                                                    <Title style={{ fontSize: 'calc(7px + 1.75vw)' }}>{`${myProduct.productName}`}</Title>
                                                    <CloudinaryContext>
                                                        <Image style={{ width: "auto", border: ".75px solid black" }} cloudName="dozenuld4" secure="true" publicId={myProduct.image} >
                                                        </Image>
                                                    </CloudinaryContext>
                                                    <ul>
                                                        <li><b>Quantity:</b> {myProduct.stock} </li>
                                                        <li><b>Type:</b> {myProduct.type} </li>
                                                        <li><b>Details:</b> {myProduct.details} </li>
                                                    </ul>
                                                </MediaContent>
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