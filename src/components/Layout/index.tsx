import { ReactNode } from 'react'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

interface IProps {
  children: ReactNode
}

const Layout = ({ children, ...props }: IProps) => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Produtos</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: '1rem' }}>{children!}</Container>
    </>
  )
}

export default Layout
