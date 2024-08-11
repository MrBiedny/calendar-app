import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocaleSwitcherProps } from "../../types/LocaleSwitcher";

export const LocaleSwitcher = ({
  onLocaleChange,
  currentLocale,
}: LocaleSwitcherProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottom: "1px solid #c8c8c8",
    }}
  >
    <div style={{ marginRight: "1rem", fontSize: "1.25rem" }}>
      Language/Język:
    </div>
    <TextField
      select
      variant="standard"
      value={currentLocale}
      onChange={onLocaleChange}
    >
      <MenuItem value="en-US">English (United States)</MenuItem>
      <MenuItem value="pl-PL">Polski (Polish)</MenuItem>
    </TextField>
  </div>
);
