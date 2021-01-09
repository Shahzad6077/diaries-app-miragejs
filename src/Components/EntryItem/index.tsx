import { FC } from "react";
import { DeleteActionBtn } from "./../../Utils";
import { ReactComponent as CalendarIcon } from "./../../Assets/calendar.svg";
type Props = {
  entryId: string;
  txt: string;
  createdDate: string;
};

const EntryItem: FC<Props> = ({ entryId, txt, createdDate }) => {
  const onDeleteEntry = () => {
    console.log("deleted");
  };
  return (
    <li className="entryItem">
      <span className="dot" />
      <div className="content">
        <p>{txt}</p>
        <span>
          <CalendarIcon /> {createdDate}
        </span>
      </div>
      <DeleteActionBtn onClick={onDeleteEntry} style={{ marginLeft: "auto" }} />
    </li>
  );
};

export default EntryItem;
