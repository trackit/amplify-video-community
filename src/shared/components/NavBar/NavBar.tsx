import * as React from "react"

import './NavBar.css'
import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from "gatsby"
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'


const NavBar = () => {
    const [groups, setGroups] = useState<Array<string>>([])

    useEffect(() => {
        Auth.currentSession().then((data) => {
            const groupsData = data.getIdToken().payload['cognito:groups']
            if (groupsData !== undefined) setGroups(groupsData)
        })
    }, [])

    return (
        <div className="navbar">
            <header>
                <h2>
                    <Link to="/" >Amplify Video</Link>
                </h2>
                <ul className="nav__links">
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/videos" >Videos</Link>
                    </li>
                    <li>
                        <Link to="/live" >Live</Link>
                    </li>
                    <li>
                        <Link to="/webinars" >Webinars</Link>
                    </li>
                    <li>

                    </li>
                </ul>
            </header>
        </div>
    )
}

export default NavBar
