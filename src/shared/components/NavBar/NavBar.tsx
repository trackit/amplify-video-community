import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0px 3px 3px #dedede;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
`

const LogoLink = styled.a`
    margin-left: 50px;
`

const Link = styled(GatsbyLink)`
    color: ${(props) => props.theme.palette.primary.contrastText};
    text-decoration: none;
    transition: all 0.3s ease 0s;

    &:hover {
        font-weight: bold;
        font-size: ${(props) => props.theme.palette.textMd};
    }
`

const ExternalLink = styled.a`
    color: ${(props) => props.theme.palette.primary.contrastText};
    text-decoration: none;
    transition: all 0.3s ease 0s;

    &:hover {
        font-weight: bold;
        font-size: ${(props) => props.theme.palette.textMd};
    }
`

const Container = styled.ul`
    list-style: none;
    display: flex;
    margin-right: 50px;
`

const Item = styled.li`
    padding: 0 20px;
    white-space: nowrap;
`

type ToggleProps = {
    to: string
    content: React.ReactElement
}

const Toggle = ({ to, content }: ToggleProps) => {
    return (
        <Item>
            <Link to={to}>{content}</Link>
        </Item>
    )
}

const NavBar = () => {
    const [groups, setGroups] = useState<Array<string>>([])

    useEffect(() => {
        if (Auth.Credentials.getCredSource() === 'userPool') {
            Auth.currentSession().then((data) => {
                const groupsData = data.getIdToken().payload['cognito:groups']
                if (groupsData !== undefined) setGroups(groupsData)
            })
        }
    }, [])

    return (
        <Header>
            <LogoLink href="/videos">
                <StaticImage
                    imgStyle={{ objectFit: 'contain', width: '150px' }}
                    alt="amplify"
                    src="../../../images/amplify.png"
                />
            </LogoLink>
            <Container>
                <Toggle to="/videos" content={<>Videos</>} />
                <Toggle to="/live" content={<>Live</>} />
                <Toggle to="/webinars" content={<>Webinars</>} />
                <Toggle to="/about-amplify" content={<>About Amplify</>} />
                <Item>
                    <ExternalLink
                        href="https://docs-amplify.trackit.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Documentation
                    </ExternalLink>
                </Item>
                <Toggle to="/search" content={<AiOutlineSearch />} />
                {groups.includes('Admin') && (
                    <Toggle to="/admin" content={<AiOutlineSetting />} />
                )}
            </Container>
        </Header>
    )
}

export default NavBar
