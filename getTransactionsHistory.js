import {PublicKey} from '@solana/web3.js'

export default async function getTransactionsOfUser(address, options, connection) {
    console.log({ address, options });
    try {
      const publicKey = new PublicKey(address);
      const transSignatures =
        // await connection.getConfirmedSignaturesForAddress2(publicKey, options);
        await connection.getSignaturesForAddress(publicKey, {limit: 1000});
      console.log({ transSignatures });
      const transactions = [];

      for (let i = 0; i < 2; i++) {
        const signature = transSignatures[i].signature;
        const confirmedTransaction = await connection.getConfirmedTransaction(
          signature,
        );

        if (confirmedTransaction) {
          const { meta } = confirmedTransaction;
          if (meta) {
            const oldBalance = meta.preBalances;
            const newBalance = meta.postBalances;
            const amount = oldBalance[0] - newBalance[0];
            const transWithSignature = {
              signature,
              ...confirmedTransaction,
              fees: meta?.fee,
              amount,
            };
            transactions.push(transWithSignature);
          }
        }
      }
      return transactions;
    } catch (err) {
      throw err;
    }
} 
