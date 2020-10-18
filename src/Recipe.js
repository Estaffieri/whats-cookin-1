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
        stepNumber: instruction.number,
        step: instruction.instruction
      })
      return setOfDirections;
    }, []);
    return steps;
  }
  getIngredientList(needs) {
    let ingredientList = [];
    needs.forEach(ingredient => {
       ingredientsData.forEach(item => {
        if(ingredient.id === item.id) {
          ingredientList.push(`${item.name} (${ingredient.quantity.amount} ${ingredient.quantity.unit})`)
        }
      });
    });
    return ingredientList;
  }
  getCostOfIngredients(ingredients, data) {
    let cost = [];
    ingredients.forEach(ingredient => {
      data.forEach(item => {
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
    return totalPrice.toFixed(2);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
