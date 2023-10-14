import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import useSWR from "swr";
import { toast } from 'react-toastify';
import axios from 'axios';


const token = globalThis.window?.localStorage.getItem("token");

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

};

export default function AddDeliveryFeeModal(props) {
    const [storeId, setStoreId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [pricing, setPricing] = useState();
    useEffect(() => {
        if (storeId == null) {
            let store_id = globalThis.window?.location.href;
            setStoreId(store_id?.split("/")[4]);
        }
    }, [storeId]);

    useEffect(() => {
        if (props.open == false) {
            setPricing()
        }
    }, [props.open]);

    const fetcher = (...args) =>
        fetch(...args, { headers: { authorization: `Bearer ${token}` } }).then(
            (res) => res.json()
        );
    const { data, error, isLoading } = useSWR(
        `https://audstacknga.herokuapp.com/api/v1/store/branch/store/${storeId}`,
        fetcher
    );
    console.log(data)



    const handleSubmit = async (e) => {

        setLoading(true);
        e.preventDefault();

        const json = JSON.stringify(pricing);
        try {
            toast("Please wait...");
            console.log(json);

            const response = await axios.post(
                `https://audstacknga.herokuapp.com/api/v1/store/pricing/${props.type == "lga" ? "local" : "" || props.type == "state" ? "state" : "" || props.type == "country" ? "interstate" : "" || props.type == "global" ? "internacional" : ""}`,
                json,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status == 200) {
                toast("Pricing created successfully");
                setTimeout(() => globalThis?.window.location.reload(), 3000);
                setLoading(false);

            } else {
                toast("Failed to add pricing");
                setLoading(false);
            }
        } catch (e) {
            toast("Something went wrong");
            setLoading(false);
            console.log(e);
        }
    };

    const handleChange = (e) => {
        setPricing((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            ["store_id"]: storeId,
        }));
    };

    if (props.type == "lga") {
        return (
            <div>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {console.log(pricing)}
                        {/* INPUTS */}
                        <div className='mb-4 w-fit  mx-auto'>Local Pricing</div>


                        <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                placeholder="Location name"
                                disabled={loading}
                                name='location'
                                onChange={handleChange}
                                required
                                value={pricing?.location}

                            />

                            <div className="font-bold mt-4">
                                Price <span className="text-red-500 my-auto">*</span>
                            </div>
                            <div className="flex w-full">
                                <input
                                    className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                    placeholder="$35"
                                    type={"number"}
                                    name='price'
                                    onChange={handleChange}
                                    required
                                    value={pricing?.price}
                                    disabled={loading}
                                />
                                <select
                                    name='branch'
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    value={pricing?.branch}
                                    className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs">
                                    {isLoading == true ? <option value="" className="p-2">
                                        Loading
                                    </option> : <option value="" className="p-2">
                                        Select Branch
                                    </option>}
                                    {!isLoading && data?.storeBranchs.map((branch) =>
                                        <option key={branch?._id} value={branch?._id} className="p-2">
                                            {branch?.name}
                                        </option>
                                    )

                                    }
                                </select>
                            </div>

                            <div className="font-bold mt-4">Note</div>
                            <div className="flex w-full">
                                <textarea
                                    name='note'
                                    onChange={handleChange}
                                    required
                                    value={pricing?.note}
                                    className="p-2 border w-full resize-none rounded-md bg-transparent border-gray-800 focus:outline-none"
                                    placeholder=""
                                    rows={2}
                                    disabled={loading}
                                />
                            </div>


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

    if (props.type == "state") {
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
                        <div className='mb-4 w-fit  mx-auto'>Inter City Pricing</div>


                        <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto">
                            <input
                                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                placeholder="Local Government Area"
                                name="location"
                                onChange={handleChange}
                                required
                                value={pricing?.price}
                                disabled={loading}
                            />

                            <div className="font-bold mt-4">
                                Price <span className="text-red-500 my-auto">*</span>
                            </div>
                            <div className="flex w-full">
                                <input
                                    className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                                    placeholder="$35"
                                    type={"number"}
                                    name="price"
                                    onChange={handleChange}
                                    required
                                    value={pricing?.price}
                                    disabled={loading}
                                />
                                <select
                                    name='branch'
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    value={pricing?.branch}
                                    className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs">
                                    {isLoading == true ? <option value="" className="p-2">
                                        Loading
                                    </option> : <option value="" className="p-2">
                                        Select Branch
                                    </option>}
                                    {!isLoading && data?.storeBranchs.map((branch) =>
                                        <option key={branch?._id} value={branch?._id} className="p-2">
                                            {branch?.name}
                                        </option>
                                    )

                                    }
                                </select>
                            </div>

                            <div className="font-bold mt-4">Note</div>
                            <div className="flex w-full">
                                <textarea
                                    className="p-2 border w-full resize-none rounded-md bg-transparent border-gray-800 focus:outline-none"
                                    placeholder=""
                                    rows={2}
                                    name="note"
                                    onChange={handleChange}
                                    required
                                    value={pricing?.note}
                                    disabled={loading}
                                />
                            </div>






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

    if (props.type == "country") {
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
                <div className="mb-4 w-fit  mx-auto">Inter State Pricing</div>

                <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto">
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="State"
                    name="location"
                    onChange={handleChange}
                    required
                    value={pricing?.location}
                    disabled={loading}
                  />

                  <div className="font-bold mt-4">
                    Price <span className="text-red-500 my-auto">*</span>
                  </div>
                  <div className="flex w-full">
                    <input
                      className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                      placeholder="$35"
                      type={"number"}
                      name="price"
                      onChange={handleChange}
                      required
                      value={pricing?.price}
                      disabled={loading}
                    />
                    <select
                      name="branch"
                      onChange={handleChange}
                      required
                      disabled={loading}
                      value={pricing?.branch}
                      className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                    >
                      {isLoading == true ? (
                        <option value="" className="p-2">
                          Loading
                        </option>
                      ) : (
                        <option value="" className="p-2">
                          Select Branch
                        </option>
                      )}
                      {!isLoading &&
                        data?.storeBranchs.map((branch) => (
                          <option
                            key={branch?._id}
                            value={branch?._id}
                            className="p-2"
                          >
                            {branch?.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="font-bold mt-4">Note</div>
                  <div className="flex w-full">
                    <textarea
                      className="p-2 border w-full resize-none rounded-md bg-transparent border-gray-800 focus:outline-none"
                      placeholder=""
                      rows={2}
                      name="note"
                      onChange={handleChange}
                      required
                      value={pricing?.note}
                      disabled={loading}
                    />
                  </div>

                  <div className="flex mx-auto w-full">
                    <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                      <button
                        disabled={loading}
                        type="button"
                        onClick={props.onClose}
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
    if (props.type == "global") {
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
                <div className="mb-4 w-fit  mx-auto">Inernational Pricing</div>

                <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto">
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Country"
                    name="location"
                    onChange={handleChange}
                    required
                    value={pricing?.location}
                    disabled={loading}
                  />

                  <div className="font-bold mt-4">
                    Price <span className="text-red-500 my-auto">*</span>
                  </div>
                  <div className="flex w-full">
                    <input
                      className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                      placeholder="$35"
                      type={"number"}
                      name="price"
                      onChange={handleChange}
                      required
                      value={pricing?.price}
                      disabled={loading}
                    />
                    <select
                      name="branch"
                      onChange={handleChange}
                      required
                      disabled={loading}
                      value={pricing?.branch}
                      className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                    >
                      {isLoading == true ? (
                        <option value="" className="p-2">
                          Loading
                        </option>
                      ) : (
                        <option value="" className="p-2">
                          Select Branch
                        </option>
                      )}
                      {!isLoading &&
                        data?.storeBranchs.map((branch) => (
                          <option
                            key={branch?._id}
                            value={branch?._id}
                            className="p-2"
                          >
                            {branch?.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="font-bold mt-4">Note</div>
                  <div className="flex w-full">
                    <textarea
                      className="p-2 border w-full resize-none rounded-md bg-transparent border-gray-800 focus:outline-none"
                      placeholder=""
                      rows={2}
                      name="note"
                      onChange={handleChange}
                      required
                      value={pricing?.note}
                      disabled={loading}
                    />
                  </div>

                  <div className="flex mx-auto w-full">
                    <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                      <button
                        disabled={loading}
                        type="button"
                        onClick={props.onClose}
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
}