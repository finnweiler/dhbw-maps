import React, { useState, useEffect } from 'react'
import { Searchbar, List, ListItem, theme } from 'framework7-react'

const SearchBar = () => {
  let [searchText, setSearchText] = useState('')
  let [searchHistory, setSearchHisotry] = useState(["Test"])

  const loadSearchHistory = () => {

  }

  useEffect(() => {
    loadSearchHistory()
  })

  const clickedListItem = (historyEntry) => {
    //Send entry to reverse geocoding
  }

  return (
    <div style={{position: 'absolute', zIndex: 1}}>
      <Searchbar
        searchContainer='.search-list'
        searchIn='.item-title'
        disableButton={!theme.aurora}
        onChange={(event) => {console.log(event)}}
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