import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EntryItem, InsertBox } from "..";
import { RootState } from "../../Store/rootReducer";
import { Note } from "../../Types/store";
import { Spinner } from "../../Utils";

type Props = {};

const EntrySide: FC<Props> = () => {
  const params = useParams();
  const userId = useSelector((state: RootState) => state.authReducer.user?.id);
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [loading, setLoading] = useState(false);

  const diaryId = params.diaryId;
  const diaryName = params.diaryName;

  useEffect(() => {
    setLoading(true);
    getNotes(diaryId);
  }, [diaryId]);

  const getNotes = async (diaryId: string) => {
    try {
      //   "/api/notes/:userId/:diaryId"
      const jsonRes = await fetch(`/api/notes/${userId}/${diaryId}`);
      const res = await jsonRes.json();
      if (res.data) {
        const arr = res.data as Note[];
        setNotes(arr.reverse());
      }
      if (res.isError) {
        // setDiaries([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const submitHandler = async (txt: string) => {
    try {
      //   "/api/notes/:userId/:diaryId"
      const jsonRes = await fetch(`/api/notes/${userId}/${diaryId}`, {
        body: JSON.stringify({
          txt,
        }),
        method: "POST",
      });
      const res = await jsonRes.json();
      if (res.success) {
        await getNotes(diaryId);
        return undefined;
      } else {
        return res.message;
      }
    } catch (err) {
      return "Note isn't created.";
    }
  };
  const onDeleteNote = async (noteId: string) => {
    try {
      const jsonRes = await fetch(`/api/notes/${userId}/${diaryId}/${noteId}`, {
        method: "DELETE",
      });
      const res = await jsonRes.json();
      if (res.success) {
        await getNotes(diaryId);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="entrySide scrollp">
      <h4>{diaryName}</h4>
      <InsertBox placeholder="Insert note" onSubmitData={submitHandler} />
      <ul>
        {notes && !loading ? (
          notes.map((obj) => (
            <EntryItem
              key={obj.id}
              entryId={obj.id}
              txt={obj.txt}
              createdAt={obj.createdAt}
              onDelete={onDeleteNote}
            />
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default EntrySide;
