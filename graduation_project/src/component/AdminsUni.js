import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AdminsUni() {
	const columns = [
		{
			name: "ID",
			selector: (row) => row.id,
			omit: true,
		},
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
			name: "Actions",
			cell: (row) => (
				<>
					<EditIcon
						style={editSectionStyle}
						onClick={() => handleEdit(row)}
						sx={{ margin: "0px 7px" }}
					/>
				</>
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
	const [open, setOpen] = useState({ status: false, page: "" });

	const universityId = "86F697D4-A762-44D6-8322-2C08C66F94E4";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7097/api/universities/${universityId}/admins
`,
				);
				setAdmins(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleClickOpen = () => {
		setEditingAdmin(null);
		setOpen({ ...open, status: true, page: "add" });
	};

	const handleClose = () => {
		setOpen({ ...open, status: false, page: "" });
	};

	const handleEdit = (row, page) => {
		const data = {
			id: row.id,
			firstName: row.fullName.split(" ")[0],
			lastName: row.fullName.split(" ")[1],
			email: row.email,
			phoneNumber: row.phoneNumber,
		};
		setEditingAdmin(data);
		setOpen({ ...open, status: true, page: page });
	};

	const handleAdd = async (admin) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/universities/${universityId}/admins
`,
				{
					firstName: admin.firstName,
					lastName: admin.lastName,
					email: admin.email,
					phoneNumber: admin.phoneNumber,
					password: admin.password,
				},
			);
			console.log(response);
			if (response.status === 201) {
				setAdmins([...admins, response.data]);
			} else if (response.status === 404) {
				console.log("Faculty not found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (id, admin) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/universities/${universityId}/admins/${id}
`,
				{
					firstName: admin.firstName,
					lastName: admin.lastName,
					email: admin.email,
					phoneNumber: admin.phoneNumber,
				},
			);

			console.log(response.status);

			if (response.status === 204) {
				const newAdmins = admins.map((ad) => {
					if (ad.id === editingAdmin.id) {
						return { ...ad, ...admin };
					}
					return ad;
				});
				console.log(newAdmins);
				setAdmins(newAdmins);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		const firstName = document.getElementById("firstName").value;
		const lastName = document.getElementById("lastName").value;
		const adminEmail = document.getElementById("email").value;
		const adminPhone = document.getElementById("phoneNumber").value;
		const password =
			open.page !== "edit"
				? document.getElementById("password").value
				: "";

		const newAdmin = {
			//id: admins.length + 1,
			firstName: firstName,
			lastName: lastName,
			fullName: firstName + " " + lastName,
			email: adminEmail,
			phoneNumber: adminPhone,
			password: password,
		};

		if (editingAdmin === null) {
			handleAdd(newAdmin);
		} else {
			handleUpdate(editingAdmin.id, newAdmin);
		}
		handleClose();
	};

	/*const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/faculities/${facultyId}/admins/${id}
`,
			);
			if (response.status === 204) {
				const newAdmins = admins.filter((admin) => admin.id !== id);
				setAdmins(newAdmins);
			}
		} catch (error) {
			console.log(error);
		}
	};*/

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
				open={open.status}
				onClose={handleClose}>
				<DialogTitle>Admin Information</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="firstName"
						label="First name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={
							editingAdmin ? editingAdmin.firstName : ""
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="lastName"
						label="Last name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={editingAdmin ? editingAdmin.lastName : ""}
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
					{open.page === "edit" ? (
						""
					) : (
						<TextField
							autoFocus
							margin="dense"
							id="password"
							label="Password"
							type="password"
							fullWidth
							variant="standard"
							defaultValue={
								editingAdmin ? editingAdmin.password : ""
							}
						/>
					)}
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

export default AdminsUni;

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
