import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Controller, useForm } from "react-hook-form"
import Modal from "@mui/material/Modal"
import { TextField, Typography } from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux"

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

export default function MakeComplaint({ setOpen, open, setIssues }) {
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
    },
  })
  const onSubmit = (data) => makeComplaint(data)

  const makeComplaint = async (data) => {
    data = { ...data, houseId: user.House[0].id, userId: user.id }
    console.log(data)
    const response = await axios.post("issue/newissue", data)
    if (response.data) {
      setIssues((prev) => [...prev, response.data])
      setOpen(false)
    }
    console.log(data)
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
          <Typography variant='h5'>New Complaint</Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
                  label='Complaint Title'
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
              Make Complaint
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
