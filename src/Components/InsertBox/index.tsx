import { FC, useState } from "react";
import { ReactComponent as SubmitIcon } from "./../../Assets/add.svg";
import { ReactComponent as DiaryIcon } from "./../../Assets/stream.svg";

interface CompState {
  error: string | null;
  loading: boolean;
}
const INITIAL_STATE = {
  error: null,
  loading: false,
};
type Props = {
  placeholder: string;
  validation?: (text: string) => string | undefined;
  onSubmitData: (data: string) => string | undefined;
};

const InsertBox: FC<Props> = ({ placeholder, validation, onSubmitData }) => {
  const [txt, setTxt] = useState<string>("");
  const [state, setCompState] = useState<CompState>(INITIAL_STATE);
  const setState = (obj: Omit<CompState, "error" | "loading">) => {
    setCompState((p) => ({ ...p, ...obj }));
  };
  const onChangeTxt = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTxt(value);
    setState({ error: null });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading: true });
    if (txt.length === 0) {
      setState({ error: "Field must not be empty", loading: false });
      return;
    }
    const checkValidation = validation && validation(txt);
    if (typeof checkValidation !== "undefined") {
      setState({ error: checkValidation, loading: false });
      return;
    } else {
      const response = onSubmitData(txt);
      if (typeof response !== "undefined") {
        setState({ error: response, loading: false });
        return;
      } else {
        setTxt("");
      }
    }
  };
  return (
    <div className="insert-diary-wrapper">
      <form onSubmit={submitHandler}>
        <span>{/* <DiaryIcon /> */}</span>
        <input
          type="text"
          value={txt}
          onChange={onChangeTxt}
          placeholder={placeholder}
        />
        <button type="submit" disabled={txt.length === 0}>
          <SubmitIcon />
        </button>
      </form>
      <div
        style={{ height: "1rem", padding: "0px 1.2rem", color: "var(--red)" }}
      >
        {state.error && <p>{state.error}</p>}
      </div>
    </div>
  );
};

export default InsertBox;
