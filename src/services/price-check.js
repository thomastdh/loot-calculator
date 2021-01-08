import axios from "axios";

export const STATUSES = {
  PRICE_STALE: 'PRICE_STALE',
  NO_PRICE: 'NO_PRICE',
  PRICE_RECENT: 'PRICE_RECENT',
}

export const checkPrice = async (id) => {
  try {
    let result = await axios
      .get(`https://api.eve-echoes-market.com/market-stats/${id}`, {
        headers: {
        }
      })
    const { cost, status, hoursAgo } = translatePrice(result.data)
    return {
      price: cost,
      status,
      hoursAgo,
      hasMarketPrice: status !== STATUSES.NO_PRICE,
    }
  } catch (error) {
    return {
      price: 0,
      hoursAgo: -1,
      status: STATUSES.NO_PRICE,
      hasMarketPrice: false,
    }
  }
}

const translatePrice = (data) => {
  let d = new Date();
  let n = new Date();
  let hoursAgo = 1000000;

  let cost = 0;
  if (typeof data[data.length - 1].sell != 'undefined') {
    cost = data[data.length - 1].sell;
  } else if (typeof data[data.length - 1].lowest_sell != 'undefined') {
    cost = data[data.length - 1].lowest_sell;
  }

  if (typeof data[data.length - 1].time != 'undefined') {
    d.setTime(data[data.length - 1].time * 1000);
    let timeDiff = n.getTime() - d.getTime();
    hoursAgo = timeDiff / 3600000;
  }

  if (!cost) {
    cost = 0;
  }

  let status = STATUSES.NO_PRICE
  if (cost > 0) {
    status = hoursAgo >= 36 ? STATUSES.PRICE_STALE : STATUSES.PRICE_RECENT
  }

  return {
    cost,
    status,
    hoursAgo,
  }
}
