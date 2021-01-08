import { FC } from "react";
import { DiaryItem } from "..";
type Props = {};

const ARR = Array(15)
  .fill(0)
  .map((_, i) => ({ diaryId: `dd-${i}`, txt: "Success Stories" }));
const DiarySide: FC<Props> = () => {
  return (
    <div className="diarySide scrollp">
      <h4>ADD DIARY</h4>
      <ul>
        {ARR.map((obj) => (
          <DiaryItem key={obj.diaryId} diaryId={obj.diaryId} txt={obj.txt} />
        ))}
      </ul>
    </div>
  );
};

export default DiarySide;
