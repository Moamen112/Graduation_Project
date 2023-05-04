import React, { useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function SubAnalysis() {
	const columns = [
		{
			name: "Subject Name",
			selector: (row) => row.name,
		},
		{
			name: "Subject Code",
			selector: (row) => row.code,
		},
		{
			name: "Subject Description",
			selector: (row) => row.description,
		},

		{
			name: "",
			cell: (row) => (
				<EditIcon
					style={editSectionStyle}
					onClick={() => handleEdit(row)}
				/>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
		{
			name: "",
			cell: (row) => (
				<CancelIcon
					style={{ ...editSectionStyle, ...red }}
					onClick={() => handleDelete(row.id)}
				/>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const data = [
		{
			id: 1,
			name: "Computer Science",
			code: "CS50",
			description: "Computer Science Computer Science Computer Science",
		},
		{
			id: 2,
			name: "Computer Science",
			code: "CS50",
			description: "Computer Science Computer Science Computer Science",
		},
	];

	const customStyles = {
		headRow: {
			style: {
				minHeight: "30px",
			},
		},

		rows: {
			style: {
				minHeight: "30px",
				// override the row height
			},
		},
		headCells: {
			style: {
				paddingLeft: "8px", // override the cell padding for head cells
				paddingRight: "8px",
				backgroundColor: "#063443",
				color: "#FFF",
				height: "30px",
			},
		},
		cells: {
			style: {
				paddingLeft: "6px", // override the cell padding for data cells
				paddingRight: "6px",
			},
		},
	};

	const [subs, setSubs] = useState(data);

	const [editingSub, setEditingSub] = useState(null);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setEditingSub(null);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (row) => {
		setEditingSub(row);
		setOpen(true);
	};

	const handleSave = () => {
		const subName = document.getElementById("name").value;
		const subCode = document.getElementById("code").value;
		const subDescription = document.getElementById("description").value;
		const prof = document.getElementById("demo-simple-select").value;

		const newSub = {
			id: subs.length + 1,
			name: subName,
			code: subCode,
			description: subDescription,
			prof: prof,
		};

		if (editingSub === null) {
			setSubs([...subs, newSub]);
		} else {
			const newSubs = subs.map((s) => {
				if (s === editingSub) {
					return { ...s, ...newSub };
				}
				return s;
			});
			setSubs(newSubs);
		}
		handleClose();
	};

	const handleDelete = (id) => {
		const newSubs = subs.filter((sub) => sub.id !== id);
		setSubs(newSubs);
	};

	const conditionalRowStyles = [
		{
			when: (row) => true,
			style: {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
		{
			when: (row) => true,
			style: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
		},
	];

	const profData = [
		{
			id: 1,
			value: "Youssef",
		},
		{
			id: 2,
			value: "Moamen",
		},
		{
			id: 3,
			value: "Mohammed",
		},
	];

	const [prof, setProf] = useState("");

	const handleChange = (event) => {
		setProf(event.target.value);
	};

	return (
		<Container>
			<Table>
				<div className="subjects">
					<div className="headers">
						<h1>Subjects</h1>
						<AddButton onClick={handleClickOpen}>Add</AddButton>
					</div>
					<div>
						<DataTable
							//
							columns={[...columns]}
							data={subs}
							customStyles={customStyles}
							pagination
							dense
							conditionalRowStyles={conditionalRowStyles}
						/>
					</div>
				</div>
			</Table>
			<Dialog
				onSubmit={handleSave}
				open={open}
				onClose={handleClose}>
				<DialogTitle>Subjects Information</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Subject Name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={editingSub ? editingSub.name : ""}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="code"
						label="Subject Code"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={editingSub ? editingSub.code : ""}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Subject Description"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={editingSub ? editingSub.description : ""}
					/>

					<InputLabel id="demo-simple-select-label">
						Professor
					</InputLabel>
					<Select
						style={{ minWidth: "120px", marginTop: "8px" }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Professor"
						defaultValue={editingSub ? prof : ""}
						onChange={handleChange}>
						{profData.map((prof) => (
							<MenuItem value={prof.id}>{prof.value}</MenuItem>
						))}
					</Select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={handleSave}
						type="submit">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

export default SubAnalysis;

const Container = styled.section`
	width: 85%;
	padding-top: 8%;
	background-color: #cddee4;
	min-height: 100vh;
`;

const Table = styled.div`
	width: 100%;
	padding: 0 6%;
	height: 100%;

	.subjects {
		width: 100%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 900px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20px;
		padding: 10px;

		.headers {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 5px;

			button {
				padding: 2px 10px;
				background-color: #063443;
				color: #fff;
				border-radius: 10px;
			}
		}
	}
`;

const AddButton = styled.button`
	border: none;
	background-color: #053344;
	color: #fff;
	padding: 15px 25px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
`;

const editSectionStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	cursor: "pointer",
};

const red = {
	backgroundColor: "#F7433A",
};
