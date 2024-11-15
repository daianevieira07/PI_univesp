
export const selectName = (data, name) =>
  (data.filter(search => search.name.toUpperCase().includes(name.toUpperCase())))

export const selectFilter = (data, filterType) =>
  (data.filter(search => search.type.includes(filterType)))

export const calc = (data, filterType) => {
  const type = data.filter(search => search.type.includes(filterType))
  return Math.round(((type.length * 100) / data.length) * 100) / 100
}

export const selectWeak = (data, weakFilter) =>
  (data.filter(search => search.weaknesses.includes(weakFilter)))

const orderAZ = (a, b) => (a["name"]).localeCompare(b["name"])
const orderZA = (a, b) => (a["name"]).localeCompare(b["name"])
const orderByHeight = (a, b) => Number(a["height"].split(" ")[0]) - Number(b["height"].split(" ")[0])

const orderSpawnChance = (a, b) => Number(a["spawn_chance"]) - Number(b["spawn_chance"])
export const orderPokes = (data, order) => {
  switch (order) {
    case "size":
      return data.sort((a, b) => orderByHeight(a, b))
    case "size-reverse":
      return data.sort((a, b) => orderByHeight(a, b)).reverse();
    case "order-spawn":
      return data.sort((a, b) => orderSpawnChance(a, b)).reverse();
    case "order-az":
      return data.sort((a, b) => orderAZ(a, b))
    case "order-za":
      return data.sort((a, b) => orderZA(a, b)).reverse();
  }
}
