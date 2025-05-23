import { TOKEN_PROGRAM_ID, createMint, getMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { getSolanaConnection } from '../solanaUtils';

// ANDMAKE 토큰 민트 주소 (실제 구현에서는 배포된 토큰 주소 사용)
export const ANDMAKE_TOKEN_MINT = 'Gh7JjR64sY3UBr8N7NXQTJTgRLLnnJ6UHSFGQFyYNuxG';

// 토큰 발행 함수 (실제 구현에서는 관리자만 호출 가능)
export async function mintAndmakeToken(
  authority, // 토큰 발행 권한을 가진 지갑
  recipient, // 토큰을 받을 지갑 주소
  amount // 발행할 토큰 양
) {
  try {
    const connection = getSolanaConnection();
    const mintPublicKey = new PublicKey(ANDMAKE_TOKEN_MINT);
    
    // 받는 사람의 토큰 계정 가져오기 또는 생성
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      authority, // 트랜잭션 수수료 지불자
      mintPublicKey, // 토큰 민트 주소
      new PublicKey(recipient) // 받는 사람의 지갑 주소
    );
    
    // 토큰 발행
    const mintTx = await mintTo(
      connection,
      authority, // 트랜잭션 수수료 지불자
      mintPublicKey, // 토큰 민트 주소
      recipientTokenAccount.address, // 받는 사람의 토큰 계정 주소
      authority, // 민트 권한 소유자
      amount * 1_000_000 // 토큰 양 (6자리 소수점)
    );
    
    return {
      success: true,
      signature: mintTx,
      amount
    };
  } catch (error) {
    console.error('토큰 발행 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 토큰 전송 함수
export async function transferAndmakeToken(
  sender, // 보내는 사람의 지갑
  recipient, // 받는 사람의 지갑 주소
  amount // 보낼 토큰 양
) {
  try {
    const connection = getSolanaConnection();
    const mintPublicKey = new PublicKey(ANDMAKE_TOKEN_MINT);
    
    // 보내는 사람의 토큰 계정 가져오기
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender, // 트랜잭션 수수료 지불자
      mintPublicKey, // 토큰 민트 주소
      sender.publicKey // 보내는 사람의 지갑 주소
    );
    
    // 받는 사람의 토큰 계정 가져오기 또는 생성
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender, // 트랜잭션 수수료 지불자
      mintPublicKey, // 토큰 민트 주소
      new PublicKey(recipient) // 받는 사람의 지갑 주소
    );
    
    // 토큰 전송
    const transferTx = await transfer(
      connection,
      sender, // 트랜잭션 수수료 지불자
      senderTokenAccount.address, // 소스 토큰 계정
      recipientTokenAccount.address, // 대상 토큰 계정
      sender.publicKey, // 토큰 소유자
      amount * 1_000_000 // 토큰 양 (6자리 소수점)
    );
    
    return {
      success: true,
      signature: transferTx,
      amount
    };
  } catch (error) {
    console.error('토큰 전송 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
