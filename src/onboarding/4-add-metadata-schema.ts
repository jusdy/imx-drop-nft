import { Wallet } from '@ethersproject/wallet';
import { ImLogger, WinstonLogger } from '@imtbl/imlogging';
import {
  AddMetadataSchemaToCollectionParams,
  ImmutableXClient,
  MetadataTypes,
} from '@imtbl/imx-sdk';
import { getProvider, requireEnvironmentVariable } from 'libs/utils';
import { parse } from 'ts-command-line-args';

import env from '../config/client';
import { loggerConfig } from '../config/logging';

interface AddMetadataScriptArgs {
  asset: string;
}

const provider = getProvider(env.ethNetwork, env.alchemyApiKey);
const log: ImLogger = new WinstonLogger(loggerConfig);

const component = '[IMX-ADD-COLLECTION-METADATA-SCHEMA]';

(async (): Promise<void> => {
  const { asset } = parse<AddMetadataScriptArgs>({
    asset: {
      type: String,
      alias: 'a',
      description: 'Asset Type to mint',
    },
  });

  /**
   * Edit your values here
   */
  const carParams: AddMetadataSchemaToCollectionParams = {
    metadata: [
      {
        name: 'name',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'description',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'image_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'Speed',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Acceleration',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Handling',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Rarity',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'animation_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'animation_url_mime_type',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'model',
        type: MetadataTypes.Text,
        filterable: false,
      },
    ],
  };

  const driverParams: AddMetadataSchemaToCollectionParams = {
    metadata: [
      {
        name: 'name',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'description',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'image_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'Reflexes',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Experience',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Strength',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'Rarity',
        type: MetadataTypes.Continuous,
        filterable: true,
      },
      {
        name: 'animation_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'animation_url_mime_type',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'model',
        type: MetadataTypes.Text,
        filterable: false,
      },
    ],
  };

  const fuelParams: AddMetadataSchemaToCollectionParams = {
    metadata: [
      {
        name: 'name',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'description',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'image_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'animation_url',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'animation_url_mime_type',
        type: MetadataTypes.Text,
        filterable: false,
      },
      {
        name: 'model',
        type: MetadataTypes.Text,
        filterable: false,
      },
    ],
  };

  const privateKey = requireEnvironmentVariable('OWNER_ACCOUNT_PRIVATE_KEY');

  let collectionContractAddress = '';
  let params: AddMetadataSchemaToCollectionParams;

  if (asset === 'car') {
    collectionContractAddress = requireEnvironmentVariable(
      'CAR_COLLECTION_CONTRACT_ADDRESS',
    );
    params = carParams;
  } else if (asset === 'driver') {
    collectionContractAddress = requireEnvironmentVariable(
      'DRIVER_COLLECTION_CONTRACT_ADDRESS',
    );
    params = driverParams;
  } else {
    collectionContractAddress = requireEnvironmentVariable(
      'FUEL_COLLECTION_CONTRACT_ADDRESS',
    );
    params = fuelParams;
  }

  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const user = await ImmutableXClient.build({
    ...env.client,
    signer,
    enableDebug: true,
  });

  log.info(
    component,
    'Adding metadata schema to collection',
    collectionContractAddress,
  );

  const collection = await user.addMetadataSchemaToCollection(
    collectionContractAddress,
    params,
  );

  log.info(
    component,
    'Added metadata schema to collection',
    collectionContractAddress,
  );
  console.log(JSON.stringify(collection, null, 2));
})().catch(e => {
  log.error(component, e);
  process.exit(1);
});
