import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useRecordContext } from 'react-admin'
import { fetchThumbnail } from '../../../utilities'
import { get } from 'lodash'

export const Image = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: 3px;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const ThumbnailLivestreamField = ({
    height = 50,
    width = 100,
    path = null,
}) => {
    const [thumbnail, setThumbnail] = useState(undefined)
    const record = useRecordContext()

    useEffect(() => {
        if (!record) return

        if (
            record &&
            record.media &&
            record.media.thumbnail &&
            record.media.thumbnail.src
        ) {
            setThumbnail(record.media.thumbnail.src)
            return
        }

        const getThumbnail = async () =>
            setThumbnail(await fetchThumbnail(get(record, path)))

        getThumbnail()
    }, [record])

    return record && thumbnail ? (
        <Image src={thumbnail} height={height} width={width} />
    ) : null
}

export default ThumbnailLivestreamField
