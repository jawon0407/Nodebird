import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled , {createGlobalStyle} from 'styled-components';


const Indicator = styled.div`
    text-align: center;

    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`

const Global = createGlobalStyle`
    .slick-slide {
        display:inline-block;
    }
    .ant-card-cover {
        transform: none !important;
    }
`

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlice, setCurrentSlice] = useState(0);
    return(
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50">
            <Global />
            <header className="h-11 bg-white relative p-0 text-center flex justify-center items-center">
                <h1 className="m-0 text-lg text-stone-700">상세 이미지</h1>
                <button className="absolute right-0 top-0 p-4 leading-4 cursor-pointer" onClick={onClose}>X</button>
            </header>
            <div className="h-[calc(100%-44px)] bg-neutral-800">
                <div>
                    <Slick
                        initialSlice={0}
                        beforeChange={(slide) => setCurrentSlice((slide))}
                        infinite
                        arrows = {false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <div className="p-8 text-center" key={v.src}>
                                <img src={`http://localhost:4070/${v.src}`} alt={v.src} className="my-0 mx-auto max-h-[750px]"/>
                            </div>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlice + 1}
                            {' '}
                            /
                            {' '}
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </div>
        </div>
    )
}

ImagesZoom.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose : PropTypes.func.isRequired,
}

export default ImagesZoom;