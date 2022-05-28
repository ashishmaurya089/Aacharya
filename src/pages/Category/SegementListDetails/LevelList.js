import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import {
  getLevels,
  getSegments,
  searchLevel,
} from "../../../actions/subjectActions";
import ProgressBar from "../../../components/ProgressBar";
import NoItemsFound from "../../../components/NoItemsFound";
import SegmentSearch from "../SegmentSearch";
import SegmentBreadCrumbs from "../SegmentBreadCrumbs";

import useStyles from "../styles";
import bredImg from "../../../images/bg_2.jpg";

function LevelList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { segmentId } = useParams();

  const { selectedSegmentId, segments, levels, searchedLevels, loading } =
    useSelector((state) => state.subjectsData);
  const [selectedSegmentDetails, setselectedSegmentDetails] = useState({});
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    dispatch(getSegments());
    dispatch(getLevels(selectedSegmentId));
    let selectedSegmentDetails = segments.filter(
      (seg) => seg._id === selectedSegmentId
    );
    if (selectedSegmentDetails.length > 0) {
      setselectedSegmentDetails(selectedSegmentDetails[0]);
    }
  }, [selectedSegmentId]);
  //console.log(levels);
  const handleSelected = (id) => {
    dispatch({
      type: "SELECT_LEVEL",
      payload: id,
    });
  };
  useEffect(() => {
    dispatch(searchLevel(searchTerm, selectedSegmentId));
  }, [searchTerm]);

  return (
    <>
      <SegmentBreadCrumbs data={selectedSegmentDetails} />

      <Container maxWidth="lg" fixed>
        <SegmentSearch
          searchTerm={searchTerm}
          setsearchTerm={setsearchTerm}
          data={searchedLevels}
          route={`/stream`}
          handleSelected={handleSelected}
          placeHolder={"Search Level"}
        />

        {!loading ? (
          <Grid container spacing={2}>
            {levels && levels.length > 0 ? (
              levels.map((value) => (
                <Grid item xs={12} sm={6} md={3} key={value._id}>
                  <Link to={`/stream`}>
                    <Card
                      className={classes.root}
                      onClick={() => handleSelected(value._id)}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          component="img"
                          image={value.icon}
                          title={value.name}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {value.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            component="p"
                          >
                            {value.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <>
                <NoItemsFound dialogline="No Levels Found!" />
              </>
            )}
          </Grid>
        ) : (
          <ProgressBar />
        )}
      </Container>
    </>
  );
}

export default LevelList;
