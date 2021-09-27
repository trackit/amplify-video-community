import React from 'react'
import { useRecordContext } from 'react-admin'
import styled from 'styled-components'

const TextField = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const EllipsisTextField = ({ source, width = '100%' }) => {
    const record = useRecordContext()
    return record ? <TextField width={width}>{record[source]}</TextField> : null
}

export default EllipsisTextField
