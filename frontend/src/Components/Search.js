import React, { useState, useEffect } from 'react';
import SearchList from './SearchList';
import TicketList from './TicketList';
import '../styles/Search.css'

function Search() {

    const [searchField, setSearchField] = useState("");
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const  [loading, setLoading] = useState(false);

    useEffect(() => {
        if(searchField === ''){
            setFilteredCatalog([]);

        }
        else{
            const timer = setTimeout(() => {
                setLoading(true);
                fetch('http://localhost:8080/search?input='+ searchField)
                   .then((response) => response.json())
                   .then((data) => {
                      if(data.length !== 0)
                        setFilteredCatalog(data);
                   })
                   .catch((err) => {
                      console.log(err.message);
                   });
                setLoading(false);
            }, 700);
            return () => clearTimeout(timer);
        }
        
     }, [searchField]);


    const handleChange = e =>
    {
        const lowerCase = e.target.value.toLowerCase();
        // todo: sanitize input
        setSearchField(lowerCase);
    };


    function searchResults()
    {
        const hiddenCatalog = searchField === '';
    
        return(
            <div className="SearchResult">

            <div className='results' hidden={hiddenCatalog}>
                { <SearchList filteredCatalog={filteredCatalog} /> }
            </div>
            </div>
        );

    };
    return (
      <section className="Search">
        <div className="SearchContainer">
            <p className="SearchLabel">
                Let's see if we can find something ;)
            </p>
                <input className='SearchInput' type='text' placeholder="Type CVE, LPS, or LPE..." onChange={handleChange}></input>
        </div>
        {searchResults()}
       
      </section>
    );
  }
  
  export default Search;