// // test cases
// const str1 = 'hi hello, how do you do?';
// const str2 = 'regular string';
// const str3 = 'hello there';

// // do the test strings contain these terms?
// const conditions = ["hello", "hi", "howdy"];

// // run the tests against every element in the array
// const test1 = conditions.some(el => str1.includes(el));
// const test2 = conditions.some(el => str2.includes(el));
// // strictly check that contains 1 and only one match
// const test3 = conditions.reduce((a,c) => a + str3.includes(c), 0) == 1;

// // display results
// console.log(`Loose matching, 2 matches "${str1}" => ${test1}`);
// console.log(`Loose matching, 0 matches "${str2}" => ${test2}`);
// console.log(`Exact matching, 1 matches "${str3}" => ${test3}`);

function contains(target, pattern){
  var value = 0;
  pattern.forEach(function(word){
    if(target.includes(word)){
      value++
    }
  });
  return value
}

let jawab = "undangan ljaisidj"
let jawaban = "undangan keluarga hijrah"

const arr_jawaban = jawaban.split(" ")
const jumlah = arr_jawaban.length
const percent = contains(jawab, arr_jawaban) / jumlah * 100

console.log(percent)

// let str = "bonjour le monde vive le javascript"

// let arr = ['bonjour','europe', 'c++'];

// function contains(target, pattern){
//     var value = 0;
//     pattern.forEach(function(word){
//       value = value + target.includes(word);
//     });
//     return (value === 1)
// }

// console.log(contains(str, arr));

// function removeA(arr) {
//   var what, a = arguments, L = a.length, ax;
//   while (L > 1 && arr.length) {
//       what = a[--L];
//       while ((ax= arr.indexOf(what)) !== -1) {
//           arr.splice(ax, 1);
//       }
//   }
//   return arr;
// }
// var ary = [{id: 'haha', we: 'hia'},{id: 'hadhi', we: 'h290sa'},{id: 'h123ha', we: 'hiw'}];
// let he = {id: 'hadhi', we: 'h290sa'}
// removeA(ary, he)
// console.log(ary)