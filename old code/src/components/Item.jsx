import { useEffect, useState } from "react";

const Item = ({ item, items, isLoadingData }) => {
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        // Verifica que item.reagents exista y sea un array antes de continuar
        if (!item.reagents || !Array.isArray(item.reagents) || !items) return;

        let totalCost = 0;
        // Calcula el costo total de los reagentes
        for (let reagent of item.reagents) {
            const reagentItem = items.find(i => i.id === reagent.id);
            if (reagentItem) {
                console.log(reagentItem);
                
                totalCost += reagentItem.price * reagent.quantity;
            }
        }

        console.log(`item: ${item.name[1]} - totalCost: ${totalCost} - price: ${item.price} - units: ${item.units}`);
        setProfit(item.price * item.units - totalCost);
    }, [item, items]);
    
    // Determina el ancho de la barra basado en el valor de numAuctions
    const progressHeight = Math.min(item.numAuctions, 100); // Asegura que el valor no supere 100%


    const getNumAuctionsClass = (numAuctions) => {
        if (numAuctions > 90) return 'very_high';
        if (numAuctions > 70) return 'high';
        if (numAuctions > 50) return 'medium';
        if (numAuctions > 40) return 'low';
        return 'very_low';
      };

    return (
       <>
       {
        isLoadingData ? (
            <div className="loader"></div>
        ) : (
            <div className={`item ${item.reagents ? 'recipe' : ''}`}>
            <>
                <div className="progress-bar">
                <div
                    className={`progress-bar-fill ${getNumAuctionsClass(item.numAuctions)}`}
                    style={{ height: `${progressHeight}%` }}
                ></div>
            </div>
                <img src={item.image} alt={item.name[0]} />
                <h3>{item.name[1]} {item.units > 1 ? `x${item.units}` : ''}</h3>
                {item.reagents && (
                    <ul>
                        {item.reagents.map((reagent, index) => (
                            <li key={index} data-quantity={reagent.quantity}>
                                <span>{reagent.quantity}</span>
                                <img src={reagent.image} alt={reagent.name[1]} title={`${reagent.name[1]} x${reagent.quantity}`} />
                            </li>
                        ))}
                    </ul>
                )}
                <p>{Math.floor(item.price / 10000)}g {Math.floor((item.price % 10000) / 100)}s {Math.floor(item.price % 100)}c</p>
                {item.reagents && (
                    <p style={{color: profit > 0 ? 'green' : 'red'}}>
                        {profit > 0 ? 'Profit' : 'Loss'}: {Math.floor(profit / 10000)}g {Math.floor((profit % 10000) / 100)}s {Math.floor(profit % 100)}c
                    </p>
                )}
            </>
        </div>
        )
       }
       </>
    );
};

export default Item;
