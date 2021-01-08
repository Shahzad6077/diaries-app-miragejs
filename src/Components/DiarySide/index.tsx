import { FC } from "react";
import { DiaryItem, InsertBox } from "..";
type Props = {
  isDiaryNotSelected: boolean;
};

const ARR = Array(15)
  .fill(0)
  .map((_, i) => ({ diaryId: `dd-${i}`, txt: "Success Stories" }));
const DiarySide: FC<Props> = ({ isDiaryNotSelected }) => {
  const submitHandler = (txt: string) => {
    console.log("Field Data-->", txt);
    return "Baby why";
  };
  return (
    <div
      className={`diarySide scrollp ${
        isDiaryNotSelected && "diarySide-drawer "
      }`}
    >
      <h4>ADD DIARY</h4>{" "}
      <InsertBox placeholder="Insert Diary" onSubmitData={submitHandler} />
      <ul>
        {ARR.map((obj) => (
          <DiaryItem key={obj.diaryId} diaryId={obj.diaryId} txt={obj.txt} />
        ))}
      </ul>
    </div>
  );
};

export default DiarySide;
