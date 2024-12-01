import axios from "axios";
import crypto from "crypto";

type BinanceAccountData = {
  balances: any[];
};

const computeHmacSha256 = (key: string, message: string) => {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);
  return hmac.digest("hex");
}
const API_KEY = "<API_KEY>";
const API_SECRET = "<API_SECRET>";

const params = `timestamp=${new Date().getTime()}`;

const response = await axios.get<BinanceAccountData>(
  `https://api.binance.com/api/v3/account?${params}&signature=${computeHmacSha256(API_SECRET, params)}`,
  {
    headers: {
      "X-MBX-APIKEY": API_KEY
    }
  }
);
console.log("Current account balance:");
console.log(response.data.balances);
