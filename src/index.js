import './styles/index.css';

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10


// const card = new URL('', import.meta.url);
// const content = new URL('', import.meta.url);
// const footer = new URL('', import.meta.url);
// const header = new URL('', import.meta.url);
// const page = new URL('', import.meta.url);
// const places = new URL('', import.meta.url);
// const popup = new URL('', import.meta.url);
// const profile = new URL('', import.meta.url);



// const Blocks = [
//   // меняем исходные пути на переменные
//   { name: 'card', link: card },
//   { name: 'content', link: content },
//   { name: 'footer', link: footer },
//   { name: 'header', link: header },
//   { name: 'page', link: page },
//   { name: 'places', link: places },
//   { name: 'popup', link: popup },
//   { name: 'profile', link: profile }
// ]; 

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const jordanImage = new URL('', import.meta.url);
const jamesImage = new URL('', import.meta.url);
const bryantImage = new URL('', import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', link: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage }
];