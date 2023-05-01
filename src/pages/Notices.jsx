import { filter } from "lodash"
import { useEffect, useState } from "react"
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { blue, deepPurple, green, red, yellow } from "@mui/material/colors"
// import TableHeader from '../components/dashboard/TableHeader'
// import TableToolbar from '../components/dashboard/TableToolbar'
import axios from "axios"
// import { getAllProperties } from '../services/appartments.service'
import TableHeader from "../components/dashboard/TableHeader"
import AssignUserHouse from "../components/modals/AssignUserHouse"
import { useSelector } from "react-redux"
import {
  BuildOutlined,
  HouseOutlined,
  NotificationImportant,
  Person2Outlined,
} from "@mui/icons-material"
import MakeComplaint from "../components/modals/MakeComplaint"
import moment from "moment"
import MakeNotice from "../components/modals/MakeNotice"

const TABLE_HEAD = [
  { id: "id", label: "date", alignRight: false },
  { id: "name", label: "Username", alignRight: false },
  { id: "house", label: "House", alignRight: false },
  { id: "title", label: "Title", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      (user) => user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }
  return stabilizedThis.map((el) => el[0])
}

export default function Notices() {
  const [page, setPage] = useState(0)

  const [issues, setIssues] = useState([])

  const [notices, setNotices] = useState([])

  const [current, setCurrent] = useState(0)

  const [order, setOrder] = useState("asc")

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState("name")

  const [filterName, setFilterName] = useState("")

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [isOpen, setIsOpen] = useState(false)

  const [Errmsg, setErrmsg] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    getIssues()
    getNotices()
  }, [])

  const getIssues = async () => {
    try {
      const response = await axios.get(`issue/${user.user.id}`)
      console.log(response)
      setIssues(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getNotices = async () => {
    try {
      const response = await axios.get(`notice`)
      setNotices(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = issues.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  // const handleOpen = (id) => {
  //   setIsOpen(true)
  //   setCurrent(id)
  // }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - issues.length) : 0

  const filteredAppartments = applySortFilter(
    issues,
    getComparator(order, orderBy),
    filterName
  )

  const isNotFound = !filteredAppartments.length && !!filterName

  if (isLoading) {
    return <p>Loading ... </p>
  }

  console.log(user.user)

  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          my={5}
        >
          <Typography variant='h4' gutterBottom>
            Notices
          </Typography>

          <Button variant='contained' onClick={() => setIsOpen(true)}>
            Create Notice
          </Button>
        </Stack>
        <List>
          {notices.length > 0 ? (
            notices.map((item) => (
              <ListItem sx={{ background: "#fff", marginY: 2 }}>
                <ListItemIcon>
                  <Avatar sx={{ background: red[600] }}>
                    <NotificationImportant />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={`${item.title} - "${item.property.name}"`}
                  secondary={item.description}
                />
                <Typography>
                  {moment(new Date(item.created_at)).calendar()}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography>Nothing Here</Typography>
          )}
        </List>

        <Card>
          {/* <TableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <MakeNotice
            setOpen={setIsOpen}
            open={isOpen}
            setNotices={setNotices}
          />
        </Card>
      </Container>
    </>
  )
}
