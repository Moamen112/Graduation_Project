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
import Cookies from "js-cookie";

function Proffessor() {
	const columns = [
		{
			name: "ID",
			selector: (row) => row.id,
			omit: true,
		},
		{
			name: "Professor Name",
			selector: (row) => row.fullName,
		},
		{
			name: "Professor Email",
			selector: (row) => row.email,
		},
		{
			name: "Phone Number",
			selector: (row) => row.phoneNumber,
		},
		{
			name: "Professor Rate",
			selector: (row) => row.rate,
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
					<CancelIcon
						style={{ ...editSectionStyle, ...red }}
						onClick={() => handleDelete(row.id)}
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

	const [profs, setProfs] = useState([]);
	const [editingProf, setEditingProf] = useState(null);
	const [open, setOpen] = useState({ status: false, page: "" });

	const handleClickOpen = () => {
		setEditingProf(null);
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
		setEditingProf(data);
		setOpen({ ...open, status: true, page: page });
	};
	console.log(editingProf);

	const handleAdd = async (prof) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/professors`,
				{
					firstName: prof.firstName,
					lastName: prof.lastName,
					email: prof.email,
					phoneNumber: prof.phoneNumber,
					password: prof.password,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			console.log(response);
			if (response.status === 201) {
				setProfs([...profs, response.data]);
			} else if (response.status === 404) {
				console.log("Faculty or department not found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (id, prof) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/professors/${id}
`,
				{
					firstName: prof.firstName,
					lastName: prof.lastName,
					email: prof.email,
					phoneNumber: prof.phoneNumber,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);

			console.log(response.status);

			if (response.status === 204) {
				const newProfs = profs.map((profe) => {
					if (profe.id === editingProf.id) {
						return { ...profe, ...prof };
					}
					return profe;
				});

				setProfs(newProfs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		const firstName = document.getElementById("firstName").value;
		const lastName = document.getElementById("lastName").value;
		const profEmail = document.getElementById("email").value;
		const profPhone = document.getElementById("phoneNumber").value;

		const profPassword =
			open.page !== "edit"
				? document.getElementById("password").value
				: "";

		const newProf = {
			//id: profs.length + 1,
			firstName: firstName,
			lastName: lastName,
			fullName: firstName + " " + lastName,
			email: profEmail,
			phoneNumber: profPhone,

			password: profPassword,
		};

		if (editingProf === null) {
			handleAdd(newProf);
		} else {
			handleUpdate(editingProf.id, newProf);
		}
		handleClose();
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/professors/${id}
`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const deletedprof = profs.filter((prof) => prof.id !== id);
				setProfs(deletedprof);
			}
		} catch (error) {
			console.log(error);
		}
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

	const facultyId = Cookies.get("facultyId");
	const departmentId = Cookies.get("departmentId");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7097/api/faculities/${facultyId}/professors`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					},
				);
				setProfs(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	return (
		<Container>
			<Table>
				<div className="subjects">
					<div className="headers">
						<h1>Professors</h1>
						<AddButton onClick={handleClickOpen}>Add</AddButton>
					</div>
					<div>
						<DataTable
							//
							columns={[...columns]}
							data={profs}
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
				<DialogTitle>
					{open.page === "edit"
						? "Edit Professor"
						: open.page === "add"
						? "Add Professor"
						: null}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="firstName"
						label="First name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={editingProf ? editingProf.firstName : ""}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="lastName"
						label="Last name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={editingProf ? editingProf.lastName : ""}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						defaultValue={editingProf ? editingProf.email : ""}
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
							editingProf ? editingProf.phoneNumber : ""
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
								editingProf ? editingProf.password : ""
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

export default Proffessor;

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
