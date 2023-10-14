'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../loader/loading';
import { FilePond } from "react-filepond";
import { makeDeleteRequest, makeUploadRequest } from '@/cloudinary/cloudinaryHelper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  p: 4,
  overflow: "auto"

};
const accessToken = globalThis.window?.localStorage.getItem("accessToken");

const RichTextEditor = dynamic(() => import("react-simplemde-editor").then(mod => mod.default), { ssr: false, loading: () => <p>...</p> })
export default function EditProfileModal(props) {
  const [loading, setLoading] = useState(false);
  const [storeId, setStoreId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [files, setFiles] = useState(null)
  const [files1, setFiles1] = useState(null)
  useEffect(() => {
    if (profile == null) {
      setProfile(props.data)
    }
    if (props.open == false) {
      setProfile(props.data)
    }
  }, [profile, props.open])

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleRichTextChange = (value, name) => {
    setProfile(prev => ({
      ...prev, [name]: value
    }))
  }

  console.log("data", profile)

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const id = profile?.id
    const body=profile;
    delete (body.id)
    delete (body.store_owner)
    delete (body.reg_no)
    const json = JSON.stringify(body)
    try {
      toast("Please wait...");
      console.log(json);
      const response = await axios.put(
        `https://api.instadrop.com.ng/api/store/${id}`,
        json, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        toast("Update successfully");
        setTimeout(() => globalThis?.window.location.reload(), 2000);
       

      } else {
        toast("Failed to update");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e)
    }
  };

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponse,
    });
  };

  const process = async (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
      responseCallback: handleResponse,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
  };

  const handleResponse = (response) => {
    handleRichTextChange(response?.secure_url, "logo");
  };

  const resetResponse = () => {
    handleRichTextChange("", "logo");
  };



  const revert1 = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponse1,
    });
  };

  const process1 = async (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
      responseCallback: handleResponse1,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
  };

  const handleResponse1 = (response) => {
    console.log(response)
    handleRichTextChange(response?.secure_url, "cover");
  };

  const resetResponse1 = () => {
    handleRichTextChange("", "cover");
  };


  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>

          {/* INPUTS */}
          <div className='mb-4 w-fit  mx-auto '>Edit Store Profile</div>

          <div className='h-48 w-full bg-gray-200  mx-auto  mb-4' >
            <FilePond
              imagePreviewHeight={170}
              imageCropAspectRatio={"3:1"}
              imageResizeTargetWidth={600}
              imageResizeTargetHeight={200}
              stylePanelLayout={"integrated"}
              styleLoadIndicatorPosition={"center bottom"}
              styleProgressIndicatorPosition={"right bottom"}
              styleButtonRemoveItemPosition={"left bottom"}
              styleButtonProcessItemPosition={"right bottom"}
              // ref={profilePic}
              files={files1}
              acceptedFileTypes={["image/*"]}
              onupdatefiles={setFiles1}
              allowMultiple={false}
              maxFiles={1}
              server={{ process: process1, revert: revert1 }}
              name="file" /* sets the file input name, it's filepond by default */
              labelIdle='New Cover <span class="filepond--label-action">Image</span>'
            />
          </div>

          <div className='h-24 w-24 bg-gray-200 rounded-full mx-auto' >
            <FilePond
              imagePreviewHeight={170}
              imageCropAspectRatio={"1:1"}
              imageResizeTargetWidth={200}
              imageResizeTargetHeight={200}
              stylePanelLayout={"compact circle"}
              styleLoadIndicatorPosition={"center bottom"}
              styleProgressIndicatorPosition={"right bottom"}
              styleButtonRemoveItemPosition={"left bottom"}
              styleButtonProcessItemPosition={"right bottom"}
              // ref={profilePic}
              files={files}
              acceptedFileTypes={["image/*"]}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              server={{ process, revert }}
              name="file" /* sets the file input name, it's filepond by default */
              labelIdle='Drop <span class="filepond--label-action">New Logo</span>'
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
            <div className="font-bold mt-4">
              Business Name <span className="text-red-500 my-auto">*</span>
            </div>
            <input
              className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
              placeholder="Tife's Hub"
              value={profile?.name}
              onChange={handleChange}
              name='name'
            />

            <div className="font-bold mt-4">
              Slogan <span className="text-red-500 my-auto">*</span>
            </div>
            <input
              className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
              placeholder="Fragantly Speaking"
              value={profile?.slogan}
              onChange={handleChange}
              name='slogan'
            />
            <div className="font-bold mt-4">
              Country <span className="text-red-500 my-auto"></span>
            </div>
            <select value={profile?.country}
              onChange={handleChange}
              name='country' className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full">
              <option value="Nigeria" className="p-2">
                Nigeria
              </option>
            </select>
            <div className="font-bold mt-4">
              About your business(optional)
            </div>
            <RichTextEditor className='mt-2 prose' onChange={(value) => {
              handleRichTextChange(value, "about")
            }} value={profile?.about} />
            <div className="font-bold mt-4">
              Vision(optional)
            </div>
            <RichTextEditor className='mt-2 prose' onChange={(value) => {
              handleRichTextChange(value, "vision")
            }} value={profile?.vision} />

            <div className="font-bold mt-4">
              Mission(optional)
            </div>
            <RichTextEditor className='mt-2 prose' onChange={(value) => {
              handleRichTextChange(value, "mission")
            }} value={profile?.mission} />
            <div className="flex mx-auto w-full">
              <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                <button disabled={loading} type='button' onClick={props.onClose} className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md">
                  Cancel
                </button>
                <button disabled={loading} className="p-2 bg-black w-full text-white mt-4 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </form>

        </Box>
      </Modal>
    </div>
  );


}
