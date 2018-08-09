import React, {Component} from 'react'
import { Notification, Delete, Container, CardHeaderTitle, CardContent,
     CardHeader, Card, Columns, Column, Button, Field, Label, Control, 
     Icon, Input, Help } from 'bloomer'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authenticate, getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter';

class Login extends Component{
    state = {
        clean: true,
        username: '',
        password: '',
        loading: false,
        notificationVisible: false,
        error: ''
    }

    handleUsernameChange = event=>{
        let username = event.target.value
        this.setState({...this.state, clean: false, username})
    }

    handlePasswordChange = event=>{
        let password = event.target.value
        this.setState({...this.state, clean: false, password})
    }

    handleSubmit = ()=>{
        this.setState({...this.state, loading:true})
        authenticate(this.state.username, this.state.password)
        .then(()=>{
            this.props.history.push('/')
        })
        .catch(err=>{
            this.setState({
                ...this.state, 
                loading: false,
                error: err,
                notificationVisible: true
            })
        })
    }

    hideNotification = ()=>{
        this.setState({...this.state, notificationVisible:false})
    }
    
    render(){
        return (
            <Container>
                <Columns isCentered>
                    <Column isSize={6}>
                        <Card>
                            <CardHeader>
                                <CardHeaderTitle>
                                    Login
                                </CardHeaderTitle>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <Label>Username</Label>
                                    <Control hasIcons='left'>
                                        <Input isColor='info' placeholder='Username' onKeyUp={this.handleUsernameChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'user']}/>
                                        </Icon>
                                    </Control>
                                    <Help isHidden={this.state.username!=='' || this.state.clean} isColor='danger'>Invalid Username</Help>
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Control hasIcons='left'>
                                        <Input type='password' isColor='info' placeholder='Password' onKeyUp={this.handlePasswordChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'key']}/>
                                        </Icon>
                                    </Control>
                                    <Help isHidden={this.state.password!=='' || this.state.clean} isColor='danger'>Invalid Password</Help>
                                </Field>
                                <Button isLoading={this.state.loading} disabled={(this.state.username==='' || this.state.password==='')} isColor='info' isOutlined onClick={this.handleSubmit}>Login</Button>
                                <Link to='/register'>Can't Login? Register Here!</Link>
                            </CardContent>
                        </Card>
                    </Column>
                </Columns>
                <Notification isColor='danger' isHidden={!this.state.notificationVisible}>
                    {this.state.error}
                    <Delete onClick={this.hideNotification}/>
                </Notification>
            </Container>
        )
    }
}

export default withRouter(Login)