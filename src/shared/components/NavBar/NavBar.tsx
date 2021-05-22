import * as React from "react"

import styled from 'styled-components'

import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from "gatsby"
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'

const NavBarSection = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const NavBarHeader = styled.header`
  ${NavBarSection};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
  background-color: #d6493f;
`;

const NavBarTitle = styled.h2`
  ${NavBarHeader};
  margin-right: auto;
`;

const NavBarLinks = styled.ul`
  ${NavBarHeader};
  list-style: none;
  display: flex;
`;

const NavBarLinksHref = styled(Link)`
  ${NavBarHeader};
  font-weight: 500;
  font-size: 18px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  
  &:hover{
    font-weight: bold;
    font-size: 20px;
  }
`;

const NavBarLinksList = styled.li`
  ${NavBarHeader};
  padding: 0 20px;
`;

const TitleHref = styled(Link)`
  ${NavBarHeader};
  margin-right: auto;
  text-decoration: none;
  color: white;
`;



const NavBar = () => {
    const [groups, setGroups] = useState<Array<string>>([])

    useEffect(() => {
        Auth.currentSession().then((data) => {
            const groupsData = data.getIdToken().payload['cognito:groups']
            if (groupsData !== undefined) setGroups(groupsData)
        })
    }, [])

    return (
        <NavBarSection>
            <NavBarHeader>
                <NavBarTitle>
                    <TitleHref to="/" >Amplify Video</TitleHref>
                </NavBarTitle>
                <NavBarLinks>
                    <NavBarLinksList>
                        <NavBarLinksHref to="/" >Home</NavBarLinksHref>
                    </NavBarLinksList>
                    <NavBarLinksList>
                        <NavBarLinksHref to="/videos" >Videos</NavBarLinksHref>
                    </NavBarLinksList>
                    <NavBarLinksList>
                        <NavBarLinksHref to="/live" >Live</NavBarLinksHref>
                    </NavBarLinksList>
                    <NavBarLinksList>
                        <NavBarLinksHref to="/webinars" >Webinars</NavBarLinksHref>
                    </NavBarLinksList>
                    <NavBarLinksList>
                        <NavBarLinksHref to="/search" ><AiOutlineSearch /></NavBarLinksHref>
                    </NavBarLinksList>
                    {groups.includes('Admin') && (
                        <NavBarLinksList>
                            <NavBarLinksHref to="/admin">
                                <AiOutlineSetting />
                            </NavBarLinksHref>
                        </NavBarLinksList>
                    )}
                </NavBarLinks>
            </NavBarHeader>
        </NavBarSection>
    )
}

export default NavBar
