import React, { useState, useEffect } from 'react'
import { useRecordContext } from 'react-admin'
import { fetchThumbnail } from '../../../shared/utilities'
import styled from 'styled-components'

const Image = styled.div`
    height: 50px;
    width: 100px;
    border-radius: 3px;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const ThumbnailField = () => {
    const [thumbnail, setThumbnail] = useState(undefined)
    const record = useRecordContext()

    useEffect(() => {
        if (!record) return

        if (record.thumbnail.src) {
            setThumbnail(record.thumbnail.src)
            return
        }

        const getThumbnail = async () =>
            setThumbnail(await fetchThumbnail(record))

        getThumbnail()
    }, [record])

    return record && thumbnail ? <Image src={thumbnail} /> : null
}

export default ThumbnailField
