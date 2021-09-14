import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'

import HeaderLink from './Link'
import Search from './Search'
import { NavbarTheme } from '../theme'

import LogoDark from '../../../assets/logo/logo-dark.svg'
import LogoLight from '../../../assets/logo/logo-light.svg'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 50px;
    background-color: ${(props) => props.theme.main};
    box-shadow: ${(props) =>
        props.minHeight === props.height ? props.theme.boxShadow : 0};
    justify-content: space-between;
    height: ${(props) => props.height}px;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: box-shadow 200ms, background-color 200ms;
`

const LogoLink = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
`

const LogoText = styled.span`
    color: ${(props) => props.theme.amplifyText};
    margin-left: 10px;
    font-weight: 500;
    font-size: 18px;
`

const LinkListContainer = styled.ul`
    list-style: none;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
`

const RightItemsWrapper = styled.div`
    display: flex;
    height: 100%;
`

type NavBarProps = {
    navbarTheme: NavbarTheme
    maxHeight?: number
    minHeight?: number
}

const NavBar = ({
    navbarTheme,
    maxHeight = 100,
    minHeight = 64,
}: NavBarProps) => {
    const [groups, setGroups] = useState<Array<string>>([])
    const [height, setHeight] = useState(maxHeight)

    const handleScroll = () => {
        const newHeight = maxHeight - window.pageYOffset
        newHeight < minHeight ? setHeight(minHeight) : setHeight(newHeight)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        Auth.Credentials.get().then(() => {
            if (Auth.Credentials.getCredSource() === 'userPool') {
                Auth.currentSession().then((data) => {
                    const groupsData =
                        data.getIdToken().payload['cognito:groups']
                    if (groupsData !== undefined) setGroups(groupsData)
                })
            }
        })
    }, [])

    return (
        <Header
            id="video-community-header"
            theme={navbarTheme}
            height={height}
            minHeight={minHeight}
        >
            <LogoLink href="/">
                {navbarTheme.amplifyLogo === 'light' ? (
                    <LogoLight height={(height - 10) / 2} width={height / 2} />
                ) : (
                    <LogoDark height={(height - 10) / 2} width={height / 2} />
                )}

                <LogoText theme={navbarTheme}>Amplify Video</LogoText>
            </LogoLink>
            <RightItemsWrapper>
                <LinkListContainer>
                    <HeaderLink
                        theme={navbarTheme}
                        navBarHeight={height}
                        navBarMinHeight={minHeight}
                        to="/videos"
                        content="Videos"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        to="/live"
                        content="Live"
                        navBarHeight={height}
                        navBarMinHeight={minHeight}
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        navBarMinHeight={minHeight}
                        navBarHeight={height}
                        to="/about"
                        content="About"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        navBarHeight={height}
                        navBarMinHeight={minHeight}
                        isExternal
                        to="https://docs-amplify.trackit.io/"
                        content="Documentation"
                    />
                    {groups.includes('Admin') && (
                        <HeaderLink
                            theme={navbarTheme}
                            navBarHeight={height}
                            navBarMinHeight={minHeight}
                            to="/admin"
                            content="Admin"
                        />
                    )}
                </LinkListContainer>
                <Search theme={navbarTheme} to="/search" />
            </RightItemsWrapper>
        </Header>
    )
}

export default NavBar
