import { watch, computed } from "vue";

export default function useTableUpdate(table, products) {
  
  const tableProducts = computed(() => table.value.map(row => row.productName))
  const tableProductItems = computed(() => table.value.map(row => row.itemName))
  const tablePrices = computed(() => table.value.map(row => row.price))
  const tableQts = computed(() => table.value.map(row => row.qty))
  const tableWeights = computed(() => table.value.map(row => row.weight))

  const prodMap = computed(() => Object.fromEntries(products.value.map(product => [ product.name, product ])))

  watch(tableProducts, () => {
    table.value.forEach((row) => {
      if (row.productID !== prodMap.value[row.productName].id) {
        row.productID = prodMap.value[row.productName].id
        row.itemName = prodMap.value[row.productName].items[0].name
        row.itemID = prodMap.value[row.productName].items[0].id
        row.price = prodMap.value[row.productName].items[0].price
        row.weight = prodMap.value[row.productName].items[0].weight
      }
    })
  }, {deep: true} )

  watch(tableProductItems, () => {
    table.value.forEach((row) => {
      const items = prodMap.value[row.productName].items
      const itemMap = Object.fromEntries(items.map(item => [ item.name, item ]))
      if (row.itemID !== itemMap[row.itemName].id) {
        row.itemID = itemMap[row.itemName].id
        row.price = itemMap[row.itemName].price
        row.weight = itemMap[row.itemName].weight
      }
    })
  }, {deep: true} )

  watch([tablePrices, tableQts, tableWeights], () => {
    table.value.forEach((row) => {
        row.totalPrice = row.price * row.qty
        row.totalWeight = row.weight * row.qty
    })
  }, {deep: true} )

  watch(() => table.value.length, () => {
    table.value.forEach((row, i) => (row.index = i + 1));
  })
}