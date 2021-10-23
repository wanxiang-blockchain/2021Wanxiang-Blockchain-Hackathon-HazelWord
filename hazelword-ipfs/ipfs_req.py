import json
from asyncio import get_event_loop

import ipfshttpclient
from aiohttp import ClientSession


async def main():
    """Obtains Bitcoin price from a single API endpoint."""
    url = "http://127.0.0.1:8080"

    pql_bitcoin_price = {
        "name": "Simple HTTP GET request",
        "psql_version": "0.1",
        "sources": [
            {
                "name": "Bitcoin price CoinGecko",
                "pipeline": [
                    {
                        "step": "extract",
                        "method": "http.get",
                        "uri": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
                    },
                    {
                        "step": "traverse",
                        "method": "json",
                        "params": ["bitcoin", "usd"],
                    },
                ],
            }
        ],
    }

    ipfs_address = "/ip4/127.0.0.1/tcp/5001"
    client = ipfshttpclient.connect(ipfs_address)
    ipfs_hash = client.add_json(pql_bitcoin_price)

    print(f"IPFS address: {ipfs_address}, IPFS hash: {ipfs_hash}")

    # Construct JSON RPC request
    request = {
        "jsonrpc": "2.0",
        "method": "execute_ipfs",
        "params": {"ipfs_address": ipfs_address, "ipfs_hash": ipfs_hash},
        "id": 1,
    }

    async with ClientSession() as session:
        async with session.post(url + "/rpc", json=request) as resp:
            response = await resp.json()
            print(response)


if __name__ == "__main__":
    get_event_loop().run_until_complete(main())