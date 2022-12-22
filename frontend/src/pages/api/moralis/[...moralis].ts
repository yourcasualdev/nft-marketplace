import { MoralisNextApi } from '@moralisweb3/next';
import { URL } from '../../../constants';

export default MoralisNextApi({
    apiKey: process.env.MORALIS_API_KEY || '',
    authentication: {
        domain: 'amazing.dapp',
        uri: URL,
        timeout: 120,
    },
});
