import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./../../Assets/arrow-alt.svg";
import { motion } from "framer-motion";
import { DeleteActionBtn } from "./../../Utils";
type Props = {
  diaryId: string;
  txt: string;
};

const DiaryItem: FC<Props> = ({ diaryId, txt }) => {
  const onDeleteEntry = () => {
    console.log("deleted");
  };
  return (
    <motion.li
      drag="x"
      onDragEnd={(event, info) => console.log(info.point.x <= 0)}
      dragConstraints={{ left: 0, right: 0 }}
      className="diaryItem"
    >
      <NavLink end to={`entry/${diaryId}`} activeClassName="diaryActiveItem">
        <span className="dot" />
        <p>{txt}</p>
        <span className="arrow-h">
          <ArrowIcon />
        </span>
        <DeleteActionBtn
          onClick={onDeleteEntry}
          style={{ marginLeft: "auto" }}
        />
      </NavLink>
    </motion.li>
  );
};

export default DiaryItem;
