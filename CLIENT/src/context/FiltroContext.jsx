import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [sortOrder, setSortOrder] = useState('price')
  const [sortDirection, setSortDirection] = useState('asc')

  const updateSort = (order, direction) => {
    setSortOrder(order)
    setSortDirection(direction)
  }

  return (
    <FilterContext.Provider value={{ sortOrder, sortDirection, updateSort }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
