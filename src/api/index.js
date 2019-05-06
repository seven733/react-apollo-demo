import client from '@/client';

export const Query = (query, variables) => client.query({ query, variables }).then(res => res.data)