import { FC } from "react";
import { EntryItem, InsertBox } from "..";
type Props = {};

const ARR = Array(15)
  .fill(0)
  .map((_, i) => ({
    entryId: `dd-${i}`,
    txt: "Entry description should be here",
  }));
const EntrySide: FC<Props> = () => {
  const submitHandler = (txt: string) => {
    console.log("Field Data-->", txt);
    return undefined;
  };
  return (
    <div className="entrySide scrollp">
      <h4>ADD ENTRY</h4>
      <InsertBox placeholder="Insert note" onSubmitData={submitHandler} />
      <ul>
        {ARR.map((obj) => (
          <EntryItem key={obj.entryId} entryId={obj.entryId} txt={obj.txt} />
        ))}
      </ul>
    </div>
  );
};

export default EntrySide;
