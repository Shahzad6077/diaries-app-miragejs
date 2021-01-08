import { FC } from "react";
import { DeleteActionBtn } from "./../../Utils";
type Props = {
  entryId: string;
  txt: string;
};

const EntryItem: FC<Props> = ({ entryId, txt }) => {
  const onDeleteEntry = () => {
    console.log("deleted");
  };
  return (
    <li className="entryItem">
      <span className="dot" />
      <p>{txt}</p>
      <DeleteActionBtn onClick={onDeleteEntry} style={{ marginLeft: "auto" }} />
    </li>
  );
};

export default EntryItem;
