import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Controller, useForm } from "react-hook-form"
import Modal from "@mui/material/Modal"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux"
import { getAllProperties } from "../../services/appartments.service"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default function MakeNotice({ setOpen, open, setNotices }) {
  const [properties, setProperties] = React.useState([])
  React.useEffect(() => {
    getProperties()
  }, [])
  const handleClose = () => setOpen(false)
  const { user } = useSelector((state) => state.auth.user)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      propertyId: "",
    },
  })
  const onSubmit = (data) => makeComplaint(data)

  const makeComplaint = async (data) => {
    const response = await axios.post("notice/newnotice", data)
    if (response.data) {
      setNotices((prev) => [...prev, response.data])
      setOpen(false)
    }
    console.log(data)
  }

  const getProperties = async () => {
    try {
      const data = await getAllProperties()
      console.log(data)
      setProperties(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h5' sx={{ marginBottom: 4 }}>
            New Notice
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name={"propertyId"}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth>
                  <InputLabel id='appartment-select'>Appartment</InputLabel>

                  <Select
                    labelId='appartment-select'
                    value={value}
                    label='Apartment'
                    onChange={onChange}
                    error={errors.password}
                    fullWidth
                    placeholder='Select aparment'
                  >
                    {properties.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name={"title"}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin='normal'
                  onChange={onChange}
                  value={value}
                  required
                  fullWidth
                  label='Notice Title'
                  name='title'
                  autoFocus
                  error={errors.title}
                />
              )}
            />

            <Controller
              name={"description"}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin='normal'
                  onChange={onChange}
                  value={value}
                  required
                  fullWidth
                  label='Description'
                  name='description'
                  autoFocus
                  multiline
                  rows={4}
                  error={errors.title}
                />
              )}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Make Notice
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
