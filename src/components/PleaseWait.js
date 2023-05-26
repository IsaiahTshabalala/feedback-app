import React from 'react';
import { useState } from 'react';

function PleaseWait() {
    const [time, setTime] = useState(new Date());
    setTimeout(() => {
        setTime(new Date());
    }, 1000);
    
    return (
        <div>
            <h1>Please wait ...<br/>{time}</h1>

        </div>
    );
}

export default PleaseWait;