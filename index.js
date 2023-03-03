let fruits = [
  {
    id: 1,
    title: "Яблоки",
    price: 20,
    img: "https://iranfreshfruit.net/wp-content/uploads/2020/01/yellow-apple.jpg",
  },
  {
    id: 2,
    title: "Апельсины",
    price: 30,
    img: "https://iranfreshfruit.net/wp-content/uploads/2020/01/ORANGE.jpg",
  },
  {
    id: 3,
    title: "Клубника",
    price: 40,
    img: "https://iranfreshfruit.net/wp-content/uploads/2020/01/strawberries.jpg",
  },
];


const toHTML = (fruit) => `
  <div class='col'>
    <div class="card">
      <img class="card-img-top" style="height: 400px;" src="${fruit.img}" alt="${fruit.title}">
      <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn='price' data-id="${fruit.id}">Узнать цену</a>
      <a href="#" class="btn btn-primary" data-btn='remove'>Удалить</a>
      </div>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()


const priceModal = $.modal({
  title: "Цена на товар",
  closable: true,
  width: "400px",
  footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
      priceModal.close()
    }},
  ]
});



document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: "Вы уверены?",
      content: `<p>Вы удаляете фрукт: <strong>${this.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !==id)
      render()
    }).catch(() => {
      console.log('Cancel')
    })
  }
})