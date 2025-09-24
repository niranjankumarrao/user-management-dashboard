import React, { useState } from "react";

function FilterPopup({ users, setFilteredUsers, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const applyFilter = () => {
    let filtered = users;

    if (firstName) {
      filtered = filtered.filter((u) =>
        u.name.split(" ")[0].toLowerCase().includes(firstName.toLowerCase())
      );
    }
    if (lastName) {
      filtered = filtered.filter((u) =>
        u.name.split(" ").slice(-1)[0].toLowerCase().includes(lastName.toLowerCase())
      );
    }
    if (email) {
      filtered = filtered.filter((u) =>
        u.email.toLowerCase().includes(email.toLowerCase())
      );
    }
    if (department) {
      filtered = filtered.filter((u) =>
        u.company?.name.toLowerCase().includes(department.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    onClose();
  };

  const resetFilter = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setFilteredUsers(users); // reset back to all users
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Filter Users</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={resetFilter}>
                Reset
              </button>
              <button className="btn btn-primary" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
