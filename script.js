addEventListener('DOMContentLoaded', checkItems)

var cookies = localStorage.getItem('cookies')
if (!!cookies === false) {
  cookies = 0
}
else {
  cookies = parseFloat(cookies)
}
var autoclick = 100
var interval
var costs = {
  cursor: 10, 
  grandma: 50, 
}
var addCounts = localStorage.getItem('adds')
if (!!addCounts === false) {
  addCounts = {
    cursor: 1, 
    grandma: 1, 
  }
}
else {
  addCounts = addCounts
}
var itemCounts = localStorage.getItem('items')
if (!!itemCounts === false) {
  itemCounts = {
    cursor: 0, 
    grandmas: 0, 
  }
}
else {
  itemCounts = itemCounts
}
var points = document.querySelector("[points]")
var img = document.querySelector('img')
var buttonText = document.querySelector('[reset] b')
points.innerText = 'Cookies Clicked: ' + cookies
console.log('Cookies Clicked: ' + cookies)
//  points.setAttribute('style', 'font-size: ' + cookies + 'px;')

function addCookie(addCount=1) {
  cookies+=addCount;
  checkItems()
  points.innerText = 'Cookies Clicked: ' + cookies
  localStorage.setItem('cookies', cookies)
//  console.log('Cookies Clicked: ' + cookies)
//    points.setAttribute('style', 'font-size: ' + cookies + 'px;')
}

function checkItems() {
  if (cookies >= costs['cursor']) {
    let button = document.querySelector('button#cursor')
    button.removeAttribute('disabled')
  }
  else if (cookies < costs['cursor']) {
    let button = document.querySelector('button#cursor')
    button.setAttribute('disabled', '')
  }
  localStorage.setItem('adds', addCounts)
  localStorage.setItem('items', itemCounts)
}

function buyItem(item) {
  let itemsElement = document.querySelector('section#items')
  if (cookies >= costs[item]) {
    cookies-=costs[item]
    points.innerText = 'Cookies Clicked: ' + cookies
    localStorage.setItem('cookie', cookies)
    addCounts[item]++//*=2
    itemCounts[item]['count']++
    let itemElement = itemsElement.querySelector(`span#${item}`)
    itemElement.innerHTML = `Cursors: ${itemCounts[item]['count']}`
  }
  if (item === 'cursor' && cookies+costs[item] >= costs[item]) {
    setTimeout(function() {setInterval(addCookie(addCounts[item]), 10000)}, 10000)
  }
  checkItems()
}

function reset() {
  cookies = 0;
//  points.innerText = ''
  points.innerText = `Cookies Clicked: ${cookies}`
  console.log('Reset!')
  buttonText.innerText = 'Reset'
  clearInterval(interval)
  let buttons = document.getElementsByClassName('clear')
  if (buttons.length !== 0) {
    buttons.forEach(button => {
      button.remove()
    })
  }
}
