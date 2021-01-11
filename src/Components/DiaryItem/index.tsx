import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./../../Assets/arrow-alt.svg";
import { ReactComponent as CalendarIcon } from "./../../Assets/calendar.svg";
import { motion } from "framer-motion";
import { DeleteActionBtn } from "./../../Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// format("DD MMM")
type Props = {
  diaryId: string;
  txt: string;
  createdAt: string;
  onDelete: (id: string) => void;
};

const DiaryItem: FC<Props> = ({ diaryId, txt, createdAt, onDelete }) => {
  return (
    <motion.li layout exit={{ opacity: 0, x: "-100" }} className="diaryItem">
      <NavLink
        end
        to={`entry/${diaryId}/${txt}`}
        activeClassName="diaryActiveItem"
      >
        <span className="dot" />
        <div className="content">
          <p>{txt}</p>
          <span>
            <CalendarIcon /> {dayjs(createdAt).fromNow()}
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
