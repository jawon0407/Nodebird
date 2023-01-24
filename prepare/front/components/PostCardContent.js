import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
    return(
        <>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                {/* (#[^\s#]+)/g 
                    해당 정규표현식 = 해쉬태그로 시작하고 해쉬태그 사이 공백 제외 , 븥어있는거 제외 , 해쉬태그 붙은거 여러 개 선택 
                    ^ = 제외,
                    \s = 공백,
                    # = 해쉬태그
                    /g = 전체 선택
                */}
                if(v.match(/(#[^\s#]+)/)) {
                    return (
                        <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                            {v}
                        </Link>
                    )
                }
                return v;
            })}
        </>
    )
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent;