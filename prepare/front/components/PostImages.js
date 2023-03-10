import React , { useState , useCallback } from 'react' ;
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);
    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);
    if(images.length === 1) {
        return (
            <>
                <img role="presentation" style={{maxWidth : '200px'}} src={`http://localhost:7777/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                {/* role = presention : (시각장애인 편의성) 이미지라고 스크린 리더기에 인식되지 않게 해줌 */}
                { showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
            </>
        );
    }
    if(images.length === 2) {
        return(
            <>
                <img role="presentation" style={{ width: '50%' , display: 'inline-block' }} src={`http://localhost:7777/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                <img role="presentation" style={{ width: '50%' , display: 'inline-block' }} src={`http://localhost:7777/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
                { showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
            </>
        );
    }
    return(
        <>
            <div>
                <img role="presentation" style={{ width: '50%' , display: 'inline-block'}} src={`http://localhost:7777/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1} 개의 사진 더보기
                </div>
            </div>
            { showImagesZoom && <ImagesZoom images={images} onClose={onClose} /> }
        </>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;