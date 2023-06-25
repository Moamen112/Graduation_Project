import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ to, disabled, ...rest }) => {
	if (disabled) {
		return (
			<span
				{...rest}
				style={{ color: "gray", pointerEvents: "none" }}
			/>
		);
	}

	return (
		<RouterLink
			{...rest}
			to={to}
		/>
	);
};

export default Link;
