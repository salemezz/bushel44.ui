import React, {Component} from 'react'
import { Notification, Delete, Container, CardHeaderTitle, CardContent,
     CardHeader, Card, Columns, Column, Button, Field, Label, Control, 
     Icon, Input, Help } from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authenticate, getUserData } from '../../libraries/authentication'
import withRouter from '../../../node_modules/react-router-dom/withRouter';
import $ from 'jquery'

class Login extends Component{
    state = {
        clean: true,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
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
    handleFirstNameChange = event=>{
        let firstName = event.target.value
        this.setState({...this.state, clean: false, firstName})
    }
    handleLastNameChange = event=>{
        let lastName = event.target.value
        this.setState({...this.state, clean: false, lastName})
    }

    handleEmailChange = event=>{
        let email = event.target.value
        this.setState({...this.state, clean: false, email})
    }
    handleBusinessNameChange = event=>{
        let businessName = event.target.value
        this.setState({...this.state, clean: false, businessName})
    }

    handleSubmit = ()=>{
        this.setState({...this.state, loading:true})
        $.ajax({
            method: "POST",
            url: "https://herballist-api.herokuapp.com/auth/register",
            data:
            JSON.stringify({
                username:this.state.username,
                password:this.state.password,
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                email:this.state.email,
                business_name:this.state.businessName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(()=>{
            console.log('test')
            this.props.history.push('/login')
        })
        .catch(err=>{
            console.log('test')
            this.setState({
                ...this.state, 
                loading: false,
                error: err.message,
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
                        <Card style={{ backgroundColor: '#FCFCFC', border: ".75px solid black" }}>
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
                                <Field>
                                    <Label>First Name</Label>
                                    <Control hasIcons='left'>
                                        <Input isColor='info' placeholder='First Name' onKeyUp={this.handleFirstNameChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'user']}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Last Name</Label>
                                    <Control hasIcons='left'>
                                        <Input isColor='info' placeholder='Last Name' onKeyUp={this.handleLastNameChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'user']}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Email</Label>
                                    <Control hasIcons='left'>
                                        <Input isColor='info' placeholder='Email' onKeyUp={this.handleEmailChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'user']}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Business Name</Label>
                                    <Control hasIcons='left'>
                                        <Input isColor='info' placeholder='Business Name' onKeyUp={this.handleBusinessNameChange}/>
                                        <Icon isSize='small' isAlign='left'>
                                            <FontAwesomeIcon icon={['fas', 'user']}/>
                                        </Icon>
                                    </Control>
                                </Field>
                                <Button isLoading={this.state.loading} disabled={(this.state.username==='' || this.state.password==='')} isColor='black' isOutlined onClick={this.handleSubmit}>Register</Button>
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