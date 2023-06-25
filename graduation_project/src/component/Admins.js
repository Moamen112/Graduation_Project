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

function Admins() {
	const columns = [
		{
			name: "Admin name",
			selector: (row) => row.fullName,
		},
		{
			name: "E-mail",
			selector: (row) => row.email,
		},
		{
			name: "Phone Number",
			selector: (row) => row.phoneNumber,
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
				paddingLeft: "8px", // override the cell padding for data cells
				paddingRight: "8px",
			},
		},
	};

	const [admins, setAdmins] = useState([]);

	const [editingAdmin, setEditingAdmin] = useState(null);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setEditingAdmin(null);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (row) => {
		setEditingAdmin(row);
		setOpen(true);
	};

	const handleSave = () => {
		const adminName = document.getElementById("name").value;
		const adminEmail = document.getElementById("email").value;
		const adminPhone = document.getElementById("phoneNumber").value;

		const newAdmin = {
			id: admins.length + 1,
			fullName: adminName,
			email: adminEmail,
			phoneNumber: adminPhone,
		};

		if (editingAdmin === null) {
			setAdmins([...admins, newAdmin]);
		} else {
			const newAdmins = admins.map((a) => {
				if (a === editingAdmin) {
					return { ...a, ...newAdmin };
				}
				return a;
			});
			setAdmins(newAdmins);
		}
		handleClose();
	};

	const handleDelete = (id) => {
		const newAdmins = admins.filter((admin) => admin.id !== id);
		setAdmins(newAdmins);
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
	return (
		<Container>
			<Table>
				<div className="subjects">
					<div className="headers">
						<h1>Admins</h1>
						<AddButton onClick={handleClickOpen}>Add</AddButton>
					</div>
					<div>
						<DataTable
							columns={[...columns]}
							data={admins}
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
				<DialogTitle>Admin Information</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Admin Name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={editingAdmin ? editingAdmin.name : ""}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						defaultValue={editingAdmin ? editingAdmin.email : ""}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="phoneNumber"
						label="Phone Number"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingAdmin ? editingAdmin.phoneNumber : ""
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="password"
						label="Password"
						type="password"
						fullWidth
						variant="standard"
						defaultValue={editingAdmin ? editingAdmin.password : ""}
					/>
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

export default Admins;

const Container = styled.section`
	width: 85%;
	margin-left: 15%;
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
