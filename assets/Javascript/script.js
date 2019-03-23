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
    var ids= [];
    for(var i= 0; i< results.length; i++){
        var itemID = results[i].item_id;
        var name = results[i].product_name;
        var price = results[i].price + "$";
    console.log(itemID, name, price);
    ids.push(itemID);
    }


    inquirer 
    .prompt([
        {
            // Use inquirer to prompt user to choose an item for purchase.
            name: "itemID",
            type:"number",
            message:"Which item would you like to purchase? Choose ID number"
        },
        {
            // Use inquirer to prompt user for .
            name:"quantity",
            type:"number",
            message:"How many would you like to buy?"
        }
    ]).then(function(answer){
        console.log(answer);
        //console.log(results);
        var chosen = results.find(function(item) {
            return item.item_id === answer.itemID;
           

            // if (answer.quantity < results.stock_quantity){
            //     alert('Maybe THis?')
            // }
        });

        function getName(item){
            return item.product_name ;
            
        }

        
        

        var stockCount = results.find(function(stock) {
            return stock.stock_quantity - answer.quantity;
        });
        console.log(chosen);
        // console.log(stockCount);

        var number = parseInt(answer.itemID);

        if(!ids.includes(number)){
            console.log('Invalid ID #');
        }

        var quantity = (results.stock_quantity);
        var newQuantity = answer.quantity 
        // console.log(quantity);
        // var newQuantity = quantity - 4
    
        
            
    
    })
});



