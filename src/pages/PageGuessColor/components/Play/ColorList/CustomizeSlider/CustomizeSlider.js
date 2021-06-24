import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const PrettoSlider = withStyles({
  root: {
    color: "#313540",
    height: 8,
    marginLeft: 40,
    marginTop: 40
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export default function CustomizedSlider(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const {setState} = props

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setState(Math.ceil(value*2.55));
  };

  return (
    <div className={classes.root}>
      <PrettoSlider
        onChange={handleSliderChange}
        id="slider"
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0}
      />

      <div
        style={{
          width: "90%",
          borderBottomStyle: "dashed",
          borderBottomColor: "#41261920",
          borderBottomWidth: "3px",
          marginTop: 15,
          marginLeft: 40
        }}
      />
    </div>
  );
}
