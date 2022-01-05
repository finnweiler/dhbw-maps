import React, { useState, useEffect } from 'react'
import { List, ListItem } from 'framework7-react'
import { FaSearch } from 'react-icons/fa'
import localforage from 'localforage'
import '../css/searchBar.css'
import { Geocoding, ReverseGeocoding } from '../js/geocoding'
import getWikiData from '../js/wikipedia'

const SearchBar = () => {
  const [showResults, setShowResults] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [height, setHeight] = useState(0)

  const loadSearchHistory = () => {

    localforage.getItem('searchHistory').then(array => {
      if (array) {
        setSearchHistory(array)
      }else {
        console.log('No search history found')
      }
    })
  }

  const handleSearch = async (entryText) => {

    if (entryText !== '') {
      setShowResults(false)
      let foundSearchTextInSearchHistory = false
      let foundSearchHistoryEntry = {}

      searchHistory.map(entry => {
        if (entryText === entry.text) {
          foundSearchTextInSearchHistory = true
          foundSearchHistoryEntry = entry
        }
      })

      if (!foundSearchTextInSearchHistory) {
        let newCoords = await Geocoding(searchText)
        let newGeolocation = await ReverseGeocoding(newCoords.lng, newCoords.lat)
        const cityName = newGeolocation.address.city || newGeolocation.address.town || searchText
        let newWikiData = await getWikiData(cityName)
        console.log('save: ' + newGeolocation.display_name)
        newWikiData = { ...newWikiData, city: cityName, cords: newCoords, address: newGeolocation.display_name }

        let newHistoryEntry = {
          text: searchText,
          coords: newCoords,
          wikiData: newWikiData
        }
        let newHistory = [...searchHistory, newHistoryEntry]
      
        setSearchHistory(newHistory)
  
        localforage.setItem('searchHistory', newHistory).then(() => {
          console.log('Saved search history')
          console.table(newHistory)
        })

        localforage.setItem('currentSearchHistoryEntry', newHistoryEntry).then(() => {
          console.log('Saved current searched history entry')
          console.table(newHistoryEntry)
        })
        
        localforage.setItem('wikiPanelOpened', true)

      } else {
        localforage.setItem('currentSearchHistoryEntry', foundSearchHistoryEntry).then(() => {
          console.log('Saved current searched history entry')
          console.table(foundSearchHistoryEntry)
        })

        localforage.setItem('wikiPanelOpened', true)
      }
    }
  }

  useEffect(() => {
    loadSearchHistory()
    setHeight(document.getElementById('customSearchBarInputEl').clientHeight)
  }, [])

  const Results = () => {

    const ResultItems = () => {
      return searchHistory.map((entry, index) => {
        return (
          <ListItem className="searchBarResult" key={index} title={entry.text} onClick={() => {setSearchText(entry.text), handleSearch(entry.text)}} />
        )
      })
    }

    return (searchHistory.length > 0 ? <ResultItems /> : <ListItem className="searchBarResult" title="No results found" />)
  }

  return (
    <div style={{zIndex: 1000, position: 'absolute', width: '50%', left: '50%', top: '1%', transform: 'translate(-50%,0)'}}>
      <form onSubmit={(event) => {event.preventDefault(), handleSearch(searchText)}} className={'customSearchBarWrapper'}>
        <input
          id={'customSearchBarInputEl'}
          className={'customSearchBarMar'}
          autoComplete={'off'}
          placeholder={'Search for a location'}
          value={searchText}
          onChange={event => {setSearchText(event.target.value), setShowResults(true)}}
        ></input>
        <button style={{height: height}} className={'customSearchBarButton'}><FaSearch /></button>
      </form>
      <div style={{ display: searchText ? 'block' : 'none' }}>
        {showResults ?
          <List className='search-list searchbar-found' style={{ margin: 0 }}>
            <Results />
          </List>
          :null}
      </div>
    </div>
  )
}

export default SearchBar