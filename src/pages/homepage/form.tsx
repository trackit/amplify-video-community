import React from 'react'
import styled, { css } from 'styled-components'

import FormInput from './components/Input/input'
import LandingButton from './components/Button/button'

const Container = styled.div`
    padding: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    max-width: 1000px;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
`

const Title = styled.h2`
    color: #000000;
    font-weight: 600;
    font-size: 28px;
    margin: 0;
`

const OrangeText = styled.span`
    color: #ff9900;
`

const SubTitle = styled.p`
    color: #000000;
    font-size: 22px;
    margin: 0;
`

const FormContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`

type InputsWrapperType = {
    right?: boolean
}

const InputsWrapper = styled.div<InputsWrapperType>`
    flex: 1;
    ${(props) =>
        props.right
            ? css`
                  padding-left: 50px;
              `
            : css`
                  padding-right: 50px;
              `}
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-top: 55px;
`

const Form = () => (
    <Container>
        <Wrapper>
            <TitleContainer>
                <Title>
                    You want to <OrangeText>share</OrangeText> your{' '}
                    <OrangeText>content</OrangeText> to the{' '}
                    <OrangeText>Amplify Video</OrangeText> community?
                </Title>
                <SubTitle>
                    Fill the form below to share with us what you’ve created!
                </SubTitle>
            </TitleContainer>
            <FormContainer>
                <InputsWrapper>
                    <FormInput name="Title*" />
                    <FormInput name="Email*" last />
                </InputsWrapper>
                <InputsWrapper right>
                    <FormInput name="Youtube Url*" />
                    <FormInput name="Comment" last />
                </InputsWrapper>
            </FormContainer>
            <FormInput name="Description*" multipleLine last />
            <ButtonWrapper>
                <LandingButton
                    primaryColor="#ff9900"
                    onClick={() => {
                        return
                    }}
                    text="Share content"
                />
            </ButtonWrapper>
        </Wrapper>
    </Container>
)

export default Form
