import React from "react";
import { Button } from "@material-ui/core";
import { Shop } from "@material-ui/icons";

import logo from "../../images/logo.png";
import appview from "../../images/appScreen.jpg";
import useStyles from "./styles";

function DownloadBanner({ color }) {
  const classes = useStyles();
  return (
    <div style={{ background: `${color}` }}>
      <section className="ftco-freeTrial">
        <div className="container">
          <div className="row">
            <div className="col-md-8  col-sm-12">
              <img src={logo} alt="" className={classes.logoImg} />
              <div className={classes.bannerContent}>
                <h3>Download the App Now!</h3>
                <p>
                  You can get the mobile version of our application from stores
                  for free
                </p>
              </div>
              <div className={classes.bannerIcons}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.downloadIcon}
                  startIcon={<Shop />}
                  href="https://play.google.com/store/apps/details?id=com.techpranee.aacharya_v1"
                >
                  Download App
                </Button>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <img src={appview} alt="" className={classes.appImg} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DownloadBanner;
