import React, { useState, useEffect } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import TicketList from './TicketList';

function Search() {

    const [searchField, setSearchField] = useState("");
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const  [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/search?input='+ searchField)
           .then((response) => response.json())
           .then((data) => {
              if(data[0] != null)
                setFilteredCatalog(data[0]);
              if(data[1] != null)
                setFilteredTickets(data[1]);
           })
           .catch((err) => {
              console.log(err.message);
           });
        setLoading(false);
     }, [searchField]);


    const handleChange = e =>
    {
        console.log("eztet írtad:" + e.target.value );
        const lowerCase = e.target.value.toLowerCase();
        // todo: sanitize input
        setSearchField(lowerCase);
    };


    function searchResults()
    {
        return(
            <div className="SearchResult">

            <Scroll>
                { <SearchList filteredCatalog={filteredCatalog} /> }
            </Scroll>
            <Scroll>
                { <TicketList filteredCatalog={filteredTickets} /> }
            </Scroll>
            </div>
        );

    };
    return (
      <section className="Search">
        <div className="SearchInput">
            <div className="SearchLabel">
                <h2>Keressé</h2>
            </div>
            <div className="SearchInputField">
                <input type="search" placeholder="írjá" onChange={handleChange}></input>
            </div>
        </div>
        {searchResults()}
       
      </section>
    );
  }
  
  export default Search;