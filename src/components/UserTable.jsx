import React, { useState } from "react";

function UserTable({ users, onEdit, onDelete }) {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Helper to extract first & last names
  const getFirstName = (name = "") => name.split(" ")[0] || "";
  const getLastName = (name = "") => name.split(" ").slice(1).join(" ") || "";

  const sortedUsers = [...users].sort((a, b) => {
    let valA, valB;

    if (sortColumn === "firstName") {
      valA = getFirstName(a.name).toLowerCase();
      valB = getFirstName(b.name).toLowerCase();
    } else if (sortColumn === "lastName") {
      valA = getLastName(a.name).toLowerCase();
      valB = getLastName(b.name).toLowerCase();
    } else if (sortColumn === "department") {
      valA = a.company?.name?.toLowerCase() || "";
      valB = b.company?.name?.toLowerCase() || "";
    } else {
      valA = a[sortColumn]?.toString().toLowerCase() || "";
      valB = b[sortColumn]?.toString().toLowerCase() || "";
    }

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("firstName")}>First Name</th>
            <th onClick={() => handleSort("lastName")}>Last Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("department")}>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{getFirstName(u.name)}</td>
              <td>{getLastName(u.name)}</td>
              <td>{u.email}</td>
              <td>{u.company?.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <label>Rows per page: </label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
