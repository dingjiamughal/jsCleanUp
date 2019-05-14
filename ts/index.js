var number = 0x14;
var string = 'jack';
var array = [1, 2, 3];
var arr = [1, 2, 3];
var turkle = ['1', 2];
turkle[3] = 'dj';
// console.log(a);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorname = Color[2];
var colorName = Color.Red;
