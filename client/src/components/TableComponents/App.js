import React, { useMemo } from 'react';
import {
  Container
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetApplicant } from '../../Redux/updateApplicantSlice';

const App = ({ ApplicantData }) => {
  const data = ApplicantData;
  const dispatch = useDispatch()

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        disableFilters: true,
        disableSortBy: true,
        Cell: (cellProps) => {
          return <span ><p>{Number(cellProps.row.id) + 1}</p></span>
        }

      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (cellProps) => {
          return <Link to={`/view/${cellProps.row.original._id}`} onClick={() => dispatch(GetApplicant(cellProps.row.original))} ><p>{cellProps.value}</p></Link>
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'equals',
        Cell: (cellProps) => {

          return <Link to="ChangeApplicantStatus" onClick={() => dispatch(GetApplicant(cellProps.row.original))} ><p>{cellProps.value}</p></Link>
        }
      },
      {
        Header: 'Owner',
        accessor: 'nextRound',
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Role',
        accessor: 'role',
        Filter: SelectColumnFilter,
        filter: 'equals'
      },
      {
        Header: 'Experience',
        accessor: 'experience',
        Cell: (cellProps) => {
          let exp = cellProps.value
          return <span >{exp > 0 ? exp === 1 ? exp + " year" : exp + " years" : "Fresher"}</span>
        },
        disableFilters: true

      },
      {
        Header: 'AppliedOn',
        accessor: 'createdAt',
        disableFilters: true,
        Cell: (cellProps) => {
          return <span ><p>{cellProps.value.substr(0, 10)}</p></span>
        }
      },
      {
        Header: 'UpdatedOn',
        accessor: 'updatedAt',
        disableFilters: true,
        Cell: (cellProps) => {
          return <span ><p>{cellProps.value.substr(0, 10)}</p></span>
        }

      }
    ],
    [dispatch]
  );

  return (
    <Container >
      <TableContainer
        columns={columns}
        data={data}
      />
    </Container>
  );
};

export default App;
