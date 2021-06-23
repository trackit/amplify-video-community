import React, { useEffect, useState } from 'react'

import { Layout } from '../shared/components'
import { fetchThumbnail, fetchVodFiles } from '../shared/utilities'
import { vodAsset } from '../models'
import { AiOutlineSearch } from 'react-icons/ai'
import Loader from 'react-loader-spinner'

type VideoItemProps = {
    asset: vodAsset
}

const VideoItem = ({ asset }: VideoItemProps) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                if (asset.thumbnail) {
                    setLoading(true)
                    const data = await fetchThumbnail(asset)
                    setThumbnailUrl(data as string)
                    setLoading(false)
                }
            } catch (error) {
                console.error('search.tsx(fetchThumbnail):')
            }
        })()
    }, [asset])

    return isLoading ? (
        <Loader
            type="Rings"
            color="#FFA41C"
            height={100}
            width={100}
            timeout={3000}
        />
    ) : (
        <a href={`/video/${asset.id}`} style={{ padding: '10px' }}>
            <img
                style={{ height: '100%', width: '100%' }}
                src={thumbnailUrl as string}
                alt="thumbnail"
            />
            <h3 style={{ textAlign: 'center' }}>{asset.title}</h3>
        </a>
    )
}

const LiveApp = () => {
    const [vodAssets, setVodAssets] = useState<Array<vodAsset>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const filterAssets = (elem: vodAsset) => {
        return (
            elem.title.includes(searchValue) ||
            elem.description.includes(searchValue)
        )
    }

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodFiles(nextToken)
                setNextToken(
                    data?.listVodAssets?.nextToken
                        ? data.listVodAssets.nextToken
                        : null
                )
                setVodAssets(data?.listVodAssets?.items as Array<vodAsset>)
            } catch (error) {
                console.error('search.tsx(fetchVodFiles):', error)
            }
        })()
    }, [nextToken])

    return (
        <Layout>
            <form style={{ textAlign: 'center', display: 'inline-block' }}>
                <input
                    type="text"
                    placeholder="Search.."
                    name="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit">
                    <AiOutlineSearch />
                </button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {vodAssets.filter(filterAssets).map((elem: vodAsset, key) => {
                    console.log(elem)
                    return <VideoItem asset={elem} key={key} />
                })}
            </div>
        </Layout>
    )
}

export default LiveApp
