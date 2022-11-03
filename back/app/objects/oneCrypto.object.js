/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
class OneCryptoObject {
  constructor(data) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.description = data.description.en;
    this.links = data.links.homepage[0];
    this.explorer = data.links.blockchain_site[0];
    this.repos_url = data.links.repos_url.github;
    this.image = this.getImages(data.image);
    this.market_data = {
      market_cap: this.getFilterCurrency(data.market_data.market_cap),
      current_price: this.getFilterCurrency(data.market_data.current_price),
      total_volume: this.getFilterCurrency(data.market_data.total_volume),
      market_cap_rank: data.market_data.market_cap_rank,
      market_cap_change_percentage_24h: data.market_data.market_cap_change_percentage_24h,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      circulating_supply: data.market_data.circulating_supply,
      fully_diluted_valuation: this.getFilterCurrency(data.market_data.fully_diluted_valuation),
    };
    this.last_updated = data.last_updated;
  }

  getImages(images) {
    const pictures = {};
    Object.keys(images).forEach((pic) => {
      pictures[pic] = images[pic];
    });
    return pictures;
  }

  getFilterCurrency(obj) {
    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
      filteredObj[key] = obj[key];
    });
    return filteredObj;
  }
}

module.exports = OneCryptoObject;
