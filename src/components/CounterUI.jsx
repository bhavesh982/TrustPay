import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../contract/counterABI";

const CounterUI = () => {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return alert("Please install MetaMask!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const counterContract = new ethers.Contract(contractAddress, contractABI, signer);

      setContract(counterContract);

      const currentCount = await counterContract.getCounter();
      setCount(currentCount.toString());
    };

    init();
  }, []);

  const increment = async () => {
    if (!contract) return;

    const tx = await contract.increment(incrementValue);
    await tx.wait();

    const updatedCount = await contract.getCounter();
    setCount(updatedCount.toString());
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold mb-4 text-center">🧮 Counter DApp</h1>
      <p className="text-lg text-center mb-4">Current Count: {count}</p>

      <input
        type="number"
        className="border px-2 py-1 mb-2 w-full"
        value={incrementValue}
        onChange={(e) => setIncrementValue(parseInt(e.target.value))}
      />
      <button
        onClick={increment}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
};

export default CounterUI;
