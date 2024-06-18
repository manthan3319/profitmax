import React from 'react'
import { useEffect, useState } from 'react';
import { useSDK, useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from 'moment';
import "./page.css"

const Staking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  const sdk = useSDK();

  const { contract } = useContract("0x7d2291988b4f8d3fed0c6aefa131c39586fcb88a");
  const { data: userCounts, isLoading: isUserCountsLoading } = useContractRead(contract, "UserCounts", [address]);


  const getData = async () => {
    try {
      setLoading(true);
      const contract1 = await sdk.getContract("0x7d2291988b4f8d3fed0c6aefa131c39586fcb88a");
      let len = Number(userCounts.buyCount.toString());
      let details = [];

      for (let i = 0; i < len; i++) {
        const data = await contract1.call(
          "userBuys",
          [address, i],
        );
        let parent = data.parent;
        let amount = parseFloat(ethers.utils.formatUnits(data.amount.toString())).toFixed(2);
        let currRate = parseFloat(ethers.utils.formatUnits(data.currentRate.toString())).toFixed(7);
        let date = moment.unix(data.dateTime.toString()).format("DD-MM-YYYY HH:mm:ss");

        let Data = [parent, amount, currRate, date];
        details.push(Data);

      }
      setData(details);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isUserCountsLoading) {
      getData();
    }

  }, [isUserCountsLoading, address])


  const [stakedData, setStakedData] = useState(null);
  useEffect(() => {
    fetch(`https://backend.smartprofitx.io/user/staketime?walletId=${address}`)
      .then(response => response.json())
      .then(data => {
        setStakedData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [address]);

  console.log(stakedData)

  console.log(address)

  
  return (
    <React.Fragment>
      <div className="content">
        <div className="container mt-5">
          <div className="parchage_main">
            <div className="page_title">
              {/* <h1> Staking details</h1> */}
              <p>Staking overview</p>
            </div>

            <div className="parchage_table">
              <table className="table">
                <thead >
                  <tr>
                    <th>Sr.no</th>
                    <th className="date_table">Duration</th>
                    <th>Time since staked</th>
                    <th>Wallet Address</th>
                  </tr>
                </thead>
                <tbody >

                  {stakedData?.length > 0 ? (
                    stakedData.map((rowData, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        
                        <td>{rowData.duration} Days</td>
                        <td className='whitespace-nowrap'>{rowData.stake_time.toFixed(3)} Min</td>
                        <td>{rowData.walletId}</td>
                      </tr>
                    ))) : (
                    <tr>
                      <td colSpan="5">No Data Found</td>
                    </tr>
                  )}


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Staking