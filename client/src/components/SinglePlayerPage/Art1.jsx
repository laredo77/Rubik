import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { cubesImage } from "../cubesImage";
import "./Art1.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { initNewGame } from "../../actions/teamplay-actions/new-game-action";

const theme = createTheme();

function Art1() {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  //const generateImage = (response) => {};
  const handleImageClick = (response) => {
    MySwal.fire({
      title: "Solver",
      html: (
        <i>
          {/*{`hihihi`}*/}
          {/*<br />*/}
          <Button
            variant="contained"
            // sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
          >
            Upload cube images to solve
          </Button>
        </i>
      ),
      imageUrl: response.target.src,
      imageHeight: 90,
      confirmButtonColor: "#50b7f5",
      showCloseButton: true,
      showCancelButton: true,
    });
  };

  const levelChooseHandler = (response) => {
    //dispatch(initNewGame(user, level));
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={levelChooseHandler}>
        Choose Level
      </Button>
      <ImageList
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          width: 693, // 990 * 0.7
          height: 567, // 810 * 0.7
        }}
        cols={30}
        //rowHeight={0}
        gap={0.5}
      >
        {cubesImage.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className={"zoom"}
              onClick={handleImageClick}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ThemeProvider>
  );
}

export default Art1;
