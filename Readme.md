## GraphQL example for Google Cloud Functions





An example made to run on Google Cloud Function Emulator:

You will need:

1. to install Node 6 (Google Cloud Function currently supports Node 6.11.5)
2. install functions emulator `npm install -g @google-cloud/functions-emulator`
3. clone this repository
4. in this repository, `npm install`
5. compile the typescript (i.e. in VSCode Shift+Ctrl+B)
6. start emulator `functions start`
6. in dist directory, deploy to emulator `functions deploy app --trigger-http`
7. access the GraphQL interface "http://localhost:8010/helloworld/us-central1/app/graphiql"


You can query a simple one like:
```{users}```


or query a user

```query{
  user(index:1) 
}```


```mutation{auth(
  user:"gfg"
  password:"dff"
  
) }```