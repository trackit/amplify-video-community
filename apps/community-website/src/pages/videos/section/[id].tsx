import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { navigate, PageProps } from 'gatsby'
import { AiOutlineSearch } from 'react-icons/ai'

import { Layout, BasicLoader } from '../../../shared/components'
import {
    fetchSection,
    fetchVodFiles,
    fetchThumbnail,
} from '../../../shared/utilities'
import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import moment from 'moment'
import ReactPlayer from 'react-player'
import awsvideoconfig from '../../../aws-video-exports'
import PlayLogo from '../../../assets/logo/logo-play.svg'
import AmplifyLogo from '../../../assets/logo/logo-dark.svg'
import LinesEllipsis from 'react-lines-ellipsis'
import VideoCardItem from '../../../shared/components/VideoCardSlider/VideoCardItem'

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
    margin-bottom: 50px;
`

const LeftPanelItem = styled.div`
    display: flex;
    gap: 30px;
`

const CardItemContentContainer = styled.div`
    padding: 12px 12px 12px 32px;
    display: flex;
    position: relative;
    flex: 1;
    inline-size: 150px;
    flex-direction: column;
    justify-content: space-between;
`

const LeftPanelItemContentTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 5px;
`

const LeftPanelItemContentAuthor = styled.div`
    font-size: 11px;
    font-weight: bold;
`

const LeftPanelItemContentCountDate = styled.div`
    font-size: 11px;
`

const RightPanel = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    max-width: 750px;
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

// TODO: refactor all the components below (check VideoCardItem)
const ThumbnailContainer = styled.div`
    position: relative;
    max-width: 300px;
    max-height: 170px;
    background-image: ${(props) => `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
`

const PlayerWrapper = styled.div<PlayerWrapperProps>`
    opacity: ${(props) => (props.playing ? '1' : '0')};
    width: 100%;
    aspect-ratio: 16/9;
`

const TransparentOverlay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(50, 50, 50, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    transition: opacity 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`

const CardItemContainer = styled.div`
    display: flex;
    flex: 1;
    transition: box-shadow 200ms ease-out, transform 200ms ease-out;
    transform: scale(${(props) => (props.playing ? 1.05 : 1)});
    ${(props) =>
        props.playing && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'};
    margin-right: 40px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    max-height: 170px;
`

const ChannelLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    top: 20px;
    left: -20px;
`

const CardItem = ({ vod, thumbnail }) => {
    const [videoStatus, setVideoStatus] = useState<VideoStatus>({
        playing: false,
        played: 0,
        loaded: 0,
        duration: 0,
        seeking: false,
    })
    const playerRef = useRef<ReactPlayer>(null)

    const updateVideoStatus = (updatedData: VideoStatus) =>
        setVideoStatus({
            ...videoStatus,
            ...updatedData,
        })
    const handleMouseLeave = () => {
        updateVideoStatus({ playing: false })
    }
    const handleMouseEnter = () => {
        updateVideoStatus({ playing: true })
    }

    return (
        <CardItemContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            playing={videoStatus.playing}
            onClick={() => navigate(`/video/${vod?.id}`)}
        >
            <ThumbnailContainer
                playing={videoStatus.playing}
                thumbUrl={
                    vod
                        ? vod?.media?.source === 'SELF'
                            ? thumbnail?.url
                            : thumbnail?.obj?.src
                        : `https://img.youtube.com/vi/${vod.id}/maxresdefault.jpg`
                }
            >
                <PlayerWrapper playing={videoStatus.playing}>
                    <ReactPlayer
                        ref={playerRef}
                        width="100%"
                        height="100%"
                        url={
                            vod
                                ? vod?.media?.source === 'SELF'
                                    ? `https://${awsvideoconfig.awsOutputVideo}/public/${vod?.id}/${vod?.id}.m3u8`
                                    : vod?.src
                                : vod?.url
                        }
                        controls={false}
                        playing={videoStatus.playing}
                        muted
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 0,
                                    rel: 0,
                                },
                            },
                        }}
                    />
                </PlayerWrapper>
                <TransparentOverlay visible={videoStatus.playing}>
                    <PlayLogo />
                </TransparentOverlay>
            </ThumbnailContainer>
            <CardItemContentContainer>
                <ChannelLogo>
                    <AmplifyLogo />
                </ChannelLogo>
                <div>
                    <LeftPanelItemContentTitle>
                        {vod.media?.title}
                    </LeftPanelItemContentTitle>
                    <LinesEllipsis
                        text={vod.media?.description}
                        maxLine="5"
                        ellipsis="..."
                        trimRight
                        style={{ fontSize: '14px' }}
                        basedOn="letters"
                    />
                </div>
                <div>
                    <LeftPanelItemContentAuthor>
                        {vod.media?.author}
                    </LeftPanelItemContentAuthor>
                    <LeftPanelItemContentCountDate>
                        {vod.media?.viewCount || 0} views -{' '}
                        {moment(vod.media?.createdAt).fromNow()}
                    </LeftPanelItemContentCountDate>
                </div>
            </CardItemContentContainer>
        </CardItemContainer>
    )
}

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
                            {vodAssets.map((asset) => {
                                const thumbnail = thumbnails.find(
                                    (thumb) =>
                                        thumb.obj?.id ===
                                        asset.media?.thumbnail?.id
                                )
                                return (
                                    <LeftPanelItem key={asset.id}>
                                        <CardItem
                                            vod={asset}
                                            thumbnail={thumbnail}
                                        />
                                    </LeftPanelItem>
                                )
                            })}
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
                                        const thumbnail = thumbnails.find(
                                            (thumb) =>
                                                thumb.obj?.id ===
                                                asset.media?.thumbnail?.id
                                        )
                                        const videoInfo = {
                                            vod: asset,
                                            thumbnail,
                                        }
                                        return (
                                            <RightPanelSectionContentItem
                                                key={asset.id}
                                            >
                                                <VideoCardItem
                                                    videoInfo={videoInfo}
                                                    displayOnlyTitle
                                                    customStyles={{
                                                        marginRight: 0,
                                                    }}
                                                />
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
                                            const thumbnail = thumbnails.find(
                                                (thumb) =>
                                                    thumb.obj?.id ===
                                                    asset.media?.thumbnail?.id
                                            )
                                            const videoInfo = {
                                                vod: asset,
                                                thumbnail,
                                            }
                                            return (
                                                <RightPanelSectionContentItem
                                                    key={asset.id}
                                                >
                                                    <VideoCardItem
                                                        videoInfo={videoInfo}
                                                        displayOnlyTitle
                                                        spaceBetweenItems={0}
                                                        customStyles={{
                                                            marginRight: 0,
                                                        }}
                                                    />
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
