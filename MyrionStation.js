var stationMap = getStationMap();

var gridMap = [
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','S','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
        ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
    ];

var keyPressed;

var hidePeople = true;
var lockMotion = false;
var lockDraining = false;

var debugQuickstart = false;
var debugNoclip = false;

var quoteA = false;
var quoteB = false;
var quoteC = false;
var quoteD = false;
var quoteE = false;
var quoteF = false;
var quoteG = false;
var quoteH = false;
var quoteI = false;
var quoteJ = false;
var quoteK = false;
var quoteDelay = 8000;

var playerRowPosition = 178;
var playerColumnPosition = 165;

var oxygenLevel = 100;
var foodLevel = 100;

populateGrid(gridMap);

if (debugQuickstart == false) {
    startTheGame();
    setTimeout(() => { hidePeople=false; initialize(); }, quoteDelay * 5 );
} else {
    initialize();
}

function initialize() {
    playerRowPosition = 178;
    playerColumnPosition = 165;

    getGridMap(playerRowPosition, playerColumnPosition);
    populateGrid(gridMap);

    lockMotion = false;
    lockDraining = false;
    hidePeople = false;

    oxygenLevel = 100;
    foodLevel = 100;
    setOxygenLevel();
    setFoodLevel();
}

setInterval(function() {
    if (!!keyPressed) {
        if (!lockMotion) {
            step(keyPressed);
        }
        
        keyPressed = '';
    }
}, 40);

function step(direction) {
    var stepTile;

    switch(direction)
    {
        case 'up': stepTile = gridMap[6][7]; break;
        case 'down': stepTile = gridMap[8][7]; break;
        case 'left': stepTile = gridMap[7][6]; break;
        case 'right': stepTile = gridMap[7][8]; break;
    }

    if (!!stepTile) // if undefined, it will show as wall-black, can't walk onto that.
    {
        // Check to see if you can walk on it
        if (
            stepTile[0] === '0' // Light floor
            || stepTile[0] === '1' // Dark floor
            || stepTile[0] === '2' // Black floor
            || debugNoclip === true
        ) {
            switch(direction)
            {
                case 'up': playerRowPosition--; break;
                case 'down': playerRowPosition++; break;
                case 'left': playerColumnPosition--; break;
                case 'right': playerColumnPosition++; break;
            }
        
            getGridMap(playerRowPosition, playerColumnPosition);
            populateGrid(gridMap);
        }
        
        if (stepTile[0] === 'T') {
            winTheGame();
        }
        else if (stepTile[0] === 'F') {
            foodLevel = 100;
            setFoodLevel();
            setQuote('That\'s all the food and water we can carry...');
        }
        else if (stepTile[0] === 'O') {
            oxygenLevel = 100;
            setOxygenLevel();
            setQuote('Oxygen tanks filled up...');
        }

        // Check to see if you can interact with it

    }
}

function getGridMap(rowPos, columnPos)
{
    for (row = 1; row <= 15; row++)
    {
        for (column = 1; column <= 15; column++)
        {
            gridMap[row-1][column-1] = stationMap[rowPos - 8 + row][columnPos - 8 + column];
        }
    }
}

