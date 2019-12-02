# internship-graphql-api

### Setting up the Development Environment

* Install **`docker`** and **`docker-compose`**.
* Install **`nodejs`** and **`yarn`**.
* Add **VSCode** extensions for **`eslint`** and **`prettier`**.
* Adjust **`eslint`** settings in **VSCode**.
```
"editor.formatOnSave": false,
"eslint.autoFixOnSave": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "typescript",
    "autoFix": true
  },
  {
    "language": "typescriptreact",
    "autoFix": true
  }
]
```
* Run **`yarn`** to install the dependencies

### Running the Application

* Run **`docker-compose up -d`** to start and **`docker-compose down`** to stop the **MongoDB Database**.
* Run **`yarn start`** to start the **API Server**.