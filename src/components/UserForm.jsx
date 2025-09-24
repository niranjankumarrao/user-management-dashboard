import React, { useState, useEffect } from "react";

function UserForm({ user, onClose, onAdd, onUpdate }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      // Pre-fill values when editing
      const nameParts = user.name?.split(" ") || ["", ""];
      setFirstName(nameParts[0]);
      setLastName(nameParts[1] || "");
      setEmail(user.email || "");
      setDepartment(user.company?.name || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !department) {
      showError("All fields are required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError("Invalid email format.");
      return;
    }

    // Build user object
    const newUser = {
      id: user?.id || undefined, // let App.js assign new id
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    if (user) {
      onUpdate(user.id, newUser);
    } else {
      onAdd(newUser);
    }

    onClose();
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000); // auto-clear after 3s
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user ? "Edit User" : "Add User"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {user ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
