import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useParams, useLocation } from "react-router-dom";
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
import Cookies from "js-cookie";

function DepAnalysis() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [departmentName, setDepartmentName] = useState("Departments");
	const [response, setResponse] = useState(null);
	const universityId = Cookies.get("universityId");
	const facultyId = Cookies.get("facultyId");
	const { departmentId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://localhost:7097/api/universities/${universityId}/faculities/${facultyId}/departments/${departmentId}`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					},
				);
				setResponse(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [departmentId]);

	const handleEditDepartment = () => {
		setIsDialogOpen(true);
	};

	const handleSaveDepartment = () => {
		const newDepName = document.getElementById("departmentName").value;
		setDepartmentName(newDepName);
		setIsDialogOpen(false);
	};

	return (
		<Container>
			<Header>
				<h2>
					{response != null
						? response.name + " " + response.rate
						: ""}
				</h2>
				<EditIcon
					style={editIconStyle}
					onClick={handleEditDepartment}
				/>
			</Header>
			<FrameContainer>
				<div className="frame">
					<iframe
						title="aa"
						overflow="scroll"
						scrolling="0"
						frameborder="0"
						src="https://plotly.com/~Muhammed_Zidan/376.embed"
						height="525"
						width="100%"></iframe>
				</div>
			</FrameContainer>
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
					rowSpacing={5}
					columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
					<Grid
						item
						xs={12}>
						<SubAnalysis
							departmentId={departmentId}
							facultyId={facultyId}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<ProfAnalysis
							facultyId={facultyId}
							departmentId={departmentId}
						/>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default DepAnalysis;

const FrameContainer = styled.section`
	width: 100%;
	display: flex;
	align-items: center;
	padding-left: 2%;
	padding-top: 10px;

	.frame {
		width: 83%;
		background-color: #fff;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		height: 550px;
		border-radius: 20px;

		iframe {
			border-radius: 20px;
		}
	}
`;

const Container = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	height: 100%;
	margin-left: 15%;
	padding-left: 2%;
	padding: 8% 0 3% 2%;
	min-height: 100vh;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	text-align: left;
	gap: 2%;
	padding: 20px 30px;
`;

const editIconStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
	cursor: "pointer",
};
