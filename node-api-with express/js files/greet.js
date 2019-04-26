var greet = function() {
    console.log('greeting');
}
var person = function(fName, Lname){
    this.fName = fName;
    this.Lname =Lname;
}
person.prototype.greet = function(){
    console.log(this.fName+this.Lname);
}
var john = new person('Harish', 'Katta');
john.greet();
console.log(john.__proto__);
module.exports =  greet;