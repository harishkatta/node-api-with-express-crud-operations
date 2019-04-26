let greetFun= require('./greet.js/index.js');
var a =1;
var b =2;
console.log(a+b);
greetFun();

// passby value
function Change(b) {
    b= 2;
};
var a =1;
Change(a); // we are passing copy of a value here '1'
console.log(a) // 1

// pass by reference
let x ={}
x.prop1 = {};
x.prop2 = function(){}
function changeObj(d){
    d.prop1 = function () { }
    d.prop2 =  {}
}
changeObj(x);
console.log(x); // {prop1: ƒ, prop2: {}}
