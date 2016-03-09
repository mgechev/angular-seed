export interface BackendStore
{
  backendUrlSelected:boolean;
  backendUrls:Array<string>;
  backendUrl:string;
}

export const initialBackendStore:BackendStore =
{
  backendUrlSelected: false,
  backendUrls: [
    'http://localhost:8080/serviceplanet',
    'http://smdb.fntgrp.com:8002/serviceplanet'
  ],
  backendUrl: 'http://smdb.fntgrp.com:8002/serviceplanet'
};
