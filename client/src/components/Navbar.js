import React from "react";
import Auth from "../utils/auth";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router";

// import Auth from "../utils/auth";

const NavBar = () => {
	const history = useHistory();

	return (
		<>
			<Paper elevation={3}>
				<BottomNavigation showLabels>
					<BottomNavigationAction
						onClick={() => history.push("/")}
						label="Search"
						icon={<SearchIcon />}
					/>

					<BottomNavigationAction
						onClick={() => history.push("/cart")}
						label="Cart"
						icon={<ShoppingCartIcon />}
					/>

					{Auth.loggedIn() ? (
						<BottomNavigationAction
							onClick={() => Auth.logout()}
							label="Logout"
							icon={<LogoutIcon />}
						/>
					) : (
						<BottomNavigationAction
							onClick={() => history.push("/login")}
							label="Login"
							icon={<LoginIcon />}
						/>
					)}

					{Auth.loggedIn() ? null : (
						<BottomNavigationAction
							onClick={() => history.push("/signup")}
							label="Sign Up"
							icon={<AssignmentIcon />}
						/>
					)}
				</BottomNavigation>
			</Paper>
		</>
	);
};

export default NavBar;
