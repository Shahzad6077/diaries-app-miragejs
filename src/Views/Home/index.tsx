import { FC } from "react";
import classes from "./styles.module.css";
import { DiarySide } from "./../../Components";
import { Outlet, useMatch } from "react-router-dom";
import { Spinner } from "./../../Utils";

type Props = {
  isAuthenticated: boolean;
};

const HomeView: FC<Props> = ({ isAuthenticated }) => {
  const isDiarySelected = useMatch("entry/:diaryId");
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
