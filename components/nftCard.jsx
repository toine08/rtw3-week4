import Link from 'next/link'
export const NFTCard = ({nft, loading}) => {

    return(
        <div className="w-1/4 flex flex-col rounded-md border border-black">
            <div className="">
            <img key={nft.media} className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>

            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-full">
                <div className="">
                    <h2 key={nft.title} className="text-xl text-gray-800">{nft.title}</h2>
                    <p key={nft.id.tokenId} className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length -4)}</p>
                    <p key={nft.contract.address} onClick={() => {navigator.clipboard.writeText(nft.contract.address)}} className="text-gray-600">{`${nft.contract.address.substr(0,5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                </div>

                <div className="flex-grow mt-2">
                    <p key={nft.description} className="text-gray-600">{nft.description.substr(0,150)}...</p>
                </div>
                <div className='flex-grow mt-2 '>
                    <a className='text-blue-800 justify-center' target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
                </div>
            </div>
        </div>
    )
}

/*.substr(0,150)*/

/**
 * 
 */