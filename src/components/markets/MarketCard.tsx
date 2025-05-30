
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface MarketCardProps {
  id: string;
  assetName: string;
  strikePrice: number;
  expiryTimestamp: string;
  yesPool: number;
  noPool: number;
  status: string;
  description?: string;
  onChainId?: string;
}

export const MarketCard = ({
  id,
  assetName,
  strikePrice,
  expiryTimestamp,
  yesPool,
  noPool,
  status,
  description,
  onChainId
}: MarketCardProps) => {
  const totalPool = yesPool + noPool;
  const yesPercentage = totalPool > 0 ? (yesPool / totalPool) * 100 : 50;
  const noPercentage = totalPool > 0 ? (noPool / totalPool) * 100 : 50;
  const expiryDate = new Date(expiryTimestamp);
  const isExpired = expiryDate <= new Date();
  
  const timeToExpiry = formatDistance(expiryDate, new Date(), { addSuffix: true });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>{assetName} {`>`} ${strikePrice.toFixed(2)}</span>
          <div className="flex items-center space-x-2">
            {onChainId && (
              <Badge className="bg-purple-500 mr-1">On-Chain</Badge>
            )}
            <span className={`text-sm px-2 py-1 rounded ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
              {status}
            </span>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-200">Expires {timeToExpiry}</p>
        {onChainId && (
          <p className="text-xs text-gray-200 mt-1">On-Chain ID: {onChainId}</p>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Yes ({yesPercentage.toFixed(1)}%)</span>
            <span>No ({noPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ 
                width: `${yesPercentage}%`, 
                float: 'left'
              }}
            ></div>
            <div 
              className="h-full bg-red-500" 
              style={{ width: `${noPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/markets/${id}`} className="w-full">
          <Button 
            variant="outline" 
            className={`w-full ${onChainId ? 'border-purple-500 text-purple-500 hover:bg-purple-50' : 'border-orange-500 text-orange-500 hover:bg-orange-50'}`}
          >
            {isExpired ? 'View Results' : 'Trade Now'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
