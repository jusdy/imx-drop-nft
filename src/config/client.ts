import { getEnv } from '../libs/utils';

export default {
  alchemyApiKey: getEnv('ALCHEMY_API_KEY'),
  ethNetwork: getEnv('ETH_NETWORK'),
  client: {
    publicApiUrl: getEnv('PUBLIC_API_URL'),
    starkContractAddress: getEnv('STARK_CONTRACT_ADDRESS'),
    registrationContractAddress: getEnv('REGISTRATION_ADDRESS'),
    gasLimit: getEnv('GAS_LIMIT'),
    gasPrice: getEnv('GAS_PRICE'),
  },
  // Bulk minting
  privateKey1: getEnv('PRIVATE_KEY1'),

  tokenCarId: getEnv('TOKEN_CAR_ID'),
  tokenCarAddress: getEnv('TOKEN_CAR_ADDRESS'),
  bulkCarMintMax: getEnv('BULK_CAR_MINT_MAX'),

  tokenDriverId: getEnv('TOKEN_DRIVER_ID'),
  tokenDriverAddress: getEnv('TOKEN_DRIVER_ADDRESS'),
  bulkDriverMintMax: getEnv('BULK_DRIVER_MINT_MAX'),

  tokenFuelId: getEnv('TOKEN_FUEL_ID'),
  tokenFuelAddress: getEnv('TOKEN_FUEL_ADDRESS'),
  bulkFuelMintMax: getEnv('BULK_FUEL_MINT_MAX'),
  // Onboarding
  ownerAccountPrivateKey: getEnv('OWNER_ACCOUNT_PRIVATE_KEY'),
  carCollectionContractAddress: getEnv('CAR_COLLECTION_CONTRACT_ADDRESS'),
  collectionProjectId: getEnv('COLLECTION_PROJECT_ID'),
  carMetadataApiUrl: getEnv('CAR_METADATA_API_URL'),
  driverMetadataApiUrl: getEnv('DRIVER_METADATA_API_URL'),
  fuelMetadataApiUrl: getEnv('FUEL_METADATA_API_URL'),
  carIconUrl: getEnv('CAR_ICON_URL'),
  driverIconUrl: getEnv('DRIVER_ICON_URL'),
  fuelIconUrl: getEnv('FUEL_ICON_URL'),
  carCollectionImageUrl: getEnv('CAR_COLLECTION_IMAGE_URL'),
  driverCollectionImageUrl: getEnv('DRIVER_COLLECTION_IMAGE_URL'),
  fuelCollectionImageUrl: getEnv('FUEL_COLLECTION_IMAGE_URL'),
};
