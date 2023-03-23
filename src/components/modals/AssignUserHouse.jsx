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
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function AssignUserHouse({
  setOpen,
  open,
  houses,
  setHouses,
  userId
}) {
  const handleClose = () => setOpen(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      house_number: ''
    }
  })
  const onSubmit = (data) => assignHouse(data)

  const assignHouse = async (data) => {
    data = { ...data, user_id: userId }
    console.log(data)
    const response = await axios.put('house/edithouse', data)
    if (response.data) {
      //   setHouses((prev) => [...prev, response.data])
      setOpen(false)
    }
    console.log(data)
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Select House Number
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 4 }}
          >
            <Controller
              name={'house_id'}
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth>
                  <InputLabel id="house-select">House Number</InputLabel>

                  <Select
                    labelId="house-select"
                    value={value}
                    label="House Number"
                    onChange={onChange}
                    error={errors.password}
                    fullWidth
                  >
                    {houses
                      .filter((a) => a.userId === null)
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.house_number}
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
              Assign
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
