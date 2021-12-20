import React from "react"

const Categories = (props) => {
  //const { setDialog, setDialogType, setFormState } = props

  const categories = ['Huishuidelijk', 'Werk', 'Sport']
  const categoriesMap = categories.map((category) =>
    <div className="category-filter">{category}</div>
  );

  return (
    <div className="categories flex" id="categories">
      {categoriesMap}
    </div>
  );
}

export default Categories