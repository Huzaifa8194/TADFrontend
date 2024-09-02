import Head from "next/head";
import Banner from "@/components/Banner/Banner";
import Sales from "@/components/Sales/Sales";
import WhitePaper from "@/components/WhitePaper/WhitePaper";
import LayoutOne from "@/layouts/LayoutOne";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useMetamask, useWalletConnect, useAddress, useNetwork, useSigner } from "@thirdweb-dev/react";

const TADContractAddress = "0x895BCcff8Ab6eb9Cc582d622E314628fFC89EdF9";
const USDCContractAddress = "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582";



import styles from "./App.module.css";

const TADAbi = [
  "function mint(uint256 usdcAmount) external",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function sell(uint256 usdcAmount) external",
];

const USDCAbi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
];

export default function Home() {
  const [usdcBalance, setUsdcBalance] = useState("");
  const [tadBalance, setTadBalance] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [TADContract, setTADContract] = useState(null);
  const [USDCContract, setUSDCContract] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const network = useNetwork();
  const connectMetamask = useMetamask();
  const connectWalletConnect = useWalletConnect();
  const address = useAddress();
  const signer = useSigner();

  useEffect(() => {
    if (address) {
      updateBalances();
    }
  }, [address]);

  const connectWallet = async ({ walletoption }) => {
    try {
      if (walletoption === "Metamask") {
        await connectMetamask();
      } else if (walletoption === "Walletconnect") {
        await connectWalletConnect();
      }

      // Ensure balances are updated after wallet connection
      await updateBalances();
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet. " + error.message);
    }
  };

  const updateBalances = async () => {
    if (address) {
      try {
        const provider = signer.provider; // Get the provider from the signer

        const tadContract = new ethers.Contract(TADContractAddress, TADAbi, signer);
        const usdcContract = new ethers.Contract(USDCContractAddress, USDCAbi, signer);

        setTADContract(tadContract);
        setUSDCContract(usdcContract);

        // Fetch balances and decimals
        const usdcBal = await usdcContract.balanceOf(address);
        const tadBal = await tadContract.balanceOf(address);
        const usdcDecimals = await usdcContract.decimals();
        const tadDecimals = await tadContract.decimals();

        // Log results for debugging
        console.log("USDC Balance (raw):", usdcBal.toString());
        console.log("TAD Balance (raw):", tadBal.toString());
        console.log("USDC Decimals:", usdcDecimals);
        console.log("TAD Decimals:", tadDecimals);

        // Format and set balances
        setUsdcBalance(ethers.utils.formatUnits(usdcBal, usdcDecimals));
        setTadBalance(ethers.utils.formatUnits(tadBal, tadDecimals));

        toast.success("Balances updated successfully!");
      } catch (error) {
        console.error("Failed to update balances:", error);
        toast.error(`Failed to update balances. Check console for details. Error: ${error.message}`);
      }
    } else {
      console.error("Address not defined");
    }
  };

  const approveUSDC = async () => {
    if (USDCContract) {
      try {
        toast.success("Approving USDC...");
        const usdcDecimals = await USDCContract.decimals();
        const amount = ethers.utils.parseUnits(usdcAmount, usdcDecimals); // Correct usage of parseUnits
        const tx = await USDCContract.approve(TADContractAddress, amount);
        await tx.wait();
        toast.success("USDC approved successfully!");
        return true;
      } catch (error) {
        toast.error("Failed to approve USDC. Check console for details.");
        console.error(error);
        return false;
      }
    }
    return false;
  };

  const mintTAD = async () => {
    if (TADContract && USDCContract) {
      setIsLoading(true);
      try {
        // const approvalSuccess = await approveUSDC();

        // if (!approvalSuccess) {
        //   toast.error("USDC approval failed, cannot proceed with minting.");
        //   return;
        // }

        const currentusdcBalance = await USDCContract.balanceOf(address);
        const usdcDecimals = await USDCContract.decimals();
        const amount = ethers.utils.parseUnits(usdcAmount, usdcDecimals); // Correct usage of parseUnits


        

        if (currentusdcBalance.gte(amount)) { // Use gte to compare BigNumber values
         
          const tx = await TADContract.mint(amount);
          toast.success("THIS PART HAS BEEN DONE");
         
          await tx.wait();
          toast.success("TAD minted successfully!");
          updateBalances();
        } else {
          toast.error("Insufficient USDC balance!");
        }
      } catch (error) {
        toast.error("Failed to mint TAD. Check console for details." + error);
        console.error("MINTTAD FAILURE",error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sellTAD = async () => {
    if (TADContract && USDCContract) {
      setIsLoading(true);
      try {
        const usdcDecimals = await USDCContract.decimals();
        const amount = ethers.parseUnits(usdcAmount, usdcDecimals);
        const tx = await TADContract.sell(amount);
        await tx.wait();
        toast.success("TAD sold successfully!");
        updateBalances();
      } catch (error) {
        toast.error("Failed to sell TAD.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateAndProceed = (action) => {
    if (action === "mintTAD" || action === "sellTAD") {
      if (parseFloat(usdcAmount) > 0) {
        setModalAction(action);
        setModalIsOpen(true);
      } else {
        toast.error("Please enter a valid amount.");
      }
    }
  };

  const confirmTransaction = () => {
    switch (modalAction) {
      case "mintTAD":
        mintTAD();
        break;
      case "sellTAD":
        sellTAD();
        break;
      default:
        console.log("Unknown action:", modalAction);
    }
    setModalIsOpen(false);
  };


               



  return  (
    <>
      <Head>
        <title>TAD Minting & Selling</title>
        <meta name="description" content="" />
      </Head>

      <LayoutOne>
        <main className="fix">
          <Banner />

          <div className={styles.container} id="home">
      <div className={styles.appContent}>
       
        {!address ? (
           <div>
            <p style={{color: 'red'}}>Make sure Polygon is selected as your network.</p>
           <button className={styles.button} onClick={() => connectWallet({ walletoption: "Metamask" })}>
             Connect With Metamask
           </button>
           <button className={styles.button} onClick={() => connectWallet({ walletoption: "Walletconnect" })}>
             Connect With WalletConnect
           </button>
         </div>
        ) : (
          <div>
            <p className={styles.paragraph}>Connected Address: {address}</p>
            <p className={styles.paragraph}>USDC Balance: {usdcBalance}</p>
            <p className={styles.paragraph}>TAD Balance: {tadBalance}</p>
          
            <input
              className={styles.input}
              type="number"
              value={usdcAmount}
              onChange={(e) => setUsdcAmount(e.target.value)}
              placeholder="USDC Amount"
            />
            <button className={styles.button} onClick={approveUSDC}>Approve USDC</button>
            <button className={styles.button} onClick={() => validateAndProceed("mintTAD")}>Mint TAD</button>
            <button className={styles.button} onClick={() => validateAndProceed("sellTAD")}>Sell TAD</button>
          </div>
        )}
        {isLoading && <p className={styles.loading}>TRANSACTION IN PROCESS...</p>}
      </div>
    </div>

          <Sales />

          <div className="area-bg">
            <WhitePaper />
          </div>
        </main>
      </LayoutOne>

      <ToastContainer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Transaction"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000, // Ensure the modal overlay is above everything else
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            zIndex: 1001, // Ensure the modal content is above the overlay
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "90%",
          },
        }}
      >
        <h2>Confirm Transaction</h2>
        <p>Are you sure you want to {modalAction} for {usdcAmount} USDC?</p>
        <button className={styles.button} onClick={confirmTransaction}>Confirm</button>
        <button className={styles.button} onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </>
  );
}
