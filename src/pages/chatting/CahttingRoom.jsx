import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

let client = null;

const CahttingRoom = () => {
    const SERVER_URL = porcess.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    
    return (
        <div>
            
        </div>
    );
};

export default CahttingRoom;