import React, { useEffect, useState } from "react";

import { BsArrowLeft } from "react-icons/bs";
import { Col, Container, Row } from "reactstrap";
import classes from "./GenerateDetails.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import axios from "axios";
import { Xapkey } from "../apikey";
import { ResetTvRounded, TryRounded } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { padding } from "@mui/system";
import Typography from "@mui/material/Typography";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";
import FormLabel from "@mui/material/FormLabel";

import FormControl from "@mui/material/FormControl";
import BackdropBuffer from "./backdrop_buffer/backdrop_buffer";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let messg;
const sampledata = [
  { id: 1, sample: "River bed" },
  { id: 2, sample: "Reservolr " },
  { id: 3, sample: " Lake land" },
  { id: 4, sample: "freshWater" },
  { id: 5, sample: "Spring water" },
  { id: 6, sample: "Underground water" },
  { id: 7, sample: "Ocean" },
  { id: 8, sample: "Agricultural" },
  { id: 9, sample: "Industrial" },
];

const GenerateDetails = () => {
  const [clientName, setclientName] = useState();
  const [sampleType, setsampleType] = useState();
  const [generatedBy, setgenerated] = useState();
  const [siteCode, setsiteCode] = useState();
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  //wait flag
  const [pleaseWait, setPleaseWait] = useState(false);

  // const [geoLocation, setgeoLocation] = useState({
  //   latitude: "",
  //   longitude: "",
  // });
  console.log(uploadPercentage);

  let name, value;
  const geoInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setgeoLocation({ ...geoLocation, [name]: value });
  };
  const [values, setValues] = React.useState();
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [token, setToken] = useState();
  const [selectOpen, setselectOpen] = useState(false);
  const images = useSelector((state) => state.userdata.lab_images);
  const route = useRouter();
  const SubmitReport = async (e) => {
    console.log(images);
    e.preventDefault();
    console.log(clientName, " ", sampleType, " ", generatedBy);
    // if (!clientName && !sampleType && !generatedBy && !siteCode && !longitude && !latitude)
    // (messg = "Enter all fileds"), setErrorMessage(true);
    // return;
    console.log("hello");
    console.log(clientName, " ", sampleType, " ", generatedBy);

    if (
      clientName &&
      sampleType &&
      generatedBy &&
      siteCode &&
      longitude &&
      latitude
    ) {
      try {
        var formData = new FormData();

        images.map((file, index) => {
          formData.append("uploadImages", file);
        });
        console.log(formData);
        formData.append("clientName", clientName);
        formData.append("sampleType", sampleType);
        formData.append("generatedBy", generatedBy);
        formData.append("siteCode", siteCode);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        //${process.env.NEXT_PUBLIC_SERVER_API}/postReport
        //REACT_APP_SERVER
        //NEXT_PUBLIC_SERVER_API

        //setting wait flag as true
        setPleaseWait(true);

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_API}postReport`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${String(token)}`,
                "x-api-key": process.env.NEXT_PUBLIC_XAPI,
                origin: `${process.env.REACT_APP_CLIENT}`,
              },
              onUploadProgress: (data) => {
                let progresPercent = Math.floor(
                  (data.loaded / data.total) * 100
                );
                // console.log(data.loaded, data.total, progresPercent);
                setUploadPercentage(progresPercent); //set the state for upload progress bar
              },
            }
          );

          const data = response.data;

          if (data.errors && data.errors[0].status === 401) {
            console.log(data.errors[0].message);
            errors = data.errors[0].message;
            setErrorMessage(true);
          } else {
            if (data.status === 200) {
              console.log(data);
            } else {
              errors = "server Error";
              setErrorMessage(true);
            }
          }
        } catch (err) {
          console.log(err);
          errors = "server Error";
          setErrorMessage(true);
          setPleaseWait(false);
        }

        // await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/postReport`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${String(token)}`,
        //     "x-api-key": process.env.NEXT_PUBLIC_XAPI,
        //     origin:`${process.env.REACT_APP_CLIENT}`
        //   },
        //   body: formData,
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.errors && data.errors[0].status === 401) {
        //       console.log(data.errors[0].message);
        //       errors = data.errors[0].message;
        //       setErrorMessage(true);
        //     } else {
        //       if (data.status === 200) {
        //         console.log(data);
        //       } else {
        //         errors = "server Error";
        //         setErrorMessage(true);
        //       }
        //     }
        //   });
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };
  console.log(images);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  // dropdown for type of sample
  const [isModal, setIsModal] = useState(true);

  const contentClassname = isModal
    ? `${classes.select_tag} ${classes.select_tagopen}`
    : classes.select_tagopen;

  const handleChange = (event) => {
    setValues(event.target.value);
    setsampleType(event.target.value);
  };
  const OpenClose = () => {
    if (isModal === true) {
      setIsModal(false);
    } else {
      setIsModal(true);
    }
  };

  return (
    <>
      <p className={classes.head}>
        {" "}
        <span className={classes.arrowleft}>
          {" "}
          {/* <BsArrowLeft onClick={() => route.push("/gen")} /> */}
        </span>{" "}
        <span className={classes.head2}>Generate : </span> Add details
      </p>
      <div
        className={classes.back}
        style={{
          position: "absolute",
          top: "10%",
          left: "78%",
          textDecoration: "underline",
          color: "#000000",
        }}
      >
        <a href="/gen">back</a>
      </div>
      <form>
        <Container fluid className={classes.cont}>
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="name" className={classes.detail}>
                Name of the Client
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="clientName"
                className={classes.fill}
                value={clientName}
                required
                onChange={(e) => setclientName(e.target.value)}
              />
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              {" "}
              <label for="nature" className={classes.detail}>
                Type of sample
              </label>
            </Col>
            <Col md={5}>
              <span className={classes.searchicon}>
                <BiChevronDown onClick={OpenClose} />
              </span>
              <input
                type="null"
                name="sampleType"
                className={classes.fill}
                value={values}
                required
                onChange={(e) => setsampleType(e.target.value)}
                onClick={OpenClose}
                style={{ cursor: "pointer" }}
              />
              <div className={contentClassname}>
                <FormControl>
                  {sampledata.map((val) => {
                    return (
                      <>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          color="default"
                          value={values}
                          onChange={handleChange}
                          sx={{ fontSize: 2, marginLeft: 2, padding: 0 }}
                        >
                          <FormControlLabel
                            label={val.sample}
                            value={val.sample}
                            control={
                              <Radio
                                color="default"
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                    display: "block",
                                    padding: 0,
                                  },
                                }}
                              />
                            }
                          />
                        </RadioGroup>
                      </>
                    );
                  })}
                </FormControl>
              </div>
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              {" "}
              <label for="generated" className={classes.detail}>
                Generated by ( technician )
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="generatedBy"
                required
                value={generatedBy}
                onChange={(e) => setgenerated(e.target.value)}
                className={classes.fill}
              />
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="name" className={classes.detail}>
                Site Code
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="siteCode"
                required
                className={classes.fill}
                value={siteCode}
                onChange={(e) => setsiteCode(e.target.value)}
              />
            </Col>
          </Row>
          {/* =========================================== */}
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="exampleCity" className={classes.detail}>
                Geographical Location
              </label>
            </Col>

            <Col md={4} className={classes.geographical_sapce}>
              <label for="exampleState" className={classes.detail1}>
                Latitude:
              </label>
              <input
                id="exampleState"
                name="latitude"
                className={classes.fill1}
                value={latitude}
                required
                onChange={(e) => setlatitude(e.target.value)}
              />
              <label
                for="exampleZip"
                className={`${classes.detail1} ${classes.detail12}`}
              >
                Longitude:
              </label>
              <input
                id="exampleZip"
                name="longitude"
                required
                value={longitude}
                onChange={(e) => setlongitude(e.target.value)}
                className={`${classes.fill1} ${classes.fill12}`}
              />
            </Col>
          </Row>

          {/* ============================================= */}
          <button className={classes.sub} onClick={SubmitReport}>
            SUBMIT
          </button>
        </Container>
      </form>
      {/* {pleaseWait ? <div style={{ textAlign: "center", color: "Highlight" }}>
        Report Analysis is in process please wait...
      </div> : null} */}

      {pleaseWait && (
        <BackdropBuffer bufferText="Report Analysis is in process please wait..." />
      )}

      <Container className={classes.footer}>
        <p> copyright aivara | terms and coditions </p>
      </Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={ErrorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(false)}
        >
          <Alert
            onClose={() => setErrorMessage(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {messg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default GenerateDetails;

// "Content-Type": "application/json ",
//             Authorization: Token,
//             "x-api-key": process.env.NEXT_PUBLIC_XAPI,

// const uploaddetails =async()=>{
//   try{
//     const resp = await fetch("http://localhost:5000/postReport", {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + Token,
//         "x-api-key": process.env.NEXT_PUBLIC_XAPI,
//       },
//       body: JSON.stringify({
//         companyName,
//         sampleType,
//         generatedBy,
//       }),
//     });
//     console.log(resp);
//   }catch(err){
//     console.log(err);
//   }
// }
// .then((response) => response.json())
//  .then((data) => {
//    if (data.errors && data.errors[0].status === 401) {
//      console.log(data.errors[0].message);
//      errors = data.errors[0].message;
//      setErrorMessage(true);
//    } else {
//      if (data.data.status === 200) {
//        console.log(data);
//      } else {
//        errors = "server Error";
//        setErrorMessage(true);
//      }
//    }
//  });

{
  /* <div class="row">
            <div class="col-sm-3">
              <label for="exampleZip" className={classes.detail}>
                Geographical Location
              </label>
            </div>
            <div class="col-sm-4 " className={classes.geographical_filed}>
              <label for="exampleZip" className={classes.detail1}>
                Longitude:
              </label>
              <input id="exampleZip" name="zip" className={classes.fill1} />
              <label for="exampleZip" className={classes.detail1}>
                Longitude:
              </label>
              <input id="exampleZip" name="zip" className={classes.fill1} />
            </div>
          </div> */
}
