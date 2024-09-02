import React from 'react';
import 'tailwindcss/tailwind.css';
import '../components/custom_tailwind.css';
import { useSelector } from 'react-redux';

const Message = ({ sender, content, timestamp }) => {
    const { _id } = useSelector((state) => state.user);
    const date = new Date(timestamp);
    const humanReadableDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',     
        day: 'numeric',    
        hour: 'numeric',   
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true
      });
    return (
        <div className='pt-4'>
            {
                sender._id === _id ? (
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-info text-md">{content} <p className='text-xs text-gray-800'>{humanReadableDate}</p></div>
                    </div>
                ) :
                    (
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-success text-md">
                                {content}
                                <p className='text-xs text-gray-800'>{humanReadableDate}</p>
                            </div>
                        </div>
                    )
            }


        </div>

    )
}

export default Message
