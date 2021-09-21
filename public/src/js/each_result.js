"use strict";

const url = 'http://localhost:3000/home/color';

fetch(url)
  .then(res => {
    if (res.ok) {
      res.json()
      .then(data => {
        const color = data.color;
        const map = document.getElementById('map');
        const content = document.querySelector('.content');

        map.style.border = `3px solid ${color}`;
        content.style.backgroundColor = color;
      })
    }
  })