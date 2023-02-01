import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingFrame = ({ text }) => {
    return (
        <div className='cardBody'>
            <div>
                <Spinner className='circle' animation="grow" variant="success" />
                <Spinner className='circle' animation="grow" variant="danger" />
                <Spinner className='circle' animation="grow" variant="warning" />
                <Spinner className='circle' animation="grow" variant="info" />
            </div>
            <p className='cardText'>{text}</p>
        </div>
    )
}

export default LoadingFrame