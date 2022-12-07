import React, { useState, useEffect } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import TicketList from './TicketList';
import '../styles/Search.css'

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
ß
            <div className='results'>
                { <SearchList filteredCatalog={filteredCatalog} /> }
            </div>
            <div className='results'>
                { <TicketList filteredCatalog={filteredTickets} /> }
            </div>
            </div>
        );

    };
    return (
      <section className="Search">
        <div className="SearchContainer">
            <p className="SearchLabel">
                Search title if needed
            </p>
                <input className='SearchInput' type='text' placeholder="Type CVE, LPS, or LPE..." onChange={handleChange}></input>
        </div>
        {searchResults()}
       
      </section>
    );
  }
  
  export default Search;