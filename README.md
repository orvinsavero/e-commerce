## Documentation

## Register 

- route:
  - `POST /register`
- request:
  - body:
    - `{ name: 'dimitri' , email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword', cart: [] }`
- error:
  - `Validation Error`

```
- Email is unique, so it is not allowed to have same email in database.

- Password is hashed with bcryptjs.
```

## Login

- route:
  - `POST /login`
- request:
  - body
    - `{ email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ token: '...' }`
- error:
  - `404 not found`

```
Token is generated from JWT package.
```

## Create Product

- route:
  - `POST /product`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ name, quantity, price, description, image, category }`
- response
  - `201`: `{
        _id,
        name,
        quantity,
        price,
        description,
        image,
        category,
        created_at,
        UserId
    }`
- error:
  - `Validation Error`

```
- Token is decoded via JWT to get UserId.

- Multer is used to convert form data into object, then it is uploaded to google cloud storage.
```

## Read Product

- route:
  - `GET /product`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{
        _id,
        name,
        quantity,
        price,
        description,
        image,
        category,
        created_at,
        UserId
    }`
- error:
  - `500 internal server error`

```
- Token is decoded via JWT to get UserId.

- Query is used to find specific UserId.
```

## Delete Product

- route:
  - `DELETE /:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId('') }`
- error:
  - `401 not authorized`

```
User can not delete Product that does not belongs to his/her, it is authorized in middleware.
```

## Update Product

- route:
  - `PATCH /:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ name, quantity, price, description, image, category }`
- response
  - `200`: `{
        _id,
        name,
        quantity,
        price,
        description,
        image,
        category,
        created_at,
        UserId
    }`
- error:
  - `401 not authorized`

```
- User can not update Product that does not belongs to his/her, it is authorized in middleware.

- Multer is used to convert form data into object, then it is uploaded to google cloud storage.
```

## Add Product to Cart

- route:
  - `PATCH /cart/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword', cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ]`
    }`
- error:
  - `401 not authorized`

```
- Token is decoded via JWT to get UserId.

- User can only update Product to his/her cart.

```

## Delete Product in Cart

- route:
  - `PATCH /cart/remove/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId('') }`
- error:
  - `401 not authorized`

```
- Token is decoded via JWT to get UserId.

- User can only delete Product from his/her cart.
```

## Clear Cart

- route:
  - `PATCH /cart/`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword', cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ]`
    }`
- error:
  - `401 not authorized`

```
- Token is decoded via JWT to get UserId.

- User can only clear Product from his/her cart.
```

## Read Product

- route:
  - `GET /cart`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword', cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ]`
    }`
- error:
  - `500 internal server error`

```
- Token is decoded via JWT to get UserId.

- User can only read Product from his/her cart.
```
