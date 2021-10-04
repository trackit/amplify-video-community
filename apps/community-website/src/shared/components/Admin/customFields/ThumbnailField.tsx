import React, { useState, useEffect } from 'react'
import { useRecordContext } from 'react-admin'
import { fetchThumbnail } from '../../../utilities'
import styled from 'styled-components'
import { get } from 'lodash'

const Image = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: 3px;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const ThumbnailField = ({ height = 50, width = 100, path = null }) => {
    const [thumbnail, setThumbnail] = useState(undefined)
    const record = useRecordContext()
    console.log('record thum: ', record)

    useEffect(() => {
        if (!record) return

        if (record && record.thumbnail && record.thumbnail.src) {
            setThumbnail(record.thumbnail.src)
            return
        }

        const getThumbnail = async () => {
            console.log('oui: ', get(record, path))
            return setThumbnail(await fetchThumbnail(get(record, path).src))
            // return setThumbnail(await fetchThumbnail(path ? get(record, path) : record))
        }
        getThumbnail()
    }, [record])

    return record && thumbnail ? (
        <Image src={thumbnail} height={height} width={width} />
    ) : null
}

export default ThumbnailField
