import React from "react";
import styled from "styled-components";

function Departments() {
	return (
		<DepContainer>
			<div>
				<h2>Departments</h2>
				<button>add</button>

				<section>
					<img />
					<h2>Department Name</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
					</p>
				</section>
			</div>
		</DepContainer>
	);
}

export default Departments;

const DepContainer = styled.div`
	background-color: #cddee5;

	* {
		margin: 0;
		padding: 0;
		text-align: left;
	}

	div {
		padding: 3%;
	}

	button {
		display: inline;
	}
`;
