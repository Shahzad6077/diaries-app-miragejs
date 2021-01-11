import { FC, useState } from "react";
import { ReactComponent as SubmitIcon } from "./../../Assets/add.svg";
import { Dot3Spinner } from "./../../Utils";

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
  onSubmitData: (data: string) => Promise<string | undefined>;
  color: "blue" | "black";
};

const InsertBox: FC<Props> = ({
  placeholder,
  validation,
  onSubmitData,
  color,
}) => {
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
  const submitHandler = async (e: React.FormEvent) => {
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
      const response = await onSubmitData(txt);
      if (typeof response !== "undefined") {
        setState({ error: response, loading: false });
        return;
      } else {
        setTxt("");
        setState({ loading: false });
      }
    }
  };
  return (
    <div className="insert-diary-wrapper">
      <form onSubmit={submitHandler}>
        <span className={`${color}-dot`} />
        <input
          type="text"
          value={txt}
          onChange={onChangeTxt}
          placeholder={placeholder}
          readOnly={state.loading}
        />
        <button type="submit" disabled={txt.length === 0}>
          {state.loading ? <Dot3Spinner /> : <SubmitIcon />}
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
