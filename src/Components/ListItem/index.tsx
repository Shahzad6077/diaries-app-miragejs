import React, { FC, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./../../Assets/arrow-alt.svg";
import { ReactComponent as CalendarIcon } from "./../../Assets/calendar.svg";
import { motion } from "framer-motion";
import { DeleteActionBtn } from "../../Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// format("DD MMM")
type Props = {
  docId: string;
  txt: string;
  createdAt: number;
  onDelete: (id: string) => void;
  varient: "NOTE" | "DIARY";
};

const ListItem: FC<Props> = ({ docId, txt, createdAt, onDelete, varient }) => {
  const toLink = `note/${docId}/${txt.split(" ").join("+")}`;
  const dotColor = varient === "DIARY" ? "blue-dot" : "black-dot";
  const contentRendered = (
    <Fragment>
      <span className={`dot ${dotColor}`} />
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
          onDelete(docId);
        }}
        style={{ marginLeft: "auto" }}
      />
    </Fragment>
  );
  return (
    <motion.li
      layout
      exit={{ opacity: 0 }}
      className={`item ${varient === "NOTE" && "item-wo-link"}`}
    >
      {varient === "DIARY" ? (
        <NavLink end={true} to={toLink} activeClassName="diaryActiveItem">
          {contentRendered}
        </NavLink>
      ) : (
        contentRendered
      )}
    </motion.li>
  );
};

export default ListItem;
