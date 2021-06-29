import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Api from "../Helpers/Api";
import "../Styles/SearchBar.css";

const SearchBar = (props) => {
  const [books, setBooks] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const inputData = useRef();
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    const newfilter = books.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newfilter);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await Api.get();
      setBooks(data.results.books);
    }
    fetchData();
  }, []);
  const clearInput = () => {
    setFilterData([]);
    inputData.current.value = "";
  };
  return (
    <div className="search">
      <h1 className="searchHeader">Best Sellers</h1>
      <div className="searchInputs">
        <input
          ref={inputData}
          type="text"
          placeholder={props.placeholder}
          onChange={handleFilter}
        ></input>
        <div className="searchIcon">
          {filterData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={clearInput} />
          )}
        </div>
      </div>
      {filterData.length !== 0 && (
        <div className="dataResult">
          {filterData.map((book, key) => {
            return (
              <a
                className="dataItem"
                target="_blank"
                rel="noopener noreferrer"
                href={book.amazon_product_url}
                key={key}
              >
                <p>{book.title}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
