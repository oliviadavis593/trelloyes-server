//lists variable will be needed by both card & list
//We've utilized layering so that these arrays can be required into both routers


//Creating arrays to store any objects needed
//Adding 1 object for testing purposes 
const cards = [{
    id: 1,
    title: 'Task One',
    content: 'This is card one'
  }]
  
  const lists = [{
    id: 1,
    header: 'List One',
    cardIds: [1]
  }]
  
module.exports = { cards, lists }