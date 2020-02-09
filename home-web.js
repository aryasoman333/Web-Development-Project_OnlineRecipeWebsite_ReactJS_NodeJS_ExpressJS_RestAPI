"use strict";
const homeWeb = {
    homePage: function(recipe){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="recipe.css"/>
            <title>Home page</title>
        </head>
        <body>
            <div class="home-page">
            <div class="error-message">
                <span></span>
                <div class="welcome">
                    <h1>WELCOME TO HEAVENLY BITES!</h1>
                </div>
                <div class= "display-panel">
                    <div class="recipes">
                    <h2>HOT RECIPES</h2>
                        ${homeWeb.getRecipeList(recipe)}
                    </div>
                    <div class="add-recipe">
                        <form action="/addRecipePage" method="GET">
                            <button id="add-new" class="add-recipe" type="submit">NEW RECIPE</button>
                        </form>
                    </div>
               </div>   
            </div>
            <script src="/recipe.js"></script>
        </body>
        </html>
        `;
    },
    getRecipeList: function(recipe) {
        return `
        <ul class="recipe-list">`+        
        recipe.recipes.map(recipe => 
           ` <form action="/recipeDetails" method="GET">    
           <li>       
                <input name="title" type="hidden" value = "${recipe.title}" />
                <button id="title-list" type="submit">${recipe.title}</button>
                </li>
            </form>
             `).join('') +
      `</ul>`;
    }
};

module.exports = homeWeb;