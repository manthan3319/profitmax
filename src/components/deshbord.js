import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import { FadeLoader } from "react-spinners";
import { renderToString } from "react-dom/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef } from "react";
import victor from "../image/APROX.svg";
import widthdrow from "../image/widthdrow.png";
import arrow from "../image/cun.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaTrophy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import infoicon from "../image/info.svg";
import greenarrow from "../image/greenarrow.svg";
// import referr from '../image/referrer.svg'
import {
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loader-spinner";

const Deshbord = () => {
  const [USDTAmt, setUSDTAmt] = useState("");
  const [cunAmt, setCunAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [approveAmt, setApproveAmt] = useState("");
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [SellTokensloading, setSellTokensLoading] = useState(false);
  const [WithdrawTokensloading, setWithdrawTokensLoading] = useState(false);
  const [ApproveTokensloading, setApproveTokensLoading] = useState(false);
  const referralLinkRef = useRef(null);
  const [referralCode, setReferralCode] = useState("");
  const [BTCprice, setBTCPrice] = useState("");
  const [BNBprice, setBNBPrice] = useState("");
  const isValidUSDTamount = Number(USDTAmt) >= 20 || USDTAmt == "";
  const [stakeAmount, setStakeAmount] = useState("25");
  const [isLoading, setIsLoading] = useState(false);
  const [duration2, setDuration] = useState(0);
  const [percentage2, setPercentage] = useState(0);

  useEffect(() => {
    const fetchedbtcprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBTCPrice(result.bitcoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbtcprice();
  }, []);

  useEffect(() => {
    const fetchedbnbprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBNBPrice(result.binancecoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbnbprice();
  }, []);

  //read functions
  const address = useAddress();
  const { contract } = useContract(
    "0x614e0fb3cD8731e0D841Bc2A1D54A1F87f2A0698"
  );
  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, address);
  const { contract: USDTContract } = useContract(
    "0x5C2Db6D26D5A86392777368bFED9A8f1afC87A4F"
  );
  const { data: walletBal, isLoading: walletBalLoading } = useTokenBalance(
    USDTContract,
    address
  );
  const { data: rewardAmt, isLoading: isRewardAmtLoading } = useContractRead(
    contract,
    "RewardAmount",
    [address]
  );
  const { data: parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "parent",
    [address]
  );
  const { data: availableRewards, isLoading: isAvailableRewardsLoading } =
    useContractRead(contract, "getAvailableRewards", [address]);
  const { data: rewardLimit, isLoading: isRewardLimitLoading } =
    useContractRead(contract, "getRewardLimit", [address]);
  const { data: totalWithdrawn, isLoading: istotalWithdrawnLoading } =
    useContractRead(contract, "totalWithdrawn", [address]);
  const { data: tokenPrice, isLoading: isTokenPriceLoading } = useContractRead(
    contract,
    "TokenPrice",
    []
  );
  const { data: owner, isLoading: isOwnerLoading } = useContractRead(
    contract,
    "Owner",
    []
  );
  const { data: totalInvested, isLoading: istotalInvestedLoading } =
    useContractRead(contract, "totalInvested", [address]);

  const { data: directChild, isLoading: isDirectChildLoading } =
    useContractRead(contract, "showAllDirectChild", [address]);
  const { data: indirectChild, isLoading: isIndirectChildLoading } =
    useContractRead(contract, "showAllInDirectChild", [address]);
  const { data: userLevels, isLoading: isUserLevelsLoading } = useContractRead(
    contract,
    "userLevels",
    [address]
  );
  const { data: sellLimit, isLoading: isSellLimitlsLoading } = useContractRead(
    contract,
    "getSellingLimit",
    [address]
  );
  const { data: soldLimit, isLoading: isSoldLimitlsLoading } = useContractRead(
    contract,
    "totalAmountSold",
    [address]
  );
  const { data: poolLimit, isLoading: ispoolLimitlsLoading } = useContractRead(
    contract,
    "UsdtPool",
    []
  );
  const { data: supply, isLoading: issupplyLoading } = useContractRead(
    contract,
    "totalSupply",
    []
  );

  const { data: liverate, isLoading: isLiverateLoading } = useContractRead(
    contract,
    "TokenPrice",
    []
  );
  const { data: LPool, isLoading: isPoolLoading } = useContractRead(
    contract,
    "UsdtPool",
    []
  );

  const { data: checkRewards, isLoading: checkRewardsLoading } =
    useContractRead(contract, "checkRewards", [address]);

  const { data: teamBonus, isLoading: checkBonusLoading } =
    useContractRead(contract, "teamBonus", [address]);


  const { data: showAllDirectChild, isLoading: showAllDirectChildLoading } =
    useContractRead(contract, "showAllDirectChild", [address]);

  const { data: showAllInDirectChild, isLoading: showAllInDirectChildLoading } =
    useContractRead(contract, "showAllInDirectChild", [address]);

  const { data: updateLevelIncome, isLoading: updateLevelIncomeLoading } =
    useContractRead(contract, "updateLevelIncome", [address]);

  const {
    data: viewTeamLeadershipRewards,
    isLoading: viewTeamLeadershipRewardsLoading,
  } = useContractRead(contract, "viewTeamLeadershipRewards", [address]);

  const { data: totalReferralRewards, isLoading: totalReferralRewardsLoading } =
    useContractRead(contract, "totalReferralRewards", [address]);

  const { data: totalInvestedAmount, isLoading: totalInvestedAmountLoading } =
    useContractRead(contract, "totalInvestedAmount", [address]);

  //approve tokens
  const { mutateAsync: approve, isLoading: isApproveLoading } =
    useContractWrite(USDTContract, "approve");

  const handleCopyReferralLink = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      // Use react-toastify to display a toaster notification
      toast.success("Referral link copied to clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const approveTokens = async () => {
    try {
      setIsLoading(true);
      let spender = "0x614e0fb3cD8731e0D841Bc2A1D54A1F87f2A0698"; //contract address
      let approveAmount = ethers.utils.parseEther(approveAmt);
      const data = await approve({ args: [spender, approveAmount] });
      console.info("contract call successs", data);
      toast.success("Successfully approved tokens!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } catch (err) {
      toast.error("Approve Failed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      console.error("contract call failure", err);
    } finally {
      setApproveAmt("");
      setIsLoading(false);
    }
  };

  // const AddDataAfterStake = () => {
  //   fetch(`https://backend.smartprofitx.io/api/v1/user/add`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       walletAddress: address,
  //       amount: modifiedAmount,
  //       percentage: "0.5",
  //       duration: "300 Days",
  //       limit: modifiedAmount * 3,
  //       referralAddress: referralCode,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.statusCode === 200) {
  //         //console.log("data insert"); //
  //       } else {
  //         console.log("data not insert");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // };

  // buyTokens
  const { mutateAsync: stakeTokens, isLoading: isBuyTokensLoading } =
    useContractWrite(contract, "stakeTokens");
  let modifiedAmount = stakeAmount.replace("JSR", "");

  const currentTime = new Date();

  let percentage;
  let duration;

  if (modifiedAmount == 50) {
    percentage = 0.5;
    duration = 300;
  } else if (modifiedAmount == 100) {
    percentage = 0.75;
    duration = 300;
  } else if (modifiedAmount >= 500 && modifiedAmount < 1000) {
    percentage = 1;
    duration = 400;
  } else if (modifiedAmount >= 1000 && modifiedAmount < 5000) {
    percentage = 1.25;
    duration = 400;
  } else if (modifiedAmount >= 5000 && modifiedAmount < 10000) {
    percentage = 1.5;
    duration = 400;
  } else if (modifiedAmount >= 10000 && modifiedAmount < 50000) {
    percentage = 1.75;
    duration = 400;
  } else if (modifiedAmount >= 50000) {
    percentage = 2;
    duration = 400;
  } else {
    // Handle other cases if needed
  }


  const AddDataAfterStake = async () => {
    setIsLoading(true);
    console.log("called");
    try {
      const response = await fetch("https://backend.smartprofitx.io/user/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: duration.toString(),
          walletId: address,
          amount: Number(modifiedAmount),
          referral_id: referralCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
        setIsLoading(false);
      }
      // Handle success
      setIsLoading(false);
      toast.success("You have successfully staked USDT", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("Data sent successfully!");
    } catch (error) {
      // Handle error
      setIsLoading(false);
      console.error("There was a problem sending the data:", error.message);
    }
  };

  const WithdrawDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://backend.smartprofitx.io/withdrawal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletId: address,
          amount: withdrawAmt,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success
      setIsLoading(false);
      toast.success("Tokens Has Been Successfully Withdrawn", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      // Handle error
      setIsLoading(false);
      console.error("There was a problem sending the data:", error.message);
    }
  };

  const stakeToken = async () => {
    setIsLoading(true);
    try {
      let ref;
      if (parent === "0x0000000000000000000000000000000000000000") {
        ref = referralCode;
      } else {
        ref = parent;
      }
      let usdtAmt = ethers.utils.parseEther(modifiedAmount);

      console.log("usdtAmt", usdtAmt);

      const data = await stakeTokens({ args: [usdtAmt, referralCode] });
      console.info("contract call successs", data);

      AddDataAfterStake();
    } catch (err) {
      toast.error("Something Went Wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
      setIsLoading(false);
    }
  };

  //sell Token
  const { mutateAsync: sellTokens, isLoading: isSellTokenLoading } =
    useContractWrite(contract, "sellTokens");

  const sellToken = async () => {
    try {
      setSellTokensLoading(true);
      let amount = ethers.utils.parseEther(cunAmt);
      const data = await sellTokens({ args: [amount] });
      console.info("contract call successs", data);
      toast.success("Tokens sold successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Selling amount exceeds limit", {
        position: toast.POSITION.TOP_CENTER,
      });

      console.error("contract call failure", err);
    } finally {
      setCunAmt("");
      setSellTokensLoading(false);
    }
  };

  //withdraw Tokens
  const { mutateAsync: withdraw, isLoading: isWithdrawTokensLoading } =
    useContractWrite(contract, "withdraw");

  const withdrawToken = async () => {
    try {
      setIsLoading(true);
      let amount = ethers.utils.parseEther(withdrawAmt);
      const data = await withdraw({ args: [withdrawAmt] });
      console.info("contract call successs", data);
      WithdrawDetails();
    } catch (err) {
      toast.error("Tokens Withdraw Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("contract call failure", err);
    } finally {
      setWithdrawAmt("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      !walletBalLoading &&
      !isCunWalletBalLoading &&
      !isTokenPriceLoading &&
      !istotalWithdrawnLoading
    ) {
      console.log("contract : ", contract);
      console.log(address);
      console.log("usdtBal", walletBal);
      console.log("cun bal : ", cunWalletBal);
      console.log("token price : ", tokenPrice?.toString());
      console.log("totalWithdrawn : ", totalWithdrawn?.toString());
    }
    if (!isRewardAmtLoading) {
      console.log(rewardAmt?.toString());
    }
    if (!isParentLoading) {
      console.log(parent);
    }
    if (
      !isAvailableRewardsLoading &&
      !isRewardLimitLoading &&
      !isOwnerLoading
    ) {
      console.log("rew limit : ", rewardLimit?.toString());
      console.log("availableRewards : ", availableRewards?.toString());
      console.log("owner", owner);
    }
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const imagePath = "/Sharelink.png";

        const image = new Image();
        image.src = imagePath;

        image.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = image.width;
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0);

          const jsxElement = (
            <p className="price-live-rate" style={{ fontWeight: "bold" }}>
              USDT
              {!isLiverateLoading
                ? parseFloat(
                  ethers.utils.formatUnits(tokenPrice?.toString())
                ).toFixed(7)
                : "0.00"}
            </p>
          );

          const textString = renderToString(jsxElement);
          const text = new DOMParser().parseFromString(textString, "text/html")
            .body.textContent;
          ctx.font = "bold 30px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(text, 635, 850);

          const currentDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          ctx.font = "bold 30px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(currentDate, 288, 850);

          canvas.toBlob(async (blob) => {
            const canvasImageFile = new File([blob], "referral.png", {
              type: "image/png",
            });
            await navigator.share({
              title: "Share your referral link",
              text: "Cunetwork.ai",
              url: `https://dashboard.cunetwork.ai/?ref=JSR{address}`,
              files: [canvasImageFile],
            });
          }, "image/png");
        };
      } else {
        throw new Error("Web Share API not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const handleStakeAmount = (e) => {
    setStakeAmount(e.target.value);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const handleSelectChange = (e) => {
    const value = parseInt(e.target.value, 10);
    
    setStakeAmount(e.target.value);
    switch (value) {
      case 25:
        setDuration(300);
        setPercentage(0.5);
        break;
      case 100:
        setDuration(270);
        setPercentage(0.75);
        break;
      case 500:
        setDuration(180);
        setPercentage(0.5);
        break;
      case 1000:
        setDuration(180);
        setPercentage(0.5);
        break;
      case 5000:
        setDuration(180);
        setPercentage(0.5);
        break;
      case 10000:
        setDuration(180);
        setPercentage(0.5);
        break;
      case 25000:
        setDuration(180);
        setPercentage(0.5);
        break;
      default:
        setDuration(180);
        setPercentage(0.5);
    }
  };
  
  return (
    <div className="">
      <div className="content">
        <ToastContainer />
        {isLoading && (
          <div className="loader_new">
            <FadeLoader color="#36d7b7" />
          </div>
        )}
        <div className="cunholder container">
          <div className="">
            <h2 className="text-red-400">
              Hello, <span style={{ color: "#2360d7" }}>Max</span> holder !!
            </h2>
            <p>Dashboard overview</p>
          </div>
        </div>

        <div className="section2">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="widthdrow approve-token-new">
                  <div className="approve-heading">
                    Stake Amount
                    <span>
                      <img src={widthdrow} alt="puricon" />
                    </span>
                  </div>

                  <div className="Available">
                    <div className="dropdown">
                      <select
                        className="form-select select_vel"
                        id="sel1"
                        name="sellist1"
                        onChange={handleSelectChange}
                      >
                       
                        <option value="25">25</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="25000">25000</option>
                      </select>
                    </div>

                   
                  </div>

                  <div className="Available mt-3">
                    <input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      type="text"
                      placeholder="Enter Referral Address"
                    />
                  </div>

                  <div className="flex-main">
                    <div>
                      Amount will be staked for {duration2 || 180} days with {percentage2 ||  0.5}% return daily
                      up to 3x limit
                    </div>
                  </div>

                  <div className="stake_button_div">
                    <button
                      onClick={stakeToken}
                      disabled={stakeAmount < 24}
                      className="approve_button stack_button"
                    >
                      Stake
                      <span className="btnicon">
                        <img src={greenarrow} alt="puricon" />
                      </span>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="widthdrow approve-token-new">
                  <h3 className="approve-heading">
                    Approve USDT{" "}
                    <span>{/* <img src={widthdrow} alt="puricon" /> */}</span>
                  </h3>

                  <div className="Available">
                    <input
                      value={approveAmt}
                      onChange={(e) => {
                        setApproveAmt(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter USDT to approve"
                    />
                  </div>
                  <div className="stake_button_div">
                    <button onClick={approveTokens} className="approve_button">
                      {" "}
                      Approve USDT{" "}
                      <span className="btnicon">
                        <img src={greenarrow} alt="puricon" />
                      </span>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="widthdrow approve-token-new">
                  <h3 className="approve-heading">
                    Withdraw Rewards{" "}
                    <span>
                      <img src={widthdrow} alt="puricon" />
                    </span>
                  </h3>

                  <div className="Available">
                    <input
                      value={withdrawAmt}
                      onChange={(e) => {
                        setWithdrawAmt(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter amount to withdraw"
                    />
                  </div>
                  <div className="stake_button_div">
                    <button onClick={withdrawToken} className="approve_button">
                      Withdraw rewards
                      <span className="btnicon">
                        <img src={greenarrow} alt="puricon" />
                      </span>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3">
          <div className="container">
            <div className="section3_chaid grid-container">
              <div className="balance_info">
                <p>
                  Available USDT
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <h4 className="text-red-500">
                  {walletBalLoading
                    ? "0.00"
                    : parseFloat((walletBal?.displayValue)).toFixed(2)}{" "}
                  USDT{" "}
                </h4>
              </div>

              <div className="balance_info">
                <p>
                  Total Rewards / Daily Rewards
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <h4>
                  {checkRewardsLoading
                    ? "0.00"
                    :
                    ((parseInt(checkRewards?.totalRewards?._hex, 16) / 1000000000000000000
                    ).toFixed(3))}


                  USDT/{" "}
                  {((parseInt(checkRewards?.totalRewards?._hex, 16) / 1000000000000000000
                  ).toFixed(3)) -

                    ((parseInt(updateLevelIncome?._hex, 16) /
                      1000000000000000000).toFixed(3)) - ((parseInt(totalReferralRewards?._hex, 16) /
                        1000000000000000000).toFixed(3))}
                  USDT
                </h4>
              </div>
              <div className="balance_info">
                <p>
                  Direct / Total{" "}
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <div className="withbalench">
                  <h4>{showAllDirectChild?.length}</h4> <span>/</span>
                  <h4>{showAllDirectChild?.length + 1}</h4>
                </div>
              </div>

              <div className="balance_info">
                <p>
                  Level Income / Referral Rewards
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <div className="withbalench">
                  <h4>
                    {updateLevelIncomeLoading
                      ? "0.00"
                      : (parseInt(updateLevelIncome?._hex, 16) /
                        1000000000000000000).toFixed(3)}{" "}
                    USDT /{" "}
                    {totalReferralRewardsLoading
                      ? "0.00"
                      : (parseInt(totalReferralRewards?._hex, 16) /
                        1000000000000000000).toFixed(3)}{" "}
                    USDT
                  </h4>
                </div>
              </div>

              <div className="balance_info">
                <p>
                  Rank Rewards{" "}
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <div className="withbalench">
                  <h4>
                    {checkBonusLoading
                      ? "0.00"
                      :
                      ((parseInt(teamBonus?.rankReward?._hex, 16) / 1
                      ).toFixed(3))} USDT
                  </h4>
                </div>
              </div>

              <div className="balance_info">
                <p>
                  Total Staked{" "}
                  <span className="greenarrow">
                    <img src={greenarrow} alt="puricon" />
                  </span>
                </p>
                <div className="withbalench">
                  <h4>
                    {" "}
                    {totalInvestedAmountLoading
                      ? "0.00"
                      : (parseInt(totalInvestedAmount?._hex, 16) /
                        1000000000000000000).toFixed(3)}{" "}
                    USDT
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deshbord;
