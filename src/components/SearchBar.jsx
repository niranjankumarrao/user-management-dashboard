import React, { useState } from "react";

function SearchBar({ users, setFilteredUsers }) {
  const [query, setQuery] = useState("");

  //  Helpers to split first & last name
  const getFirstName = (name = "") => name.split(" ")[0] || "";
  const getLastName = (name = "") => name.split(" ").slice(1).join(" ") || "";

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);

    const filtered = users.filter((u) =>
      getFirstName(u.name).toLowerCase().includes(q) ||
      getLastName(u.name).toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.company?.name.toLowerCase().includes(q)
    );

    setFilteredUsers(filtered);
  };

  return (
    <input
      type="text"
      className="form-control"
      style={{ width: "250px" }}
      placeholder="Search by first, last, email, or department..."
      value={query}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;
