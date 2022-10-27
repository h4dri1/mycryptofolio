const localString = (num) => num.toLocaleString('en-US', { maximumSignificantDigits: 4 });

export default function curFormatter(num, selectedCurrency) {
  const currency = (num, selectedCurrency) => {
    if (selectedCurrency === 'BTC') {
      return `₿${localString(num)}`;
    }
    if (selectedCurrency === 'ETH') {
      return `Ξ${localString(num)}`;
    }
    if (!selectedCurrency) {
      return num.toLocaleString();
    }
    return num.toLocaleString('en-US', { style: 'currency', currency: selectedCurrency, maximumSignificantDigits: 4 });
  };
  return currency(num, selectedCurrency);
}
