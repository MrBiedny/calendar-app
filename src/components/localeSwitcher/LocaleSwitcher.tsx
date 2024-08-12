import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { LocaleSwitcherProps } from "../../types/LocaleSwitcher";

export const LocaleSwitcher = ({
  onLocaleChange,
  currentLocale,
}: LocaleSwitcherProps) => (
  <div
    style={{
      alignItems: "center",
      borderBottom: "1px solid #c8c8c8",
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <div style={{ fontSize: "1.25rem", marginRight: "1rem" }}>
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
