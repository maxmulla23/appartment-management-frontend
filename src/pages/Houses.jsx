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
} from "@mui/material"
import { green, orange, purple } from "@mui/material/colors"
import TableHeader from "../components/dashboard/TableHeader"
import TableToolbar from "../components/dashboard/TableToolbar"
import axios from "axios"
import { getAllProperties } from "../services/appartments.service"
import CreateHouse from "../components/modals/CreateHouse"
import { CenterFocusStrong } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "name", label: "House Number", alignRight: false },
  { id: "appartment", label: "Appartment", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "status", label: "status", alignRight: false },
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
      (_house) =>
        _house.house_number.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }
  return stabilizedThis.map((el) => el[0])
}

export default function Houses() {
  const [open, setOpen] = useState(null)

  const [houses, setHouses] = useState([])

  const [properties, setProperties] = useState([])

  const [page, setPage] = useState(0)

  const [order, setOrder] = useState("asc")

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState("name")

  const [filterName, setFilterName] = useState("")

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user.user.roleId === 2) {
      navigate("/dashboard/home")
    }
    getHouses()
    getProperties()
  }, [])

  const getHouses = async () => {
    try {
      const response = await axios.get("house")
      console.log(response)
      setHouses(response.data)
    } catch (error) {
      console.log(error)
    }
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

  const [Errmsg, setErrmsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = houses.map((n) => n.house_number)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, house_number) => {
    const selectedIndex = selected.indexOf(house_number)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, house_number)
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

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - houses.length) : 0

  const filteredAppartments = applySortFilter(
    houses,
    getComparator(order, orderBy),
    filterName
  )

  const isNotFound = !filteredAppartments.length && !!filterName

  if (isLoading) {
    return <p>Loading ... </p>
  }

  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            All Houses
          </Typography>
          <Button
            variant='contained'
            // startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setIsOpen(true)}
          >
            New House
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={houses.length}
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
                      // const { id, name, role, status, company, avatarUrl, isVerified, houses? } = row;
                      const { id, house_number, property, userId } = row
                      const selectedUser = selected.indexOf(house_number) !== -1

                      return (
                        <TableRow
                          hover
                          key={house_number}
                          tabIndex={-1}
                          role='checkbox'
                          selected={selectedUser}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) =>
                                handleClick(event, house_number)
                              }
                            />
                          </TableCell>
                          <TableCell align='left'>{id}</TableCell>
                          <TableCell
                            component='th'
                            align='left'
                            scope='row'
                            padding='none'
                          >
                            <Typography variant='subtitle2' noWrap>
                              {house_number}
                            </Typography>
                          </TableCell>

                          <TableCell align='left'>{property.name}</TableCell>
                          <TableCell align='left'>
                            {property.location}
                          </TableCell>

                          <TableCell align='left'>
                            <Typography
                              variant='body2'
                              sx={{
                                color: userId ? green[600] : purple[900],
                                textAlign: "center",
                                width: 90,
                                borderRadius: 2,
                                background: userId ? green[100] : purple[100],
                                fontWeight: "bold",
                                fontSize: 11,
                              }}
                            >
                              {userId ? "occupied" : "vacant"}
                            </Typography>
                          </TableCell>
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
            count={houses?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <CreateHouse
        setOpen={setIsOpen}
        open={isOpen}
        properties={properties}
        setHouses={setHouses}
      />
    </>
  )
}
