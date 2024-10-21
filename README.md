# Catalog Managment System


## Overview
The catalog managment system restaurant management system is a wep app designed to handle catalog and visualize the data of your catalog.

## 🛠️ Tech Stack

**Frontend:**
- TypeScript
- React

**Backend:**
- NestJS
- TypeScript
- MongoDB

## 🚀 How to Run

1. Navigate to the root directory of the repository.

2. Run the following command to start the application using Docker Compose:

   ```bash
   docker-compose up
3. visit localhost:5173

## APIs

### Catalog APIs

| API Description           | Endpoint                      | Request Body                                             | Response Status | Response Body                                                                                           |
|---------------------------|-------------------------------|----------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------|
| Get list of catalogs       | GET /api/catalog-list/:catalogListId        |                                                          | 200 OK          | [{"id": "1","name": "Taizu","averageRating" : 4.83,"isKosher" : false,"cuisines": ["Asian","Mexican","Indian"]}] |
| Add catalog to catlog list| POST /api/catalog-list |                                                         | 200 OK          | [{"id": "1","name": "Taizu","averageRating" : 4.83,"isKosher" : false,"cuisines": ["Asian","Mexican","Indian"]}] |
| Update a catalog       | PUT /api/catalog-list/update     |  {"catalogDto": {"name": "terminalX","vertical": "home", "local": ["en", "fr"],"indexedAt": null} "isPrime": true,"catalogId":"1","catalogListId":"2",                          | 200 OK          |                                                                                                        |
| Delete a catalog       | DELETE /api/catalog-list    |           "catalogListId": "1", "catalogId: "2"                                               | 204 No Content  |                                                                                                        |






### Ratings APIs

| API Description           | Endpoint               | Request Body                          | Response Status | Response Body |
|---------------------------|------------------------|---------------------------------------|-----------------|---------------|
| Add a restaurant rating   | POST /ratings          | {"restaurantId": 2, "rating":3.3}     | 200 OK          |               |

### Order APIs

| API Description           | Endpoint               | Request Body                          | Response Status | Response Body |
|---------------------------|------------------------|---------------------------------------|-----------------|---------------|
| Order    | POST /order          | {"restaurantId": 2, "orderItems":[{"dishId":12,"amount":1},{"dishId":14,"amount":1} ]} ]   | 200 OK          |  {orderId:"ef401fc8-d545-424b-928d-4789cd47bb6e"}             |

### Dishes APIs

| API Description           | Endpoint                | Request Body                             | Response Status | Response Body                                                     |
|---------------------------|-------------------------|------------------------------------------|-----------------|------------------------------------------------------------------|
| Add a dish                | POST /restaurants/{id}/dishes | {"name":"Shakshuka","description":"Great one","price": 34} | 201 CREATED     |                                                                  |
| Update a dish             | PUT /restaurants/{id}/dishes/{dishId} | {"description":"Great one","price": 34} | 200 OK          |                                                                  |
| Delete a dish             | DELETE /restaurants/{id}/dishes/{dishId} |                                        | 204 No Content  |                                                                  |
| Get dishes by a restaurant| GET /restaurants/{id}/dishes  |                                         | 200 OK          | [{"id":"1","name":"Humus","description":"Good one","price": 48}] |
