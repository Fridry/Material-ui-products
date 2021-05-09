import { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
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

import { Product } from '../../../ts/interfaces/productsInterfaces'

interface ParamTypes {
  id: string
}

const inputStyle = { margin: '0.6rem' }

const Edit = () => {
  const { products, editProduct } = useContext(GlobalContext)
  const [data, setData] = useState({
    id: '',
    sku: 0,
    name: '',
    price: '',
    category: ''
  })

  const history = useHistory()
  const { id } = useParams<ParamTypes>()

  const { register, handleSubmit } = useForm<Product>()

  useEffect(() => {
    if (id) {
      const product = products.find((product: Product) => product.id === id)
      setData(product)
    }
  }, [id, products, setData])

  const onSubmit = () => {
    editProduct(data)
    history.push('/')
  }

  return (
    <Card style={{ padding: '1rem', width: '35rem', margin: '0 auto' }}>
      <Typography variant='h6' align='center' gutterBottom>
        Atualizar produto
      </Typography>

      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('sku')}
          id='sku'
          label='Código SKU'
          variant='outlined'
          style={inputStyle}
          type='number'
          value={data.sku}
          onChange={(e) => {
            setData({
              ...data,
              sku: parseInt(e.target.value)
            })
          }}
        />
        <TextField
          {...register('name')}
          id='name'
          label='Nome do produto'
          variant='outlined'
          style={inputStyle}
          value={data.name}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value
            })
          }
        />

        <TextField
          {...register('price')}
          id='price'
          label='Preço'
          variant='outlined'
          style={inputStyle}
          value={data.price}
          onChange={(e) =>
            setData({
              ...data,
              price: e.target.value
            })
          }
        />

        <FormControl variant='outlined' style={inputStyle}>
          <InputLabel id='category'>Categoria</InputLabel>
          <Select
            {...register('category')}
            defaultValue=''
            labelId='category'
            id='category'
            label='category'
            value={data.category}
            onChange={(e) =>
              setData({
                ...data,
                category: e.target.value as any
              })
            }
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
            Atualizar
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

export default Edit
