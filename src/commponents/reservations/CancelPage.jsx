import React from 'react';
import { useLocation } from 'react-router-dom';
import AddPostingHeader from '../header/AddPostingHeader';

const CancelPage = () => {
    const {title,img,price,deposit} = useLocation
    return (
        <div>
            <AddPostingHeader pageName='대여 예약 취소'/>

        </div>
    );
};

export default CancelPage;