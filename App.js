
import './App.css';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect} from "react";
import apiRequest from './apiRequest';

function App() {
  const APIfetch='http://localhost:3900/items';
  const [items, setItems] = useState([]);// i use []  for the new user to add things otherwise it will cause error
  const[search,setSearch]=useState('')
  const[fetcherror,setFetcherror]=useState('');
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchitems=async()=>{
      try{
        const response= await fetch(APIfetch);
        if(!response.ok) throw Error("DIDNT RECEIVED EXPECTED DATA")
        const res=await response.json();
       // console.log(res);
        setItems(res)
        setFetcherror(null);
      }catch(err){
        //console.log(err.stack);
        setFetcherror(err.message);
      }finally{
        setLoading(false);
      }
    }
    setTimeout(()=>{
      (async()=>await fetchitems() )();     


    },2000)
    
    
  },[])  
const setAndSaveItems=(newItems)=>{
  setItems(newItems);
 // localStorage.setItem('shoppinglist',JSON.stringify(newItems));
}
const addItem=async (item)=>{
  const id=items.length?items[items.length-1].id+1:1;
  const myNewItem={id,checked:false,item};
  const listItems=[...items,myNewItem];
  setAndSaveItems(listItems);

  const postOptions={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(myNewItem)
  }
  const request= await apiRequest(APIfetch,postOptions)
  if(request) setFetcherror(request);
 // localStorage.setItem("shoppinglist",JSON.stringify(listItems));

}
const handleCheck=async(id)=>{
  const listItems=items.map((item)=>item.id===id?{ ...item ,checked:!item.checked}:item);
  setAndSaveItems(listItems);

  const myTeam=listItems.filter((item)=>item.id===id);
  const updateobjects={
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'

    },
    body:JSON.stringify({checked:myTeam[0].checked})


    
  }
  const requrl=`${APIfetch}/${id}`;
  const result=await apiRequest(requrl,updateobjects)
  if (result) setFetcherror(result)
 // localStorage.setItem("shoppinglist",JSON.stringify(listItems));
}
const handledel=async(id)=>{
  const listItems=items.filter((item)=>item.id!==id);
  setAndSaveItems(listItems);

  const deleobj={method:'Delete'}
  const requrl=`${APIfetch}/${id}`;
  const result=await apiRequest(requrl,deleobj)
  if (result) setFetcherror(result)

  //localStorage.setItem("shoppinglist",JSON.stringify(listItems));
}
const [newItem,setNewItem]=useState('')
const handleSubmit=(e)=>{
  e.preventDefault();
  if(!newItem) return;
  addItem(newItem);
  setNewItem('');
  console.log("Submitted.");

}
  return (
    <div className="App">
      <Header />
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}/>
      <main> 
      {loading && <p>...Loading Please  Wait</p>}
      {fetcherror && <p style={{color:"red"}}>'Error:{fetcherror}'</p> }
      {!fetcherror&&
      <Content
      items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handledel={handledel}/>
}
</main>
      <Footer
      length={items.length}/>

    </div>
  );
}

export default App;
