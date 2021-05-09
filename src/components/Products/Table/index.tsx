import { useContext } from 'react'
import DataTable from 'react-data-table-component'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import { Link } from 'react-router-dom'

import { GlobalContext } from '../../../context/GlobalContext'

const Table = () => {
  const { products } = useContext(GlobalContext)
  const actions = (
    <Link to='/add'>
      <IconButton color='primary'>
        <Add />
      </IconButton>
    </Link>
  )

  const columns = (row: any) => [
    {
      name: 'SKU',
      selector: 'sku'
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Preço',
      selector: 'price',
      sortable: true
    },
    {
      name: 'Categoria',
      selector: 'category',
      sortable: true
    },
    {
      name: 'Ações',
      cell: () => (
        <>
          {' '}
          <Link to='/edit/1'>
            <IconButton color='primary'>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color='primary'>
            <Delete />
          </IconButton>
        </>
      ),
      button: true
    }
  ]

  return (
    <Card style={{ height: '100%', marginTop: '1rem' }}>
      <DataTable
        title='Produtos'
        columns={columns({})}
        data={products}
        pagination
        highlightOnHover
        actions={actions}
      />
    </Card>
  )
}

export default Table
