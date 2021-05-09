import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Alerts = ({ open, setOpen, message, type }: any) => {
  const handleCloseAlert = () => setOpen(false)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleCloseAlert}
    >
      <Alert onClose={handleCloseAlert} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Alerts
