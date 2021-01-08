import { FC } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./../../Assets/arrow-alt.svg";
type Props = {
  diaryId: string;
  txt: string;
};

const DiaryItem: FC<Props> = ({ diaryId, txt }) => {
  return (
    <li className="diaryItem">
      <NavLink to={diaryId} activeClassName="diaryActiveItem">
        <span className="dot" />
        <p>{txt}</p>
        <span className="arrow-h">
          <ArrowIcon />
        </span>
      </NavLink>
    </li>
  );
};

export default DiaryItem;
