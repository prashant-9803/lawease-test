import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Mic } from "lucide-react";
import { ReactMic } from "react-mic";
import { apiConnector } from "@/services/apiConnector";
import React from "react";
// import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function CaseCreation() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null); // Ref to MediaRecorder instance
  const [caseAudioLink, setCaseAudioLink] = useState("");
  const [caseTranscribe, setCaseTranscribe] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [voice, setVoice] = useState(false);
  const [recordBlobLink, setRecordBlobLink] = useState(null);

  const onStop =async (recordedBlob) => {
    setRecordBlobLink(recordedBlob.blobURL);
    setIsRunning(false);
    console.log("abcd: ", recordedBlob);
    await handleRecording();
  };

  const startHandle = () => {
    setElapsedTime(0);
    setIsRunning(true);
    setVoice(true);
  };
  const stopHandle = () => {
    setIsRunning(false);
    setVoice(false);
  };

  useEffect(() => {
    console.log(recordedAudio);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };


 

  const transcribeAudio = async (audi) => {
    console.log("Transcribing audio...");
    console.log(audi);
    const response = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "url": audi }),
    });

    const data = await response.json();

    return data;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
  };

  const handleRecording = async () => {


          // Transcribe audio
          const transcription = await transcribeAudio(recordBlobLink);

          if (transcription) {
            setCaseTranscribe(transcription);
            console.log("Transcription:", transcription);
          } else {
            console.log("Error transcribing audio");
          }
        };



  return (
    <div className="w-full max-w-4xl mx-auto p-6 mt-14 ">
      <div className="mt-14 text-black">
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
            {!voice ? (
              <button
                onClick={startHandle}
                className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "
              >
                Start
              </button>
            ) : (
              <button
                onClick={stopHandle}
                className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "
              >
                Stop
              </button>
            )}
          </div>
          <div className="">
            {recordBlobLink ? (
              <audio controls src={recordBlobLink} className="mt-6" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <h1 className="text-4xl mb-6 mt-10 tracking-tighter font-semibold">
        Enter Case Details
      </h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="caseDetails" className="text-lg font-semibold">
            Case Details
          </Label>
          <div className="flex justify-between items-center gap-6">
            <Textarea
              id="caseDetails"
              placeholder="Enter case details / dispute description"
              className="mt-1 w-full"
              rows={4}
            />
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold">Upload Files</Label>
          <div
            className={`mt-1 border-2 border-dashed rounded-lg p-10 text-center ${
              dragActive ? "border-primary" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your files here, or click to select
            </p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(e.target.files);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Select Files
            </Button>
          </div>
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">Uploaded Files:</h4>
              <ul className="mt-2 text-sm text-gray-600">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit Case
        </Button>
      </form>

      <div className="">
        {!voice ? (
          <button
            onClick={startHandle}
            className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "
          >
            <Mic />
          </button>
        ) : (
          <button
            onClick={stopHandle}
            className=" bg-[#fff] text-red-600 rounded-md py-1 px-3 font-semibold text-[16px] "
          >
            <Mic />
          </button>
        )}
      </div>
    </div>
  );
}
