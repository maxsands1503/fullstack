# To run the frontend project
From the command line
1. cd into indigov-challenge
2. run `npm run first-time-eh` if its your first time running the front end or `npm start`
In the browser of your choice navigate to [here](http://localhost:3000)

# To run the backend project
If you don't have the Nest CLI install you will have to run 
`npm install -g @nestjs/cli`
From the command line
1. cd into indigov-challenge-be
2. run `npm run first-time-eh` if its your first time running the api or `nest start` if it isn't
In the browser of your choice navigate to [here](http://localhost:5000/api) to see the swagger


# Below are the criteria I was working off of 
1. List all the constituents that are currently in the system (the table does that, there is no pagination or filtering)
2. Submit new constituent contact data (without creating duplicates) 
3. Export a csv file of constituent contact data filtered by sign up time


# Some improvements if I had some extra time

1. A real Database
2. I would like the list of consituents to be paginated and filterable and perhaps in an Elasticsearch Index
3. Unit test coverage
4. my useAxios hook, I think is nifty, but could use some fine tuning
5. replace the array functions in the API repo to use TypeOrm's `QueryBuilder`, but it was acting a little wonky with my seed data
6. replace the `<div>`s with the class row and column with more semantic styled components, but I was really feeling the time crunch
7. Auth with roles
8. Allow updating of constituent based on role
9. Add constituent detail page
10. Could be prettier
11. the custom validation of the new consituent form could use some massaging
