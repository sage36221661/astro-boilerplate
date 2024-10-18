import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      // 初始化 Web3Modal
      const web3Modal = new Web3Modal({
        cacheProvider: false, // 可选: 是否缓存上次连接的提供商
        providerOptions: {}   // 在此可以添加更多钱包提供商
      });

      // 连接到用户的钱包
      const instance = await web3Modal.connect();

      // 使用 ethers.js 创建 provider
      const provider = new ethers.providers.Web3Provider(instance);

      // 获取用户签名器（signer）
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // 设置已连接的账户
      setAccount(address);
      console.log('Connected account:', address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
