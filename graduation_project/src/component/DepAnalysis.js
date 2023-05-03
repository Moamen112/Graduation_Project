import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Subjects from "./Subjects";
import Proffessor from "./Proffessor";
import ProfAnalysis from "../common/ProfAnalysis";
import SubAnalysis from "../common/SubAnalysis";

function DepAnalysis() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [departmentName, setDepartmentName] = useState("Departments");

	const handleEditDepartment = () => {
		setIsDialogOpen(true);
	};

	const handleSaveDepartment = () => {
		const newDepName = document.getElementById("departmentName").value;
		setDepartmentName(newDepName);
		setIsDialogOpen(false);
	};

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: "#fff",
		textAlign: "center",
	}));

	return (
		<Container>
			<Header>
				<h2>{departmentName}</h2>
				<EditIcon
					style={editIconStyle}
					onClick={handleEditDepartment}
				/>
			</Header>
			<Dialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}>
				<DialogTitle>Edit Department Name</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="departmentName"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={departmentName}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsDialogOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleSaveDepartment}>Save</Button>
				</DialogActions>
			</Dialog>

			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={0}
					columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
					<Grid
						item
						xs={6}>
						<ProfAnalysis />
					</Grid>
					<Grid
						item
						xs={6}>
						<SubAnalysis />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default DepAnalysis;

const Container = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	height: 100%;
	margin-left: 15%;
	padding-left: 2%;
	padding-top: 8%;
	min-height: 100vh;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	text-align: left;
	gap: 2%;
`;

const editIconStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
	cursor: "pointer",
};
