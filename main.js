// const web3 = require("@solana/web3.js");
import {clusterApiUrl, Connection} from '@solana/web3.js'
import getTransactionsOfUser from './getTransactionsHistory.js'

async function main(){
    const address ='Cx3vo64MnAnxEkKVSMbDazsFxxpNLoGYFdJW4Zripn6K' 
    let connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    let t = await getTransactionsOfUser(address, {}, connection)

}
main()
