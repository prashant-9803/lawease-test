import React from 'react';
import { ReactMic } from 'react-mic';

const ReactRecorder = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [voice, setVoice] = React.useState(false);
    const [recordBlobLink, setRecordBlobLink] = React.useState(null);

    const onStop = (recordedBlob) => {
        setRecordBlobLink(recordedBlob.blobURL);
        setIsRunning(false)
    };

    const startHandle = () => {
        setElapsedTime(0)
        setIsRunning(true)
        setVoice(true)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

   

    return (
        <div className='mt-14 text-black'>
            <div className=" max-w-sm border py-4 px-6 mx-auto bg-black  ">
                <h2 className=" text-[22px] font-semibold ">Audio Recorder</h2>
                

                <ReactMic
                    record={voice}
                    className="sound-wave w-full "
                    onStop={onStop}
                    strokeColor="#000000"
                // backgroundColor="#FF4081"

                />
                
                <div className=" mt-2  ">
                    {!voice ? <button onClick={startHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Start</button> : <button onClick={stopHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Stop</button>}
                </div>
                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="mt-6" /> : ""}

                </div>
            </div>
        </div>
    );
};

export default ReactRecorder;