import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { StaticImage } from 'gatsby-plugin-image'

import HeaderLink from './Link'
import Search from './Search'
import { NavbarTheme } from '../theme'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 50px;
    background-color: ${(props) => props.theme.main};
    box-shadow: ${(props) => props.theme.boxShadow};
    justify-content: space-between;
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: 0.2s;
`

const LogoLink = styled.a`
    text-decoration: none;
    padding: 5px 0;
`

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
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
}

const NavBar = ({ navbarTheme }: NavBarProps) => {
    const [groups, setGroups] = useState<Array<string>>([])

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
        <Header id="video-community-header" theme={navbarTheme}>
            <LogoLink href="/">
                <LogoWrapper>
                    {navbarTheme.amplifyLogo === 'light' ? (
                        <StaticImage
                            backgroundColor="transparent"
                            placeholder="none"
                            style={{ height: '30px', width: '40px' }}
                            imgStyle={{ objectFit: 'contain' }}
                            alt="amplify"
                            src="../../../assets/logo/logo-light.png"
                        />
                    ) : (
                        <StaticImage
                            backgroundColor="transparent"
                            placeholder="none"
                            style={{ height: '30px', width: '40px' }}
                            imgStyle={{ objectFit: 'contain' }}
                            alt="amplify"
                            src="../../../assets/logo/logo-dark.png"
                        />
                    )}
                    <LogoText theme={navbarTheme}>Amplify Video</LogoText>
                </LogoWrapper>
            </LogoLink>
            <RightItemsWrapper>
                <LinkListContainer>
                    <HeaderLink
                        theme={navbarTheme}
                        to="/videos"
                        content="Videos"
                    />
                    <HeaderLink theme={navbarTheme} to="/live" content="Live" />
                    <HeaderLink
                        theme={navbarTheme}
                        to="/webinars"
                        content="Webinars"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        to="/about-amplify"
                        content="About Amplify"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        isExternal
                        to="https://docs-amplify.trackit.io/"
                        content="Documentation"
                    />
                    {groups.includes('Admin') && (
                        <HeaderLink
                            theme={navbarTheme}
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
