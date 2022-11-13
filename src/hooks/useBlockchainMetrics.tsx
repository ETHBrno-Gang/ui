import { useQuery } from "@tanstack/react-query"
import { BlockchainId } from "../constants/blockchains"


const blockchainMetricsFetcher = async () => {
    const result = await fetch('https://api.rated.network/v0/eth/operators?window=all&idType=entity&size=100&from=1');
    return result.json();
}

const useBlockchainMetrics = () => {
    const ratedNetworkResult = useQuery(['rated-network-operators'], {
        queryFn: blockchainMetricsFetcher
    })

    return [ratedNetworkResult]
}

export { useBlockchainMetrics }