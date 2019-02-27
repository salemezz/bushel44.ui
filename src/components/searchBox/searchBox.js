import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Field, NavbarItem, NavbarEnd, Button, Control, Input
} from 'bloomer'
import './searchBox.css'
import withRouter from '../../../node_modules/react-router-dom/withRouter';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value, clean: false });
    console.log(this.state.value)
  }

  handleSubmit(event) {
    console.log('yup');

      // context.history.push('/?searchTerm=' + this.state.value)
      if(event.key == 'Enter'){
      this.props.history.push('/search?searchTerm=' + this.state.value)
      window.location.reload();
      }
  }


  render() {
    return (
      <NavbarEnd>
        <NavbarItem>
            <Field id='searchBox'>
              <Control>
                <Field hasAddons>
                  <Control id='searchBox'>
                    <Input id='searchText' isColor='#9CCB66' placeholder='Search Products' onKeyUp={this.handleChange} onKeyPress={this.handleSubmit} />
                  </Control>
                  <Control>
                    <Button style={{backgroundColor: '#9CCB66'}}>
                      <Link style={{ color: '#598254' }} to={{
                        pathname: '/search',
                        search: '?searchTerm=' + this.state.value
                      }}> Search</Link>
                    </Button>
                  </Control>
                </Field>
              </Control>
            </Field>
        </NavbarItem>
      </NavbarEnd>
    );
  }
}

export default withRouter(SearchBox);
