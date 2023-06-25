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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function SubAnalysis(props) {
	const columns = [
		{
			name: "ID",
			selector: (row) => row.id,
			omit: true,
		},
		{
			name: "Subject Name",
			selector: (row) =>
				row.fullName != null ? row.fullName.split(" - ")[0] : "",
		},
		{
			name: "Subject Code",
			selector: (row) =>
				row.fullName != null ? row.fullName.split(" - ")[1] : "",
		},
		{
			name: "rate",
			selector: (row) => `${row.rate}  /   5`,
		},

		{
			name: "State",
			selector: (row) => {
				const rate = row.rate;
				let state = "";
				let color = "";

				if (rate <= 5 && rate > 4) {
					state = "Excellent";
					color = "green";
				} else if (rate <= 4 && rate > 3) {
					state = "Very Good";
					color = "green";
				} else if (rate <= 3 && rate > 2) {
					state = "Fair";
					color = "orange";
				} else if (rate <= 2 && rate > 1) {
					state = "Bad";
					color = "red";
				} else if (rate <= 1 && rate >= 0) {
					state = "Poor";
					color = "red";
				}

				return <span style={{ color: color }}>{state}</span>;
			},
		},

		{
			name: "Professor",
			selector: (row) => row.professorId,
			omit: true,
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
				paddingLeft: "6px", // override the cell padding for data cells
				paddingRight: "6px",
			},
		},
	};

	const [subs, setSubs] = useState([]);
	const [editingSub, setEditingSub] = useState(null);
	const [open, setOpen] = useState(false);
	const [prof, setProf] = useState("");
	const [profs, setProfs] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/departments/${props.departmentId}/professors`,
			)
			.then((response) => {
				setProfs(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleChange = (event) => {
		setProf(event.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				`https://localhost:7097/api/faculities/${props.facultyId}/departments/${props.departmentId}/subjects`,
			);
			setSubs(result.data);
		};
		fetchData();
	}, []);

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

	const handleAdd = async (subject) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/faculities/${props.facultyId}/departments/${props.departmentId}/subjects
`,
				{
					name: subject.fullName,
					code: subject.code,
					description: subject.description,
					professorId: subject.professorId,
				},
			);

			if (response.status === 201) {
				setSubs([...subs, response.data]);
			} else if (response.status === 404) {
				console.log("Faculty or department not found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (id, subject) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/faculities/${props.facultyId}/departments/${props.departmentId}/subjects/${id}
`,
				{
					name: subject.fullName,
					description: subject.description,
					code: subject.code,
					professorId: subject.professorId,
				},
			);

			if (response.status === 204) {
				const newSubs = subs.map((sub) => {
					if (sub.id === editingSub.id) {
						return { ...sub, ...subject };
					}
					return sub;
				});

				setSubs(newSubs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		const subName = document.getElementById("name").value;
		const subCode = document.getElementById("code").value;
		const subDescription = document.getElementById("description").value;
		const profs = prof;

		const newSub = {
			//id: subs.length + 1,
			fullName: subName,
			code: subCode,
			description: subDescription,
			professorId: profs ? profs : editingSub.professorId,
		};

		if (editingSub === null) {
			handleAdd(newSub);
		} else {
			handleUpdate(editingSub.id, newSub);
		}
		handleClose();
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/faculities/${props.facultyId}/departments/${props.departmentId}/subjects/${id}
`,
			);
			if (response.status === 204) {
				const newSubs = subs.filter((sub) => sub.id !== id);
				setSubs(newSubs);
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
						defaultValue={
							editingSub ? editingSub.fullName.split("-")[0] : ""
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="code"
						label="Subject Code"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingSub ? editingSub.fullName.split("-")[1] : ""
						}
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
						defaultValue={editingSub ? editingSub.professorId : ""}
						onChange={handleChange}>
						{profs.map((prof) => (
							<MenuItem
								key={prof.id}
								value={prof.id}>
								{prof.fullName}
							</MenuItem>
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
	padding-top: 4%;
	background-color: #cddee4;
	overflow: auto;
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
