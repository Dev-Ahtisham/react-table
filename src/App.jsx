import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function App() {
  const [apiData, setApiData] = useState();
  const [tableData, setTableData] = useState();
  const [searchedVal, setSearchedVal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await axios.get(
          "https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100"
        );
        setApiData(apiResponse.data.data);
        setTableData(apiResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchByName = (searchedName) => {
    const filteredData = tableData.filter((item) =>
      item.name.includes(searchedName)
    );
    setTableData(filteredData);
  };

  const handleSearchByEmail = (searchedEmail) => {
    const filteredData = tableData.filter((item) =>
      item.email.includes(searchedEmail)
    );
    setTableData(filteredData);
  };

  const handleCancelSearch = () => {
    setTableData(apiData);
    setSearchedVal("");
  };

  const tableColumns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "date_of_birth", headerName: "Date of Birth", width: 150 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <img
            style={{ width: "100%", height: "150%" }}
            src={params.row.imageUrl}
          />
        );
      },
    },
  ];

  return (
    <div className="mainContainer">
      <div className="subContainer">
        <input
          value={searchedVal}
          onChange={(e) => setSearchedVal(e.target.value)}
          placeholder="Search..."
        />

        <div className="btnContainer">
          <Button
            className="button"
            variant="outlined"
            onClick={() => handleSearchByName(searchedVal)}
          >
            Search By Name
          </Button>
          <Button
            className="button"
            variant="outlined"
            onClick={() => handleSearchByEmail(searchedVal)}
          >
            Search By Email
          </Button>
          <Button
            className="button"
            variant="outlined"
            onClick={handleCancelSearch}
          >
            Cancel
          </Button>
        </div>

        {tableData && (
          <DataGrid
            rows={tableData}
            columns={tableColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
