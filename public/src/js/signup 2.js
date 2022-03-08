"use strict";

// pickr
const pickr = Pickr.create({
    el: '#pickr',
    theme: 'classic',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        },
    },
});
// /pickr


// リアルタイムバリデーション

const red = "#fa4e4e";
const black = "#414141";

const username = document.getElementById('name');
const age = document.getElementById('age');
const mail = document.getElementById('mail');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const color = document.getElementById('color');
const secret = document.getElementById('secret');

// username
username.addEventListener('input', function() {
    let val = this.value;
    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        val.length !== 0 &&
        val.length <= 20
    ) {
        username.style.color = black;
    } else {
        username.style.color = red;
    }
});
// /username

// age
age.addEventListener('input', function() {
    let val = this.value;
    if (
        typeof Number(val) == 'number' &&
        val !== "null" &&
        val !== "undefined" && 
        val.length !== 0 &&
        0 < val &&
        val <= 120
    ) {
        age.style.color = black;
    } else {
        age.style.color = red;
    }
});
// /age

// mail
// メール形式を判定
const check_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
mail.addEventListener('input', function() {
    let val = this.value;
    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        val.match(check_mail) &&
        val.length !== 0 &&
        val.length <= 50 
    ) {
        mail.style.color = black;
    } else {
        mail.style.color = red;
    }
});
// /mail

// password
// 8文字以上半角英数字のみ(colorでも利用)
const check_str = /^([a-zA-Z0-9]{8,})$/; 
check_pass(pass, pass2);
check_pass(pass2, pass);
function check_pass(el, target) {
    el.addEventListener('input', function () {
        let val = this.value;
        if (
            val === target.value &&
            typeof(val) === "string" && 
            val !== "null" && 
            val !== "undefined" && 
            val.match(check_str) &&
            val.length <= 20
        ) {
            el.style.color = black;
            target.style.color = black;
        } else {
            el.style.color = red;
            target.style.color = red;
        }
    });
}
// /password

// color
pickr.on('save', instance => {
    color.value = instance.toHEXA().toString();
    console.log(color.value);
});
// /color 

// secret
secret.addEventListener('input', function() {
    let val = this.value;
    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        val.length !== 0 &&
        val.length <= 20
    ) {
        secret.style.color = black;
    } else {
        secret.style.color = red;
    }
});
// /secret

