import React from 'react';

const ChattingRoomCard = ({post}) => {
    console.log(post)
    return (
        <div>
            {post.postTitle}
        </div>
    );
};

export default ChattingRoomCard;