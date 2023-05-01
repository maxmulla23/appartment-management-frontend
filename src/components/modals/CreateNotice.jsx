import * as React from "react"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { Controller } from "react-hook-form"
import Modal from "@mui/material"
import { Typography, TextField } from "@mui/system"
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

export default function CreateNotice({ setOpen, open, setIssues }) {
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
const onSubmit = (data) => createNotice(data)

const createNotice = async (data) => {
    data = { ...data, houseId: user.House[0].id, userId: user.id }
    console.log(data)
    const response = await axios.post("notice/newnotice", data)
    if (response.data) {
      setIssues((prev) => [...prev, response.data])
      setOpen(false)
    }
    console.log(data)

    
}

