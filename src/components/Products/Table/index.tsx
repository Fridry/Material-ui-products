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

import Alert from '../../Alerts'

const Table = () => {
  const { products, deleteProduct } = useContext(GlobalContext)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [selected, setSelected] = useState('')

  const handleClickOpen = (id: string) => {
    setSelected(id)
    setOpenConfirmation(true)
  }

  const handleClose = () => {
    setSelected('')
    setOpenConfirmation(false)
  }

  const handleDeleteProduct = () => {
    if (selected) {
      deleteProduct(selected)
      setOpenAlert(true)
      setOpenConfirmation(false)
    }
  }

  const actions = (
    <Link to='/add'>
      <IconButton color='primary'>
        <Add />
      </IconButton>
    </Link>
  )

  const translateCategory = (category: string) => {
    switch (category) {
      case 'milk':
        return 'Leite'

      case 'sweet':
        return 'Doce'

      case 'yogurt':
        return 'Iogurte'

      default:
        break
    }
  }

  const convertCurrency = (price: string) => {
    const newPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return newPrice.format(Number(price))
  }

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
      name: 'Preço (R$)',
      selector: 'price',
      sortable: true,
      cell: (row: any) => convertCurrency(row.price)
    },
    {
      name: 'Categoria',
      selector: 'category',
      sortable: true,
      cell: (row: any) => translateCategory(row.category)
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
        open={openConfirmation}
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

      <Alert
        open={openAlert}
        setOpen={setOpenAlert}
        message='Produto removido com sucesso.'
        type='success'
      />
    </Card>
  )
}

export default Table
