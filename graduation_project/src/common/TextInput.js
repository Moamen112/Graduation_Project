import React from "react";
import styled from "styled-components";

const TextInput = ({ label, ...props }) => (
	<Container>
		<Input
			{...props}
			placeholder={label}
		/>
	</Container>
);

export default TextInput;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Input = styled.input`
	padding: 0.5em;
	font-size: 15px;
	border-radius: 20px;
	border: 1px solid gray;
	margin-bottom: 1em;
	width: 90%;
	height: 40px;
	outline: 0;

	&::placeholder {
		opacity: 0.8;
	}
`;
