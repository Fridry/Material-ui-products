import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SaveIcon from '@material-ui/icons/Save'

import { GlobalContext } from '../../../context/GlobalContext'

import { Link, useHistory } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

import { Product } from '../../../ts/interfaces/productsInterfaces'

const inputStyle = { margin: '0.6rem' }

const Add = () => {
  const { products, addProduct } = useContext(GlobalContext)
  const history = useHistory()

  const { register, handleSubmit, reset } = useForm<Product>()

  const onSubmit = (data: Product) => {
    const newData = Object.assign(data, { id: uuidV4() })

    const findSkuDuplicated = products.find(
      (product: Product) => product.sku === data.sku
    )

    if (!findSkuDuplicated) {
      addProduct(newData)
      reset(data)
      history.push('/')
    } else {
      alert('Código SKU duplicado. Por favor insire outro.')
    }
  }

  return (
    <Card style={{ padding: '1rem', width: '35rem', margin: '0 auto' }}>
      <Typography variant='h6' align='center' gutterBottom>
        Cadastrar produto
      </Typography>

      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('sku', { required: true })}
          id='sku'
          label='Código SKU'
          variant='outlined'
          style={inputStyle}
          type='number'
        />
        <TextField
          {...register('name', { required: true })}
          id='name'
          label='Nome do produto'
          variant='outlined'
          style={inputStyle}
        />

        <TextField
          {...register('price', { required: true })}
          id='price'
          label='Preço'
          variant='outlined'
          style={inputStyle}
        />

        <FormControl variant='outlined' style={inputStyle}>
          <InputLabel id='category'>Categoria</InputLabel>
          <Select
            {...register('category', { required: true })}
            defaultValue=''
            labelId='category'
            id='category'
            label='category'
          >
            <MenuItem value='milk'>Leite</MenuItem>
            <MenuItem value='sweet'>Doce</MenuItem>
            <MenuItem value='yogurt'>Iogurte</MenuItem>
          </Select>
        </FormControl>

        <div
          style={{
            ...inputStyle,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant='contained'
            color='primary'
            startIcon={<SaveIcon />}
            type='submit'
          >
            Salvar
          </Button>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button variant='contained' startIcon={<ArrowBackIcon />}>
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}

export default Add
