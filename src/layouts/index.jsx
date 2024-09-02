import { Grid2 } from "@mui/material";
import Header from "./header";
import SideBar from "./sideBar/sideBar";


export default function Layouts(props) {
    return (
        <>
            <Header />
            <Grid2 container spacing={2}>
                <Grid2 size={{ md: 3, sm: 5, xs: 12 }}>
                    <SideBar />
                </Grid2>
                <Grid2 size={{ md: 9, sm: 7, xs: 12 }}>
                    {props.children}
                </Grid2>
            </Grid2>
        </>
    );
}
