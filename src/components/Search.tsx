interface SearchProps {
  onChange: Function,
  value: string
}

const Search = ({ onChange, value }: SearchProps) => (
  <input
    className="form-control my-3 fs-1 p-4"
    onChange={(e) => onChange(e?.currentTarget?.value)}
    placeholder="Search..."
    type="text"
    value={value}
  />
);

export default Search;
