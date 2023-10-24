import {FaTrashAlt} from 'react-icons/fa';

const LineItems=({item,handleCheck,handledel})=>{

    return(
        <li className="item" key={item.id}>
        <input
        type="checkbox"
        onChange={()=>handleCheck(item.id)}
        checked={item.checked}

        
        />
        <label>{item.item}</label>
        <FaTrashAlt
        onClick={()=>handledel(item.id)}
        role="button" 
        tabIndex="0"
        
        
        />
        
      </li>
    )
}
export default LineItems