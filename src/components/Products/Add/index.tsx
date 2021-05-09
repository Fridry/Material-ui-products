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

import { Link } from 'react-router-dom'

enum CategoryTypes {
  milk,
  sweet,
  yogurt
}

interface FormFields {
  sku: number
  name: string
  price: string
  category: CategoryTypes | string
}

const inputStyle = { margin: '0.6rem' }

const Add = () => {
  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit = (data: FormFields) => {
    console.log(data)
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
          type='number'
        />

        {/* <FormControl variant='outlined' style={inputStyle}>
          <InputLabel htmlFor='price'>Preço</InputLabel>
          <OutlinedInput
            {...register('price', { required: true })}
            labelWidth={40}
            id='price'
            type='number'
            startAdornment={
              <InputAdornment position='start'>R$</InputAdornment>
            }
          />
        </FormControl> */}

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
