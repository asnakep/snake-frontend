"use client";
import {
  disconnect,
  getActiveConnector,
  watchAddress,
} from "@dcspark/adalib";
import {EnabledAPI} from "@dcspark/adalib/dist/types/CardanoInjected";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import WalletModal3 from "./WalletModal3";

const getData = async () => {
  const data = await fetch("/api/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });
  const result = await data.json()
  console.log(result)
};

const WalletConnect3 = () => {
  const tx = "84a4008182582035024cacbedba398b8af5b85b56ab1ef3c44e2b8a271b642c35760435240e2cc010182a300581d7051936f3c98a04b6609aa9b5c832ba1182cf43a58e534fcc05db09d6901821a005dfa8ea1581c582ee80289e19f9e2518ba0a2658230c57660118358af5799f38c689a154546f6b656e486f6c64657256616c696461746f720103d818590491820259048c5904890100003222232323232325333573466e1d2002002132323253335734a6644666ae6800800452819b87375a6aae78005200213370e6eb4d55cf192999aab9f0011533573892010e4c69737420697320656d7074792e001613253335573e00226ae8400854cd5ce249244c69737420636f6e7461696e73206d6f7265207468616e206f6e6520656c656d656e742e00163574400266446646460044660040040024600446600400400244a666aae7c0045854ccd5cd19baf35573a6ae840040104dd59aab9e35742002260046ae88004004c94ccd55cf8008a99ab9c4910e4c69737420697320656d7074792e001613253335573e00226ae8400854cd5ce249244c69737420636f6e7461696e73206d6f7265207468616e206f6e6520656c656d656e742e00163574400266446646460044660040040024600446600400400244a666aae7c00452f5c0266ae80d55ce9aba1001300235744002664646460044660040040024600446600400400244a666aae7c00452f5bded8c0264a666ae68c0100044cd5d000098019aba200213003357440046ae840048cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a50153323357340022944c00cd5d0800898011aba200123371e0066eb8d55ce8009bab35573c0020046eacd5d09aba23235573c6ea8004cc88cc8c8c0088cc0080080048c0088cc008008004894ccd55cf8008b0992999ab9a323375e6e9cc8d55cf1baa001005374e646aae78dd50008009aba10011357426ae880044c00cd5d1001191aab9e37540026ae84004008dd61aba1007357420089101085054486f6c6465720000332337029000000a40042930b192999aab9f001153357389210e4c69737420697320656d7074792e001613253335573e00226ae8400854cd5ce249244c69737420636f6e7461696e73206d6f7265207468616e206f6e6520656c656d656e742e00163574400200266446646460044660040040024600446600400400244a666aae7c0045854ccd5cd19baf35573a6ae840040104dd59aab9e35742002260046ae88004004028004c8cc8c88cc8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5eb7bdb1804c8ccc014d55cf1aba1002233574066ec0d55ce9aba1003001002100130023574400200246660046eac0048c888c00800cdd300089128009192999ab9a35746002244a002244600400666446646460044660040040024600446600400400244a666aae7c00452f5bded8c026466600a6aae78d5d0801119aba0337606aae74d5d0801800801080098011aba200100125333573466ebc004dd424000244a00224460040060020026eacd5d0991aba2357446ae88004d5d10020a99ab9c4915d5061747465726e206d61746368206661696c75726520696e2027646f2720626c6f636b206174207372632f5072696365446973636f766572794576656e742f50726f6a656374546f6b656e486f6c6465722e68733a3134363a332d3430001635573c0046aae74004dd51aba135744004646aae78dd50009aba10013235573c6ea800400530011e581c87b38bd13a0b203bebcbf7c238fe38517a8746559399e8c86cdf35b9000182583900cfaf6a76f8068fc97dc55d8572ac0e460cd04616421da8ae15eec9b1ba34eb1528d16e1cd363157709b8ee95ef7ba1f56f758dfb75812ecc1a10e4846a021a00036f3509a1581c582ee80289e19f9e2518ba0a2658230c57660118358af5799f38c689a154546f6b656e486f6c64657256616c696461746f7201a101818201818200581ccfaf6a76f8068fc97dc55d8572ac0e460cd04616421da8ae15eec9b1f5f6"
  const [address, setAddress] = useState<string>();
  const [enabledAPI, setEnabledAPI] = useState<EnabledAPI>();
  const [txCBOR, setTxCBOR] = useState<string>(tx);

  watchAddress((watchedAddress: SetStateAction<string | undefined>) => {
    // console.log("watchAddress", watchedAddress);
    setAddress(watchedAddress);
  });

  const onSignTx = useCallback(async () => {
    await getData()
    if (txCBOR && enabledAPI) {
      enabledAPI.signTx(txCBOR, false).then(resultID => {
        console.log('Tx signed', resultID);
      });
    }
  }, [enabledAPI,txCBOR]);

  useEffect(() => {
    if (address) {
      console.log("address connected");
      getActiveConnector()
        .enable()
        .then((api) => {
          setEnabledAPI(api)
          // value.getUtxos().then((value) => {
          //   console.log(value);
          // });
        });
    }
  }, [address]);

  return (
    <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
      {address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {/* <h1> */}
          {/*   {usedAddresses[0].slice(0, 10)} */}
          {/*   {"..."} */}
          {/*   {usedAddresses[0].slice(usedAddresses[0].length - 6)} */}
          {/* </h1> */}
          <button
            className="btn btn-square btn-outline"
            onClick={() => {
              onSignTx();
            }}
          ></button>
          <button
            className="btn btn-square btn-outline"
            onClick={() => {
              disconnect();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
      <WalletModal3 />
    </div>
  );
};

export default WalletConnect3;
