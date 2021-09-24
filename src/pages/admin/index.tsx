import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { AiFillFileAdd, SiGoogletagmanager } from 'react-icons/all'
import { IconType } from 'react-icons/lib'
import { AdminLayout } from '../../shared/components'
import LandingButton from '../../shared/components/Button/link'

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import LabelIcon from '@mui/icons-material/Label'

import { theme } from './Theme'
import { Admin, Resource } from 'react-admin'
import DataProvider from './DataProvider'

import VideoList from './VideoList'
import VideoEdit from './VideoEdit'
import VideoCreate from './VideoCreate'

import SectionList from './SectionList'
import SectionCreate from './SectionCreate'
import SectionEdit from './SectionEdit'

import Home from './Home'

type Props = {
    text: string
    color: string
    icon: IconType
    redirection: () => void
}

const Container = styled.div`
    background-color: #f9f9f9;
    padding: 100px;
`

const Wrapper = styled.div`
    display: flex;
`

const LandingButtonWrapper = styled.div`
    width: 100%;
`

const TextContainer = styled.div`
    flex: 1;
    padding-right: 50px;
`

const TitleWrapper = styled.div`
    margin-bottom: 50px;
`

const Title = styled.p`
    color: #000000;
    font-size: 38px;
    font-weight: 600;
    margin: 0;
`

const Button = ({ redirection, icon, color, text }: Props) => (
    <LandingButtonWrapper onClick={redirection}>
        <LandingButton IconComponent={icon} primaryColor={color} text={text} />
    </LandingButtonWrapper>
)

const ContentWrapper = () => (
    <TextContainer>
        <TitleWrapper>
            <Title color="#ff9900">Content</Title>
        </TitleWrapper>
        <Button
            redirection={() => navigate('/admin/create')}
            icon={AiFillFileAdd}
            color="#000000"
            text="Create"
        />
        <Button
            redirection={() => navigate('/admin/manage')}
            icon={SiGoogletagmanager}
            color="#000000"
            text="Manage"
        />
    </TextContainer>
)

const SectionWrapper = () => (
    <TextContainer>
        <TitleWrapper>
            <Title>Sections</Title>
        </TitleWrapper>
        <Button
            redirection={() => navigate('/admin/sections/create')}
            icon={AiFillFileAdd}
            color="#000000"
            text="Create"
        />
        <Button
            redirection={() => navigate('/admin/sections/manage')}
            icon={SiGoogletagmanager}
            color="#000000"
            text="Manage"
        />
    </TextContainer>
)

const LivestreamWrapper = () => (
    <TextContainer>
        <TitleWrapper>
            <Title color="#ff9900">Livestream</Title>
        </TitleWrapper>
        <Button
            redirection={() => navigate('/admin/livestream')}
            icon={SiGoogletagmanager}
            color="#000000"
            text="Manage"
        />
    </TextContainer>
)

const UserSubmissionWrapper = () => (
    <TextContainer>
        <TitleWrapper>
            <Title>User submission</Title>
        </TitleWrapper>
        <Button
            redirection={() => navigate('/admin/submissions')}
            icon={SiGoogletagmanager}
            color="#000000"
            text="Manage"
        />
    </TextContainer>
)

// eslint-disable-next-line
const Dashboard = () => (
    <AdminLayout>
        <Container>
            <Wrapper>
                <ContentWrapper />
                <SectionWrapper />
            </Wrapper>
        </Container>
        <Container>
            <Wrapper>
                <LivestreamWrapper />
                <UserSubmissionWrapper />
            </Wrapper>
        </Container>
    </AdminLayout>
)

const AdminMainPage = () => (
    <AdminLayout>
        <Admin dashboard={Home} dataProvider={DataProvider} theme={theme}>
            <Resource
                name="Videos"
                list={VideoList}
                edit={VideoEdit}
                create={VideoCreate}
                icon={OndemandVideoIcon}
            />
            <Resource
                name="Sections"
                list={SectionList}
                edit={SectionEdit}
                create={SectionCreate}
                icon={LabelIcon}
            />
        </Admin>
    </AdminLayout>
)

export default AdminMainPage
