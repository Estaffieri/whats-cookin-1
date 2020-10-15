const ingredientsData = require('../data/ingredients')

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id,
    this.image = image,
    this.ingredients = ingredients,
    this.instructions = instructions,
    this.name = name,
    this.tags = tags
  }
  getInstructions() {
    let steps = this.instructions.reduce((setOfDirections, instruction) => {
      setOfDirections.push({
        [instruction.number]: instruction.instruction
      })
      return setOfDirections;
    }, []);
    return steps;
  }
  getCostOfIngredients(list) {
    let cost = [];
    this.ingredients.forEach(ingredient => {
      list.forEach(item => {
        if (ingredient.id === item.id) {
          cost.push(item.estimatedCostInCents)
        }
      })
    });
    return this.addPrices(cost);
  }
  addPrices(prices) {
    let totalCost = prices.reduce((sum, price) => {
      return sum + price;
    }, 0);
    let totalPrice = totalCost * .01;
    return totalPrice;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
