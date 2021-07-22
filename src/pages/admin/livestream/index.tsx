import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import { fetchLivestreams } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { Livestream } from '../../../models'

const LivestreamManagement = () => {
    const [livestreams, setLivestreams] = useState<Array<Livestream>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchLivestreams()
                setLivestreams(
                    data?.listLivestreams?.items as Array<Livestream>
                )
            } catch (error) {
                console.error(
                    'admin/livestream/index.tsx(fetchLivestreams):',
                    error
                )
            }
            setLoading(false)
        })()
    }, [])

    return (
        <AdminLayout>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <div>
                    {livestreams.map((live) => {
                        // TODO:
                        // video player for the livestream, show thumbnail
                        // when isLive => stop button,
                        // when !isLive => start button, form to set title, desc, thumbnail
                        console.log(live)
                        return (
                            <div key={live.id}>
                                {live ? (
                                    <div>
                                        <button>Stop Streaming</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button>Start Streaming</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </AdminLayout>
    )
}

export default LivestreamManagement
