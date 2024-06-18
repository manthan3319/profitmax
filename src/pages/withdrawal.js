import React from "react";
import { useEffect, useState } from "react";
import {
  useSDK,
  useContract,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from "moment";
import "./page.css";

const Withdrawal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  const sdk = useSDK();

  const { contract } = useContract(
    "0x7d2291988b4f8d3fed0c6aefa131c39586fcb88a"
  );
  const { data: parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "parent",
    [address]
  );
  const { data: userCounts, isLoading: isUserCountsLoading } = useContractRead(
    contract,
    "UserCounts",
    [address]
  );

  const getData = async () => {
    try {
      setLoading(true);
      const contract1 = await sdk.getContract(
        "0x7d2291988b4f8d3fed0c6aefa131c39586fcb88a"
      );
      let len = Number(userCounts.withdrawCount.toString());
      let details = [];

      for (let i = 0; i < len; i++) {
        const data = await contract1.call("userWithdrawals", [address, i]);
        let amount = parseFloat(
          ethers.utils.formatUnits(data.amount.toString())
        ).toFixed(2);
        let currRate = parseFloat(
          ethers.utils.formatUnits(data.currentRate.toString())
        ).toFixed(7);
        let date = moment
          .unix(data.dateTime.toString())
          .format("DD-MM-YYYY HH:mm:ss");

        let Data = [amount, currRate, date];
        details.push(Data);
      }
      setData(details);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserCountsLoading) {
      getData();
    }
  }, [isUserCountsLoading, address]);

  const [widthdrowData, setWidthdrowData] = useState(null);
  useEffect(() => {
    fetch(`https://backend.smartprofitx.io/withdrawal/amount?walletId=${address}`)
      .then((response) => response.json())
      .then((data) => {
        setWidthdrowData(data.amount);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [address]);


  return (
    <React.Fragment>
      <div className="content">
        <div className="container mt-5">
          <div className="parchage_main">
            <div className="page_title">
              {/* <h1> Sell details</h1> */}
              <p>Withdrawal overview</p>
            </div>

            <div className="parchage_table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th>Amount</th>
                    <th>Time</th>
                    <th>Wallet Id</th>
                  </tr>
                </thead>
                <tbody>
                  {widthdrowData?.length > 0 ? (
                    widthdrowData.map((rowData, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="date_table">{rowData.amount}</td>
                        <td>{rowData.timestamps}</td>
                        <td>{rowData.walletId}</td>
                      </tr>
                    ))
                  ) : (
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
  );
};

export default Withdrawal;
