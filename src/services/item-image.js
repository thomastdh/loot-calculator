import MATCH_EXACT from "./image-match/exact";
import MATCH_ENDS_WITH from "./image-match/ends-with";

const FALLBACK = {
  src: require(`./../assets/items/1210002.png`),
  isBlueprint: false,
  isFallback: true,
  rigLevel: null,
}

class ItemImageProfile {

  constructor (id, name) {
    this.id = id
    this.name = name
  }

  isBlueprint () {
    return this.name.endsWith('Blueprint')
  }

  getRigLevel () {
    if (!this.isBlueprint()) {
      return null
    }
    let nameWithoutBlueprint = this.name
      .replace('Blueprint', '')
      .trim()
    if (nameWithoutBlueprint.endsWith('IV')) {
      return 4
    }
    if (nameWithoutBlueprint.endsWith('III')) {
      return 3
    }
    if (nameWithoutBlueprint.endsWith('II')) {
      return 2
    }
    if (nameWithoutBlueprint.endsWith('I')) {
      return 1
    }
    return null
  }

}

const imageBlueprintSrc = (id) => {
  // 1. Image starts with 1, item id starts with 6, exclude those
  // 2. The next 5 digits let us identify which image types
  // 3. the last digit let us identify which rig level
  let idToCheck = id.substr(1, 5)
  const identifier = [
    '17000',
    '17020',
    '17040',
    '17050',
    '17060',
    '17070',
    '17080',
    '17100',
    '17110',
    '17140',
    '17170',
    '17180',
    '17190',
  ]
  if (identifier.indexOf(idToCheck) === -1) {
    return null
  }
  let level = null
  switch (id.substr(id.length - 1)) {
    case '2':
      level = '0'
      break;
    case '4':
      level = '1'
      break;
    case '6':
      level = '2'
      break;
    case '8':
      level = '3'
      break;
    default:
      break;
  }

  return require(`./../assets/items/1${idToCheck}0000${level}.png`);
}

const getImageByPartialNameMatch = (name) => {
  name = name.trim()
  // Exact
  if (MATCH_EXACT[name]) {
    return MATCH_EXACT[name];
  }
  // Ends with
  for (const key in MATCH_ENDS_WITH) {
    if (name.endsWith(key)) {
      return MATCH_ENDS_WITH[key];
    }
  }
  return null
}

export const getImage = (id, name) => {

  const profile = new ItemImageProfile(id, name)
  let imageById = null;

  if (!imageById) {
    try {
      let filename = getImageByPartialNameMatch(name)
      if (filename) {
        imageById = require(`./../assets/items/${filename}`)
      }
    } catch (error) {
      console.log(error)
      imageById = null
    }
  }

  if (profile.isBlueprint()) {
    if (!imageById) {
      imageById = imageBlueprintSrc(id)
    }
    return {
      src: imageById ?? FALLBACK.src,
      isBlueprint: true,
      isFallback: imageById ? false : true,
      rigLevel: profile.getRigLevel(),
    }
  }

  if (!imageById) {
    try {
      imageById = require(`./../assets/items/${id}.png`)
    } catch (error) {
      imageById = null
    }
  }

  if (imageById) {
    return {
      src: imageById,
      isBlueprint: false,
      isFallback: false,
      rigLevel: null,
    }
  }
  return FALLBACK
}
