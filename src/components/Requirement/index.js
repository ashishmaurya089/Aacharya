import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../axios";
import {
  Button,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Typography,
  TextField,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Slide,
  DialogTitle,
  Avatar,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";

import useGeoLocation from "../UseGeoLocation";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


const Requirement = () => {
  const currentLocation = useGeoLocation().coordinates;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [learningMode, setLearningMode] = useState("any mode");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [startFrom, setStartFrom] = useState("with in a week");
  const [duration, setDuration] = useState("any");
  const [genderPreference, setGenderPreference] = useState("any gender");
  const [address, setAddress] = useState("");
  const [pickLocationInput, setPickLocationInput] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [pickLocation, setPickLocation] = useState(false);
  const [learningModeOption, setLearingModeOption] = useState([]);
  const [startFromOption, setStartFromOption] = useState([]);
  const [durationOption, setDurationOption] = useState([]);
  const [genderOption, setGenderOption] = useState([]);
  const [priceOption, setPriceOption] = useState([{ value: 0 }, { value: 25000 }]);

  const getConfig = async () => {
    const { data } = await axios.get('/api/users/getPYRConfig');
    Object.keys(data).map((option) => {
      if (option != 'incognitoImages') {

        data[option] = data[option].map((value) => {
          //  //console.log(value);
          return {
            value: value,
            label: toTitleCase(value.toString())
          }
        })
      } else {
        data['incognitoImages'] = Object.keys(data['incognitoImages']).map(value => {
          return {
            value: value,
            label: toTitleCase(value),
            image: data['incognitoImages'][value]
          }
        })
      }

    });
    const { learningMode: learn, priceRange: price, startFrom: start, duration: dur, incognitoImages } = data;
    setLearingModeOption(learn);
    setStartFromOption(start);
    setDurationOption(dur);
    setGenderOption([...incognitoImages,{
      label:"Any Gender",value:"any gender"
    }]);
    setPriceOption(price);
    setLearningMode(learn.at(-1).value);
    setStartFrom(start[0].value);
  }
  useEffect(() => {
    getConfig();
  }, []);
  function getSteps() {
    return [
      {
        name: `Subject`,
        value: selectedSubject ? toTitleCase(selectedSubject.name) : "",
      },
      { name: `Location`, value: toTitleCase(address) },
      { name: `Tuition Mode`, value: toTitleCase(learningMode) },
      {
        name: `Price`,
        value: `\u20B9 ${priceRange[0]} - \u20B9 ${priceRange[1]}`,
      },
      { name: `Start Date`, value: toTitleCase(startFrom) },
      { name: `Duration`, value: toTitleCase(duration) },
      { name: `Gender`, value: toTitleCase(genderPreference) },
    ];
  }

  const handleOpenPickLocation = () => {
    setPickLocation(!pickLocation);
  };
  const handlePickLocationInput = (address) => {
    setPickLocationInput(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    setPickLocationInput('');
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoordinates([latLng.lat, latLng.lng]);
      })
      .catch((error) => console.error("Error", error));
    handleNext();
  };

  const handleSelctedSubject = (subject) => {
    setSelectedSubject(subject);
    setSearchResult([]);
    setWordEntered(subject.name);
    handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              value={wordEntered}
              onChange={(e) => handleSerachInput(e)}
              placeholder="Search a Subject"
              inputProps={{ "aria-label": "search" }}
              fullWidth
              autoFocus
            />
            {searchResult.length ? (
              <div className={classes.searchResultDiv}>
                <List component="nav" aria-label="main mailbox folders">
                  {searchResult.map((result) => (
                    <ListItem
                      key={result._id}
                      button
                      className={classes.resultCard}
                      onClick={() => handleSelctedSubject(result)}
                    >
                      <div>
                        <strong>{result.name}</strong>
                      </div>
                      <span
                        className={`${classes.mutedText} ${classes.searchResultOption}`}
                      >
                        Stream:{result.stream.name} &emsp; Level:{" "}
                        {result.level.name}
                      </span>
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : null}
          </div>
        );
      case 1:
        return (
          <>
            <div className={classes.mutedText}>
              Select location as per your preference
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.LocationButton}
              onClick={() => handleLocation(1)}
            >
              Current Location
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.LocationButton}
              onClick={handleOpenPickLocation}
            >
              Pick a Location
            </Button>
            
            {pickLocation && (
              <PlacesAutocomplete
                value={pickLocationInput}
                onChange={handlePickLocationInput}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div style={{ margin: "20px auto" }}>
                    <TextField
                      variant="outlined"
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                        autoFocus: 'true'
                      })}
                      fullWidth
                    />
                    <div
                      className={`autocomplete-dropdown-container ${classes.locationSearchResult}`}
                    >
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                            backgroundColor: "#ccc",
                            cursor: "pointer",
                            margin: "10px 0",
                          }
                          : {
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            margin: "10px 0",
                          };
                        return (
                          <div
                            key={index}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span style={{ padding: "5px 10px" }}>
                              {suggestion.description}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            )}
           

            <Button
              onClick={() => handleLocation(3)}
              variant="contained"
              color="primary"
              className={classes.LocationButton}
            >
              No Preference
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <div className={classes.mutedText}>
              Select your prefered tuition mode
            </div>
            {learningModeOption.map((mode) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mode.value === learningMode}
                      onChange={(event) =>
                        handleCheckbox(event, setLearningMode, learningModeOption.at(-1).value)
                      }
                      name={mode.value}
                    />
                  }
                  key={mode.label}
                  className={classes.displayBlock}
                  label={mode.label}
                />
              );
            })}
          </>
        );
      case 3:
        return (
          <>
            <div className={classes.mutedText}>
              Select your prefered price range
            </div>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={priceOption[0].value}
              max={priceOption[1].value}
              // min={0}
              // max={25000}
              step={500}
            />
            <div>
              {" "}
              {"\u20B9"} {priceRange[0]} - {"\u20B9"} {priceRange[1]}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className={classes.mutedText}>
              Select your prefered Start Date
            </div>
            {startFromOption.map((option) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.value === startFrom}
                      onChange={(event) =>
                        handleCheckbox(event, setStartFrom, "with in a week")
                      }
                      name={option.value}
                    />
                  }
                  key={option.label}
                  className={classes.displayBlock}
                  label={option.label}
                />
              );
            })}
          </>
        );
      case 5:
        return (
          <>
            <div className={classes.mutedText}>
              Select your prefered duration
            </div>
            {durationOption.map((option) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.value === duration}
                      onChange={(event) =>
                        handleCheckbox(event, setDuration, "any")
                      }
                      name={option.value}
                    />
                  }
                  key={option.label}
                  className={classes.displayBlock}
                  label={option.label}
                />
              );
            })}
          </>
        );
      case 6:
        return (
          <>
            <div className={classes.mutedText}>
              Select your prefered tutor gender
            </div>
            {genderOption.map((option) => {
              return (
                <FormControlLabel
                  control={

                    <Checkbox
                      checked={option.value === genderPreference}
                      onChange={(event) =>
                        handleCheckbox(event, setGenderPreference, "any gender")
                      }
                      name={option.value}
                    />

                  }
                  key={option.label}
                  className={classes.displayBlock}
                  label={option.label}
                />

              );
            })}
          </>
        );
      default:
        return "Unknown step";
    }
  }

  const handleCheckbox = (event, setchange, defval) => {
    if (!event.target.checked) {
      setchange(defval);
    } else {
      setchange(event.target.name);
    }
  };

  const handlePriceChange = (event, value) => {
    setPriceRange(value);
  };

  const handleSerachInput = (event) => {
    setWordEntered(event.target.value);
  };
  const handleOpen = (bool) => {
    setWordEntered("");
    setSelectedSubject(null);
    setSearchResult([]);
    // setLearningMode("no preference");
    setPriceRange([0, 10000]);
    // setStartFrom("with in a week");
    setDuration("any");
    setGenderPreference("any gender");
    setAddress("");
    setCoordinates([]);
    setPickLocation(false);
    setPickLocationInput('');
    setActiveStep(0);
    setOpen(bool);
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handlePostRequirement = async () => {
    handleOpen(false);
    axios.post("/api/users/postRequirement", {
      learningMode,
      coordinates,
      oneToOne: true,
      subject: selectedSubject._id,
      level: selectedSubject.level._id,
      startFrom,
      priceRange,
      duration,
      genderPreference,
    }).then((data) => {

      if (data.data.status === "success") {
        toast.success("Requirement Posted Successfully");
      } else {
        toast.error("Error occurred please try again");
      }
    })
      .catch((err) => {
        if (err.response.status == 403) {
          toast.error("Please Sign in");
        }
        if (err.response.status == 408) {
          toast.error(err.message);
        }
        if (err.response.status >= 500) {
          toast.error(`Server Error ${err.message}`);
        }

      })
  };
  useEffect(() => {
    async function fetchData() {
      if (wordEntered) {
        const { data } = await axios.post("/api/subjects/searchSubject", {
          searchTerm: wordEntered,
        });

        setSearchResult(data.data);
      }
    }
    fetchData();
  }, [wordEntered]);


  const handleLocation = (type) => {
    
    if (type == 1) {

      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCoordinates([position.coords.latitude, position.coords.longitude]);
        handleNext();
      }, (e) => {
        alert(e.message + '. Please enable Geolocation access or Pick a location');
      })
      setAddress("Current Location");
    } else {
      setAddress("No Preference");
      setCoordinates([]);
      handleNext();
    }
    setPickLocationInput('');
  };

  return (
    <>
      <Dialog
        fullScreen
        onClose={() => handleOpen(false)}
        aria-labelledby="post your requiremnet"
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => handleOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              POST YOUR REQUIREMENTS
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent dividers className={classes.DialogContent}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.Steeper}
          >
            {steps.map((label, index) => (
              <Step key={label.name}>
                <StepLabel>
                  {label.name}{" "}
                  {activeStep > index ? (
                    <span
                      className={classes.mutedText}
                    >{`: ${label.value}`}</span>
                  ) : (
                    ""
                  )}
                </StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      {(label.name !== "Location" && label.name !== 'Subject') ? (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "white" }}
                          onClick={
                            activeStep !== steps.length - 1
                              ? handleNext
                              : handlePostRequirement
                          }
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? "Post your Requirement"
                            : "Next"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 heading-section ftco-animate text-center">
            <h5 style={{ textTransform: "uppercase" }} ><b>DEAR PARENTS & STUDENTS!</b></h5>
            <h3 className={classes.pyr} >Could not find tutors?</h3>
            <p style={{ padding: "0 20px" }} className={classes.tagline} >Post your requirements here and qualified tutors will contact you shortly.</p>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              className={classes.postButton}
              onClick={() => handleOpen(true)}
            >
              Post your Requirement
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requirement;
