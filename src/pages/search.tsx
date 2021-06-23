import React, { useEffect, useState } from 'react'

import { Layout } from '../shared/components'
import { fetchThumbnail, fetchVodFiles } from '../shared/utilities'
import { vodAsset } from '../models'
import { AiOutlineSearch } from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

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
    justify-content: center;
    flex-wrap: wrap;
`

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
        <a
            href={`/video/${asset.id}`}
            style={{
                padding: '10px',
                height: '100%',
                width: '500px',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <img
                style={{ height: '100%', width: '100%' }}
                src={thumbnailUrl as string}
                alt="thumbnail"
            />
            <h3 style={{ textAlign: 'center' }}>{asset.title}</h3>
        </a>
    )
}

const SearchPage = () => {
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
                    console.log(elem)
                    return <VideoItem asset={elem} key={key} />
                })}
            </StyledVideoList>
        </Layout>
    )
}

export default SearchPage
