import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { setContentSubmission } from '../../utilities'
import * as APIt from '../../../API'

const ContentSubmissionForm = () => {
    const [youtubeSource, setYoutubeSource] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const parseYoutubeSource = (input: string) => {
        const url = new URL(input)
        const urlParams = new URLSearchParams(url.search)
        return urlParams.get('v')
    }

    const onSubmit = (e: React.FormEvent) => {
        const id: string = uuidv4()
        e.preventDefault()
        const youtubeID = parseYoutubeSource(youtubeSource)
        if (youtubeID === '') {
            return
        }
        ;(async () => {
            try {
                await setContentSubmission({
                    id,
                    title,
                    description,
                    comment,
                    source: APIt.Source.YOUTUBE,
                    src: `https://youtube.com/embed/${youtubeID}`,
                    email,
                })
            } catch (error) {
                console.error(
                    'Form/ContentSubmissionForm.tsx(setContentSubmission):',
                    error
                )
            }
        })()
    }

    return (
        <div>
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_title">Title</label>
                    <input
                        id="_add_vod_title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_description">Description</label>
                    <textarea
                        id="_add_vod_description"
                        placeholder="Description"
                        value={description}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_youtube_source">Youtube URL</label>
                    <input
                        id="_add_vod_youtube_source"
                        type="text"
                        placeholder="http://youtube.com/..."
                        value={youtubeSource}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setYoutubeSource(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_email_source">Email</label>
                    <input
                        id="_add_email_source"
                        type="text"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setEmail(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_comment_for_admin">
                        Comment for administrators
                    </label>
                    <textarea
                        id="_add_vod_comment_for_admin"
                        placeholder="Comment for administrators"
                        value={comment}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setComment(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <input type="submit" value="Upload Content" />
                </div>
            </form>
        </div>
    )
}

export { ContentSubmissionForm }
