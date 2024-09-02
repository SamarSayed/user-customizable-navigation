import { Card, CardContent, Grid2, Typography } from "@mui/material";
import Image from 'next/image'
import careerPic from "../images/career pic.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function CareerCard() {
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#f3fdf3', border: '1px solid #cde9ce' }}>
            <CardContent>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ md: 1 }}>
                        <Image src={careerPic} alt="Picture of the career" />
                    </Grid2>
                    <Grid2 size={{ md: 11 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>
                                <Typography variant="h5" component="div">
                                    Gaming UI designer
                                </Typography>
                                <Typography sx={{ color: '#50b494', mb: 1.5 }}>Rockstar Games</Typography>
                            </span>
                            <div style={{ padding: "8px", border: "1px solid #c3c2c3", backgroundColor: "white", borderRadius: "50px", width: "30px", height: "30px", alignItems: "center", justifyContent: "center", display: "flex" }}>
                                <FavoriteIcon style={{ fontSize: "15px", color: "#c3c2c3" }} />
                            </div>
                        </div>
                    </Grid2>
                </Grid2>
                <div style={{ display: "flex" }}>
                    <span style={{ marginRight: "15px" }}>
                        <RoomOutlinedIcon style={{ fontSize: "18px" }} />
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "14px" }}>ElMansoura, Egypt</Typography>
                    </span>
                    <span>
                        <CalendarTodayOutlinedIcon style={{ fontSize: "18px" }} />
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "14px" }}>10 Days ago</Typography>
                    </span>
                </div>
                <div style={{ marginTop: "25px" }}>
                    <span style={{ display: "inline-block", padding: "8px 15px", backgroundColor: "white" }}>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "14px" }}>0 - 3y of exp</Typography>
                    </span>
                    <span style={{ display: "inline-block", padding: "8px 15px", backgroundColor: "white" }}>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "14px" }}>Full time</Typography>
                    </span>
                    <span style={{ display: "inline-block", padding: "8px 15px", backgroundColor: "white" }}>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "14px" }}>Remote</Typography>
                    </span>
                </div>
                <hr style={{borderColor: "#c6cbc669"}}/>
                <div style={{ marginTop: "25px" }}>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "18px", margin: "0 15px" }}>Creative / Design</Typography>
                    -
                    <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "18px", margin: "0 15px" }}>IT / Software development</Typography>
                    -
                    <Typography sx={{ color: 'text.secondary', mb: 1.5, display: 'inline', fontSize: "18px", margin: "0 15px" }}>Gaming</Typography>
                </div>
            </CardContent>
        </Card>
    );
}
