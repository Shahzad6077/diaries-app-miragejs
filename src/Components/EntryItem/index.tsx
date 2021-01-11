import { FC } from "react";
import { DeleteActionBtn } from "./../../Utils";
import { ReactComponent as CalendarIcon } from "./../../Assets/calendar.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// format("DD MMM")
type Props = {
  entryId: string;
  txt: string;
  createdAt: number;
  onDelete: (id: string) => void;
};

const EntryItem: FC<Props> = ({ entryId, txt, createdAt, onDelete }) => {
  const onDeleteEntry = () => {
    console.log("deleted");
  };
  return (
    <li className="entryItem">
      <span className="dot" />
      <div className="content">
        <p>{txt}</p>
        <span>
          <CalendarIcon /> {dayjs(createdAt).fromNow()}
        </span>
      </div>
      <DeleteActionBtn
        onClick={() => {
          onDelete(entryId);
        }}
        style={{ marginLeft: "auto" }}
      />
    </li>
  );
};

export default EntryItem;
