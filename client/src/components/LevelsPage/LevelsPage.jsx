import * as React from "react";
import {experimentalStyled as styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    id: "",
}));

function LevelsPage({user, getGameState}) {
    const navigate = useNavigate();

    const levelChooseHandler = async (response) => {
        let level = response.target.id;
        // check if this user had this level in db if yes return state if not make new instance
        await getGameState(user, level);
        navigate(`/main/gameLevels/${level}`);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                container
                spacing={{xs: 2, md: 3}}
                columns={{xs: 4, sm: 8, md: 12}}
                sx={{overflow: "scroll"}}
            >
                {/*{Array.from(Array(6)).map((_, index) => (*/}
                {/*  <Grid item xs={2} sm={4} md={4} key={index}>*/}
                {/*    <Item sx={{ height: 200 }}>Tool</Item>*/}
                {/*  </Grid>*/}
                {/*))}*/}
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{height: 100, textAlign: "left", width: 600, display: "flex", justifyContent: "space-between", alignItems: "center"}}
                        id="3"
                        onClick={levelChooseHandler}
                    >
                        Level: Easy
                        <img
                            src="/mosaic/TheRollingStones.png"
                            alt="The Rolling Stones"
                            style={{height: "80%", marginLeft: "1rem"}}
                            id={"3"}
                        />
                    </Item>
                </Grid>

                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{height: 100, textAlign: "left", width: 600}}
                        onClick={() => navigate("/main/singlePlayer/art")}
                    >
                        Level: Medium
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{height: 100, textAlign: "left", width: 600}}
                        onClick={() => navigate("/main/singlePlayer/art")}
                    >
                        Level: Medium
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{height: 100, textAlign: "left", width: 600}}
                        onClick={() => navigate("/main/singlePlayer/art")}
                    >
                        Level: Medium
                    </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} sx={{display: "flex", justifyContent: "center"}}>
                    <Item
                        sx={{height: 100, textAlign: "left", width: 600}}
                        onClick={() => navigate("/main/singlePlayer/art")}
                    >
                        Create your own mosaic
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LevelsPage;
