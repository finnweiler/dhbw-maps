import React, { useState, useEffect } from 'react'
import { Searchbar, List, ListItem, theme } from 'framework7-react'
import localforage from 'localforage'
import '../css/searchBar.css'

const SearchBar = () => {
  let [searchText, setSearchText] = useState('')
  let [searchHistory, setSearchHistory] = useState([])

  const loadSearchHistory = () => {
    localforage.getItem('searchHistory').then(array => {
      if (array) {
        setSearchHistory(array)
      }else {
        console.log('No search history found')
      }
    })
  }

  const clickedListItem = (historyEntry) => {
    // TODO: Send entry to reverse geocoding

  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      let newHistory = [...searchHistory, searchText]
      
      setSearchHistory(newHistory)
  
      localforage.setItem('searchHistory', newHistory).then(() => {
        console.log('Saved search history')
        console.table(newHistory)
      })
    }
  }

  useEffect(() => {
    loadSearchHistory()
  }, [])

  const Results = () => {

    let filteredArray = searchHistory.filter(entry => entry.toLowerCase().includes(searchText.toLowerCase()))

    const ResultItems = () => {
      return filteredArray.map((entry, index) => {
        return (
          <ListItem className="searchBarResult" key={index} title={entry} onClick={() => clickedListItem(entry)} />
        )
      })
    }

    return (filteredArray.length > 0 ? <ResultItems /> : <ListItem className="searchBarResult" title="No results found" />)

  }


  return (
    <div style={{zIndex: 1000, position: 'absolute', width: '50%', left: '50%', top: '1%', transform: 'translate(-50%,0)'}}>
      <input 
        className={'customSearchBarMar'} 
        placeholder="Search for a location..." 
        onChange={event => setSearchText(event.target.value)}
        onKeyUp={event => handleSearch(event)}
      ></input>
      <div style={{ display: searchText ? 'block' : 'none' }}>
        <List className='search-list searchbar-found' style={{ margin: 0 }}>
          <Results />
        </List>
      </div>
    </div>
  )
}

export default SearchBar