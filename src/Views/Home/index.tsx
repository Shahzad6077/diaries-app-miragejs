import { FC } from "react";
import classes from "./styles.module.css";
import { DiarySide } from "./../../Components";
import { Outlet, useMatch } from "react-router-dom";
import { Spinner } from "./../../Utils";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";

type Props = {};

const HomeView: FC<Props> = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );
  const isDiarySelected = useMatch("note/:diaryId/:diaryName");
  if (!isAuthenticated) {
    return <Spinner style={{ background: "#ccc" }} />;
  }
  return (
    <div className="homeView">
      <DiarySide isDiaryNotSelected={!!!isDiarySelected} />
      <Outlet />
      {!isDiarySelected && (
        <div className="diarySlectorView">
          <h5>Please select the Diary to see entries</h5>
        </div>
      )}
    </div>
  );
};

export default HomeView;
