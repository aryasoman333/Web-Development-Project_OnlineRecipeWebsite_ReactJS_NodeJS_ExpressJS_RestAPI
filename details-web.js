"use strict";
const detailsWeb = {
    detailsPage: function(recipe){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="recipe.css"/>
            <title>Details page</title>
        </head>
        <body>
            <div class="details-page">
                <div class="recipe-title">
                    <h1>${recipe.title}</h1>
                </div>
                <div class="recipe-ingredients">
                    <h1>INGREDIENTS</h1>
                        <div class="ingredients">
                            <span>
                                ${recipe.ingredients}
                            </span>
                        </div>
                </div>
                <div class="recipe-instructions">
                    <h1>INSTRUCTIONS</h1>
                    <div class="instructions">
                        <span>
                            ${recipe.instructions}
                        </span>  
                    </div>
                </div>
               </div>   
               <div class="back-home">
               <form action="/" method="GET">
                   <button id='home-button'>RETURN TO HOME</button>
               </form>
            </div>     
            </div>
            <script src="/recipe.js"></script>
        </body>
        </html>
        `;
    }
};

module.exports = detailsWeb;