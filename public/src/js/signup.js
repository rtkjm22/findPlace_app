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
const color = document.getElementById('color');
pickr.on('save', instance => {
    if (color.value) {
        color.value = instance.toHEXA().toString();
    } else {
        color.setAttribute('value', instance.toHEXA().toString());
    }
    console.log(instance.toHEXA().toString());
});
// /pickr



// リアルタイムバリデーション
const submit = document.getElementById('submit');
submit.disabled = false;
let flag = false;
const red = "#fa4e4e";
const black = "#414141";

const name = document.getElementById('name');
const age = document.getElementById('age');
const mail = document.getElementById('mail');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
// color
const secret = document.getElementById('secret');

// name
name.addEventListener('input', function() {
    let val = this.value;
    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        val.length !== 0 &&
        val.length <= 20
    ) {
        name.style.color = black;
    } else {
        name.style.color = red;
        flag = true;
    }
});
// /name

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
        flag = true;
    }
});
// /age

// mail
// メール形式を判定
const check_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
mail.addEventListener('input', function() {
    let val = this.value;
    let mail_flag = false;

    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        val.length !== 0 &&
        val.length <= 50
    ) {
        mail_flag = false;
        mail.style.color = black;
    } else {
        mail_flag = true;
        mail.style.color = red;
        console.log('hoge');
    }

    if (!val.match(check_mail)) {
        mail_flag = true;
        mail.style.color = red;
        console.log('メール形式で入力してください。');
    } else {
        mail_flag = false;
        mail.style.color = black;
    }
    console.log(flag);
});
// /mail

// password
// 半角英数字のみ(colorでも利用)
const check_str = '/^[A-Za-z0-9]+$/'; 
check_pass(pass, pass2);
check_pass(pass2, pass);
function check_pass(el, target) {
    el.addEventListener('input', function () {
        let val = this.value;
        if (!val.match(check_str)) {
            flag = true;
            el.style.color = red;
            target.style.color = red;
        }

        if (
            val === target.value &&
            typeof(val) === "string" && 
            val !== "null" && 
            val !== "undefined" && 
            8 <= val.length &&
            val.length <= 20
        ) {
            el.style.color = black;
            target.style.color = black;
        } else {
            flag = true;
            el.style.color = red;
            target.style.color = red;
        }
    });
}
// /password

// color
color.addEventListener('input', function() {
    let val = this.value;

    if (!val.match(check_str)) {
        flag = true;
    }

    if (
        typeof(val) === "string" && 
        val !== "null" && 
        val !== "undefined" && 
        4 <= val.length &&
        val.length <= 9
    ) {
        return;
    } else {
        flag = true;
    }
});
// /color 


