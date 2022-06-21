/*
    :author: riccardo mei
    :encoding: utf-8
*/

const app = angular.module("cocktailApp", []);

app.controller(
    "appController",
    ($scope, $http) => {
        $scope.inpCocktail = "";
        $scope.orderTableBy = "strDrink";
        $scope.cocktailResults = [];
        $scope.chosenCocktail = {};

        document.addEventListener(
            'keyup',
            (e) => { if(e.key === "Enter") {$scope.findCocktails();} }
        );

        $scope.findCocktails = () => {
            const textToFind = $scope.inpCocktail;
            $scope.inpCocktail = "";
            const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
                encodeURIComponent(textToFind);
            $http.get(url).then(function(response){
                $scope.cocktailResults = response.data.drinks || [];
            });
        }

        $scope.drinkImage = () => {
            const p = document.getElementById("image-p");
            const element = "<img class='img-fluid' src=" + "'" +
                $scope.chosenCocktail.strDrinkThumb + "'" + " alt='Cocktail preview'>";
            p.innerHTML = element.trim();
        }

        $scope.ingredients = addIngredients();
        function addIngredients(){
            const arrIngredients = [];
            for(let i = 1; i <= 15; i++) {
                arrIngredients.push("strIngredient" + String(i));
            }
            return arrIngredients;
        }

        $scope.cocktailCard = (objDrink) => {
            $scope.chosenCocktail = objDrink;
            const myModal = new bootstrap.Modal(document.getElementById('modal-drink'));
            myModal.show();
        }

        $scope.myOrderBy = (orderName) => $scope.orderTableBy = orderName;
    }
);
