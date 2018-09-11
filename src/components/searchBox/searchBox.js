import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Navbar, Icon, Container, Field, NavbarItem, NavbarLink, NavbarEnd,
  NavbarMenu, NavbarStart, NavbarBurger, Title,
  NavbarDropdown, Button, Image, Label, Control, Input, FieldLabel
} from 'bloomer'
import './searchBox.css'

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value)
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <NavbarEnd>
        <NavbarItem>
          {/* <Container> */}
            <Field id='searchBox'>
              <Control>
                <Field hasAddons>
                  <Control id='searchBox'>
                    <Input id='searchText' isColor='black' placeholder='Search Products' onKeyUp={this.handleChange} />
                  </Control>
                  <Control>
                    <Button isColor='black' isOutlined>
                      <Link style={{ color: 'black' }} to={{
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

export default SearchBox;