function populateGrid(gridMap) {
    for (row = 1; row <= 15; row++)
    {
        for (column = 1; column <= 15; column++)
        {
            var mapElement = gridMap[row-1][column-1];
            var backgroundImage = undefined;
            var foregroundImage = undefined;

            if (row === 8 && column === 8 && !hidePeople) {
                foregroundImage = 'textures/people.png';
            }

            if (!mapElement) {
                backgroundImage = 'textures/wall-black.png'; // default
            } else {
                switch(mapElement[0])
                {
                    case "A":
                    {
                        backgroundImage = 'textures/wall-light.png'; break;
                    }
                    case "B":
                    {
                        backgroundImage = 'textures/wall-dark.png'; break;
                    }
                    case "C":
                    {
                        backgroundImage = 'textures/wall-black.png'; break;
                    }
                    case "0":
                    {
                        backgroundImage = 'textures/floor-light.png'; break;
                    }
                    case "1":
                    {
                        backgroundImage = 'textures/floor-dark.png'; break;
                    }
                    case "2":
                    {
                        backgroundImage = 'textures/floor-black.png'; break;
                    }
                    case "T":
                    {
                        backgroundImage = 'textures/teleporter.png'; break;
                    }
                    case "L":
                    {
                        backgroundImage = 'textures/airlock.png'; break;
                    }
                    case "L":
                    {
                        backgroundImage = 'textures/airlock.png'; break;
                    }
                    case "S":
                    {
                        backgroundImage = 'textures/spacecraft.png'; break;
                    }
                    case "E":
                    {
                        backgroundImage = 'textures/evasuit.png'; break;
                    }
                    case "O":
                    {
                        backgroundImage = 'textures/oxygen.png'; break;
                    }
                    case "F":
                    {
                        backgroundImage = 'textures/food.png'; break;
                    }
                    case "X":
                    {
                        backgroundImage = ''; break; // space is transparent
                    }
                    default:
                    {
                        backgroundImage = 'textures/wall-black.png'; break;
                    }
                }
            }

            setGridImage(row, column, backgroundImage, foregroundImage);

            if ((row === 8 && column === 8) // player stepping on the quote tile
                && !!mapElement && mapElement.length > 2) 
            {
                var quoteElement = mapElement.slice(1,3);

                switch (quoteElement) 
                {
                    case 'QA': { 
                        if (quoteA === false) { quoteA = true; setQuote('You know, perhaps we could live here one day...'); }
                        break;
                    }
                    case 'QB': { 
                        if (quoteB === false) { quoteB = true; setQuote('That sign says "Myrion Station" ... so that\'s where we are.'); }
                        break;
                    }
                    case 'QC': { 
                        if (quoteC === false) { quoteC = true; setQuote('This station must have been abandoned after Rigel collapsed...'); }
                        break;
                    }
                    case 'QD': { 
                        if (quoteD === false) { quoteD = true; setQuote('I kind of like this place. It\'s peaceful...'); }
                        break;
                    }
                    case 'QE': { 
                        if (quoteE === false) { quoteE = true; setQuote('Most likely, this station will never be inhabited again. We just get to see its ruins...'); }
                        break;
                    }
                    case 'QF': { 
                        if (quoteF === false) { quoteF = true; setQuote('These walls are very thick, designed to withstand Rigel\'s solar storms that it used to put out...'); }
                        break;
                    }
                    case 'QG': { 
                        if (quoteG === false) { quoteG = true; setQuote('This neighborhood is so quiet and empty... It used to be very different here...'); }
                        break;
                    }
                    case 'QH': { 
                        if (quoteH === false) { quoteH = true; setQuote('A teleporter! If this thing still works, we\'re saved!...'); }
                        break;
                    }
                    case 'QI': { 
                        if (quoteI === false) { quoteI = true; setQuote('A barracks! This place might have been a military installation. I wonder who they were fighting...'); }
                        break;
                    }
                    case 'QJ': { 
                        if (quoteJ === false) { quoteJ = true; setQuote('Those EVA suits look like they\'ve been through a lot...'); }
                        break;
                    }
                    case 'QK': { 
                        if (quoteK === false) { quoteK = true; setQuote('An empty hangar. The spacecraft that were here must have flown away eons ago...');  }
                        break; 
                    }
                    case 'QL': { 
                        if (quoteK === false) { quoteK = true; setQuote('This must have been the bridge...');  }
                        break; 
                    }
                }
            }
        }
    }
}

function setGridImage(gridPositionX, gridPositionY, backgroundImage, foregroundImage) {
    var grid = document.getElementById('grid' + gridPositionX + '-' + gridPositionY);

    if (!!foregroundImage) {
        grid.style.backgroundImage = 'url(' + foregroundImage + '), url(' + backgroundImage + ')';
    } else {
        grid.style.backgroundImage = 'url(' + backgroundImage + ')';
    }
    
}

