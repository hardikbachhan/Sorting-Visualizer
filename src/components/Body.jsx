import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SortIcon from '@material-ui/icons/Sort';


function Body() {

  const AVERAGE_ARRAY_SIZE = 150;

  const ANIMATION_INTERVAL = 30;

  const [arrSize, setArrSize] = useState(AVERAGE_ARRAY_SIZE);
  const [arr, setArr] = useState(() => constructArr(arrSize));

  function constructArr(size) {
    const arr = [];
    let i = 0;
    for (i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 700) + 5);
    }
    return arr;
  }

  function bubbleSortAnimation() {
    for (let j = arrSize; j > 0; j--) {
      setTimeout(() => {
        for (let index = 1; index < arrSize; index++) {
          setTimeout(() => {
            setArr((prevArr) => {
              let elem1 = prevArr[index - 1];
              let elem2 = prevArr[index];
              if (elem1 > elem2) {
                [elem1, elem2] = [elem2, elem1];
              }
              let newArr = prevArr;
              newArr[index - 1] = elem1;
              newArr[index] = elem2;
              return [...newArr];
            });
          }, index * ANIMATION_INTERVAL);
        }
      }, j * 44 * ANIMATION_INTERVAL);
    }
  }

  function handleChange(event, value) {
    setArrSize(value);
    setArr(constructArr(value));
  }

  function handleClick() {
    bubbleSortAnimation();
  }

  //Material-UI code for slider
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 150 + theme.spacing(3) * 2,
      color: "#e8e8e8",
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
  
  const muiTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: "#e8e8e8"
        },
        track: {
          color: "#e8e8e8"
        },
        rail: {
          color: "#e8e8e8"
        }
      }
    }
  });

  const classes = useStyles();

  return (
    <div>
      <div className="settings-panel">
          <h3 className="title"><SortIcon fontSize="large"/>Sorting Visualizer</h3>
        <div className={classes.root}>
          <Typography gutterBottom></Typography>
          <ThemeProvider theme={muiTheme}>
            <Slider
              min={10}
              max={300}
              onChange={handleChange}
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={AVERAGE_ARRAY_SIZE}
              value={arrSize}
            />
          </ThemeProvider>
        </div>
        <div className="sort-button">
        <Fab onClick={handleClick} variant="extended" size="large">Sort!</Fab>
        </div>
      </div>
      <div className="graph">
        {arr.map((elem, index) => {
          return (
            <div
              className="bar"
              key={index}
              style={{ height: elem + "px" }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Body;