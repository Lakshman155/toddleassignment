import { Typography } from "@mui/material";
import React from "react";

const ModuleCard = (module) => {

  const {name,no_of_items}=module;


  return (



<div>
<Typography>{name}</Typography>

<h1>{no_of_items} item</h1>


  
</div>


   
  );
}

export default ModuleCard;
