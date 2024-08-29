import React, { useState } from 'react';
import videoLogo from '../assets/video-posting.png'
import { Button, Card, Label, TextInput, Textarea, Progress, Alert } from 'flowbite-react';
import axios from "axios";

function VideoUpload() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: ""
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    //console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFeildChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);

    setMeta({
      ...meta,
      [event.target.name]: event.target.value,

    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();

    if (!selectedFile) {
      alert("Select File !!");
      return;
    }

    //submit the file to server
    saveVideoToServer(selectedFile, meta);

    // console.log(meta);

  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);

    //api call using axios
    try {

      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);

      let response = await axios.post(
        `http://localhost:8080/api/v1/videos`,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          setProgress(progress);
          console.log(progressEvent);
        },
      });

      console.log(response);
      setProgress(0);
      setMessage("file uploaded");
      setUploading(false);

    } catch (error) {
      console.log(error);
      setMessage("Error in uploading file");
      setUploading(false);
    }

  }

  return <div className='text-white'>

    <Card className='flex flex-col'>
      <h1>
        Upload Videos
      </h1>
      <div>

        <form noValidate className='flex flex-col space-y-6' onSubmit={handleForm} >
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='file-upload' value='Video Title' />
            </div>

            <TextInput onChange={formFeildChange} name='title' placeholder='Enter title' />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Video Description" />
            </div>

            <Textarea onChange={formFeildChange} name='description' id="comment" placeholder="Write video description..." required rows={4} />
          </div>

          <div className='flex items-center space-x-5'>

            <div className="shrink-0">
              <img className="h-16 w-16 object-cover " src={videoLogo} alt="Current profile photo" />
            </div>

            <label className="block">
              <span className="sr-only">Choose video file</span>
              <input name='file'
                onChange={handleFileChange}
                type="file"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "/>
            </label>
          </div>

          <div>
          { uploading && (<Progress 
              progress={progress} 
              textLabel="Uploading" 
              size="lg" 
              labelProgress 
              labelText 
            />
          )}
          </div>

          <div>
            { message && (
              <Alert color={"success"}>
                <span className='font-medium '>Success alert! </span>
                {message}
              </Alert>
            )}
          </div>

          <div className='flex justify-center'>
            <Button disabled={uploading} type='submit'>Submit</Button>
          </div>

        </form>
      </div>

    </Card>
  </div>
}

export default VideoUpload;


