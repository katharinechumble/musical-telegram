import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

// import Auth from "../utils/auth";

const NavBar = () => {
	return (
		<>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					onClick={() => window.location.assign("/")}
					label="Search"
					icon={<SearchIcon />}
				/>

				<BottomNavigationAction
					onClick={() => window.location.assign("/saveditems")}
					label="Saved Items"
					icon={<SavedSearchIcon />}
				/>
				<BottomNavigationAction
					onClick={() => window.location.assign("/login")}
					label="Login"
					icon={<LoginIcon />}
				/>

				<BottomNavigationAction
					onClick={() => window.location.assign("/signup")}
					label="Sign Up"
					icon={<AssignmentIcon />}
				/>
			</BottomNavigation>
		</>
	);
};

export default NavBar;
