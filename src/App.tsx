import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './components/Layout'
import TableProduct from './components/Products/Table'
import AddProduct from './components/Products/Add'
import EditProduct from './components/Products/Edit'

import { GlobalProvider } from './context/GlobalContext'

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <TableProduct />
            </Route>
            <Route path='/add'>
              <AddProduct />
            </Route>
            <Route path='/edit/:id'>
              <EditProduct />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </GlobalProvider>
  )
}

export default App
