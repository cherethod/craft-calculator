import { useState } from "react";

const PriceFixer = () => {
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [copper, setCopper] = useState(0);
    const [totalCopper, setTotalCopper] = useState(0);

    function convertToCopper(e) {
        e.preventDefault();

        // Convierte los valores de los inputs a enteros
        const goldValue = parseInt(gold) * 10000;
        const silverValue = parseInt(silver) * 100;
        const copperValue = parseInt(copper);

        const total = goldValue + silverValue + copperValue;
        setTotalCopper(total);
    }

    return (
        <div id="priceFixerCalculator">
            <h1>Price Fixer</h1>
            <form action="#" onSubmit={(e)=> convertToCopper(e)}>
                <div className="valueInputs">
                    <div>
                        <label htmlFor="gold">Gold</label>
                        <input type="number" id="gold" name="gold" value={gold} onChange={(e)=> setGold(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="silver">Silver</label>
                        <input type="number" id="silver" name="silver" value={silver} onChange={(e)=> setSilver(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="copper">Copper</label>
                        <input type="number" id="copper" name="copper" value={copper} onChange={(e)=> setCopper(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button className="btn">Convert to Copper</button>
                </div>
            </form>

            {
                totalCopper > 0 && (
                    <div>
                        <h2>Total Copper: {totalCopper}</h2>
                    </div>
                )
            }
        </div>
    );
}

export default PriceFixer;
