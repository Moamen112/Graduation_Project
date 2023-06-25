import React, { useState, useEffect } from "react";
import axios from "axios";
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

function ProfAnalysis({ departmentId, facultyId }) {
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

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/departments/${departmentId}/professors`,
			)
			.then((response) => {
				setProfs(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

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

	const handleAdd = async (prof) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/professors`,
				{
					firstName: prof.fullName.split(" ")[0],
					lastName: prof.fullName.split(" ")[1],
					email: prof.email,
					phoneNumber: prof.phoneNumber,
					password: prof.password,
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
		console.log(prof);
		try {
			const response = await axios.put(
				`https://localhost:7097/api/professors/${id}
`,
				{
					firstName: prof.fullName.split(" ")[0],
					lastName: prof.fullName.split(" ")[1],
					email: prof.email,
					phoneNumber: prof.phoneNumber,
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
		const profName = document.getElementById("name").value;
		const profEmail = document.getElementById("email").value;
		const profPhone = document.getElementById("phoneNumber").value;
		const profPassword =
			open.page !== "edit"
				? document.getElementById("password").value
				: "";

		const newProf = {
			//id: profs.length + 1,
			fullName: profName,
			email: profEmail,
			phoneNumber: profPhone,
			password: profPassword,
		};

		console.log(newProf);

		if (editingProf === null) {
			console.log(newProf);
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
				<DialogTitle>Professor Information</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Professor Name"
						type="name"
						fullWidth
						variant="standard"
						defaultValue={
							editingProf
								? editingProf.firstName +
								  " " +
								  editingProf.lastName
								: ""
						}
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

export default ProfAnalysis;

const Container = styled.section`
	width: 85%;
	padding-top: 0%;
	background-color: #cddee4;
`;

const Table = styled.div`
	width: 100%;
	padding: 0 2%;
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
	marginLeft: "10px",
	backgroundColor: "#053546",
	borderRadius: "50%",
	cursor: "pointer",
};

const red = {
	backgroundColor: "#F7433A",
};
