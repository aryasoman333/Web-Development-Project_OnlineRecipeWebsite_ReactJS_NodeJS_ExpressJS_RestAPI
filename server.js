"use strict";
const express = require('express');
const app = express();
const PORT = 3000;
const homeWeb = require('./home-web');
const detailsWeb = require('./details-web');
const addRecipeWeb = require('./addRecipe-web');
const recipe = require('./recipe');
const recipeStoreAndRetrieve = require('./recipe-storeAndRetrieve');

app.use(express.static('./public'));

app.get('/', (req,res)=>{
    res.send(homeWeb.homePage(recipe));
});

app.get('/addRecipePage', (req,res)=>{
    res.send(addRecipeWeb.addRecipePage());
});

app.post('/addRecipe', express.urlencoded({ extended: false }), (req,res)=>{
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    if(title && ingredients && instructions)
    {
        recipeStoreAndRetrieve.addRecipeDetails({title, ingredients, instructions});
        res.redirect('./recipeDetails?title='+title);
    }});

app.get('/recipeDetails', (req,res)=>{
    const title = req.query.title;
    const details = recipeStoreAndRetrieve.retrieveRecipeDetails(title);
    res.send(detailsWeb.detailsPage(details));
});

app.get('/newRecipePage/',(req, res) => {
      const addPage = addRecipeWeb.addRecipePage();
      res.json(addPage);      
  });

app.post('/recipeDetailsPage/', express.json(), (req, res) => {
     const  title = req.body.title;
     if(title === undefined)
        res.status(400).json({error: "Invalid request! Recipe not available!"});
     const details = recipeStoreAndRetrieve.retrieveRecipeDetails(title);
     const recipeDetails =detailsWeb.detailsPage(details);
     res.json(recipeDetails);
 });

app.post('/newRecipeDetailsPage/', express.json(), (req, res) => {
    const  title = req.body.title;
    const  ingredients = req.body.ingredients;
    const  instructions = req.body.instructions;
    if(title && ingredients && instructions)
    {
        recipeStoreAndRetrieve.addRecipeDetails({title, ingredients, instructions});
        const details = recipeStoreAndRetrieve.retrieveRecipeDetails(title);
        const recipeDetails =detailsWeb.detailsPage(details);
        res.json(recipeDetails);
    }
    else
        res.status(400).json({error: "Invalid request! Operation unuccessfull!"});
    
});

app.get('/homePage/',(req, res) => {   
    const homePage = homeWeb.homePage(recipe);
    res.json(homePage);  
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));