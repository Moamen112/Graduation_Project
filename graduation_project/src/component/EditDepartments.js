import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../common/TextInput";

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
`;

const EditSubjectWrapper = styled.div`
	width: 50%;
	height: 60vh;
	margin-left: 15%;
	padding-top: 8%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	box-shadow: 2px 2px 8px 5px rgba(0, 0, 0, 0.2);
	border-radius: 20px;

	.headers {
		position: absolute;
		top: 20px;
		left: 30px;
	}

	form {
		display: flex;
		width: 100%;
	}
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`;

const Label = styled.label`
	margin-bottom: 5px;
`;

const TextArea = styled.textarea`
	font-size: 16px;
	padding: 20px 0 30px 20px;
	width: 45%;
	height: 100%;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const SaveBTN = styled.button`
	padding: 10px 45px;
	position: absolute;
	bottom: 3%;
	left: 27%;
	border-radius: 20px;
	background-color: #063443;
	color: #fff;
	font-size: 20px;
`;

const EditDepartments = (props) => {
	const [formData, setFormData] = useState({
		subjectName: "",
		subjectCode: "",
		profName: "",
		departmentID: "",
		description: `Content`,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	};

	return (
		<Container>
			<EditSubjectWrapper>
				<div className="headers">
					<h1>Subject name</h1>
				</div>
				<form>
					<InputWrapper>
						<TextInput
							label="Subject Name"
							type="text"
							name="subjectName"
							value={formData.firstName}
							onChange={handleChange}
						/>

						<TextInput
							label="Subject Code"
							name="subjectCode"
							value={formData.lastName}
							onChange={handleChange}
						/>

						<TextInput
							label="Professor Name"
							name="profName"
							type="text"
							value={formData.email}
							onChange={handleChange}
						/>
						<TextInput
							label="Department ID"
							type="text"
							name="departmentID"
							value={formData.password}
							onChange={handleChange}
						/>
					</InputWrapper>
					<TextArea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</form>

				<SaveBTN>Save</SaveBTN>
			</EditSubjectWrapper>
		</Container>
	);
};

/*EditDepartments.propTypes = {
	name: PropTypes.string.isRequired,
	subject: PropTypes.shape({
		input1: PropTypes.string,
		input2: PropTypes.string,
		input3: PropTypes.string,
	}).isRequired,
	description: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

EditDepartments.defaultProps = {
	description: "",
};*/

export default EditDepartments;
