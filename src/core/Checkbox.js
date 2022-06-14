import React, {useState, useEffect} from "react";

const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([])

  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c) // return the first index or -1
    const newCheckedCategoryId = [...checked]
    //if currently checked was not already in checked state then do a push else pull/take off
    if(currentCategoryId === -1){
      newCheckedCategoryId.push(c)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    console.log(newCheckedCategoryId)
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }
   return categories.map((cat, i) => (
    <li key={i} className="list-unstyled">
      <input onChange={handleToggle(cat._id)} value = {checked.indexOf(cat._id === -1)} type="checkbox" className="form-check-input"/>
      <label className="form-check-label">{cat.name}</label>
    </li>
  ) )
}

export default Checkbox