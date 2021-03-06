import * as React from "react";
//import { ConstructorExpression } from 'assemblyscript'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import {NFTCard} from '../components/nftCard';
import Pagination from '../components/Pagination';
import Foot from '../components/Footer'


const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)

  //pagination system
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(10);

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = process.env.NEXT_PUBLIC_apiKey;
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = process.env.NEXT_PUBLIC_apiKey;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

   //get current nfts
   const indexOfLastPost = currentPage * nftsPerPage
   const indexOfFirstPost = indexOfLastPost - nftsPerPage
   const currentNFTs = NFTs.slice(indexOfFirstPost, indexOfLastPost)

   const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return(

      <div className='h-screen  flex flex-col items-center justify-between py-8 gap-y-3 '>
        <div className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-5xl font-black '>
        <h1 className="">NFT Watcher</h1></div>
        <div className='flex flex-col w-full justify-center items-center gap-y-2'>
          <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"}  placeholder="Add your wallet address" className='w-2/5 border-2 border-teal-500 rounded-md p-2' ></input>
          <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address" className='w-2/5 border-2 border-teal-500 rounded-md p-2'></input>
          <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}}  type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
          <button className={"disabled:bg-slate-500 text-white bg-blue-600 rounded-full px-4 py-2 mt-3 w-1/5"} onClick={
           () => {
             if(fetchForCollection){
               fetchNFTsForCollection();
             }else fetchNFTs();
          }
        }>Let's go! </button>
        </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {NFTs.length > 0 &&
            currentNFTs.map((nft) => {
              return <NFTCard nft={nft} loading={loading}/>
            })}
        </div>
        <div>
          {NFTs.length > 0 && (
            <Pagination
              nftsPerPage={nftsPerPage}
              totalNFTs={NFTs.length}
              paginate={paginate}
              currentPage={currentNFTs}
            />
          )}
        </div>
        <Foot/>
      </div>
  )
}
export default Home
