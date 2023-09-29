import { Button } from "reactstrap";

const getColumns = (handleEdit, handleDelete) => {
  return [
    // {
    //   Header: "#",
    //   accessor: (row, index) => index + 1, // Index count
    //   Filter: false,
    //   sortType: "asc",
    // },
    {
      Header: "Whatsapp#",
      accessor: "number",
      Filter: true,
    },
    {
      Header: "Code",
      accessor: "code",
      Filter: false,
    },
    {
      Header: "Proxy/port",
      accessor: (row) => {
        const ip = row.ip; // Replace "proxy" with the actual property name in your data
        const port = row.port; // Replace "port" with the actual property name in your data
        return `${ip} / ${port}`;
      },
      Filter: false,
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: false,
    },
    {
      Header: "Assigned To",
      accessor: "assignedTo",
      Filter: false,
    },
    {
      Header: "Action",
      accessor: "",
      Filter: false,
      disableSortBy: true,
      Cell: ({ row }) => (
        <div>
          <Button color="secondary" className="mx-2" onClick={() => handleEdit(row)}>
            <i className="fa fa-pencil-alt" />
          </Button>

          <Button color="danger" onClick={() => handleDelete(row)}>
            <i className="fa fa-trash" />
          </Button>
        </div>
      ),
    },
  ];
};

export default getColumns;
