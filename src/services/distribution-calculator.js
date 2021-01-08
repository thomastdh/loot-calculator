function random(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function give_to(member, item_id, module_name, cost, memberDistribution) {
  /**
   * Gives an item to a member and increments the quantity of this
   * item that member has and that members total loot value
   *
   * @param member object that must have attributes module_name and loot_value
   * @param module_name key into member which points to the number of this module member has
   * @param cost number representing the current estimated loot value of this module
   */
  let updated = false;

  for (let item in memberDistribution.loot) {
    if (memberDistribution.loot[item].name == module_name) {
      memberDistribution.loot[item].quantity++;
      updated = true;
    }
  }
  if (!updated) {
    let item = {
      id: item_id,
      text: module_name,
      qty: 1,
      price: cost
    };
    memberDistribution.loot.push(item);
  }
  memberDistribution.loot_value += cost;
  return memberDistribution
}

/**
 * Scans through all modules and evenly distributes the modules to all users based on
 * module isk value and renders it on the website.
 *
 * ALGORITHM:
 * First: Sort modules in order of value (e.g. most expensive first).
 * Second: Determine who are the next eligible member(s) to receive a module.
 *     Members are eligible to receive a module if they either have the least
 *     total loot_value, or they are tied with members who currently have the least
 *     total loot_value.
 * Third: Give one module to eligible member. If there are more than one eligible members,
 *     then randomly select an eligible member to hand module to. We then repeat step 2.
 */
export function calculate_distribution(members = [], modules = []) {
  let distribution = []

  // Step 1: sort modules
  modules.sort((module1, module2) => {return (module1.price > module2.price ? -1 : 1)});

  if (members.length <= 0 || modules.length <= 0) {
    return false;
  }

  for (const member of members) {
    // Initialize member loot value to 0
    let distro = {
      name: member.text,
      loot_value: 0,
      loot: []
    }
    distribution.push(distro);
  }

  // Iterate through modules
  for (let i = 0; i < modules.length; i++) {
    if (typeof modules[i] === 'undefined') {
      continue;
    }

    const { id: item_id, text: name, price: cost, qty: quantity } = modules[i];

    // Iterate through module quantity
    for (let k = 0; k < quantity; k++) {
      // Step 2: Find eligible members
      // Sort members in order of loot value
      distribution.sort((member1, member2) =>
        member1.loot_value > member2.loot_value ? 1 : -1
      );
      const min_loot_val = distribution[0].loot_value;

      // Find eligible members
      let eligible_users = [];
      for (let j = 0; j < distribution.length; j++) {
        const member = j;
        if (distribution[member].loot_value != min_loot_val) {
          continue;
        }
        eligible_users.push(j);
      }

      // Step 3: tie breaker
      let randomly_chosen_member = random(eligible_users);
      distribution[randomly_chosen_member] = give_to(randomly_chosen_member, item_id, name, cost, distribution[randomly_chosen_member]);
    }
  }

  // Combine quantities
  for (let index = 0; index < distribution.length; index++) {
    const element = distribution[index];
    let loot = element.loot
    let lootCombinedQty = {}
    for (const lootItem of loot) {
      if (!lootCombinedQty[lootItem.id]) {
        lootCombinedQty[lootItem.id] = lootItem
      } else {
        lootCombinedQty[lootItem.id].qty += lootItem.qty
      }
    }
    distribution[index].loot = Object.values(lootCombinedQty)
  }

  return {
    distribution
  }

}
