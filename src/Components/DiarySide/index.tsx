import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DiaryItem, InsertBox } from "..";
import { RootState } from "../../Store/rootReducer";
import { Diary } from "../../Types/store";
import { Spinner } from "../../Utils";
type Props = {
  isDiaryNotSelected: boolean;
};

// const ARR = Array(15)
//   .fill(0)
//   .map((_, i) => ({
//     diaryId: `dd-${i}`,
//     txt: "Success Stories",
//     createdDate: `0${i + 1} Aug`,
//   }));
const DiarySide: FC<Props> = ({ isDiaryNotSelected }) => {
  const params = useParams();
  const userId = useSelector((state: RootState) => state.authReducer.user?.id);
  const [diaries, setDiaries] = useState<Diary[] | null>(null);

  useEffect(() => {
    getDiaries();
  }, []);
  const submitHandler = (txt: string) => {
    console.log("Field Data-->", txt);
    return "Baby why";
  };

  const getDiaries = async () => {
    try {
      const jsonRes = await fetch(`/api/diaries/${userId}`);
      const res = await jsonRes.json();
      if (res.data) {
        setDiaries(res.data as Diary[]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDeleteDiary = async (diaryId: string) => {
    try {
      const jsonRes = await fetch(`/api/diaries/${userId}/${diaryId}`, {
        method: "DELETE",
      });
      const res = await jsonRes.json();
      if (res.success) {
        getDiaries();
      }
    } catch (err) {
      console.log(err);
    }
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
        {diaries ? (
          diaries.map((obj) => (
            <DiaryItem
              key={obj.id}
              diaryId={obj.id}
              txt={obj.txt}
              createdAt={obj.createdAt}
              onDelete={onDeleteDiary}
            />
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default DiarySide;
