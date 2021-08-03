const rootBody = document.querySelector('.rootbody'),
      btn      = document.getElementById('butt');
      
btn.addEventListener('click', () => {
  rootBody.innerHTML = '';
  runGame();
});

function runGame() {
  // These values are given in question will constant during the game,
  const consumptionPerKm    = 0.5,
        minStep             = 0,
        maxStep             = 6,
        initialPetrol       =50,
        pumpsCount          = 5,
        refillpetrolCount         = 30,
        startLocation       = 0,
        endLocation         = 100,
        petrolPumpLocations = getRandomIntegers(
                                 pumpsCount,
                                 startLocation,
                                 endLocation
                              ).sort();
                              
  // These represent the state at any given time
  let Move = startLocation,
      petrol = initialPetrol;
      
  logStr( `Game started!\npetrol pumps generated at:${
         petrolPumpLocations}`);
         
  if (isAtPump()) {
    petrol += refillpetrolCount ; // If there's a pump at the start
  }
      
  logState();
      
  // While we've not reached our destination and still have petrol
  while(Move < endLocation && petrol > 0) {
    // Calculate some metrics for this step
    const autonomy          = petrol / consumptionPerKm,
          remainingDistance = endLocation - Move,
          maxDistance       = Math.min(autonomy, remainingDistance, maxStep),
          stepDistance      = getRandomInteger(minStep, maxDistance),
          stepConsumption   = stepDistance * consumptionPerKm;
    
    // Adjust the state accordingly
    Move += stepDistance;
    petrol -= stepConsumption;

    if (isAtPump()) {
      petrol += refillpetrolCount ;
    }
    logState();
  }
  
  if (Move === endLocation) {
    logStr("You've reached your destination!");
  } else {
    logStr("Out of petrol :'(");
  }
  
  function isAtPump() {
    return petrolPumpLocations.includes(Move);
  }
  
  function logState() {
    let str = `Move: ${Move}km\tPetrol: ${petrol}L`;
    if (isAtPump()) {
      str += ` Found a pump! Refilled ${refillpetrolCount }L`;
    }
    logStr(str);
  }
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIntegers(n, min, max) {
  const res = [];
  
  while (res.length !== n) {
    const value = getRandomInteger(min, max);
    if (!res.includes(value)) {
      res.push(value);
    }
  }
  
  return res;
}

function logStr(str) {
  rootBody.innerHTML += '\n' + str;
}