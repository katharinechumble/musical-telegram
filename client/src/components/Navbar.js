import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
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
						onClick={() => history.push("/saveditems")}
						label="Saved Items"
						icon={<SavedSearchIcon />}
					/>
					<BottomNavigationAction
						onClick={() => history.push("/login")}
						label="Login"
						icon={<LoginIcon />}
					/>

					<BottomNavigationAction
						onClick={() => history.push("/signup")}
						label="Sign Up"
						icon={<AssignmentIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</>
	);
};

export default NavBar;
