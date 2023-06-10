import React, { useState } from 'react'
import { SearchBar } from './searchBar'
import { PairTable } from './pairTables'


export default function(){

  // const filteredTokens: Token[] = useMemo(() => {
  //   return filterTokens(Object.values(allTokens), debouncedQuery)
  // }, [allTokens, debouncedQuery])
  return (
    <section>
      <SearchBar />
      <PairTable />
    </section>
  )
}