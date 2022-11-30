import { useState } from "react";

interface SearchProps {
  onChange: Function;
}

const Search = ({ onChange }: SearchProps) => {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<any>) {
    const { value } = e.currentTarget;
    setValue(value);
    onChange(value);
  }

  return (
    <input
      className="form-control my-3 fs-1 p-4"
      onChange={handleChange}
      placeholder="Search..."
      type="text"
      value={value}
    />
  );
};

export default Search;
