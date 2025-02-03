import './App.css'
import Form from './components/Form/Form'
import Nav from './components/Nav/Nav'
import Search from './components/Search/Search'
import { Router, Route, Link } from 'react-router-dom'

function App() {


  return (
    <>
      Something

      <Router>
        <Nav />
        <Route path='/search' component={Search} />
        <Route path='/form' component={Form} />

        <Link to='/form'>
          <button>Form</button>
        </Link>
      </Router>


    </>
  )
}

export default App
