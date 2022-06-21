/*
:author: riccardo mei
:encoding: utf-8
*/

// functions to manipulate input
function _isVisa(cardNum){
    return cardNum[0] === '4';
}


function _isMasterCard(cardNum){
    return cardNum[0] === '5';
}


function _isDiscover(cardNum){
    return cardNum[0] === '6';
}


function _isAmeX(cardNum){
    return cardNum.slice(0,2) === '37';
}


function _isValidEntry(cardNum){
    if(
        cardNum.length >= 13 && cardNum.length <= 16 &&
        (
            _isVisa(cardNum) ||_isMasterCard(cardNum) ||
            _isDiscover(cardNum) || _isAmeX(cardNum)
        )
    ) return true;
    else
        return false;
}


function _isValidCard(cardNum){
    // implements Luhn's algorithm to check card validity
    let tempSum = 0;
    for(let i = 0; i < cardNum.length; i++) {
        if(i % 2 !== 0) {
            // increment the total by the value of every digit with an odd index
            tempSum += parseInt(cardNum[i]);
        } else {
            // multiply by 2 every digit with an even index
            // ensure the new number has only 1 digit, and add it to the sum
            let tempDigit = parseInt(cardNum[i]) * 2;
            if(tempDigit >= 10) {
                tempSum += (tempDigit - 9);
            } else {
                tempSum += tempDigit;
            }
        }
    }
    return tempSum % 10 === 0;
}


function _cardType(cardNum){
    if(_isVisa(cardNum)) return "Visa";
    if(_isMasterCard(cardNum)) return "Mastercard";
    if(_isDiscover(cardNum)) return "Discover";
    if(_isAmeX(cardNum)) return "American Express";
}


//AngularJS app and controller
const cardApp = angular.module("cardCheker", []);

cardApp.controller(
    "myCardController",
    ($scope) => {
        $scope.cardNumber = "";
        $scope.newCard = "";
        $scope.newCardType = "";
        $scope.message = ""
        $scope.myAlert = "";

        $scope.checkCard = () => {
            if(_isValidEntry($scope.cardNumber) && _isValidCard($scope.cardNumber)){
                $scope.message = "This is a valid " + _cardType($scope.cardNumber) + ".";
                $scope.myAlert = "alert alert-success";
            } else {
                $scope.message = "Invalid input. Try a Visa, Mastercard, Discover or American Express.";
                $scope.myAlert = "alert alert-danger";
            }
        }

        $scope.generateCard = () => {
            // this is a simplified pseudo-random generator
            const max = 17, min = 13;
            while(true) {
                let tempLen = Math.floor(Math.random() * (max - min)) + min;
                const tempArr = [];
                for(let i = 0; i < tempLen; i++) {
                    tempArr.push(Math.floor(Math.random() * 10));
                }
                let tempCard = tempArr.join('');
                if(_isValidEntry(tempCard) && _isValidCard(tempCard)) {
                    $scope.newCard = tempCard;
                    break;
                }
            }
            $scope.newCardType = _cardType($scope.newCard);
        }
    }
);
