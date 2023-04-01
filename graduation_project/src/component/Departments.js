import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DepartmentsData from "../common/DepartmentsData";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Departments() {
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		setDepartments(DepartmentsData);
	}, []);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [data, setData] = useState(DepartmentsData);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("../common/DepartmentsData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Add Function

	// const addDepartment = () => {
	// 	const newDepartment = () => {};
	// 	setDepartments([...departments, newDepartment]);
	// };

	// Delete function

	// function handleDeleteDepartment(index) {
	// 	const newDepartments = [...departments];
	// 	newDepartments.splice(index, 1);
	// 	setDepartments(newDepartments);
	// }

	return (
		<DepContainer>
			<Content>
				<Header>
					<h2>Departments</h2>
					<AddButton onClick={handleClickOpen}>
						<AddCircleOutlineIcon
							style={addStyle}
							//onClick={addDepartment}
						/>
						Add
					</AddButton>
				</Header>

				<DepList>
					{/* Map method to get departments automatically */}
					{departments.map((department) => (
						<DepSectionMain>
							<DepImage>
								<EventNoteIcon style={DepImageStyle} />
							</DepImage>
							<DepartmentInfoStyle>
								<h1>{department.name}</h1>
								<p>{department.description}</p>
							</DepartmentInfoStyle>
							<EditSection>
								<EditIcon style={editSectionStyle} />
								<ClearOutlinedIcon
									//onClick={() => handleDeleteDepartment(index)}
									style={{ ...editSectionStyle, ...red }}
								/>
							</EditSection>
						</DepSectionMain>
					))}
				</DepList>
			</Content>

			<Dialog
				open={open}
				onClose={handleClose}>
				<form onSubmit={handleSubmit}>
					<DialogTitle>Department Details</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Department Name"
							type="text"
							value={data.name}
							fullWidth
							variant="standard"
							onChange={handleChange}
						/>

						<TextField
							autoFocus
							margin="dense"
							id="description"
							label="Department Description"
							type="text"
							value={data.description}
							fullWidth
							variant="standard"
							onChange={handleChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							onClick={handleClose}
							type="submit">
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</DepContainer>
	);
}

export default Departments;

const DepartmentInfoStyle = styled.div`
	width: 70%;
	text-align: left;
`;

const DepContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
`;

const Content = styled.div`
	margin-left: 3%;
`;

const Header = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
	text-align: left;
	gap: 10%;
`;

const AddButton = styled.button`
	display: flex;
	align-items: center;
	font-size: 10px;
	justify-content: space-around;
	border: none;
	background-color: #053344;
	color: #fff;
	height: fit-content;
	width: fit-content;
	padding: 5px 10px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;

const DepList = styled.ul`
	list-style: none;
	padding: 0 10px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const DepSectionMain = styled.li`
	width: 90%;
	min-height: 150px;
	display: flex;
	align-items: center;
	border-radius: 40px;
	background-color: white;
	padding: 8px 10px;
	text-align: center;
	margin-bottom: 25px;
`;

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: right;
	justify-content: space-around;
`;

const DepImage = styled.div`
	color: white;
	width: 15%;
`;

const DepImageStyle = {
	fontSize: "65px",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "20px",
};

const editSectionStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
	cursor: "pointer",
};

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};
