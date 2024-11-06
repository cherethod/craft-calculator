import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import Item from "./Item";

const Prices = () => {
    const { items, isLoadingData } = useContext(ItemContext);

    return (
      <>
        <h1>Items table</h1>
        {
             isLoadingData ? (
                  <div className="loader"></div>
             ) : (
                  <div className="items">
                       {items.map((item, index) => (
                         <Item key={index} item={item} items={items} isLoadingData={isLoadingData}  />
                       ))}
                  </div>
             )
        }
      </>
    )
}

export default Prices;