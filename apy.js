
import Compound from '@compound-finance/compound-js';

const provider = process.env.INFURAURL;

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8; // always 8
const blocksPerDay = 4 * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18

async function calculateSupplyApy(cToken) {
    const supplyRatePerBlock = await Compound.eth.read(
        cToken,
        'function supplyRatePerBlock() returns (uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear - 1) - 1);
}

// recives (Address, ticker sybol of underlaying asset, number Of Decimal of underlaying asset)
async function calculateCompApy(cToken, ticker, underlyingDecimals) {
    // amount of Comp Tokens given out to lenders/ borrowers per block 
    let compSpeed = await Compound.eth.read(
        comptroller,
        'function compSpeeds(address cToken) public returns (uint)',
        [cToken],
        { provider }
    );
    // get Comp Token Price with OrcaleSmartContract
    let compPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [Compound.COMP],
        { provider }
    );
    // get Price of underlying asset => cToken represents asset => get current price of that asset
    let underlyingPrice = await Compound.eth.read(
        opf,
        'function price(string memory symbol) external view returns (uint)',
        [ticker],
        { provider }
    );
    // amount of cTokens that where emitted
    let totalSupply = await Compound.eth.read(
        cToken,
        'function totalSupply() returns (uint)',
        [],
        { provider }
    );
    // get exchange rate of cToken and underlying asset => 1 cDai can be 10 Dai etc
    let exchangeRate = await Compound.eth.read(
        cToken,
        'function exchangeRateCurrent() returns (uint)',
        [],
        { provider }
    );

    exchangeRate = +exchangeRate.toString() / ethMantissa;
    compSpeed = compSpeed / 1e18; // COMP has 18 decimal places
    compPrice = compPrice / 1e6;  // price feed is USD price with 6 decimal places
    underlyingPrice = underlyingPrice / 1e6;
    totalSupply = (+totalSupply.toString() * exchangeRate * underlyingPrice) / (Math.pow(10, underlyingDecimals));
    const compPerDay = compSpeed * blocksPerDay;

    return 100 * (compPrice * compPerDay / totalSupply) * 365;
}

async function calculateApy(cToken, ticker) {
    const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
    const cTokenAddress = Compound.util.getAddress(cToken);
    const [supplyApy, compApy] = await Promise.all([
        calculateSupplyApy(cTokenAddress),
        calculateCompApy(cTokenAddress, ticker, underlyingDecimals)
    ]);
    return { ticker, supplyApy, compApy };
}

export default calculateApy;