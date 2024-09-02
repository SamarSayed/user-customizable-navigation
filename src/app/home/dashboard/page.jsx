import { FormControl, MenuItem, Select, Switch } from "@mui/material";
import CareerCard from "../../../components/careerCard";

export default function Dashboard() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
        <span>Sorting by:</span>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            defaultValue={1}
            disableUnderline='true'
            style={{ color: "#90c791" }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#90c791"
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#94c19573"
                  },
                  "& .MuiMenuItem-root.Mui-selected:hover": {
                    backgroundColor: "#90c791"
                  }
                }
              }
            }}
          >
            <MenuItem value={1}>Top match</MenuItem>
            <MenuItem value={2}>factor 2</MenuItem>
            <MenuItem value={3}>factor 3</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="alertDiv">
        <span>
          <h4>UI Designer in Egypt</h4>
          <p className="m-0">70 job positions</p>
        </span>
        <span>
          <label>Set alert</label>
          <Switch color="default"/>
        </span>
      </div>

      <div>
        <CareerCard/>
      </div>

    </div>
  );
}
