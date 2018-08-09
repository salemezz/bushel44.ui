import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Section } from 'bloomer'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import Navigation from './components/navigation/navigation'
import Footer from './components/footer/footer'
import Search from './views/search/search'
import Home from './views/home/home'
import Products from './views/products/products'

// import SearchResults from './components/search/search'
import Login from './views/login/login'
import Register from './views/register/register'
import ProtectedView from './views/protectedView/protectedView'
import UnprotectedView from './views/unprotectedView/unprotectedView'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import 'bulma/css/bulma.css'

library.add(fab, fas)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navigation />
        <Section className='has-background-info'>
          <Route exact path='/' component={Home}/>
          <Route exact path='/products' component={Products}/>
          <Route exact path='/search' component={Search}/>
          <ProtectedRoute path='/protected' component={ProtectedView}/>
          {/* <ProtectedRoute path='/protected/edit' component={EditView}/> */}
          <Route path='/users/:id' component={UnprotectedView}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Section>
      </div>

      </BrowserRouter>    
    )
  }
}

export default App;
