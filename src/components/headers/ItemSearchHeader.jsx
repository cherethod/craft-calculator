const ItemSearchHeader = (
    { 
        regions,
        searchItem,
        handleSelectedRegion,
        realms,
        handleSelectedRealm,
        realmId,
        auctionHouses,
        handleSelectedAuctionHouse,
        auctionHouseId,
        
     }) => {
    return (
        
        <header>
        {
        !regions && <div className='loader'></div>
        }
        <form action="#" onSubmit={searchItem}>
        {
        regions && <div className="form-container">
            <label htmlFor="region">Region:</label>
            <select name="region" id="region" onChange={handleSelectedRegion}>
                <option value={undefined} disabled selected>Select a region</option>
                {
                regions[1].map((region, index) => (
                    <option key={index} value={region.regionId}>
                    [{region.regionPrefix.toUpperCase()}] {region.name} - {region.gameVersion}
                    </option>
                ))
                }
            </select>         
            </div>
        }
        {
            realms && (
            <div className='form-container'>
                <label htmlFor="realm">Realm:</label>
                <select name="realm" id="realm" onChange={handleSelectedRealm}>
                <option value={undefined} disabled selected>Select a realm</option>
                {
                    realms.map((realm, index) => (
                    <option key={index} value={realm.realmId}>
                        {realm.name} - [{realm.locale}]
                    </option>
                    ))
                }
                </select>
            </div>
            )
            }
            {
            realmId && auctionHouses && (
                <div className='form-container'>
                <label htmlFor="auction-house">Auction House:</label>
                <select name="auction-house" id="auction-house" onChange={handleSelectedAuctionHouse}>
                    <option value={undefined} disabled selected>Select an auction house</option>
                {
                    auctionHouses.map((auctionHouse, index) => (
                        <option key={index} value={auctionHouse.auctionHouseId}>
                        {auctionHouse.type}
                        </option>
                    ))
                }
                </select>
                </div>              
            )
            }
            {
            realmId && auctionHouses && auctionHouseId && (
                <>
                <input type='text' name='item-id' className='search-input' placeholder='Search item...' />
                <button className='btn'>Search</button>
                </>
            )
            }
        </form>
    </header>
    )
}

export default ItemSearchHeader;