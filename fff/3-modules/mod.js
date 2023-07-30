console.log("This is module file");
function average(arr) {
    let sum = 0;
    arr.forEach(element => {
        sum += element;
    });
    return sum / arr.length;
}

module.exports = average;//exporing only fun

// module.exports itself is an object
// module.exports = {//exporting in objects
//     avg: average,
//     name: "Anand",
//     repo: "github"
// }