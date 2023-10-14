import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import { FilePond } from "react-filepond";
import { makeDeleteRequest, makeUploadRequest } from '@/cloudinary/cloudinaryHelper';
import LinkIcon from "@mui/icons-material/Link";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    height: "100%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    overflow: 'scroll',
    p: 4,

};

const admin = globalThis.window?.localStorage.getItem("admin" || '');
const accessToken = admin
export default function EditDispatcherModal(props) {
    const [dispatcher, setDispatcher] = useState(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null)

    useEffect(() => {
        if (dispatcher == null) {
            setDispatcher(props.data);
        }
        if (props.open == false) {
            setDispatcher(props.data);
        }
    }, [dispatcher, props.open, props.data]);

    const handleGenerateAuth = async () => {
        setLoading(true);
    
    
        try {
          const id = dispatcher?.id
          toast("Please wait...");;
          const response = await axios.put(
            `https://api.instadrop.com.ng/api/store-dispatcher/${id}/auth/generate`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status == 200 || response.status == 201) {
            toast("Dispatcher authentication link generated successfully");
            setTimeout(() => globalThis?.window.location.reload(), 2000);
            setLoading(false);
          } else {
            toast("Failed");
            setLoading(false);
          }
        } catch (e) {
          toast("Something went wrong");
          setLoading(false);
         
        }
      };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const id = dispatcher?.id
        delete dispatcher?.id //remove the id as we cant update id
        delete dispatcher?.reg_no //remove the reg_no we cant update reg_no
        delete dispatcher?.dispatcher_owner //remove the owner we cant update owner
        const json = JSON.stringify(dispatcher);
        try {
            toast("Please wait...");
            console.log(json);

            const response = await axios.put(
                `https://api.instadrop.com.ng/api/store-dispatcher/${id}`,
                json,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.status == 200 || response.status == 201) {
                toast("Dispatcher updated successfully");
                setTimeout(() => globalThis?.window.location.reload(), 2000);
              
            } else {
                toast("Failed");
                setLoading(false);
            }
        } catch (e) {
            toast("Something went wrong");
            setLoading(false);
            console.log(e);
        }
    };

    const handleChange = (e) => {
        setDispatcher((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRichTextChange = (name, value) => {
        setDispatcher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const shareData = {
        title: `${dispatcher?.first_name} authentication link`,
        text: "Here is your authentication link, please protect and treat as a password.\n",
        url: `https://pilot.audstack.com/auth/${dispatcher?.auth_link}`,
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
        handleRichTextChange("photo_1", response?.secure_url);
    };

    const resetResponse = () => {
        handleRichTextChange("photo_1", "");
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
                    {/* name
       image
       phone1
       phone2
       email
       type */}
                    {/* INPUTS */}
                    <div className="mb-4 w-fit  mx-auto">Edit dispatcher</div>
                    <div className="mb-8 md:flex space-x-4 md:w-1/2 mx-auto">
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
                                files={files}
                                acceptedFileTypes={["image/*"]}
                                onupdatefiles={setFiles}
                                allowMultiple={false}
                                maxFiles={1}
                                server={{ process, revert }}
                                name="file" /* sets the file input name, it's filepond by default */
                                labelIdle='New <span class="filepond--label-action">Image</span>'
                            />
                        </div>
                        <div>
                            <div className="font-bold">{dispatcher?.first_name}&nbsp;{dispatcher?.last_name}</div>
                            <div className="w-fit text-[0.5rem] bg-black p-1 text-white rounded-full px-2">
                                {dispatcher?.gender}
                            </div>
                            <div className="text-xs">{dispatcher?.email}</div>
                            <div className="text-xs">{dispatcher?.phone_1}</div>
                            <div className="text-xs">{dispatcher?.phone_2}</div>

                            <div>
                                <div onClick={handleGenerateAuth} className='text-xs border p-2 rounded-full w-fit cursor-pointer'>Login key</div>
                                {dispatcher?.auth_link ? <div
                                    onClick={() => navigator.share(shareData)}
                                    className=" mt-4  cursor-pointer w-fit"
                                >
                                    <LinkIcon />
                                </div> : <div>Authentication link not yet generated.</div>}
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
                    >
                        <div className="font-bold mt-4">
                            Names <span className="text-red-500 my-auto">*</span>
                        </div>
                        <div className="flex w-full">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                placeholder="Firstname"
                                type={"text"}
                                value={dispatcher?.first_name}
                                onChange={handleChange}
                                required
                                name="first_name"
                                disabled={loading}
                            />
                            <input
                                className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                                placeholder="Lastname"
                                type={"text"}
                                value={dispatcher?.last_name}
                                onChange={handleChange}
                                required
                                name="last_name"
                                disabled={loading}
                            />
                        </div>


                        <div className="font-bold mt-4">
                            Email <span className="text-red-500 my-auto">*</span>
                        </div>
                        <div className="flex w-full">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                placeholder="ellu-p@gmail.com"
                                type={"email"}
                                value={dispatcher?.email}
                                onChange={handleChange}
                                required
                                name="email"
                                disabled={loading}
                            />
                            <select
                                value={dispatcher?.gender}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                name="gender"
                                className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                            >
                                <option value="" className="p-2">
                                    Select gender
                                </option>
                                <option value="Male" className="p-2">
                                    Male
                                </option>
                                <option value="Female" className="p-2">
                                    Female
                                </option>

                            </select>
                        </div>

                        <div className="font-bold mt-4">
                            Phone <span className="text-red-500 my-auto">*</span>
                        </div>
                        <div className="flex w-full">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                placeholder="0708955332"
                                type={"tel"}
                                maxLength={17}
                                minLength={11}
                                disabled={loading}
                                value={dispatcher?.phone_1}
                                onChange={handleChange}
                                required
                                name="phone_1"
                            />
                            <input
                                className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                                placeholder="08065433235"
                                type={"tel"}
                                maxLength={17}
                                minLength={11}
                                disabled={loading}
                                value={dispatcher?.phone_2}
                                onChange={handleChange}

                                name="phone_2"
                            />
                        </div>

                        <div className="font-bold mt-4">
                            Bank <span className="text-red-500 my-auto">*</span>
                        </div>
                        <div className="flex w-full">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                placeholder="Bank account"
                                type={"number"}
                                maxLength={10}
                                minLength={10}
                                disabled={loading}
                                value={dispatcher?.bank_account}
                                onChange={handleChange}
                                name="bank_account"
                            />
                            <input
                                className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                                placeholder="Bank name"
                                type={"text"}
                                minLength={1}
                                disabled={loading}
                                value={dispatcher?.bank_name}
                                onChange={handleChange}
                                required
                                name="bank_name"
                            />
                        </div>

                        <div className="font-bold mt-4">
                            Beneficiary<span className="text-red-500 my-auto">*</span>
                        </div>
                        <div className="flex w-full">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-md w-full focus:outline-none"
                                placeholder="Bank beneficiary"
                                type={"text"}
                                disabled={loading}
                                value={dispatcher?.bank_beneficiary}
                                onChange={handleChange}
                                name="bank_beneficiary"
                            />

                        </div>

                        <div className="font-bold mt-4">
                            Address <span className="text-red-500 my-auto">*</span>
                        </div>
                        <textarea
                            className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                            placeholder="Parcelshop owner address"
                            value={dispatcher?.address}
                            onChange={handleChange}
                            name='address'
                        />

                        <div className="flex mx-auto w-full">
                            <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                                <button
                                    type="button"
                                    onClick={props.onClose}
                                    disabled={loading}
                                    className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={loading}
                                    className="p-2 bg-black w-full text-white mt-4 rounded-md"
                                >
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