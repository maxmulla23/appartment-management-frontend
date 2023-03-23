import { filter } from 'lodash'
import { useEffect, useState } from 'react'
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
  Avatar
} from '@mui/material'
import { deepPurple } from '@mui/material/colors'
// import TableHeader from '../components/dashboard/TableHeader'
// import TableToolbar from '../components/dashboard/TableToolbar'
import axios from 'axios'
// import { getAllProperties } from '../services/appartments.service'
import TableHeader from '../components/dashboard/TableHeader'
import AssignUserHouse from '../components/modals/AssignUserHouse'

const TABLE_HEAD = [
  { id: 'name', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'house', label: 'House', alignRight: false }
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
  return order === 'desc'
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
      (user) => user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }
  return stabilizedThis.map((el) => el[0])
}

export default function Complaints() {
  const [page, setPage] = useState(0)

  const [users, setUsers] = useState([])

  const [houses, setHouses] = useState([])

  const [current, setCurrent] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [isOpen, setIsOpen] = useState(false)

  const [Errmsg, setErrmsg] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.email)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email)
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

  const handleOpen = (id) => {
    setIsOpen(true)
    setCurrent(id)
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

  const filteredAppartments = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  )

  const isNotFound = !filteredAppartments.length && !!filterName

  if (isLoading) {
    return <p>Loading ... </p>
  }

  return (
    <>
      <Container maxWidth="xl">
        <Card>
          <Typography variant="h5" sx={{ mx: 2, py: 3, fontWeight: 800 }}>
            Complaints
          </Typography>
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
                  rowCount={users.length}
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
                      // const { id, name, role, status, company, avatarUrl, isVerified, users? } = row;
                      const { id, firstname, lastname, email, role, House } =
                        row
                      const selectedUser = selected.indexOf(email) !== -1

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, email)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                {firstname[0].toUpperCase()}
                              </Avatar>
                              <Typography variant="subtitle2" noWrap>
                                {firstname} {lastname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell
                            component="th"
                            align="left"
                            scope="row"
                            padding="none"
                          >
                            <Typography variant="subtitle2" noWrap>
                              {email}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">{role.name}</TableCell>
                          <TableCell align="left">
                            {House.length > 0 ? (
                              <Typography>{House[0].house_number}</Typography>
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleOpen(id)}
                              >
                                Assign House
                              </Button>
                            )}
                          </TableCell>

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
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center'
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
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
            component="div"
            count={users?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <AssignUserHouse
            setOpen={setIsOpen}
            open={isOpen}
            houses={houses}
            userId={current}
            // properties={properties}
            // setHouses={setHouses}
          />
        </Card>
      </Container>
    </>
  )
}
