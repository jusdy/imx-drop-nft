import { Wallet } from '@ethersproject/wallet';
import { ImLogger, WinstonLogger } from '@imtbl/imlogging';
import { CreateCollectionParams, ImmutableXClient } from '@imtbl/imx-sdk';
import { getProvider, requireEnvironmentVariable } from 'libs/utils';
import { parse } from 'ts-command-line-args';

import env from '../config/client';
import { loggerConfig } from '../config/logging';

interface CreateCollectionScriptArgs {
  asset: string;
}

const provider = getProvider(env.ethNetwork, env.alchemyApiKey);
const log: ImLogger = new WinstonLogger(loggerConfig);

const component = '[IMX-CREATE-COLLECTION]';

(async (): Promise<void> => {
  const privateKey = requireEnvironmentVariable('OWNER_ACCOUNT_PRIVATE_KEY');

  const { asset } = parse<CreateCollectionScriptArgs>({
    asset: {
      type: String,
      alias: 'a',
      description: 'Asset Type to mint',
    },
  });

  let collectionContractAddress = '';
  let collectionName = '';
  let iconUrl = '';
  let metadataApiUrl = '';
  let collectionImageUrl = '';

  if (asset === 'car') {
    collectionContractAddress = requireEnvironmentVariable(
      'CAR_COLLECTION_CONTRACT_ADDRESS',
    );
    collectionName = 'Crooze Test Car';
    iconUrl = env.carIconUrl;
    metadataApiUrl = env.carMetadataApiUrl;
    collectionImageUrl = env.carCollectionImageUrl;
  } else if (asset === 'driver') {
    collectionContractAddress = requireEnvironmentVariable(
      'DRIVER_COLLECTION_CONTRACT_ADDRESS',
    );
    collectionName = 'Crooze Test Driver';
    iconUrl = env.driverIconUrl;
    metadataApiUrl = env.driverMetadataApiUrl;
    collectionImageUrl = env.driverCollectionImageUrl;
  } else {
    collectionContractAddress = requireEnvironmentVariable(
      'FUEL_COLLECTION_CONTRACT_ADDRESS',
    );
    collectionName = 'Crooze Test Fuel';
    iconUrl = env.fuelIconUrl;
    metadataApiUrl = env.fuelMetadataApiUrl;
    collectionImageUrl = env.fuelCollectionImageUrl;
  }

  const projectId = requireEnvironmentVariable('COLLECTION_PROJECT_ID');

  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);
  const ownerPublicKey = wallet.publicKey;

  const user = await ImmutableXClient.build({
    ...env.client,
    signer,
    enableDebug: true,
  });

  log.info(component, 'Creating collection...', collectionContractAddress);

  /**
   * Edit your values here
   */
  const params: CreateCollectionParams = {
    name: collectionName,
    // description: 'ENTER_COLLECTION_DESCRIPTION (OPTIONAL)',
    contract_address: collectionContractAddress,
    owner_public_key: ownerPublicKey,
    icon_url: iconUrl,
    metadata_api_url: metadataApiUrl,
    collection_image_url: collectionImageUrl,
    project_id: parseInt(projectId, 10),
  };

  let collection;
  try {
    collection = await user.createCollection(params);
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }

  log.info(component, 'Created collection');
  console.log(JSON.stringify(collection, null, 2));
})().catch(e => {
  log.error(component, e);
  process.exit(1);
});
