import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./../../Assets/arrow-alt.svg";
import { ReactComponent as CalendarIcon } from "./../../Assets/calendar.svg";
import { motion } from "framer-motion";
import { DeleteActionBtn } from "./../../Utils";
import dayjs from "dayjs";

type Props = {
  diaryId: string;
  txt: string;
  createdAt: string;
  onDelete: (id: string) => void;
};

const DiaryItem: FC<Props> = ({ diaryId, txt, createdAt, onDelete }) => {
  return (
    <motion.li
      // drag="x"
      // onDragEnd={(event, info) => console.log(info.point.x <= 0)}
      // dragConstraints={{ left: 0, right: 0 }}
      className="diaryItem"
    >
      <NavLink end to={`entry/${diaryId}`} activeClassName="diaryActiveItem">
        <span className="dot" />
        <div className="content">
          <p>{txt}</p>
          <span>
            <CalendarIcon /> {dayjs(createdAt).format("DD MMM")}
          </span>
        </div>
        <span className="arrow-h">
          <ArrowIcon />
        </span>
        <DeleteActionBtn
          onClick={() => {
            onDelete(diaryId);
          }}
          style={{ marginLeft: "auto" }}
        />
      </NavLink>
    </motion.li>
  );
};

export default DiaryItem;
