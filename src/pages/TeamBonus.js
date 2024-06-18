import React from 'react'
import { useEffect, useState } from 'react';
import { useSDK, useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from 'moment';
import "./page.css"

const TeamBonus = () => {
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


  const [totalTeamData, setTotalTeamData] = useState(null);
  useEffect(() => {
    fetch(`https://backend.smartprofitx.io/user/direct-team?walletId=${address}`)
      .then(response => response.json())
      .then(data => {
        setTotalTeamData(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [address]);

  console.log(totalTeamData)
  

  return (
    <React.Fragment>
      <div className="content">
        <div className="container mt-5">
          <div className="parchage_main">
            <div className="page_title">
              {/* <h1> TotalTeam details</h1> */}
              <p>TotalTeam overview</p>
            </div>

            <div className="parchage_table">
              <table className="table">
                <thead >
                  <tr>
                    <th>Sr.no</th>
                    <th className="date_table">Wallet Id</th>
                    <th>Duration</th>
                    <th>Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody >

                  {totalTeamData?.length > 0 ? (
                    totalTeamData.map((rowData, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{rowData.walletId}</td>
                        <td>{rowData.duration} Days</td>
                        <td>{rowData.amount.toFixed(2)}</td>
                        <td className='whitespace-nowrap'>{new Date(rowData.time).toLocaleString('en-US', {day: '2-digit', month: '2-digit',  year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}</td>
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

export default TeamBonus