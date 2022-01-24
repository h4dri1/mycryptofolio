import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import { Container, Link } from "@mui/material";
import { useDispatch } from 'react-redux';
import { logout } from "../../../../actions/user";


export default function TestAvatar() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const dispatch = useDispatch();
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        dispatch(logout());
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Container>
            <Stack
                direction="row" spacing={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                Bienvenue
                <div>
                    <Avatar
                        src="/broken-image.jpg"
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        sx={{ ml: 1.5 }}
                    ></Avatar>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-end"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start" ? "left top" : "left bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Link
                                                    href="portfolio"
                                                    sx={{ color: "white" }}
                                                >
                                                    Portfolio
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack >
        </Container>
    );
}
