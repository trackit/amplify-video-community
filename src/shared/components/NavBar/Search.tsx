import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link as GatsbyLink } from 'gatsby'

type SearchTextProps = {
  hover: boolean
  theme: any
}

type SearchProps = {
  to: string
  theme: any
}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SearchText = styled.span<SearchTextProps>`
  color: ${props => props.hover
    ? props.theme.palette.navbar.searchHoverMainColor
    : props.theme.palette.navbar.searchMainColor};
  transition: 0.2s;
  margin-left: 10px;
  font-size: 16px;
`

const SearchButton = styled(GatsbyLink)`
  text-decoration: none;
  margin-left: 20px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.theme.palette.navbar.searchMainColor};
  background-color: ${props => props.theme.palette.navbar.searchBgColor};
  cursor: pointer;
  border-radius: 20px;
  transition: 0.2s;

  &:hover {
    background-color: ${props => props.theme.palette.navbar.searchHoverBgColor};
    border: 2px solid ${props => props.theme.palette.navbar.searchHoverBgColor};
  }
`

const Search = ({ to, theme }: SearchProps) => {
  const [hover, setHover] = useState(false)

  return (
    <SearchWrapper>
      <SearchButton
        theme={theme}
        to={to}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <AiOutlineSearch
          style={{ transition: '0.2s' }}
          size={20}
          color={hover
            ? theme.palette.navbar.searchHoverMainColor
            : theme.palette.navbar.searchMainColor}
        />
        <SearchText hover={hover} theme={theme}>Search</SearchText>
      </SearchButton>
    </SearchWrapper>
  )
}

export default Search
