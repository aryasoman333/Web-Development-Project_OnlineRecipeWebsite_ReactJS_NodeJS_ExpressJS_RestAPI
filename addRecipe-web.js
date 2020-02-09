"use strict";
const addRecipeWeb = {
    addRecipePage: function(){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="recipe.css"/>
            <title>Add new recipe</title>
        </head>
        <body>
            <div class="new-recipe">
            <form action="/addRecipe" method="POST">
                    <div class="error-message">
                            <span></span>
                    </div>
                    <div class="new-title">
                        TITLE* <textarea id="title" name="title" rows="2" cols="120"></textarea>
                    </div>
                    <div class="new-ingredients">
                        INGREDIENTS* <textarea id="ingredients" name="ingredients" rows="3" cols="120"></textarea>
                    </div>
                    <div class="new-instructions">
                        INSTRUCTIONS* <textarea id="instructions" name="instructions" rows="3" cols="120"></textarea>
                    </div>
                    <button type="submit">SUBMIT RECIPE</button>
                  
                </form>
                <div class="back-home">
                        <form action="/" method="GET">
                            <button id="home-button">RETURN TO HOME</button>
                        </form>
                </div>     
            </div>   
            <script src="/recipe.js"></script>
        </body>
        </html>
        `;
    }
};

module.exports = addRecipeWeb;