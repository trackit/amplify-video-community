import React from 'react'
import { Admin, Resource } from 'react-admin'

import { AdminLayout } from '../../shared/components'

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import LabelIcon from '@mui/icons-material/Label'
import LiveTvIcon from '@mui/icons-material/LiveTv'

import { theme } from '../../shared/components/Admin/Theme'
import DataProvider from '../../shared/components/Admin/DataProvider'

import VideoList from '../../shared/components/Admin/VideoList'
import VideoEdit from '../../shared/components/Admin/VideoEdit'
import VideoCreate from '../../shared/components/Admin/VideoCreate'

import SectionList from '../../shared/components/Admin/SectionList'
import SectionCreate from '../../shared/components/Admin/SectionCreate'
import SectionEdit from '../../shared/components/Admin/SectionEdit'

import LiveList from '../../shared/components/Admin/LiveList'
import LiveCreate from '../../shared/components/Admin/LiveCreate'
import LiveEdit from '../../shared/components/Admin/LiveEdit'

import Home from '../../shared/components/Admin/Home'

const AdminMainPage = () => {
    if (!Admin || !Resource) return null
    return (
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
                <Resource
                    name="Lives"
                    list={LiveList}
                    edit={LiveEdit}
                    create={LiveCreate}
                    icon={LiveTvIcon}
                />
            </Admin>
        </AdminLayout>
    )
}

export default AdminMainPage
