# About the Maki Protocol Repo
This repository is designed as a container for the contracts that play the most pivotal role in the farm and exchange components of the Maki Protocol, which is a Pancakeswap fork designed to operate on PulseChain.
___
## Deployed Contracts (Mainnet)
this information is coming soon...

## Testnet

#### Contracts

[WPLS - 0xcF1Fc503CA35618E9b4C08b7847980b3e10FB53B] (https://scan.v4.testnet.pulsechain.com/address/0xcF1Fc503CA35618E9b4C08b7847980b3e10FB53B) use function3 to get wpls faucet


[USD - 0x3e0Ad60c6D427191D66B6D168ddeF82A66F573B0] (https://scan.v4.testnet.pulsechain.com/address/0x3e0Ad60c6D427191D66B6D168ddeF82A66F573B0) use function 6 to get usd faucets


[MAKI - 0xcF678682b56a65CcdeFe70Cd5202Ddb40Ae25658] (https://scan.v4.testnet.pulsechain.com/address/0xcF678682b56a65CcdeFe70Cd5202Ddb40Ae25658)


[SOYBAR - 0x9bBEfE9Cb3307284f78F505A14059E99aD9388C6] (https://scan.v4.testnet.pulsechain.com/address/0x9bBEfE9Cb3307284f78F505A14059E99aD9388C6)


[MASTERCHEF - 0xcCcfC0a7cf56fEC62F971BE98Db29EB0641FdDCE] (https://scan.v4.testnet.pulsechain.com/address/0xcCcfC0a7cf56fEC62F971BE98Db29EB0641FdDCE)


[SOUSCHEF - 0xcD418B48457B94CE2b57d86562D6EEe842d523DE] (Https://scan.v4.testnet.pulsechain.com/address/0xcD418B48457B94CE2b57d86562D6EEe842d523DE)


[FACTORY - 0x40776e5b51767362285DCD7b011Dd8D66d4ca58f] (https://scan.v4.testnet.pulsechain.com/address/0x40776e5b51767362285DCD7b011Dd8D66d4ca58f)


[ROUTER - 0xFC510acFF0D2C0E735cE435b68744FADbf2f252E] (https://scan.v4.testnet.pulsechain.com/address/0xFC510acFF0D2C0E735cE435b68744FADbf2f252E)


[MULTICALL - 0x991Ad71aE4f38607812Ccb327042e02e0e838D36] (https://scan.v4.testnet.pulsechain.com/address/0x991Ad71aE4f38607812Ccb327042e02e0e838D36)


[LIMITORDER - 0x0d2C644567c78B285F055aA6B308b0eb1B40df9b] (https://scan.v4.testnet.pulsechain.com/address/0x0d2C644567c78B285F055aA6B308b0eb1B40df9b)


#### Farms
...pid1: MAKI-PLS   -  0x755a93Cc340a854Bb296C015267fc86159170C9E
...pid2: MAKI-USDT  -  0x3fd2DC6C684d5F5Ff2C1185504283b4fd2D729b9
...pid3: USDT-PLS   -  0x28ce0a51391c1F992946fBf578955ED5dc4d3c11





## Maki PulseChain Prototype
https://www.figma.com/file/qcyWhtRb9n1RDLuYRHo2r6/MakiSwap-v3?type=design&node-id=6-455&t=TQVkWmr7dPBXgFGP-0



## Technical Instructions

### Application Build Steps
1. Create environment variables file (see the .env.example file);

2. Build packages:
``` yarn run build:packages ```
3. Build main application:
``` yarn run build ```