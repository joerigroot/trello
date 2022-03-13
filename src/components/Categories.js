import React from "react";

const Categories = (props) => {
	const categories = ["Huishuidelijk", "Werk", "Sport"];
	const categoriesMap = categories.map((category, index) => (
		<div key={index} className="category-filter">
			{category}
		</div>
	));

	return (
		<div className="categories flex" id="categories">
			{categoriesMap}
		</div>
	);
};

export default Categories;
