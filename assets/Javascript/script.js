var mysql = require('mysql');

var inquirer = require('inquirer');

// Establish connection to mysql Database
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database:'bamazon_DB'

});

connection.connect();
// Run a query to pull up all items currently being sold in database
connection.query('SELECT * FROM products', function (error, results, fields){
    if (error) throw error;
    // Loop through all items and show ID number, item name and price
    for(var i= 0; i< 10; i++){
        var itemID = results[i].item_id;
        var name = results[i].product_name;
        var price = results[i].price + "$";
    console.log(itemID, name, price);
    }
});

// Use inquirer to prompt user to choose an item for purchase.

inquirer 
    .prompt([
        {
            name: "purchase",
            type:"input",
            message:"Which item would you like to purchase? Enter ID#"
        }
    ]).then(function(answer){
        
    })