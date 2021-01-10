import React, { useState, FC, useRef } from "react";

import classes from "./deleteshower.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../Spinner";
import { ReactComponent as DeleteIcon } from "./../../Assets/times.svg";
import useOutsideClick from "./../../Hooks/useOutsideClick";

type Props = {
  onClick: () => void;
  title?: string;
  className?: string;
  style?: object;
};

const DeleteShower: FC<Props> = ({
  onClick = () => null,
  className,
  title,
  children,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | any>();
  const [showConfirmationWrapper, setShowConfirmationWrapper] = useState(false);
  const [loading, setLoading] = useState(false);
  const varientAnim = {
    show: {
      scale: 1,
      opacity: 1,
    },
    hide: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const onConfirmClickHandler = async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
      setShowConfirmationWrapper(false);
    }
  };

  const showToggler = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    console.log("asd");
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmationWrapper((_p) => !_p);
  };
  const wrapperClassName = `${classes.deleteShowerComp} ${className}`;
  useOutsideClick(rootRef, (e: any) => {
    setShowConfirmationWrapper(false);
  });
  return (
    <div ref={rootRef} className={wrapperClassName} style={style}>
      <button onClick={showToggler} style={{ background: "transparent" }}>
        <span className={classes.delwrap}>
          <DeleteIcon />
        </span>
      </button>
      <AnimatePresence>
        {showConfirmationWrapper && (
          <motion.div
            className={classes.confirmationWrapper}
            variants={varientAnim}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <p>{title}</p>
            {loading ? (
              <Spinner style={{ backgroundColor: "var(--gray-light2)" }} />
            ) : (
              <div className={classes.actions}>
                <button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
                  ) => {
                    console.log("asd");
                    e.preventDefault();
                    e.stopPropagation();
                    onConfirmClickHandler();
                  }}
                >
                  Confirm
                </button>
                <button onClick={showToggler}>Cancel</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
DeleteShower.defaultProps = {
  title: "Are you sure to Delete ?",
};
export default DeleteShower;
