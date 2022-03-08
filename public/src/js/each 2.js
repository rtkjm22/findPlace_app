"use strict";

const str_color_items = document.querySelectorAll('.str_color');
const submit = document.getElementById('submit');

const url = 'http://localhost:3000/home/color';
const data = {
  message: 'hello'
}

fetch(url) 
  .then(resp => {
    if(resp.ok) {
      resp.json()
        .then(data => {
          const color = data.color;
          return color;
        })
        .then(color => {
          change_bg(color);
          const str_color_flag = blackOrWhite(color);
          for (let i=0;i<str_color_items.length;i++) {
            str_color_items[i].style.color = str_color_flag;
          }
          submit.addEventListener('mouseover', () => {
            submit.style.backgroundColor = color;
            submit.style.color = str_color_flag;
          });
          submit.addEventListener('mouseleave', () => {
            submit.style.backgroundColor = "white";
            submit.style.color = 'black';
          });
        })
    } else {
      console.log('エラーです。');
    }
  });

const change_bg = (color) => {
  const items = document.querySelectorAll('.my_color');
  for (let i=0;i<items.length;i++) {
    items[i].style.backgroundColor = color;
    items[i].style.border = `2px solid ${color}`
  }
}

const blackOrWhite = ( hexcolor ) => {
	const r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
	const g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
	const b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

	return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "#e2e2e2" : "#212121" ;
}
