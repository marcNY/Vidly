import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <input
        value={value}
        placeholder="Search..."
        onChange={e => onChange(e.currentTarget.value)}
        className="form-control"
      />
    </div>
  );
};

export default SearchBox;
