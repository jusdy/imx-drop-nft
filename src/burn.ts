import { Wallet } from '@ethersproject/wallet';
import { ImLogger, WinstonLogger } from '@imtbl/imlogging';
import {
  ERC721TokenType,
  ImmutableMethodParams,
  ImmutableXClient,
} from '@imtbl/imx-sdk';
import { parse } from 'ts-command-line-args';

import env from './config/client';
import { loggerConfig } from './config/logging';
import { getProvider } from './libs/utils';
import { BigNumber } from '@ethersproject/bignumber';

interface BurnScriptArgs {
  asset: string;
  wallet: string;
  nftId: string;
}

const provider = getProvider(env.ethNetwork, env.alchemyApiKey);
const log: ImLogger = new WinstonLogger(loggerConfig);
const component = 'imx-burn-script';

(async (): Promise<void> => {
  const { wallet, nftId, asset } = parse<BurnScriptArgs>({
    asset: {
      type: String,
      alias: 'a',
      description: 'Asset Type to mint',
    },
    wallet: {
      type: String,
      alias: 'w',
      description: 'Wallet to receive minted NFTs',
    },
    nftId: {
      type: String,
      alias: 'i',
      description: 'NFT Id to burn',
    },
  });

  let tokenAddress = '';
  if (asset === 'car') {
    tokenAddress = env.tokenCarAddress;
  } else if (asset === 'driver') {
    tokenAddress = env.tokenDriverAddress;
  } else {
    tokenAddress = env.tokenFuelAddress;
  }

  const burner = await ImmutableXClient.build({
    ...env.client,
    signer: new Wallet(env.privateKey1).connect(provider),
  });

  let accounts = {
    accounts: [],
  };

  try {
    // @ts-ignore
    accounts = await burner.getUser({
      user: burner.address,
    });
  } catch (e) {
    log.info(component, 'Burner not registered, continuing...');
  }

  console.log('accounts', accounts);

  log.info(component, `OFF-CHAIN BURN NFT ID - ${nftId}`);

  const result = await burner.transfer({
    sender: wallet,
    token: {
      type: ERC721TokenType.ERC721,
      data: {
        tokenId: nftId,
        tokenAddress: tokenAddress,
      },
    },
    receiver: '0x0000000000000000000000000000000000000000',
    quantity: BigNumber.from('1'),
  });
  console.log(result);
})().catch(e => {
  log.error(component, e);
  process.exit(1);
});
