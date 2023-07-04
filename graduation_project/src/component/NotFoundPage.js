import React from "react";
import styled from "styled-components";

const NotFoundPage = () => {
	return (
		<Container>
			<h2>404 | Not Found</h2>
		</Container>
	);
};

export default NotFoundPage;

const Container = styled.div`
	--bg-opacity: 1;
	width: 100%;
	height: 100vh;
	display: flex;
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
