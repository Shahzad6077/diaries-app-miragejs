import { FC } from "react";
import classes from "./styles.module.css";
import { DiarySide } from "./../../Components";
import { Outlet, useMatch } from "react-router-dom";

type Props = {};

const HomeView: FC<Props> = () => {
  const isDiarySelected = useMatch("entry/:diaryId");
  console.log(!!isDiarySelected);
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
