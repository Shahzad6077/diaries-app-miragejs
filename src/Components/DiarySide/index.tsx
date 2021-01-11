import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListItem, InsertBox } from "..";
import { RootState } from "../../Store/rootReducer";
import { Diary } from "../../Types/store";
import { Spinner } from "../../Utils";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";

import { toast } from "react-toastify";
type Props = {
  isDiaryNotSelected: boolean;
};

const DiarySide: FC<Props> = ({ isDiaryNotSelected }) => {
  const userId = useSelector((state: RootState) => state.authReducer.user?.id);
  const [diaries, setDiaries] = useState<Diary[] | null>(null);

  useEffect(() => {
    getDiaries();
  }, []);

  const getDiaries = async () => {
    try {
      const jsonRes = await fetch(`/api/${userId}/diaries`);
      const res = await jsonRes.json();
      if (res.data) {
        const arr = res.data as Diary[];
        setDiaries(arr.reverse());
      }
      if (res.isError) {
        setDiaries([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const submitHandler = async (txt: string) => {
    try {
      const jsonRes = await fetch(`/api/${userId}/diaries`, {
        body: JSON.stringify({
          txt,
        }),
        method: "POST",
      });
      const res = await jsonRes.json();
      if (res.success) {
        await getDiaries();
        toast.dark(`🚀 ${res.message}`);
        return undefined;
      } else {
        return res.message;
      }
    } catch (err) {
      return "Diary isn't created.";
    }
  };
  const onDeleteDiary = async (diaryId: string) => {
    try {
      const jsonRes = await fetch(`/api/${userId}/diaries/${diaryId}`, {
        method: "DELETE",
      });
      const res = await jsonRes.json();
      if (res.success) {
        getDiaries();
        toast.dark(`🚀 ${res.message}`);
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
      <InsertBox
        placeholder="Insert Diary"
        onSubmitData={submitHandler}
        color="blue"
      />
      <AnimateSharedLayout>
        <motion.ul layout>
          {diaries ? (
            diaries.map((obj) => (
              <AnimatePresence key={obj.id} initial={false} exitBeforeEnter>
                <ListItem
                  key={obj.id}
                  docId={obj.id}
                  txt={obj.txt}
                  createdAt={obj.createdAt}
                  onDelete={onDeleteDiary}
                  varient="DIARY"
                />
              </AnimatePresence>
            ))
          ) : (
            <Spinner />
          )}
        </motion.ul>
      </AnimateSharedLayout>
      {diaries?.length === 0 && <p className="empty-tag">Empty</p>}
    </div>
  );
};

export default DiarySide;