function setQuote(text) {
    var quote = document.getElementById("quote");
    quote.textContent = text;
    lockMotion = true;

    setTimeout(() => {
        quote.textContent = '';
        lockMotion = false;
    }, quoteDelay - 70)
}

function startTheGame() {
    setTimeout(() => { setQuote('While flying out of the Rigel star system with your significant other, your hyperspace engine inexplicably broke down...') }, quoteDelay * 0);
    setTimeout(() => { setQuote('You scanned the area for the nearest stopping point, and found a dark, foreboding station in the distance...') }, quoteDelay * 1);
    setTimeout(() => { setQuote('As you hailed the station, no response came back, not even an automated comm bot...') }, quoteDelay * 2);
    setTimeout(() => { setQuote('Scans showed no life forms and no active life support. Clearly this station has been abandoned for a long time...') }, quoteDelay * 3);
    setTimeout(() => { setQuote('As you make your way inside, you hope that you can find some way to get back home....') }, quoteDelay * 4);
}

function winTheGame() {
    lockDraining = true;
    setTimeout(() => { setQuote('As you power on the teleporter, it begins to glow a bright green color...') }, quoteDelay * 0);
    setTimeout(() => { setQuote('A message flashes across the screen: Teleporter online.') }, quoteDelay * 1);
    setTimeout(() => { setQuote('Linking to Sol - Earth - Mount Everest Citadel. Signal locked...') }, quoteDelay * 2);
    setTimeout(() => { setQuote('Quantum channel opened. Channel open for: 24 hours. Teleport now?') }, quoteDelay * 3);
    setTimeout(() => { setQuote('What good fortune, you and your significant other always wanted to visit the Sol system...') }, quoteDelay * 4);
    setTimeout(() => { setQuote('GAME OVER - You safely made it back home!') }, quoteDelay * 5);
    setTimeout(() => { initialize() }, quoteDelay * 6);
}

function loseTheGame(oxygen) {
    lockDraining = true;
    if (oxygen === true)
    {
        setTimeout(() => { setQuote('As your oxygen supply runs out, you take your final breath...') }, quoteDelay * 0);
        setTimeout(() => { setQuote('Perhaps someday, someone will find your bodies... maybe...') }, quoteDelay * 1);
        setTimeout(() => { setQuote('GAME OVER!') }, quoteDelay * 2);
        setTimeout(() => { initialize() }, quoteDelay * 3);
    } else {
        setTimeout(() => { setQuote('Without any food or water, you survive a little while before succumbing to dehydration.') }, quoteDelay * 0);
        setTimeout(() => { setQuote('You wonder, maybe there was some food or water nearby...') }, quoteDelay * 1);
        setTimeout(() => { setQuote('GAME OVER!') }, quoteDelay * 2);
        setTimeout(() => { initialize() }, quoteDelay * 3);
    }
}

setInterval(function() { 
    if (lockMotion === false && lockDraining === false) {
        oxygenLevel--;
        setOxygenLevel();

        if (oxygenLevel < 1) {
            loseTheGame(true);
        }
    }
}, 1500);

setInterval(function() { 
    if (lockMotion === false && lockDraining === false) {
        foodLevel--;
        setFoodLevel();

        if (foodLevel < 1) {
            loseTheGame(false);
        }
    }
}, 3000);

function setOxygenLevel() {
    var oxygenDisplay = document.getElementById('oxygenDisplay');
    oxygenDisplay.textContent = 'Oxygen: ' + oxygenLevel + '%';
}

function setFoodLevel() {
    var foodDisplay = document.getElementById('foodDisplay');
    foodDisplay.textContent = 'Food: ' + foodLevel + '%';
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 38: keyPressed = 'up'; break;
        case 40: keyPressed = 'down'; break;
        case 37: keyPressed = 'left'; break;
        case 39: keyPressed = 'right'; break;

        case 87: keyPressed = 'up'; break;
        case 83: keyPressed = 'down'; break;
        case 65: keyPressed = 'left'; break;
        case 68: keyPressed = 'right'; break;
    }
};