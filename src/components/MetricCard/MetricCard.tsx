import { Card } from '@nextui-org/react';
import React, { ReactNode } from 'react'

type Props = {
  blockchainName: string;
  value: ReactNode;
  color: string;
}

const MetricCard = ({blockchainName, value, color}: Props) => {
  return (
    <Card css={{p: 16}}>{blockchainName}: {value?.toLocaleString(undefined, {maximumFractionDigits: 2})}</Card>
  )
}

export default MetricCard