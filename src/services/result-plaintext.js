function readableNumber(cost) {
  if (Number.isNaN(cost) || cost === 0) {
    return '0'
  }
  var suffix = ['', 'k', 'm', 'b', 't'];
  var evaluated = Math.floor(Math.log(Math.abs(cost)) / Math.log(1000));
  return cost / Math.pow(1000, evaluated).toFixed(2).toString() + "" + suffix[evaluated];
}

function add_commas(x) {
  /**
   * Add commas to a given string
   *
   * @param x number representing the value we want to append commas to
   * @return string. e.g. given number 1000000 this will return 1,000,000 as a string
   */
  if (x === undefined || x === null) {
    // Found empty x
    return ''
  }
  var num = x;
  if (typeof x == "number") {
    num = String(x);
  }
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const format = (distribution, total_value) => {
  /**
   * Styled rendering of the loot distribution
   */
  let results = [];
  const DISCORD_LIMIT = 2000

  let runningOutput = ''

  for (let member in distribution) {
    let output = ''
    output += '**' + distribution[member].name + '** - _' + add_commas(distribution[member].loot_value) + ' ISK_' + "\n";
    for (let hash in distribution[member].loot) {
      let module_cost = readableNumber(distribution[member].loot[hash].price);
      output += '> ' + distribution[member].loot[hash].qty + 'x ' + distribution[member].loot[hash].text + ' @ ' + module_cost + ' ISK' + "\n";
    }
    if ((runningOutput.length + output.length) > DISCORD_LIMIT) {
      results.push(runningOutput)
      runningOutput = output
    } else {
      output += "\n";
      runningOutput += output
    }
  }

  runningOutput += ':moneybag: **' + add_commas(total_value) + ' ISK**';
  results.push(runningOutput)
  return results;
}
