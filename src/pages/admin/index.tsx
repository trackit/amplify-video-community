import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { AdminLayout } from '../../shared/components'

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
`

const CardContainer = styled.div`
    border: black 1px solid;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px;
`

const Title = styled.h1`
    font-size: 1.3em;
`

const Icon = styled.img`
    height: 50px;
`

type Card = {
    title: string
    onClick: () => void
}

const Dashboard = () => {
    const cards: Array<Card> = [
        {
            title: 'Create content',
            onClick: () => {
                navigate('/admin/create')
            },
        },
        {
            title: 'Manage Content',
            onClick: () => {
                navigate('/admin/manage')
            },
        },
        {
            title: 'Create Sections',
            onClick: () => {
                navigate('/admin/sections/create')
            },
        },
        {
            title: 'Manage Sections',
            onClick: () => {
                navigate('/admin/sections/manage')
            },
        },
    ]

    return (
        <AdminLayout>
            <Container>
                {cards.map((card) => (
                    <CardContainer key={card.title} onClick={card.onClick}>
                        <Title>{card.title}</Title>
                        <Icon />
                    </CardContainer>
                ))}
            </Container>
        </AdminLayout>
    )
}

export default Dashboard
