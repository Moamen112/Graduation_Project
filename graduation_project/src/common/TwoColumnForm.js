import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const TwoColumnForm = () => {
	const [input1, setInput1] = useState("");
	const [input2, setInput2] = useState("");

	const handleChange1 = (event) => {
		setInput1(event.target.value);
	};

	const handleChange2 = (event) => {
		setInput2(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(`Input 1: ${input1} Input 2: ${input2}`);
		// submit the form
	};

	return (
		<FormContainer>
			<form onSubmit={handleSubmit}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}>
					<div style={{ flex: 1 }}>
						<SubjectInfo>
							<label style={LabelStyle}>
								<input
									type="text"
									placeholder="Subject Name"
									value={input1}
									onChange={handleChange1}
									style={InputStyle}
								/>
								<EditSection>
									<EditIcon style={editSectionStyleForm} />
									<ClearOutlinedIcon
										style={{
											...editSectionStyleForm,
											...red,
										}}
									/>
								</EditSection>
							</label>

							<label style={LabelStyle}>
								<input
									type="text"
									placeholder="Subject Code"
									value={input1}
									onChange={handleChange1}
									style={InputStyle}
								/>
								<EditSection>
									<EditIcon style={editSectionStyleForm} />
									<ClearOutlinedIcon
										style={{
											...editSectionStyleForm,
											...red,
										}}
									/>
								</EditSection>
							</label>

							<label style={LabelStyle}>
								<input
									type="text"
									placeholder="Professor Name"
									value={input1}
									onChange={handleChange1}
									style={InputStyle}
								/>
								<EditSection>
									<EditIcon style={editSectionStyleForm} />
									<ClearOutlinedIcon
										style={{
											...editSectionStyleForm,
											...red,
										}}
									/>
								</EditSection>
							</label>

							<label style={LabelStyle}>
								<input
									type="text"
									placeholder="Department"
									value={input1}
									onChange={handleChange1}
									style={InputStyle}
								/>
								<EditSection>
									<EditIcon style={editSectionStyleForm} />
									<ClearOutlinedIcon
										style={{
											...editSectionStyleForm,
											...red,
										}}
									/>
								</EditSection>
							</label>

							<label style={LabelStyle}>
								<input
									type="text"
									placeholder="Subject ID"
									value={input1}
									onChange={handleChange1}
									style={InputStyle}
								/>
								<EditSection>
									<EditIcon style={editSectionStyleForm} />
									<ClearOutlinedIcon
										style={{
											...editSectionStyleForm,
											...red,
										}}
									/>
								</EditSection>
							</label>
						</SubjectInfo>
					</div>
					<div style={{ flex: 1 }}>
						<label>
							<input
								type="text"
								placeholder="List Of Contents"
								value={input2}
								onChange={handleChange2}
								style={ListOfContent}
							/>
						</label>
					</div>
				</div>

				<SaveButtonContainer>
					<input
						type="submit"
						value="Save"
						style={SaveButton}
					/>
				</SaveButtonContainer>
			</form>
		</FormContainer>
	);
};

export default TwoColumnForm;

const ListOfContent = {
	padding: "10px",
	width: "90%",
	fontSize: "18px",
	border: "ridge",
	borderRadius: "3px",
	height: "100%",
};

const InputStyle = {
	padding: "10px",
	width: "70%",
	fontSize: "18px",
	margin: "10px",
	border: "ridge",
	borderRadius: "3px",
};

const SubjectInfo = styled.div`
	height: 80%;
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const LabelStyle = {
	display: "flex",
	flexDirection: "row",
};

const FormContainer = styled.div`
	width: 90%;
	background-color: white;
	border-radius: 40px;
	padding: 35px;
`;

const editSectionStyleForm = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
};

const SaveButtonContainer = styled.div`
	display: "flex";
`;

const SaveButton = {
	backgroundColor: "#063443",
	padding: "10px 40px",
	borderRadius: "10px",
	color: "white",
	alignItems: "center",
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 5px;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 10px;
`;

const Column = styled.div`
	flex: 1;
	margin: 0 10px;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
`;

const Input = styled.input`
	width: 100%;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
`;

const SubmitButton = styled.input`
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	margin: 10px;
	&:hover {
		background-color: #3e8e41;
	}
`;
