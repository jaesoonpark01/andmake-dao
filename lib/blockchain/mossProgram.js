import { Connection, PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { getSolanaConnection } from '../solanaUtils';
import { mintAndmakeToken } from './andmakeToken';

// 이끼 프로그램 ID (실제 구현에서는 배포된 프로그램 ID 사용)
export const MOSS_PROGRAM_ID = 'MossH5Vv2iWqadSd1arEnJuM3UGz9K5GSbQkZX1vKGFt';

// 이끼 모판 구매 함수
export async function buyMoss(
  buyer, // 구매자 지갑
  amount = 1 // 구매할 모판 수량
) {
  try {
    const connection = getSolanaConnection();
    const programId = new PublicKey(MOSS_PROGRAM_ID);
    
    // 구매 데이터 인코딩
    const data = Buffer.from(JSON.stringify({
      instruction: 'buyMoss',
      amount
    }));
    
    // 트랜잭션 생성
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: buyer.publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId,
      data
    });
    
    const transaction = new Transaction().add(instruction);
    
    // 최근 블록해시 가져오기
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = buyer.publicKey;
    
    // 트랜잭션 서명 및 전송
    const signedTx = await buyer.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    
    await connection.confirmTransaction(txId);
    
    return {
      success: true,
      transactionId: txId,
      mossCount: amount
    };
  } catch (error) {
    console.error('이끼 모판 구매 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 이끼 모판 증식 함수
export async function growMoss(
  owner, // 소유자 지갑
  amount = 1 // 증식할 모판 수량
) {
  try {
    const connection = getSolanaConnection();
    const programId = new PublicKey(MOSS_PROGRAM_ID);
    
    // 증식 데이터 인코딩
    const data = Buffer.from(JSON.stringify({
      instruction: 'growMoss',
      amount
    }));
    
    // 트랜잭션 생성
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: owner.publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId,
      data
    });
    
    const transaction = new Transaction().add(instruction);
    
    // 최근 블록해시 가져오기
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = owner.publicKey;
    
    // 트랜잭션 서명 및 전송
    const signedTx = await owner.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    
    await connection.confirmTransaction(txId);
    
    // 증식 시 보상 지급 (10 ANDMAKE)
    const rewardResult = await mintAndmakeToken(
      owner, // 실제 구현에서는 권한 있는 계정
      owner.publicKey.toString(), // 소유자 지갑 주소
      10 // 증식 보상
    );
    
    return {
      success: true,
      transactionId: txId,
      mossAdded: amount,
      rewardResult
    };
  } catch (error) {
    console.error('이끼 모판 증식 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 이끼 모판 양도 함수
export async function transferMoss(
  owner, // 양도자 지갑
  recipientAddress, // 수령자 지갑 주소
  amount = 1 // 양도할 모판 수량
) {
  try {
    const connection = getSolanaConnection();
    const programId = new PublicKey(MOSS_PROGRAM_ID);
    
    // 양도 데이터 인코딩
    const data = Buffer.from(JSON.stringify({
      instruction: 'transferMoss',
      recipient: recipientAddress,
      amount
    }));
    
    // 트랜잭션 생성
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: owner.publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId,
      data
    });
    
    const transaction = new Transaction().add(instruction);
    
    // 최근 블록해시 가져오기
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = owner.publicKey;
    
    // 트랜잭션 서명 및 전송
    const signedTx = await owner.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    
    await connection.confirmTransaction(txId);
    
    // 양도자와 수령자 모두에게 보상 지급 (각각 20 ANDMAKE)
    const rewardSenderResult = await mintAndmakeToken(
      owner, // 실제 구현에서는 권한 있는 계정
      owner.publicKey.toString(), // 양도자 지갑 주소
      20 // 양도 보상
    );
    
    const rewardRecipientResult = await mintAndmakeToken(
      owner, // 실제 구현에서는 권한 있는 계정
      recipientAddress, // 수령자 지갑 주소
      20 // 수령 보상
    );
    
    return {
      success: true,
      transactionId: txId,
      mossTransferred: amount,
      senderReward: rewardSenderResult,
      recipientReward: rewardRecipientResult
    };
  } catch (error) {
    console.error('이끼 모판 양도 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}