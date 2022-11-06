import React, { useState } from "react";
import "./SearchBar.css";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { getDomainData } from "../../../actions/dashboard-actions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(getDomainData(text));
    setText("");
  };

  return (
    <div className="searchBox">
      <form>
        <div className="searchBox__input">
          <TextField
            multiline
            fullWidth={true}
            inputProps={{}}
            maxRows={4}
            sx={{ marginLeft: 1 }}
            value={text}
            placeholder="Enter URL"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          className="searchBox__searchButton"
          onClick={handleSearch}
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
