import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export default function CreateHouse({ setOpen, open, properties, setHouses }) {
  const handleClose = () => setOpen(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      house_number: '',
      propertyId: ''
    }
  })
  const onSubmit = (data) => addHouse(data)

  const addHouse = async (data) => {
    const response = await axios.post('house/createhouse', data)
    if (response.data) {
      setHouses((prev) => [...prev, response.data])
      setOpen(false)
    }
    console.log(data)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">New House</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name={'house_number'}
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  onChange={onChange}
                  value={value}
                  required
                  fullWidth
                  label="House Number"
                  name="house_number"
                  autoFocus
                  error={errors.house_number}
                />
              )}
            />

            <Controller
              name={'propertyId'}
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth>
                  <InputLabel id="appartment-select">Appartment</InputLabel>

                  <Select
                    labelId="appartment-select"
                    value={value}
                    label="Apartment"
                    onChange={onChange}
                    error={errors.password}
                    fullWidth
                    placeholder="Select aparment"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add House
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
