"use client";
import React, { useEffect, useState, useCallback } from "react";

interface PriceInfo {
  price: number | null;
  currency: string;
  lastUpdated: string;
}

export const BitcoinWidget: React.FC = () => {
  const [{ price, currency, lastUpdated }, setInfo] = useState<PriceInfo>({
    price: null,
    currency: "USD",
    lastUpdated: "",
  });
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/USD.json",
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setInfo({
        price: data.bpi.USD.rate_float,
        currency: data.bpi.USD.code,
        lastUpdated: new Date(data.time.updatedISO).toLocaleString(),
      });
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    const id = setInterval(fetchPrice, 60000);
    return () => clearInterval(id);
  }, [fetchPrice]);

  if (error) {
    return <p>Error fetching price: {error}</p>;
  }

  if (price === null) {
    return <p>Loading...</p>;
  }

  const formattedPrice = price.toLocaleString(undefined, {
    style: "currency",
    currency,
  });

  return (
    <div>
      <p>Price: {formattedPrice}</p>
      <p>Last update: {lastUpdated}</p>
    </div>
  );
};

export default BitcoinWidget;
