import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(() => showError("Failed to fetch users."))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Helper to auto-clear error
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  const handleAddUser = (user) => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", user)
      .then((res) => {
        //  give unique id (next available)
        const newUser = { ...res.data, id: users.length + 1 };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch(() => showError("Failed to add user."));
  };

  const handleUpdateUser = (id, updatedUser) => {
  // Try API call only for original JSONPlaceholder users (id <= 10)
  if (id <= 10) {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(res => {
        const updated = users.map(u => (u.id === id ? res.data : u));
        setUsers(updated);
        setFilteredUsers(updated);
      })
      .catch(() => setError("Failed to update user."));
  } else {
    // For locally added users, just update state
    const updated = users.map(u => (u.id === id ? updatedUser : u));
    setUsers(updated);
    setFilteredUsers(updated);
  }
};


  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const remaining = users.filter((u) => u.id !== id);
        setUsers(remaining);
        setFilteredUsers(remaining);
      })
      .catch(() => showError("Failed to delete user."));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User Management Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="d-flex justify-content-between mb-3">
            <SearchBar users={users} setFilteredUsers={setFilteredUsers} />
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  setEditingUser(null);
                  setShowForm(true);
                }}
              >
                Add User
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowFilter(true)}
              >
                Filter
              </button>
            </div>
          </div>

          <UserTable
            users={filteredUsers}
            onEdit={(user) => {
              setEditingUser(user);
              setShowForm(true);
            }}
            onDelete={handleDeleteUser}
          />

          {showForm && (
            <UserForm
              user={editingUser}
              onClose={() => setShowForm(false)}
              onAdd={handleAddUser}
              onUpdate={handleUpdateUser}
            />
          )}

          {showFilter && (
            <FilterPopup
              users={users}
              setFilteredUsers={setFilteredUsers}
              onClose={() => setShowFilter(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
