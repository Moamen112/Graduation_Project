import React from "react";
import styled from "styled-components";

function SideNav() {
	return (
		<div>
			<Nav>kos om moamen</Nav>
		</div>
	);
}

export default SideNav;

const Nav = styled.div`
	p {
		background-color: aliceblue;
	}

	&:hover {
		height: 900px;
		color: black;
		background-color: #ddd;
	}
`;
