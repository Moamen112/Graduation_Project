import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Unauthorized = () => {
	return (
		<Container className="App">
			<h2>Sorry you do not access to this page</h2>
			<StyledLink to="/">Go to Login page</StyledLink>
		</Container>
	);
};

export default Unauthorized;

const StyledLink = styled(Link)`
	color: #fff;
`;

const Container = styled.div`
	--bg-opacity: 1;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
	justify-content: center;
	background-color: rgba(26, 32, 44, var(--bg-opacity));
	letter-spacing: 0.05em;
	text-transform: uppercase;

	--text-opacity: 1;
	color: #a0aec0;
	color: rgba(160, 174, 192, var(--text-opacity));

	h2 {
		font-weight: 200;
	}
`;
