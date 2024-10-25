import { ChangeEvent, useMemo, useState } from "react";
import { Colors, IFormResolverState, IFormValues } from "../interfaces";
import { formHistory, FormResolver } from "../utils/form-resolver";

type InputNames = keyof IFormValues;

const formResolver = new FormResolver();

const initialState: IFormResolverState = {
  formValues: {
    name: "",
    age: 0,
    email: "",
  },
  color: "blue",
};

formResolver.state = initialState;

export const useFormResolver = () => {
  const [state, setState] = useState<IFormValues>(initialState.formValues);
  const [buttonColor, setButtonColor] = useState<Colors>(initialState.color);

  const disableSave = useMemo(() => {
    const invalidAge = !state.age; // complex validation
    const invalidName = !state.name; // complex validation
    const invalidEmail = !state.email; // complex validation
    return invalidAge || invalidName || invalidEmail;
  }, [state]);

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    const partialForm: Partial<IFormValues> = {};
    const name = value.target.name as InputNames;
    switch (name) {
      case "age":
        partialForm.age = Number(value.target.value);
        break;
      default:
        partialForm[name] = value.target.value;
        break;
    }
    setState((prev) => ({
      ...prev,
      ...partialForm,
    }));
  };

  const handleSave = () => {
    if (disableSave) return;
    const colors: Colors[] = ["blue", "red", "green"];
    const random = Math.floor(Math.random() * colors.length);
    setButtonColor(colors[random]);
    const newValues: IFormResolverState = {
      formValues: state,
      color: buttonColor,
    };
    formResolver.state = newValues;
    formHistory.createSnapshotBackup(formResolver);
  };

  const handleRestore = () => {
    formHistory.undo();
    setState(formResolver.state.formValues);
    setButtonColor(formResolver.state.color);
  };

  return {
    handleSave,
    handleRestore,
    handleChange,
    state,
    buttonColor,
    disableSave,
  };
};
