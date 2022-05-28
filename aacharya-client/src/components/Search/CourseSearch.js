import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Button, InputBase, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";

import { searchSubjects } from "../../actions/subjectActions";

import useStyles from "./styles";
import "./CourseSearch.css";



function CourseSearch({ color }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const { searchedSubjects, msg } = useSelector((state) => state.subjectsData);
  const { selectedSearchSubject } = useSelector((state) => state.tutorsData);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedSearch, setselectedSearch] = useState({});

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = searchedSubjects.filter((value) => {
    // 	return value.name.toLowerCase().includes(searchWord.toLowerCase());
    // });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      if (searchWord.length > 2) setFilteredData(searchedSubjects);
    }
  };

  const clearInput = () => {
    setWordEntered("");
    setFilteredData([]);
    setselectedSearch({});
  };

  const handleClickSearch = (value) => {
    //console.log(value);
    setselectedSearch(value);
    //console.log(selectedSearch);
    setWordEntered(value.name);
    setFilteredData([]);
    dispatch({
      type: "SELECTED_SEARCH_SUBJECT",
      payload: value,
    });
  };
  useEffect(() => {
    if (wordEntered) {
      dispatch(searchSubjects(wordEntered));
    }
  }, [wordEntered]);

  const handleFindInstitute = () => {
    if (selectedSearchSubject && selectedSearchSubject._id) {
      history.push("/findInstitute");
    }
  };
  const handleFindTutor = () => {
    if (selectedSearchSubject && selectedSearchSubject._id) {
      history.push("/findTutor");
    }
  };

  return (
    <>
      <section className="ftco-search-course" style={{ background: color }}>
        <div className='container'>
          <div className="row">
            <div className="col-md-12">
              <div className="courseSearch-wrap d-md-flex flex-column-reverse">
                <div className="full-wrap d-flex ftco-animate">
                  <div
                    className={` one-third order-last ${classes.searchWrap} `}
                    style={{ position: "relative" }}
                  >
                    {/* <span>Know what you're after?</span> */}
                    {/* <form className='course-search-form'> */}
                    {/* <div className='form-group d-flex '>
											<div className={`submit ${classes.searchIcon}`}>
												{filteredData.length > 0 ? (
													<CloseIcon id='clearBtn' onClick={clearInput} />
													) : (
														<SearchIcon />
														)}
														</div>
														<input
												value={wordEntered}
												type='text'
												className={`form-control ${classes.formControl}`}
												placeholder='Type a course you want to study'
												onChange={(e) => handleFilter(e)}
												/>
											</div> */}

                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.searchBar}>
                          <SearchIcon />
                          {/* <div className={classes.searchBarIcon}>
				<SearchIcon />
					</div> */}
                          <InputBase
                            value={wordEntered}
                            onChange={(e) => handleFilter(e)}
                            placeholder="Type a course you are looking for"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.findButtons}>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            // disabled={!selectedSearch.name}
                            // onClick={handleLocation}
                            onClick={handleFindTutor}
                          >
                            Find Tutor
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            // disabled={!selectedSearch.name}
                            onClick={handleFindInstitute}
                          //     style={{marginLeft:8}}
                          >
                            Find Coaching Center
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={8}>
                        {filteredData.length > 0 && (
                          <Card className={classes.cardList}>
                            <div className={classes.dataResult}>
                              {filteredData.map((value, i) => (
                                <div
                                  key={i}
                                  className={classes.dataItem}
                                  onClick={() => handleClickSearch(value)}
                                >
                                  <div className={classes.dataItemList}>
                                    <SearchIcon />
                                    <div>
                                      <p>{value.name}</p>
                                      <small>
                                        Stream:{" "}
                                        {value.stream && value.stream.name}
                                      </small>
                                      {"  "}
                                      <small>
                                        Level: {value.level && value.level.name}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        )}
                        {msg ===
                          "try to broaden your search by removing filters" ? (
                          <div className="my-2">
                            <h1 className="x-large text-primary">
                              <i className="fas fa-exclamation-triangle"></i>{" "}
                              {`No Results Found. :(`}
                            </h1>
                            <p className="large">
                              Try to broaden your search by removing filters!
                            </p>
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>

                    {/* <div className={classes.showButtons}>
											<Button
												variant='contained'
												color='secondary'
												className={classes.button}
												// disabled={!selectedSearch.name}
												onClick={handleLocation}
												size='small'
											>
												Find Tutor
											</Button>
											<Button
												variant='contained'
												color='secondary'
												className={classes.button}
												// disabled={!selectedSearch.name}
												size='small'
											>
												Find Coaching Center
											</Button>
										</div> */}

                    {/* </form> */}
                    {/* <Button
											variant='contained'
											color='secondary'
											className={classes.button}
											disabled={!selectedSearch.name}
											onClick={handleLocation}
										>
											Find Tutor
										</Button>
										{'  '}
										<Button
											variant='contained'
											color='secondary'
											className={classes.button}
											disabled={!selectedSearch.name}
										>
											Find Coaching Center
										</Button> */}
                    {/* <p>
											Just Browsing? <Link to='#'> See all courses</Link>
										</p> */}
                  </div>
                  {/* <div
										className='one-forth order-first img'
										style={{ backgroundImage: `url(${bgImgOne})` }}
									></div> */}
                </div>
                {/* <div className='full-wrap ftco-animate'>
									<div className='one-half'>
										<div className='featured-blog d-md-flex'>
											<div className='image d-flex order-last'>
												<Link
													to='#'
													className='img'
													style={{ background: `url(${bgImgTwo})` }}
												></Link>
											</div>
											<div className='text order-first'>
												<span className='date'>Aug 20, 2018</span>
												<h3>
													<Link to='#'>We Conduct Workshop 2018</Link>
												</h3>
												<p>
													A small river named Duden flows by their place and
													supplies it with the necessary regelialia.
												</p>
											</div>
										</div>
									</div>
								</div> */}
              </div>
              {/* {filteredData.length > 0 && (
								<Card className={classes.cardList}>
									<div className={classes.dataResult}>
										{filteredData.map((value) => (
											<div
												key={value._id}
												className={classes.dataItem}
												onClick={() => handleClickSearch(value)}
											>
												<div className={classes.dataItemList}>
													<SearchIcon />
													<div>
														<p>{value.name}</p>
														<small>
															Stream: {value.stream && value.stream.name}
														</small>
														{'  '}
														<small>
															Level: {value.level && value.level.name}
														</small>
													</div>
												</div>
											</div>
										))}
									</div>
								</Card>
							)} */}
              {/* {msg === 'try to broaden your search by removing filters' ? (
								<div className='my-2'>
									<h1 className='x-large text-primary'>
										<i className='fas fa-exclamation-triangle'></i>{' '}
										{`No Results Found. :(`}
									</h1>
									<p className='large'>
										Try to broaden your search by removing filters!
									</p>
								</div>
							) : null} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseSearch;
