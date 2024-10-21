# Catalog Managment System


## Overview
The catalog managment system is a web app designed to handle catalog and visualize the data of your catalog.

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
   docker-compose build
   docker-compose up
3. visit localhost:5173

### Catalog APIs
| API Description           | Endpoint                      | Request Body                                                                                                           | Response Status | Response Body                                                                                          |
|---------------------------|-------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------|
| Get list of catalogs       | GET /api/catalog-list/:catalogListId | N/A                                                                                                                  | 200 OK          | [{"catalogListId": "1",<br> "catalogs": [{ "name": "terminalX", "vertical": "home", "locales": ["en"], "indexedAt": null }],<br> }] |
| Add catalog<br> set catalogListId to null to create a new list| POST /api/catalog-list        | { "catalogListId": "1"<br>  "isPrime": true"<br>catalogDto": {"name": "terminalX", "vertical": "home", "locales": ["en"], "indexedAt": null}<br>} | 200 OK          |                                                                                                        |
| Update a catalog           | PUT /api/catalog-list/update  | { "catalogListId": "1"<br>  "isPrime": true"<br>catalogDto": {"name": "updated", "vertical": "home", "locales": ["en"], "indexedAt": null}<br>} | 200 OK          |                                                                                                        |
| Delete a catalog           | DELETE /api/catalog-list      | {"catalogListId": "1", "catalogId": "2"}                                                                              | 204 No Content  |                                                                                                        |



