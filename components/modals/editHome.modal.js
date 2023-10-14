import * as React from "react";
import Box from "@mui/material/Box";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { formToJSON } from "axios";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  p: 2,
  overflow: "auto",
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 26,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 25,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 22,
    height: 22,
    borderRadius: 11,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
export default function EditHomeModal(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [home, setHome] = React.useState(null);
  const [storeId, setStoreId] = React.useState(null);
  const [res, setRes] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (storeId == null) {
      let store_id = globalThis.window?.location.href;
      setStoreId(store_id?.split("/")[4]);
    }
  }, [storeId]);

  console.log("href", storeId);

  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    storeId ? `https://api.instadrop.com.ng/api/store/${storeId}` : null,
    fetcher
  );

  const handleCreateNewHome = React.useCallback(async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("home_owner", storeId);
    const json = formToJSON(formData);
    console.log(json);
    try {
      toast("Please wait...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/home`,
        json,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        // toast("OTP sent to your email");
        toast("Successful");
        console.log(response.data);
        setTimeout(() => globalThis?.window.location.reload(), 2000);
        // setLoading(false);
      } else {
        toast("Retrying...");
        setLoading(false);
      }
    } catch (e) {
      console.log(`error:`, e);
      toast("Something went wrong, please check your internet connection");
      setLoading(false);
    }
  }, [storeId]);

  React.useEffect(() => {
    const fetchHome = async () => {
      await axios
        .get(
          `https://api.instadrop.com.ng/api/home/subdomain/${data?.subdomain}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((response) => {
          setHome(response?.data);
        })
        .catch((e) => {
          setRes(e?.response.status);
        });
    };
    if (isLoading == false && !error && home == null && storeId) {
      fetchHome();

      if (res == 404) {
        handleCreateNewHome();
      }
    }
  }, [
    home,
    error,
    isLoading,
    data?.subdomain,
    handleCreateNewHome,
    res,
    storeId,
  ]);

  console.log(home, "s");

  const handleSubmit = async (e) => {
    console.log(home, "p");
    setLoading(true);
    e.preventDefault();
    const id = home?.id;
    const body = home;
    delete body.id;
    const json = JSON.stringify(body);
    try {
      toast("Please wait...");

      const response = await axios.put(
        `https://api.instadrop.com.ng/api/home/${id}`,
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
        toast("Update successfully");
        // setTimeout(() => globalThis?.window.location.reload(), 2000);
        setLoading(false);
      } else {
        toast("Failed to update");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e);
    }
  };

  const handleSwitch = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
    setHome((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBusinessChange = (e) => {
    setHome((prev) => ({
      ...prev,
      business: JSON.stringify({
        ...JSON.parse(prev.business),
        [e.target.name]: e.target.value,
      }),
    }));
  };

  const handleCarouselChange = (e) => {
    setHome((prev) => ({
      ...prev,
      carousel: JSON.stringify({
        ...JSON.parse(prev.carousel),
        [e.target.name]: e.target.value,
      }),
    }));
  };

  const handleCarouselAdd = () => {
    setHome((prev) => ({
      ...prev,
      carousel: prev?.carousel?.length
        ? JSON.stringify(JSON.parse(prev.carousel).concat({ name: "" }))
        : JSON.stringify([{ name: "" }]),
    }));
  };

  const handleServiceChange = (e) => {
    setHome((prev) => ({
      ...prev,
      service: JSON.stringify({
        ...JSON.parse(prev.service),
        [e.target.name]: e.target.value,
      }),
    }));
  };

  const handleServiceAdd = () => {
    setHome((prev) => ({
      ...prev,
      service: prev?.service?.length
        ? JSON.stringify(JSON.parse(prev.service).concat({ service: "" }))
        : JSON.stringify([{ service: "" }]),
    }));
  };

  const handleChangeMode = (e) => {
    setHome((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const router = useRouter();

  return (
    <div>
      {console.log(home)}
      <ToastContainer hideProgressBar={true} limit={1} autoClose={1000} />
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between w-full">
            <KeyboardBackspaceOutlinedIcon onClick={() => router.back()} />
            <div className="mb-4 w-fit  mx-auto font-bold text-cente">
              Customize your landing page
            </div>
            <VisibilitySharpIcon />
          </div>

          <Accordion
            expanded={expanded === "panel0"}
            onChange={handleSwitch("panel0")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Maintainance
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="md:w-1/2 mx-auto">
                <div className="font-bold mt-4">Maintainance mode</div>
                {console.log(home)}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Off</Typography>
                  <AntSwitch
                    name="maintenance_mode"
                    checked={home?.maintenance_mode}
                    loading
                    onChange={handleChangeMode}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>On</Typography>
                </Stack>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleSwitch("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Header
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto "
              >
                <div className="font-bold mt-4">
                  Alert Message<span className="text-red-500 my-auto"></span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="alert"
                  value={home?.alert}
                  onChange={handleChange}
                />

                <div className="font-bold mt-4">
                  Landing Image<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  name="landing_image"
                  type="file"
                />
                <div className="font-bold mt-4">
                  Business Logo<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="file"
                />
                <div className="font-bold mt-4">
                  Business Name<span className="text-red-500 my-auto"></span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="name"
                  value={home?.business ? JSON.parse(home?.business)?.name : ""}
                  onChange={handleBusinessChange}
                />
                <div className="font-bold mt-4">
                  Business Slogan<span className="text-red-500 my-auto"></span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="slogan"
                  value={
                    home?.business ? JSON.parse(home?.business)?.slogan : ""
                  }
                  onChange={handleBusinessChange}
                />

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleSwitch("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Carousel
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                {console.log(
                  home?.carousel ? JSON.parse(home?.carousel) : null
                )}
                {home?.carousel?.length &&
                  JSON.parse(home?.carousel)?.map((carousel, i) => (
                    <div key={i}>
                      <div className="font-bold mt-4">
                        Image<span className="text-red-500 my-auto">*</span>
                      </div>
                      <input
                        className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                        placeholder="Fragantly Speaking"
                        type="file"
                      />
                      <div
                        onChange={handleCarouselChange}
                        className="font-bold mt-4"
                      >
                        Name<span className="text-red-500 my-auto"></span>
                      </div>
                      <input
                        className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                        placeholder="Tife's Hub"
                        name="name"
                        value={carousel?.name}
                        onChange={handleCarouselChange}
                      />
                    </div>
                  ))}

                <div
                  onClick={handleCarouselAdd}
                  className="bg-black text-white py-2 px-4 text-center mt-4 rounded-md"
                >
                  Add more category
                </div>

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleSwitch("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Services
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                {home?.carousel?.length &&
                  JSON.parse(home?.carousel)?.map((carousel, i) => (
                    <div key={i}>
                      <div className="font-bold mt-4">
                        Image<span className="text-red-500 my-auto">*</span>
                      </div>
                      <input
                        className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                        placeholder="Fragantly Speaking"
                        type="file"
                      />
                      <div className="font-bold mt-4">
                        Service<span className="text-red-500 my-auto"></span>
                      </div>
                      <input
                        className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                        placeholder="Tife's Hub"
                        name="name"
                        value={home?.service?.name}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                <div
                  onClick={handleServiceAdd}
                  className="bg-black text-white py-2 px-4 text-center mt-4 rounded-md"
                >
                  Add more service
                </div>

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleSwitch("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Video
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Message<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="text"
                  name="message"
                  value={home?.video?.message}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">URL</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="url"
                  value={home?.category?.url}
                  onChange={handleChange}
                />

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleSwitch("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Instagram
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Logo<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="file"
                />
                <div className="font-bold mt-4">Posts</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="post"
                  value={home?.instagram?.post}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Followers</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="followers"
                  value={home?.instagram?.followers}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Following</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="following"
                  value={home?.instagram?.following}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Name</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                />
                <div className="font-bold mt-4">Category</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="category"
                  value={home?.instagram?.category}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Description</div>
                <textarea
                  cols={2}
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="description"
                  value={home?.instagram?.description}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Profile URL</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="profile_url"
                  value={home?.instagram?.profile_url}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Phone</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="phone"
                  value={home?.instagram?.phone}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">Email</div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="email"
                  value={home?.instagram?.email}
                  onChange={handleChange}
                />

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleSwitch("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Partners/Suppliers
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Type<span className="text-red-500 my-auto">*</span>
                </div>

                <select
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="file"
                  name="type"
                  value={home?.partner?.type}
                  onChange={handleChange}
                >
                  <option>Partner</option>
                  <option>Supplier</option>
                </select>
                <div className="font-bold mt-4">
                  Logo<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="file"
                />
                <div className="bg-black text-white py-2 px-4 text-center mt-4 rounded-md">
                  Add more image
                </div>

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleSwitch("panel7")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Press
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Logo<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="file"
                />
                <div className="font-bold mt-4">
                  Name<span className="text-red-500 my-auto"></span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Tife's Hub"
                  name="name"
                  value={home?.press?.name}
                  onChange={handleChange}
                />

                <div className="bg-black text-white py-2 px-4 text-center mt-4 rounded-md">
                  Add more press
                </div>

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>

          {/* <Accordion expanded={expanded === 'panelx'} onChange={handleSwitch('panelx')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                Testimonials
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>

                            <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                                <div className="font-bold mt-4">
                                    Image<span className="text-red-500 my-auto">*</span>
                                </div>
                                <input
                                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                    placeholder="Fragantly Speaking"
                                    type='file'
                                />
                                <div className="font-bold mt-4">
                                    Name<span className="text-red-500 my-auto"></span>
                                </div>
                                <input
                                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                    placeholder="Tife's Hub"
                                />

                                <div className="font-bold mt-4">
                                    Department<span className="text-red-500 my-auto"></span>
                                </div>
                                <input
                                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                    placeholder="Tife's Hub"
                                />

                                <div className="font-bold mt-4">
                                    Testimony<span className="text-red-500 my-auto"></span>
                                </div>
                                <textarea
                                cols={2}
                                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                                    placeholder="Tife's Hub"
                                />


                                <div className='bg-black text-white py-2 px-4 text-center mt-4 rounded-md'>Add more testimonial</div>


                                <div className="flex mx-auto w-full">
                                    <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                                        <button type='button' onClick={props.onClose} className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md">
                                            Cancel
                                        </button>
                                        <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                                            Publish
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </AccordionDetails>
                    </Accordion> */}

          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleSwitch("panel8")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Call to action message
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Message<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="text"
                  name="message"
                  value={home?.cta?.message}
                  onChange={handleChange}
                />

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel9"}
            onChange={handleSwitch("panel9")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Live chat
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  Logo<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="text"
                />
                <div className="font-bold mt-4">
                  Phone<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="tel"
                  name="phone"
                  value={home?.live_chat?.phone}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">
                  Email<span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  type="email"
                  name="email"
                  value={home?.live_chat?.email}
                  onChange={handleChange}
                />

                <div className="mt-4 border-y py-4">
                  <div className="font-bold ">
                    Agents<span className="text-red-500 my-auto"></span>
                  </div>

                  <div className="font-bold mt-4">
                    Image<span className="text-red-500 my-auto">*</span>
                  </div>
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Fragantly Speaking"
                    type="file"
                  />
                  <div className="font-bold mt-4">
                    Name<span className="text-red-500 my-auto"></span>
                  </div>
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Tife's Hub"
                    name="name"
                    value={home?.live_chat?.agent?.name}
                    onChange={handleChange}
                  />

                  <div className="font-bold mt-4">
                    Email<span className="text-red-500 my-auto"></span>
                  </div>
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Tife's Hub"
                    name="email"
                    value={home?.live_chat?.agent?.email}
                    onChange={handleChange}
                  />
                  <div className="font-bold mt-4">
                    Phone<span className="text-red-500 my-auto"></span>
                  </div>
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Tife's Hub"
                    name="phone"
                    value={home?.live_chat?.agent?.phone}
                    onChange={handleChange}
                  />
                  <div className="font-bold mt-4">
                    Department<span className="text-red-500 my-auto"></span>
                  </div>
                  <input
                    className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                    placeholder="Tife's Hub"
                    name="department"
                    value={home?.live_chat?.agent?.department}
                    onChange={handleChange}
                  />
                  <div className="bg-black text-white py-2 px-4 text-center mt-4 rounded-md">
                    Add more agent
                  </div>
                </div>

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel10"}
            onChange={handleSwitch("panel10")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Footer
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto ">
                <div className="font-bold mt-4">
                  About<span className="text-red-500 my-auto">*</span>
                </div>
                <textarea
                  className="p-2 border bg-transparent  border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  name="about"
                  value={home?.footer?.about}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">
                  Terms of service
                  <span className="text-red-500 my-auto">*</span>
                </div>
                <textarea
                  className="p-2 border bg-transparent  border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  name="term_of_service"
                  value={home?.footer?.terms_of_service}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">
                  Privacy policy<span className="text-red-500 my-auto">*</span>
                </div>
                <textarea
                  className="p-2 border bg-transparent  border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  name="privacy_policy"
                  value={home?.footer?.privacy_policy}
                  onChange={handleChange}
                />
                <div className="font-bold mt-4">
                  Public notice<span className="text-red-500 my-auto">*</span>
                </div>
                <textarea
                  className="p-2 border bg-transparent  border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder="Fragantly Speaking"
                  name="public_notice"
                  value={home?.footer?.public_notice}
                  onChange={handleChange}
                />

                <div className="flex mx-auto w-full">
                  <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                    <button
                      type="button"
                      onClick={props.onClose}
                      className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    >
                      Cancel
                    </button>
                    <button className="p-2 bg-black w-full text-white mt-4 rounded-md">
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Modal>
    </div>
  );
}
