import LineItems from "./LineItems";
const itemslist=({items,handleCheck,handledel})=>{
    return(
        <ul>
        {items.map((item)=>(
            <LineItems
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            handledel={handledel}
            />


        ))}

      </ul>
   
        )
}
export default itemslist;