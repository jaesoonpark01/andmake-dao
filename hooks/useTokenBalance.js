import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getSolanaConnection, getTokenBalance } from '../lib/solanaUtils';

export function useTokenBalance(tokenMintAddress) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { publicKey, connected } = useWallet();
  
  useEffect(() => {
    if (!connected || !publicKey || !tokenMintAddress) {
      setBalance(null);
      setLoading(false);
      return;
    }
    
    const fetchBalance = async () => {
      try {
        setLoading(true);
        
        // Solana 네트워크 연결
        const connection = getSolanaConnection();
        
        // 토큰 잔액 가져오기
        const tokenBalance = await getTokenBalance(connection, publicKey, tokenMintAddress);
        setBalance(tokenBalance);
      } catch (error) {
        console.error('Failed to fetch token balance:', error);
        setBalance('0');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBalance();
    
    // 30초마다 잔액 갱신
    const intervalId = setInterval(fetchBalance, 30000);
    
    return () => clearInterval(intervalId);
  }, [connected, publicKey, tokenMintAddress]);
  
  return { balance, loading };
}