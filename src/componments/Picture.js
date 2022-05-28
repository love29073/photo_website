import React from 'react'

const Picture = ({ data }) => {
    return (
        <div className="picture">
            <p className="photographer">{data.photographer}</p>
            <div className="imageContainer">
                <img src={data.src.large}></img>
            </div>
            <p>Downlod Image:  <a href={data.src.large} target="_blank">Click Here</a></p>
        </div>
    )
}

export default Picture
