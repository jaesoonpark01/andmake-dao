import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

// 솔라나 네트워크 연결 가져오기
export function getSolanaConnection(network = 'devnet') {
  const endpoint = process.env.NEXT_PUBLIC_RPC_HOST || 
    (network === 'mainnet' 
      ? 'https://api.mainnet-beta.solana.com' 
      : 'https://api.devnet.solana.com');
  
  return new Connection(endpoint, 'confirmed');
}

// SOL 전송 함수
export async function transferSOL(connection, fromWallet, toAddress, amount) {
  try {
    const toPublicKey = new PublicKey(toAddress);
    
    // 트랜잭션 생성
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * 1_000_000_000, // 1 SOL = 10^9 lamports
      })
    );
    
    // 최근 블록해시 가져오기
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromWallet.publicKey;
    
    // 트랜잭션 전송
    const signature = await connection.sendTransaction(transaction, [fromWallet]);
    await connection.confirmTransaction(signature);
    return { success: true, signature };
  } catch (error) {
    console.error('SOL 전송 오류:', error);
    return { success: false, error: error.message };
  }
}

// ANDMAKE 토큰 전송 함수
export async function transferToken(
  connection,
  fromWallet,
  toAddress,
  tokenMintAddress,
  amount,
  tokenDecimals = 6
) {
  try {
    const toPublicKey = new PublicKey(toAddress);
    const tokenMintPublicKey = new PublicKey(tokenMintAddress);
    
    // 발신자와 수신자의 토큰 계정 주소 가져오기
    const fromTokenAccount = await getAssociatedTokenAddress(tokenMintPublicKey, fromWallet.publicKey);
    const toTokenAccount = await getAssociatedTokenAddress(tokenMintPublicKey, toPublicKey);
    
    // 트랜잭션 생성
    const transaction = new Transaction().add(
      createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromWallet.publicKey,
        amount * 10 ** tokenDecimals
      )
    );
    
    // 최근 블록해시 가져오기
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromWallet.publicKey;
    
    // 트랜잭션 전송
    const signature = await connection.sendTransaction(transaction, [fromWallet]);
    await connection.confirmTransaction(signature);
    return { success: true, signature };
  } catch (error) {
    console.error('토큰 전송 오류:', error);
    return { success: false, error: error.message };
  }
}

// 토큰 잔액 조회 함수
export async function getTokenBalance(connection, publicKey, tokenMintAddress) {
  try {
    const mintPubkey = new PublicKey(tokenMintAddress);
    
    // 토큰 계정 조회
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { mint: mintPubkey },
      'confirmed'
    );
    
    if (tokenAccounts.value.length === 0) {
      return '0';
    }
    
    // 토큰 잔액 가져오기
    const tokenBalance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return tokenBalance.toString();
  } catch (error) {
    console.error('토큰 잔액 조회 오류:', error);
    return '0';
  }
}