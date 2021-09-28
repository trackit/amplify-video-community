import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { AiOutlineSearch } from 'react-icons/ai'

import { Layout, BasicLoader } from '../../../shared/components'
import {
    fetchSection,
    fetchVodFiles,
    fetchThumbnail,
} from '../../../shared/utilities'
import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import moment from 'moment'

type ThumbProps = {
    thumbUrl: string
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    background-color: #f9f9f9;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 90px;
`

const Title = styled.h1`
    margin-top: 30px;
    font-size: 36px;
`

const Separator = styled.div`
    background-color: #ff9900;
    height: 2px;
    width: 100px;
    margin-bottom: 20px;
`

const Description = styled.h2`
    font-size: 14px;
`

const LoaderWrapper = styled.div`
    padding-top: 50px;
`

const Content = styled.div`
    display: flex;
    gap: 25px;
    justify-content: space-between;
`

const SearchBarWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 30px;
    padding: 2px;
    height: 34px;
    margin-bottom: 20px;
`

const SearchBarInput = styled.input`
    background-color: #f9f9f9;
    width: 100%;
    border: none;
    border-radius: 30px;
    height: 100%;

    &:focus-visible {
        outline: none;
    }
`

const SearchBarButton = styled.button`
    background-color: #ff9900;
    height: 100%;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    padding: 0 20px;

    &:hover {
        cursor: pointer;
    }
`

const LeftPanel = styled.div`
    width: 90%;
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    gap: 50px;
`

const LeftPanelItemThumbnail = styled.div<ThumbProps>`
    background-color: #ffffff;
    background-image: ${(props) => `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    min-width: 35vw;
    min-height: calc(40vw * 9 / 16);

    margin: 0 10px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;
`

const LeftPanelItem = styled.div`
    display: flex;
    gap: 30px;
`

const LeftPanelItemContent = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const LeftPanelItemContentTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 5px;
`

const LeftPanelItemContentDescription = styled.div`
    font-size: 18px;
`

const LeftPanelItemContentAuthor = styled.div`
    font-size: 14px;
    font-weight: bold;
`

const LeftPanelItemContentCountDate = styled.div`
    font-size: 12px;
`

const RightPanel = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 100px;
`

const RightPanelSeparator = styled.div`
    background-color: #000000;
    opacity: 0.1;
    height: 1px;
    width: 95%;
    margin-bottom: 20px;
`

const RightPanelSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`

const RightPanelSectionTitle = styled.span`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
`

const RightPanelSectionContent = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
`

const RightPanelSectionContentItem = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: calc(50% - 10px);
    gap: 15px;
`

const RightPanelSectionContentItemTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
`

const RightPanelSectionContentItemThumbnail = styled.div<ThumbProps>`
    background-color: #ffffff;
    background-image: ${(props) => `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    min-width: 10vw;
    min-height: calc(15vw * 9 / 16);

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;
`

const SectionPage = (props: PageProps) => {
    const id = props.params.id
    const [section, setSection] = useState<Section | null>(null)
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])

    useEffect(() => {
        ;(async () => {
            const { data } = await fetchSection(id)
            setSection(data?.getSection as Section)
        })()
    }, [id])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodFiles(null)
                const fetchedVodAssets = data?.listVideoOnDemands
                    ?.items as Array<VideoOnDemand>
                const assets = fetchedVodAssets.filter((asset) => {
                    let returnValue = false
                    // eslint-disable-next-line
                    asset.media?.sections?.items.forEach((item) => {
                        if (item?.section.id === section.id) {
                            returnValue = true
                        }
                    })
                    return returnValue
                })
                setVodAssets(assets)
                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = []
                await Promise.all(
                    assets.map(async (asset) => {
                        if (asset.media?.thumbnail?.src != null) {
                            thumbnailArr.push({
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            })
                        } else {
                            const data = await fetchThumbnail(asset.media)
                            thumbnailArr.push({
                                obj: asset.media?.thumbnail,
                                url: data as string,
                            })
                        }
                    })
                )
                setThumbnails(thumbnailArr)
            } catch (error) {
                console.error('videos/section/[id].tsx(fetchVodFiles):', error)
            }
        })()
    }, [section])

    return (
        <Layout>
            {section ? (
                <Container>
                    <Header>
                        <Title>{section.label}</Title>
                        <Separator />
                        <Description>{section.description}</Description>
                    </Header>
                    <Content>
                        <LeftPanel>
                            {vodAssets.map((asset) => (
                                <LeftPanelItem key={asset.id}>
                                    <LeftPanelItemThumbnail
                                        thumbUrl={
                                            thumbnails.find(
                                                (thumb) =>
                                                    thumb.obj?.id ===
                                                    asset.media?.thumbnail?.id
                                            )?.url || ''
                                        }
                                    />
                                    <LeftPanelItemContent>
                                        <div>
                                            <LeftPanelItemContentTitle>
                                                {asset.media?.title.slice(
                                                    0,
                                                    30
                                                )}
                                                ...
                                            </LeftPanelItemContentTitle>
                                            <LeftPanelItemContentDescription>
                                                {asset.media?.description.slice(
                                                    0,
                                                    442
                                                )}
                                                ...
                                            </LeftPanelItemContentDescription>
                                        </div>
                                        <div>
                                            <LeftPanelItemContentAuthor>
                                                {asset.media?.author}
                                            </LeftPanelItemContentAuthor>
                                            <LeftPanelItemContentCountDate>
                                                {asset.media?.viewCount || 0}{' '}
                                                views -{' '}
                                                {moment(
                                                    asset.media?.createdAt
                                                ).fromNow()}
                                            </LeftPanelItemContentCountDate>
                                        </div>
                                    </LeftPanelItemContent>
                                </LeftPanelItem>
                            ))}
                        </LeftPanel>
                        <RightPanel>
                            <SearchBarWrapper>
                                <AiOutlineSearch
                                    style={{
                                        margin: '0 10px',
                                        height: '100%',
                                        width: '10%',
                                    }}
                                    size={20}
                                />
                                <SearchBarInput />
                                <SearchBarButton>Search</SearchBarButton>
                            </SearchBarWrapper>
                            <RightPanelSection>
                                <RightPanelSectionTitle>
                                    Most Viewed
                                </RightPanelSectionTitle>
                                <Separator />
                                <RightPanelSectionContent>
                                    {vodAssets.slice(0, 4).map((asset) => {
                                        return (
                                            <RightPanelSectionContentItem
                                                key={asset.id}
                                            >
                                                <RightPanelSectionContentItemThumbnail
                                                    thumbUrl={
                                                        thumbnails.find(
                                                            (thumb) =>
                                                                thumb.obj
                                                                    ?.id ===
                                                                asset.media
                                                                    ?.thumbnail
                                                                    ?.id
                                                        )?.url || ''
                                                    }
                                                />
                                                <RightPanelSectionContentItemTitle>
                                                    {asset.media?.title}
                                                </RightPanelSectionContentItemTitle>
                                            </RightPanelSectionContentItem>
                                        )
                                    })}
                                </RightPanelSectionContent>
                            </RightPanelSection>
                            <RightPanelSeparator />
                            <RightPanelSection>
                                <RightPanelSectionTitle>
                                    Most Recent
                                </RightPanelSectionTitle>
                                <Separator />
                                <RightPanelSectionContent>
                                    {vodAssets
                                        .sort(
                                            (a, b) =>
                                                +new Date(b.createdAt || '') -
                                                +new Date(a.createdAt || '')
                                        )
                                        .slice(0, 4)
                                        .map((asset) => {
                                            return (
                                                <RightPanelSectionContentItem
                                                    key={asset.id}
                                                >
                                                    <RightPanelSectionContentItemThumbnail
                                                        thumbUrl={
                                                            thumbnails.find(
                                                                (thumb) =>
                                                                    thumb.obj
                                                                        ?.id ===
                                                                    asset.media
                                                                        ?.thumbnail
                                                                        ?.id
                                                            )?.url || ''
                                                        }
                                                    />
                                                    <RightPanelSectionContentItemTitle>
                                                        {asset.media?.title}
                                                    </RightPanelSectionContentItemTitle>
                                                </RightPanelSectionContentItem>
                                            )
                                        })}
                                </RightPanelSectionContent>
                            </RightPanelSection>
                        </RightPanel>
                    </Content>
                </Container>
            ) : (
                <LoaderWrapper>
                    <BasicLoader />
                </LoaderWrapper>
            )}
        </Layout>
    )
}

export default SectionPage
