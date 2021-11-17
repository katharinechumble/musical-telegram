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
import ReorderIcon from "@mui/icons-material/Reorder";
import { useHistory } from "react-router";

// import Auth from "../utils/auth";

const NavBar = () => {
	const history = useHistory();

	return (
		<>
			<Paper elevation={3}>
				{/* Search */}
				<BottomNavigation showLabels>
					<BottomNavigationAction
						onClick={() => history.push("/")}
						label="Search"
						icon={<SearchIcon />}
					/>
					{/* Lists */}
					{Auth.loggedIn() ? (
						<BottomNavigationAction
							onClick={() => history.push("/lists")}
							label="Your Lists"
							icon={<ReorderIcon />}
						/>
					) : null}
					{/* Cart */}
					{Auth.loggedIn() ? (
						<BottomNavigationAction
							onClick={() => window.location.assign("/cart")}
							label="Cart"
							icon={<ShoppingCartIcon />}
						/>
					) : null}
					{/* Sign Up */}
					{Auth.loggedIn() ? null : (
						<BottomNavigationAction
							onClick={() => history.push("/signup")}
							label="Sign Up"
							icon={<AssignmentIcon />}
						/>
					)}
					{/* Log Out */}

					{Auth.loggedIn() ? (
						<BottomNavigationAction
							onClick={() => Auth.logout()}
							label="Logout"
							icon={<LogoutIcon />}
						/>
					) : (
						// Log In
						<BottomNavigationAction
							onClick={() => history.push("/login")}
							label="Login"
							icon={<LoginIcon />}
						/>
					)}
				</BottomNavigation>
			</Paper>
		</>
	);
};

export default NavBar;
