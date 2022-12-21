import { MoralisNextApi } from '@moralisweb3/next';

export default MoralisNextApi({
    apiKey: process.env.MORALIS_API_KEY || '',
    authentication: {
        domain: process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:3000',
        uri: process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:3000',
        timeout: 120,
    },
});
