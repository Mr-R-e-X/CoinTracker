let tbody = document.querySelector("tbody");
let search = document.querySelector("#search");
let SortByMktCapBtn = document.querySelector("#mktCapSort");
let SortByPercentageBtn = document.querySelector("#percentageSort");
let coins;
let isSortedByMarketCap = false;
let isSortedByPercentage = false;

// fetching data

async function fetchCoinData() {
  let data = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  let coinDtls = await data.json();
  return coinDtls;
}

async function main() {
  coins = await fetchCoinData();
  LoadCoinDetails(coins);
}

// Loading Data
async function LoadCoinDetails(coins) {
  tbody.innerHTML = "";
  coins.map((coin) => {
    tbody.innerHTML += `
    <tr class="bg-gray-900">
    <td
      class="px-2 py-2 border border-gray-400 max-w-max"
    >
    <div class="flex flex-row justify-start items-center">
      <div class="mr-1">
        <img src="${coin.image}" class="rounded-full border-[1px] border-black w-8 h-8 object-center object-fit-cover " />
      </div>
      <div>
        <p>${coin.name}</p>
      </div>
    </div>
    </td>
    <td
      class="px-2 py-2 border border-gray-400 max-w-max"
    >
      $${coin.current_price}
    </td>
    <td
      class="px-2 py-2 border border-gray-400 max-w-max"
    >
      ${coin.total_volume}
    </td>
    <td
      class="px-2 py-2 border border-gray-400 max-w-max"
    >
      ${coin.ath_change_percentage}%
    </td>
    <td
      class="px-2 py-2 border border-gray-400 max-w-max"
    >
      ${coin.market_cap}
    </td>
  </tr>
    `;
  });
}

// Search functionality

function searchByNameOrSymbol() {
  search.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== "") {
      let filterCoin = coins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
        );
      });
      LoadCoinDetails(filterCoin);
    } else {
      LoadCoinDetails(coins);
    }
  });
}

//Sort By Market Cap

function SortByMakrketCap() {
  SortByMktCapBtn.addEventListener("click", () => {
    if (!isSortedByMarketCap) {
      coins.sort((a, b) => a.market_cap - b.market_cap);
      LoadCoinDetails(coins);
      isSortedByMarketCap = !isSortedByMarketCap;
    } else {
      coins.reverse();
      LoadCoinDetails(coins);
      isSortedByMarketCap = !isSortedByMarketCap;
    }
  });
}

//Sort By Percentage

function SortByPercentage() {
  SortByPercentageBtn.addEventListener("click", () => {
    if (!isSortedByPercentage) {
      coins.sort((a, b) => b.ath_change_percentage - a.ath_change_percentage);
      LoadCoinDetails(coins);
      isSortedByPercentage = !isSortedByPercentage;
    } else {
      coins.reverse();
      LoadCoinDetails(coins);
      isSortedByPercentage = !isSortedByPercentage;
    }
  });
}

// calling all the functions

function handleFunctionsProcess() {
  main();
  searchByNameOrSymbol();
  SortByMakrketCap();
  SortByPercentage();
}

// making call when dom is loaded
document.addEventListener("DOMContentLoaded", handleFunctionsProcess);
