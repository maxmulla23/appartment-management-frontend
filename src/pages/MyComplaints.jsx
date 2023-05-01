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
import { deepPurple, green, red, yellow } from "@mui/material/colors"
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

export default function MyComplaints() {
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
      const response = await axios.get(
        `notice/${user.user.House[0].propertyId}`
      )
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
      <Grid container spacing={2} padding={3}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Paper
            sx={{
              padding: 4,
              display: "flex",
              gap: 4,
            }}
          >
            <Avatar sx={{ bgcolor: green[500], width: 70, height: 70 }}>
              <Person2Outlined />
            </Avatar>

            <Stack
              direction='column'
              alignItems='flex-start'
              justifyContent={"center"}
            >
              <Typography variant='h6' noWrap>
                {user?.user.firstname} {user?.user.lastname}
              </Typography>
              <Typography variant='subtitle' noWrap>
                {user?.user.email}
              </Typography>
              {/* <Typography variant='subtitle' noWrap>
                {user?.user.role.name}
              </Typography> */}
            </Stack>
          </Paper>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Paper
            sx={{
              padding: 4,
              display: "flex",
              gap: 4,
            }}
          >
            <Avatar sx={{ bgcolor: yellow[900], width: 70, height: 70 }}>
              <HouseOutlined />
            </Avatar>

            <Stack
              direction='column'
              alignItems='flex-start'
              justifyContent={"center"}
            >
              <Typography variant='h6' noWrap>
                House Details
              </Typography>

              {user?.user.House.length > 0 ? (
                <>
                  <Typography>
                    House Number: {user?.user.House[0].house_number}
                  </Typography>
                  {/* <Typography>No House Details Yet</Typography> */}
                </>
              ) : (
                <Typography>No House Details Yet</Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mt: 6 }} gutterBottom>
          Notices
        </Typography>
        <List>
          {notices.length > 0 ? (
            notices.map((item) => (
              <ListItem sx={{ background: "#fff", marginY: 2 }}>
                <ListItemIcon>
                  <Avatar sx={{ background: red[400] }}>
                    <NotificationImportant />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
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
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          my={5}
        >
          <Typography variant='h4' gutterBottom>
            My Complaints
          </Typography>
          {user.user.House.length > 0 && (
            <Button variant='contained' onClick={() => setIsOpen(true)}>
              Make Complaint
            </Button>
          )}
        </Stack>

        <Card>
          {/* <TableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={issues.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredAppartments
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      // const { id, name, role, status, company, avatarUrl, isVerified, issues? } = row;
                      const {
                        id,
                        created_at,
                        description,
                        title,
                        owner,
                        house,
                      } = row
                      const selectedUser = selected.indexOf(id) !== -1

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={selectedUser}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            align='left'
                            scope='row'
                            padding='none'
                          >
                            <Typography variant='subtitle2' noWrap>
                              {new Date(created_at).toLocaleDateString(
                                "en-us",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                {owner.firstname[0].toUpperCase()}
                              </Avatar>
                              <Typography variant='subtitle2' noWrap>
                                {owner.firstname} {owner.lastname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>
                            {house.house_number}
                          </TableCell>

                          <TableCell align='left'>{title}</TableCell>
                          <TableCell align='left'>{description}</TableCell>

                          {/* <TableCell align="left">
                            <Typography
                              variant="body2"
                              sx={{
                                color: userId ? green[600] : purple[900],
                                textAlign: 'center',
                                width: 90,
                                borderRadius: 2,
                                background: userId ? green[100] : purple[100],
                                fontWeight: 'bold',
                                fontSize: 11
                              }}
                            >
                             
                            </Typography>
                          </TableCell> */}
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant='h6' paragraph>
                            Not found
                          </Typography>

                          <Typography variant='body2'>
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={issues?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* <AssignUserHouse
            setOpen={setIsOpen}
            open={isOpen}
            houses={houses}
            // userId={current}
            // properties={properties}
            // setHouses={setHouses}
          /> */}
          <MakeComplaint
            setOpen={setIsOpen}
            open={isOpen}
            setIssues={setIssues}
          />
        </Card>
      </Container>
    </>
  )
}
