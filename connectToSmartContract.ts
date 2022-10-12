import { ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/387AUP4CmMpxX_SSMj7Pl7TaGiYo2-Ev")
const signer = provider.getSigner(0x87A7D417B4fE0D97FDfbEA4C05f688513D79C3f6)
signer.provider
const ERC20_ABI = [
    "function tokenURI(uint256) view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function getTokenCounter() view returns (uint256)",
    "function name() view returns (string)",
    "function ownerOf(uint256) view returns (address)",
    "function symbol() view returns (string)",
    "function mintNft()",
    // "function _safeMint(address, tokenId)",
    // "function transferFrom(address, address, tokenId)",
];

let contractAddress = "0x6Fd31708c69B08b7742B1e792901366CbEB146Eb"; // DAI Contract
const ContractprivateKey = "193f3180a4cfc0082bcb927c317e6deed19ea0f8a3a98a07294225a7b363c5c5";
const account = "0x87A7D417B4fE0D97FDfbEA4C05f688513D79C3f6"
//const signer = provider.getSigner(account)

let wallet = new ethers.Wallet(ContractprivateKey,provider);
const readContract = new ethers.Contract(contractAddress, ERC20_ABI, provider)
const privatekey2 = "869e1150b98dd65f0aadbb122f983a0ef9288b7aa504450b8be0db9c2eb0286b";

//all works!!
const readSmartContract = async () => {
    let tokenId = 2;
    const tokenURI = await readContract.tokenURI(tokenId);
    const balanceOf = await readContract.balanceOf(account);
    const name = await readContract.name();
    const symbol = await readContract.symbol();
    const getTokenCounter = await readContract.getTokenCounter();
    const ownerOf = await readContract.ownerOf(tokenId);
    console.log(`\nReading from ${contractAddress}\n`);
    console.log(`tokenURI: ${tokenURI}`);
    console.log(`balanceOf: ${balanceOf}`);
    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Total Supply: ${getTokenCounter}`);
    console.log(`ownerOf: ${ownerOf}`);

}
let wallet2 = new ethers.Wallet(privatekey2,provider);
wallet2.provider;
const writeContract = new ethers.Contract(contractAddress, ERC20_ABI, wallet2)
const writeSmartContract = async () => {
    writeContract.connect(signer);
    const getAddress = await wallet2.getAddress();
    const getBalance = await wallet2.getBalance();
    const mintNft = await writeContract.mintNft();
    console.log(getAddress);
    console.log(getBalance);
    console.log(mintNft);
}

// readSmartContract();
writeSmartContract();
