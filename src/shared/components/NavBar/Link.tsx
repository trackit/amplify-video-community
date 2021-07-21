import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const InternalLink = styled(GatsbyLink)`
  text-decoration: none;
  padding: 0 20px;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.palette.navbar.textColor};
  &:hover {
    color: ${(props) => props.theme.palette.navbar.textHoverColor};
  }
`

const LinkText = styled.span`
  color: inherit;
`

const Item = styled.li`
  display: flex;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.palette.navbar.textHoverColor};
  }
`

const ExternalLink = styled.a`
  text-decoration: none;
  padding: 0 20px;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.palette.navbar.textColor};
  &:hover {
    color: ${(props) => props.theme.palette.navbar.textHoverColor};
  }
`

type HeaderLinkProps = {
  theme: any
  to: string
  content: string
  isExternal?: boolean
}

const HeaderLink = ({ to, content, isExternal, theme }: HeaderLinkProps) => {
  if (isExternal) return (
    <Item theme={theme}>
      <ExternalLink
        theme={theme}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkText>{content}</LinkText>
      </ExternalLink>
    </Item>
  )
  return (
    <Item theme={theme}>
      <InternalLink to={to} theme={theme}>
        <LinkText>{content}</LinkText>
      </InternalLink>
    </Item>
  )
}

export default HeaderLink
