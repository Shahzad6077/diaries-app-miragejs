import { type } from "os";
import React from "react";
import classes from "./spinner.module.css";

type Props = {
  style: any;
};
const Spinner: React.FC<Props> = ({ style }) => {
  return <div className={classes.spinner} style={style}></div>;
};

export default Spinner;
