import React, { useState, useEffect } from 'react'
import { Searchbar, List, ListItem, theme } from 'framework7-react'

const SearchBar = () => {
  let [searchText, setSearchText] = useState('')
  let [searchHistory, setSearchHisotry] = useState(["Test"])

  const loadSearchHistory = () => {
    //Load history from IndexedDB
  }

  useEffect(() => {
    loadSearchHistory()
  })

  const clickedListItem = (historyEntry) => {
    //Send entry to reverse geocoding
  }

  return (
    <div style={{zIndex: 1000, position: 'absolute', width: '50%', left: '50%', transform: 'translate(-50%,0)'}}>
      <Searchbar
        searchContainer='.search-list'
        searchIn='.item-title'
        disableButton={!theme.aurora}
        onChange={(event) => {setSearchText(event.target.value)}}
      />
      <List className='searchbar-not-found'>
        <ListItem title='Keine Suchergebnisse...'></ListItem>
      </List>
      <List className='search-list searchbar-found'>
        {searchHistory.map((historyEntry, index) => {
          return (
            <ListItem 
              key={'listItem-' + historyEntry + '-' + index}
              title={historyEntry}
              onClick={() => {clickedListItem(historyEntry)}}
            />
          )
        })}
      </List>
    </div>
  )
}

export default SearchBar