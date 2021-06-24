import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Layout } from '../shared/components'
import { fetchThumbnail, fetchVodFiles } from '../shared/utilities'
import { vodAsset } from '../models'
import { AiOutlineSearch } from 'react-icons/ai'
import VideoCard from '../shared/components/Video/VideoCard'
import { Thumbnail } from '../shared/types'

const StyledSearchItem = styled.div`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 4px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 50px;
    position: relative;
    height: 42px;
    width: 300px;

    table {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
`

const StyledSearchInput = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    padding: 0px 5px;
    border-radius: 50px;
    font-size: 18px;

    &:focus {
        outline: none;
    }
`

const StyledSearch = styled.td`
    & svg {
        color: ${(props) => props.theme.palette.primary.main};
        font-size: 26px;
    }
`

const StyledVideoList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const StyledVideoCard = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        text-align: center;
    }
`

type VideoItemProps = {
    asset: vodAsset
}

const VideoItem = ({ asset }: VideoItemProps) => {
    const [thumbnail, setThumbnail] = useState<Thumbnail | undefined>(undefined)

    useEffect(() => {
        ;(async () => {
            try {
                if (asset.thumbnail) {
                    const data = await fetchThumbnail(asset)
                    setThumbnail({
                        obj: asset.thumbnail,
                        url: data as string,
                    })
                }
            } catch (error) {
                console.error('search.tsx(fetchThumbnail):')
            }
        })()
    }, [asset])

    return (
        <StyledVideoCard>
            <VideoCard thumbnail={thumbnail} vod={asset} />
            <h3>{asset.title}</h3>
        </StyledVideoCard>
    )
}

const SearchPage = () => {
    const [vodAssets, setVodAssets] = useState<Array<vodAsset>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')

    const filterAssets = (elem: vodAsset) =>
        elem.title.includes(searchValue) ||
        elem.description.includes(searchValue)

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
            <StyledSearchItem>
                <table>
                    <tr>
                        <StyledSearch>
                            <StyledSearchInput
                                type="text"
                                placeholder="Search.."
                                name="search"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </StyledSearch>
                        <StyledSearch>
                            <AiOutlineSearch />
                        </StyledSearch>
                    </tr>
                </table>
            </StyledSearchItem>
            <StyledVideoList>
                {vodAssets.filter(filterAssets).map((elem: vodAsset, key) => {
                    return <VideoItem asset={elem} key={key} />
                })}
            </StyledVideoList>
        </Layout>
    )
}

export default SearchPage
