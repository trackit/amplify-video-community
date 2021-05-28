import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'

import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { Link as GatsbyLink } from 'gatsby'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.primaryColor};
`

const Title = styled.h2`
    margin-right: auto;
`

const Link = styled(GatsbyLink)`
    color: ${(props) => props.theme.primaryContrast};
    text-decoration: none;
    transition: all 0.3s ease 0s;

    &:hover {
        font-weight: bold;
        font-size: ${(props) => props.theme.textMd};
    }
`

const TitleLink = styled(GatsbyLink)`
    margin-right: auto;
    text-decoration: none;
    color: ${(props) => props.theme.primaryContrast};
`

const Container = styled.ul`
    list-style: none;
    display: flex;
`

const Item = styled.li`
    padding: 0 20px;
`

const Toggle = ({ to, content, theme }: any) => {
    return (
        <Item>
            <Link to={to} theme={theme}>
                {content}
            </Link>
        </Item>
    )
}

const NavBar = ({ theme }: any) => {
    const [groups, setGroups] = useState<Array<string>>([])

    useEffect(() => {
        Auth.currentSession().then((data) => {
            const groupsData = data.getIdToken().payload['cognito:groups']
            if (groupsData !== undefined) setGroups(groupsData)
        })
    }, [])

    return (
        <Header theme={theme}>
            <Title>
                <TitleLink to="/" theme={theme}>
                    Amplify Video
                </TitleLink>
            </Title>
            <Container>
                <Toggle to="/" content="Home" theme={theme} />
                <Toggle to="/videos" content="Videos" theme={theme} />
                <Toggle to="/live" content="Live" theme={theme} />
                <Toggle to="/webinars" content="Webinars" theme={theme} />
                <Toggle
                    to="/search"
                    content={<AiOutlineSearch />}
                    theme={theme}
                />
                {groups.includes('Admin') && (
                    <Toggle
                        to="/admin"
                        content={<AiOutlineSetting />}
                        theme={theme}
                    />
                )}
            </Container>
        </Header>
    )
}

export default NavBar
