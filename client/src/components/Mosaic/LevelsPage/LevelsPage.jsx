import * as React from "react";
import {experimentalStyled as styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    id: "",
}));

function LevelsPage({user, getGameState, startNewGameFunc}) {
    const navigate = useNavigate();

    const levelChooseHandler = async (response) => {
        let level = response.target.id;
        // check if this user had this level in db if yes return state if not make new instance
        // await getGameState(user, level);
        //await startNewGameFunc(user.email, level);
        navigate(`/main/game/mosaic/levels/${level}`, {state: {Level: level}});
    };

    return (
        <Box sx={{flexGrow: 1, marginTop: 1, maxHeight: "calc(100vh)"}}>
            <Grid
                container
                spacing={{xs: 2, md: 2}}
                columns={{xs: 4, sm: 8, md: 12}}
            >
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{
                            height: 100, textAlign: "center", width: 600, fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "Arial, sans-serif",
                            transition: "transform 0.2s",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            ":hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={() => navigate("/main/singlePlayer/art")}
                    >
                        Create your own mosaic
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{
                            height: 80, textAlign: "left", width: 600, display: "flex",
                            justifyContent: "space-between", alignItems: "center", fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "Arial, sans-serif",
                            transition: "transform 0.2s",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            ":hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        id="3"
                        onClick={levelChooseHandler}
                    >
                        Level: Easy
                        <img
                            src="/mosaic/barIlanLogo.png"
                            alt="barIlanLogo"
                            style={{height: "80%", marginLeft: "1rem"}}
                            id={"3"}
                        />
                    </Item>
                </Grid>

                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{
                            height: 80, textAlign: "left", width: 600, display: "flex",
                            justifyContent: "space-between", alignItems: "center", fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "Arial, sans-serif",
                            transition: "transform 0.2s",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            ":hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        id="2"
                        onClick={levelChooseHandler}
                    >
                        Level: Medium
                        <img
                            src="/mosaic/StatueOfLiberty.png"
                            alt="StatueOfLiberty"
                            style={{height: "80%", marginLeft: "1rem"}}
                            id={"2"}
                        />
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{
                            height: 80, textAlign: "left", width: 600, display: "flex",
                            justifyContent: "space-between", alignItems: "center", fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "Arial, sans-serif",
                            transition: "transform 0.2s",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            ":hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        id="1"
                        onClick={levelChooseHandler}
                    >
                        Level: Medium
                        <img
                            src="/mosaic/TheRollingStones.png"
                            alt="The Rolling Stones"
                            style={{height: "80%", marginLeft: "1rem"}}
                            id={"1"}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LevelsPage;
