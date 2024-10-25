import { useFormResolver } from "../hooks/use-form-resolver";

export const Form = () => {
  const {
    handleChange,
    handleRestore,
    handleSave,
    state,
    buttonColor,
    disableSave,
  } = useFormResolver();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "100%",
      }}
    >
      <input
        value={state.name}
        name="name"
        type="text"
        placeholder="Your name"
        onChange={(e) => handleChange(e)}
      />
      <input
        value={state.email}
        name="email"
        type="email"
        placeholder="Your email"
        onChange={(e) => handleChange(e)}
      />
      <input
        value={state.age}
        name="age"
        type="number"
        placeholder="Your age"
        onChange={(e) => handleChange(e)}
      />
      <button
        disabled={disableSave}
        style={{
          color: disableSave ? "gray" : buttonColor,
          cursor: disableSave ? "not-allowed" : "pointer",
        }}
        onClick={handleSave}
      >
        Save
      </button>
      <button style={{ color: buttonColor }} onClick={handleRestore}>
        Restore
      </button>
    </div>
  );
};
