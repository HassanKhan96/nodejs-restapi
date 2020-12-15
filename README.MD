# Nodejs RestAPI

This repo contains simple RestAPI made with nodejs, mongodb and express simple products and order services. It contains different routes like /user, /products and /orders. User authentication is added with jsonwebtoken package. Password hashing also managed with bcrypt package.
## Installation

You can use the git clone command in command prompt to get the project or pull request are also appreciated.

```bash
git clone https://github.com/HassanKhan96/nodejs-restapi.git
```

## Usage

Please change process.env variables which contains MONGOURI and JWTKEY or pass your own variables.

### localhost:5000/user
```
POST /user/signup
#creates a new user.
#takes json content-type data
#//example { "email": "@someemail@", "password": "@somepassword@"}

POST /user/login
#takes json content-type data
#//example { "email": "@someemail@", "password": "@somepassword@"}
#returns the response with jsonwebtoken which contains encoded email and uid


DELETE /user/@someuserid@
#deletes some particular user.
#no rules are applied on delete by default but you 
#can apply your custom rules for protecting delete route of user/
```

### /localhost:5000/products
```
GET /products 
#gives you all the stored products.

GET /products/@someproductid@
#gives a particular product

POST /products/
#creates a new products.
#//example { "name": "@someproductname@", "price": "@value@"}

PATCH /products/@someproductid@
#takes a array of key value pairs 
#//example [ {"propName":"name","value":"@productname@"}]

DELETE /products/@someproductid@
#deletes some particular product.

```


### /localhost:5000/orders
```
GET /orders 
#gives you all the stored orders.

GET /orders/@someorderid@
#gives a particular order

POST /orders/
#creates a new orders.
#//example { "name": "@someordername@", "price": "@value@"}

PATCH /orders/@someorderid@
#takes a array of key value pairs 
#//example [ {"propName":"name","value":"@ordername@"}]

DELETE /orders/@someorderid@
#deletes some particular order.

```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
