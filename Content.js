import ItemsList from './ItemsList';


const Content = ({items,handleCheck,handledel}) => {
              




  return (
    <>
      
          <ItemsList
    items={items}
    handleCheck={handleCheck}
    handledel={handledel}
    /> 


    </>
  );
};

export default Content;
