import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const SearchBug = () => {
  const [input, setInput] = useState({
    bugId: "",
    bugTitle: "",
  });
  const [bugDetails, setBugDetails] = useState([]);
  const [bugCount, setBugCount] = useState(0);

  // Handle function
  function handleChange(event) {
    setBugCount(0);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleSearchByBugId(event) {
    event.preventDefault();
    fetch(Constants.BUG_URL + parseInt(input.bugId))
      .then((response) => response.json())
      .then((data) => {
        setBugDetails((bugDetails) => [...bugDetails, data]);
        var count = 0;
        bugDetails.map((i) => {
          count = count + 1;
        });
        setBugCount(count);
      });
    input.bugId = "";
  }

  function handleSearchByBugTitle(event) {
    event.preventDefault();
    // setBugCount(0);
    fetch(Constants.BUG_BY_TITLE_URL + input.bugTitle)
      .then((response) => response.json())
      .then((data) => {
        setBugDetails((bugDetails) => [...bugDetails, data]);
        setBugCount(data.length);
      });
  }
  return (
    <div>
      {/* Search bug by bug-id */}
      <div class="input-group mt-2">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Bug-ID"
          required
          autoComplete="off"
          name="bugId"
          value={input.bugId}
          onChange={handleChange}
        />
        <div class="input-group-append">
          <button
            class="btn btn-danger"
            name="submit"
            type="button"
            onClick={handleSearchByBugId}
          >
            Search
          </button>
        </div>
      </div>

      {/* Search by bug title */}
      <div class="input-group mt-2">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Bug-Title"
          required
          autoComplete="off"
          name="bugTitle"
          value={input.bugTitle}
          onChange={handleChange}
        />
        <div class="input-group-append">
          <button
            class="btn btn-danger"
            type="button"
            name="submit"
            onClick={handleSearchByBugTitle}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <span class="badge badge-pill badge-primary pb-1 mt-2">
          {bugCount !== 0
            ? "Found " + bugCount + (bugCount > 1 ? " items" : " item")
            : "No result found"}
          {}
        </span>
      </div>
    </div>
  );
};

export default SearchBug;
