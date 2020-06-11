
#### MongoDB customer table(collection) Queries


use mycustomers

# Creating a db User

db.createUser({
	user: "brad",
	pwd:"1234",
	roles : ["readwrite", "dbAdmin"]
});


# We first create collecton customer which is like a table in SQL

db.createCollection('customers');

show collections

db.customers.insert({first_name:"John", last_name:"Doe"});

db.customers.find();


# To insert multiple customers

db.customers.insert([{first_name:"Steven", last_name:"Smith"}, {first_name:"John", last_name:"Johnson", gender:"female"}]);

db.customers.find().pretty();



# Updating John. Note : It is better to use ObjectId than first_name.

db.customers.update({first_name:"John"}, {first_name:"John", last_name:"Doe", gender:"male"});



# updating using $set. It will add gender instead without removing first_name and last_name

db.customers.update({first_name:"Steven"}, {$set:{gender:"male"}});

db.customers.update({first_name:"Steven"}, {$set:{age:45}});


# Incrementing the age of Steven by 5 using $inc.

db.customers.update({first_name:"Steven"},{$inc:{age:5}});


# Remove credentials corresponding to each customer (here we are removing age)

db.customers.update({first_name:"Steven"}, {$unset:{age:1}});


# Updating something that does not exist will give 0 results

db.customers.update({first_name:"Mary"},{first_name:"Mary", last_name:"Samson"});


# If we want to add above customer details the we use {upsert : true}

db.customers.update({first_name:"Mary"},{first_name:"Mary", last_name:"Samson"}, {upsert: true});


# Renaming gender to sex for first_name: Steven.

db.customers.update({first_name:"Steven"}, {$rename:{"gender":"sex"}});



# Removing Steven : It will remove all customers with name steven

db.customers.remove({first_name:"Steven"});


# To just remove one Steven

db.customers.remove({first_name:"Steven"},{justOne: true});



# Inserting more data to customers table

db.customers.insert([
... {
... first_name:"Troy",
... last_name:"Markons",
... gender:"male",
... age:33,
... address:{
... street:"432 Essex st",
... city:"Lawrence",
... state:"MA"
... },
... memberships:["mem1", "mem2"],
... balance:125.32
... },
... {
... first_name:"Beth",
... last_name:"Jenkins",
... gender:"female",
... age:23,
... address:{
... street:"411 Blue st",
... city:"Boston",
... state:"MA",
... },
... membership:["mem2", "mem3"],
... balance:505.33
... },
... {
... first_name:"Timothy",
... last_name:"Wilkins",
... gender:"male",
... age:53, 
... address:{
... street:"22 School st",
... city:"Amesbury",
... state:"MA"
... },
... membership:["mem3", "mem4"],
... balance:22.5
... },
... {
... first_name:"William",
... last_name:"Jackson",
... gender:"male",
... age:43,
... address:{
... street:"11 Albany st",
... city:"Boston",
... state:"MA"
... },
... membership:["mem1"],
... balance:333.23
... },
... {
... first_name:"Sharon",
... last_name:"Thompson",
... gender:"female",
... age:35,
... address:{
... street:"19 Willis st",
... city:"worchester",
... state:"MA"
... },
... membership:["mem1", "mem2"],
... balance:99.99
... }
... ]);



db.customers.find().pretty();


db.customers.find({first_name:"Sharon"


# For finding more than one cutomers we use $or

db.customers.find({$or:[{first_name:"Sharon"}, {first_name:"Troy"}]});


db.customers.find({gender:"male"});


# To find customer with age less than 40.  lt:less than, gt:greater than, lte:less than equal to.

db.customers.find({age:{$lt:40}}).pretty();


# Address Query. Use commas.

db.customers.find({"address.city":"Boston"}).pretty();


# Query membership

db.customers.find({memberships:"mem1"});


# Sorting by. we use .sort()

db.customers.find().sort({last_name:1});         # Ascending   1

db.customers.find().sort({last_name:-1});        # Descending -1

db.customers.find().sort({last_name:-1}).pretty();


# Counting

db.customers.find().count();

db.customers.find({gender:"male"}).count();


# Limiting find

db.customers.find().limit(4);

db.customers.find().limit(4).sort({last_name: 1});


# Iterating through stuff using forEach. This will print all the first_names of customers.

db.customers.find().forEach(function(doc){print("Customer Name:" +doc.first_name)});



