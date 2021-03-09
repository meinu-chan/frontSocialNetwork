import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useSelector } from "react-redux";
import axios from "axios";

import "./header.scss";

import FriendRequests from "./components/friendRequests";

interface RootState {
  user: User;
}

interface User {
  nickname: string;
  publications: [];
  _id: string;
  requests: [string];
  waitingForResponse: [string];
}

interface DefaultRootState {
  userId: string;
  waitingForResponse: [string];
}

const Header: React.FC = () => {
  const nicknameRef = React.useRef<any>();
  const anchorElRef = React.useRef<null | HTMLDivElement>(null);
  const [render, setRender] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headerState: DefaultRootState = useSelector(({ user }: RootState) => {
    const { waitingForResponse, _id: userId } = user;

    return { waitingForResponse, userId };
  });

  const { waitingForResponse, userId } = headerState;

  React.useEffect(() => {
    userId === sessionStorage.getItem("userId")
      ? setRender(true)
      : setRender(false);
  }, [userId]);

  const findByNickname = () => {
    nicknameRef.current &&
      axios
        .get(
          `http://localhost:5000/api/`.concat(
            `page/find/name/nickname=${nicknameRef.current.value}`
          ),
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          nicknameRef.current.value = "";
          document.location.href = "http://localhost:3000".concat(
            `/user/id=${res.data.user._id}`
          );
        });
  };

  return (
    <>
      {render && (
        <FriendRequests
          waitForRes={waitingForResponse}
          anchorEl={anchorElRef.current}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div className="main-header d-flex">
        <AppBar position="static" className="m-header">
          <div className="container">
            <Toolbar className="d-flex justify-content-between">
              <Typography className="col-9" variant="h6" noWrap>
                Social Network
              </Typography>
              <div
                className="badge-icon-header"
                ref={anchorElRef}
                onClick={handleClick}
              >
                {render && (
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge
                      badgeContent={
                        waitingForResponse.length > 0
                          ? waitingForResponse.length
                          : 0
                      }
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                )}
              </div>

              <div className="main-header-search d-flex">
                <div className="header-searchIcon">
                  <SearchIcon onClick={findByNickname} />
                </div>
                <input
                  className="header-input"
                  ref={nicknameRef}
                  placeholder="Find user..."
                />
              </div>
            </Toolbar>
          </div>
        </AppBar>
      </div>
    </>
  );
};
export default Header;
// import React from "react";
// import {
//   fade,
//   makeStyles,
//   Theme,
//   createStyles,
// } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     grow: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       display: "none",
//       [theme.breakpoints.up("sm")]: {
//         display: "block",
//       },
//     },
//     search: {
//       position: "relative",
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: fade(theme.palette.common.white, 0.15),
//       "&:hover": {
//         backgroundColor: fade(theme.palette.common.white, 0.25),
//       },
//       marginRight: theme.spacing(2),
//       marginLeft: 0,
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(3),
//         width: "auto",
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: "100%",
//       position: "absolute",
//       pointerEvents: "none",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     inputRoot: {
//       color: "inherit",
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create("width"),
//       width: "100%",
//       [theme.breakpoints.up("md")]: {
//         width: "20ch",
//       },
//     },
//     sectionDesktop: {
//       display: "none",
//       [theme.breakpoints.up("md")]: {
//         display: "flex",
//       },
//     },
//     sectionMobile: {
//       display: "flex",
//       [theme.breakpoints.up("md")]: {
//         display: "none",
//       },
//     },
//   })
// );

// export default function PrimarySearchAppBar() {
//   const classes = useStyles();
//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Material-UI
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ "aria-label": "search" }}
//             />
//           </div>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             <IconButton aria-label="show 17 new notifications" color="inherit">
//               <Badge badgeContent={17} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
