import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import DataTable from 'react-data-table-component'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Link } from 'react-router-dom'

import { GlobalContext } from '../../../context/GlobalContext'

const Table = () => {
  const { products, deleteProduct } = useContext(GlobalContext)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const handleClickOpen = (id: string) => {
    setSelected(id)
    setOpen(true)
  }

  const handleClose = () => {
    setSelected('')
    setOpen(false)
  }

  const handleDeleteProduct = () => {
    if (selected) {
      deleteProduct(selected)
      setOpen(false)
    }
  }

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
      cell: (row: any) => (
        <>
          {' '}
          <Link to={`/edit/${row.id}`}>
            <IconButton color='primary'>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color='primary' onClick={() => handleClickOpen(row.id)}>
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Tem certeza que deseja remover este produto?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDeleteProduct()} color='primary'>
            Remover
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Table
