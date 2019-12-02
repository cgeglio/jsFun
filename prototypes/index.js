const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {

  orangeKittyNames() {
    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']
    let orangeCats = [];

    let orangeSort = kitties.filter(kitty => {
      if (kitty.color === 'orange') {
        orangeCats.push(kitty.name);
      }
    });

    return orangeCats;
    // Annotation:
    // Use filter to access ALL of the orange kitties in the array, push just the name into a new array, return new array
  },
  //
  sortByAge() {
    // Sort the kitties by their age
    let kittyAge = kitties.sort((a, b) => {
      return b.age - a.age;
    });

    return kittyAge;
    // Annotation:
    // Use sort to just sort the kitty's ages, with a and b representing any two kitties. When subtracting the age of kitty a from age of kitty b, sort puts cats in order based on the value that is returned. b-a is used for descending order, a-b would be ascending order.
  },
  //
  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    let grownUp = kitties.forEach(kitty => {
      return kitty.age += 2;
    });

    return kitties;
    // Annotation: forEach acts similar to a for loop and is useful when you want to do the same thing to each item in an array. In this case, adding 2 to the age of each kitty in the array, then returning the array with the new ages
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    let clubInfo = {};

    clubs.forEach(club => {
      club.members.forEach(member => {
        if (clubInfo[member]) {
          clubInfo[member].push(club.club);
        } else {
          clubInfo[member] = [club.club];
        }
      });
    });

    return clubInfo;
    // Annotation:
    // Use nested forEach to go through each club and then the members that are in each club. Create an empty object called clubInfo. If clubInfo has a key with the members name already, push the club name that person is a member of into array. If the key does not exist, set a new key and assign it to an array with the club name as its first value
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  // Return an array of objects where the keys are mod (the number of the module)
  // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
  // [
  //   { mod: 1, studentsPerInstructor: 9 },
  //   { mod: 2, studentsPerInstructor: 11 },
  //   { mod: 3, studentsPerInstructor: 10 },
  //   { mod: 4, studentsPerInstructor: 8 }
  // ]

  studentsPerMod() {
    let breakdown = [];
    mods.forEach(mod => {
      let newMod = {};
      newMod.mod = mod.mod;
      newMod.studentsPerInstructor = mod.students / mod.instructors;
      breakdown.push(newMod);
    });

    return breakdown;
  }
};

// Annotation:
// Tried using reduce here at first but ended up switching to forEach. Using forEach to go through each mod and pull data from that mod to create a new object. Then pushing that new object into an array and returning the array.





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  // Return an array of objects that include just the flavor of the cake and how
  // much of that cake is in stock e.g.
  // [
  //    { flavor: 'dark chocolate', inStock: 15 },
  //    { flavor: 'yellow', inStock: 14 },
  //    ..etc
  // ]

  stockPerCake() {
    newCakes = [];
    cakes.forEach(cake => {
      let simpleCake = {};
      simpleCake.flavor = cake.cakeFlavor;
      simpleCake.inStock = cake.inStock;
      newCakes.push(simpleCake);
    });
    return newCakes;
  },

  // Annotation:
  // Similar to mod prompt, use forEach to go through each cake and create a new object using only two of the properties from cakes. Push new object to an array.

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    let cakesInStock = cakes.filter(cake => {
      return cake.inStock > 0;
    });

    return cakesInStock;
  },

  // Annotation:
  // Use filter to return ALL cakes that have more than 0 cakes in stock

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    let totalCakes = cakes.reduce((acc, cake) => {
      acc += cake.inStock;
      return acc;
    }, 0);

    return totalCakes;
  },
  // Annotation:
  // Use reduce to create a single sum of all the individual instock numbers

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]
    let totalToppings = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (acc.indexOf(topping) > -1) {
          return;
        } else {
          acc.push(topping);
        }
      });
      return acc;
    }, []);
    return totalToppings;
  },
  // Annotation:
  // Use a combo of forEach and reduce. forEach will go through each cakes'toppings and see if each topping is already in the acc's array. If it is not in the array yet, it will get pushed in. Return the acc array

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    let list = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (acc[topping]) {
          acc[topping]++;
        } else {
          acc[topping] = 1;
        }
      });
      return acc;
    }, {});
    return list;
  }

  // Annotation:
  // Similar to allToppings except in stead of setting acc to an array, set to object. Then use forEach to go through each topping. If the acc object already has a key for that topping, increment the value by 1, other wise create a new key and set the value to 1.
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    let frontend = classrooms.filter(classroom => {
      return classroom.program === 'FE';
    });

    return frontend;
    // Annotation:
    // Use filter to return ALL fe classrooms;
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }
    let fe = 0;
    let be = 0;

    classrooms.forEach(classroom => {
      classroom.program === 'FE' ? fe += classroom.capacity : be += classroom.capacity;
    });

    let total = {};
    total.feCapacity = fe;
    total.beCapacity = be;

    return total;
    // Annotation:
    // Use forEach to go through each classroom. If the classroom is FE, add the classroom's capcity to the fe count. Otherwise, add it to the be count. Then create a object that has keys for each program's capacity set to the program's count
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    let classCapacity = classrooms.sort((a, b) => {
      return a.capacity - b.capacity;
    });

    return classCapacity;
    // Annotation:
    // Use sort to return the classrooms in ascending order based on capacity
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}
    let trackParks = {
      parksVisited: [],
      parksToVisit: []
    };

    nationalParks.forEach(park => {
      park.visited ? trackParks.parksVisited.push(park.name) : trackParks.parksToVisit.push(park.name);
    });

    return trackParks;
    // Annotation:
    //Create an object that has keys for visited and not visited set to empty array. Use forEach to go through each park. If the park has been visited, push to visited array. Otherwise push to not visited array. Return object.
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]
    let parksByState = [];

    nationalParks.forEach(park => {
      parksByState.push({[park.location]: park.name});
    });

    return parksByState;
    // Annotation:
    // Create new array to hold state info. Use forEach to go through each park and create a new object using the location as the key and park name as the value. Push this new object into the array.
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]

    let allActivities = nationalParks.reduce((acc, park) => {
      park.activities.forEach(activity => {
        if (acc.indexOf(activity) > -1) {
          return;
        } else {
          acc.push(activity);
        }
      });
      return acc;
    }, []);
    return allActivities;
  },
  // Annotation:
  // Use a combo of reduce and forEach. Use forEach to go through the activities for each park. Use reduce and set the acc to an empty array. If the acc already includes the activity, look at thre next activity. If the acc does not include the activity, push the activity to the array.
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40
    let totalBeers = breweries.reduce((acc, brewery) => {
      acc += brewery.beers.length;
      return acc;
    }, 0);

    return totalBeers;

    // Annotation:
    // Use reduce to count the length of the beers array for each brewery and add the number of beers to the acc.
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]
    breweryBeerCount = [];

    breweries.forEach(brewery => {
      let beerTotal = {};
      beerTotal.name = brewery.name;
      beerTotal.beerCount = brewery.beers.length;
      breweryBeerCount.push(beerTotal);
    });

    return breweryBeerCount ;
    // Annotation:
    // Use forEach to go through each brewery and create a new object consiting of the brewery's name and the number of beers in the brewery's beer array. Push each object to a new array.
  },


  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    let highestABV = [];

    breweries.forEach(brewery => {
      brewery.beers.sort((a, b) => {
        return b.abv - a.abv;
      });
      highestABV.push(brewery.beers[0]);
      highestABV.sort((a, b) => {
        return b.abv - a.abv;
      });
    });

    return highestABV[0];
    // Annotation:
    // Use a combo of forEach and sort. Use for each to go through each brewery and then sort its beers array from highest abv to lowest abv. Push the highest abv beer (index 0) into a newly created array. Sort the new array from highest to lowest and then return the highest abv beer from there (again, index 0)
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    let allTeachers = [];

    instructors.forEach(instructor => {
      var mod = cohorts.find(cohort => {
        return cohort.module === instructor.module;
      });

      let instructorInfo = {};

      instructorInfo.name = instructor.name;
      instructorInfo.studentCount = mod.studentCount;
      allTeachers.push(instructorInfo);
    });

    return allTeachers;
    // Annotation:
    // Use a combo of forEach and find. Use forEach to go through each instructor and create an object using the instructors name and student count. Get the student count by using find to go through cohorts and grab the object with the module matches the instructor's module.
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    let ratio = {};

    cohorts.forEach(cohort => {
      let teacherCount = instructors.filter(instructor => {
        return instructor.module === cohort.module;
      });

      ratio['cohort' + `${cohort.cohort}`] = cohort.studentCount / teacherCount.length;
    });

    return ratio;
    // Annotation:
    // Use a combo of forEach and filter. Create a new object called ratio. Use forEach to go through each cohort and set the cohort name as a key in ratio object. Filter teachers by the module they teach. Use the length of the teacher filter array to calculate the number of teachers per cohort students. Set this number as the value for the cohort name and return the ratio object.
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }
    let teacherSkills = {};

    instructors.forEach(instructor => {
      let skillset = [];
      instructor.teaches.forEach(subject => {
        let skills = cohorts.filter(cohort => {
          return cohort.curriculum.includes(subject);
        });
        skills.forEach(skill => {
          if (skillset.indexOf(skill.module) === -1) {
            skillset.push(skill.module);
          }
        });
        skillset.sort((a, b) => {
          return a - b;
        });
      });
      teacherSkills[instructor.name] = skillset;
    });

    return teacherSkills;
    // Annotation:
    // Curious if there is a more efficient way of doing this. I used a combo of forEach and filter. First I use forEach to go through each teacher. Within each teacher, I use forEach again to go through each subject they teach. Using filter, I check to see which cohort curriculum items match the subject. Using indexOf, I make sure that no duplicate module numbers are pushed into my skills array. Then, I sort the skills array from lowest to highest. Finally, I set a key of the teacher's name with a value of the teacher's skills array in my teacherSkills object.
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    let subjects = {};

    cohorts.forEach(cohort => {
      cohort.curriculum.forEach(topic => {
        let topicTeachers = [];
        let topicInfo = instructors.filter(instructor => {
          return instructor.teaches.includes(topic);
        });
        topicInfo.forEach(info => {
          if (topicTeachers.indexOf(info.name) === -1) {
            topicTeachers.push(info.name);
          }
        });
        subjects[topic] = topicTeachers;
      });
    });

    return subjects;
    // Annotation:
    // Similar to the modulesPerTeacher, use a combo of forEach and filter to go through each cohorts array of topics. Make each unique topic a key in a newly created subjects object. Set the key's value to the teacher's names that have that topic in their teaches array using filter.
  }
};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]
    let sidekickInfo = [];
    let bossList = Object.keys(bosses);
    bossList.forEach(boss => {
      let loyalty = {};
      loyalty.bossName = bosses[boss].name;
      let x = [];
      bosses[boss].sidekicks.forEach(sidekick => {
        sidekicks.forEach(kick => {
          if (kick.name === sidekick.name) {
            x.push(kick.loyaltyToBoss);
          }
        });
        sum = x.reduce((acc, num) => {
          acc += num;
          return acc;
        }, 0);
        loyalty.sidekickLoyalty = sum;
      });
      sidekickInfo.push(loyalty);
    });
    return sidekickInfo;
  }
  // Annotation:
  // Again, curious if there is a cleaner way to do this. I used a combo of forEach and reduce. First I got the keys for bosses. I used forEach to go through each of those keys, and a nested forEach to go through the sidekicks of each boss. If the sidekicks object contained an object with the same name as the boss's sidekick, I pushed the sidekick's loyalty to boss points to an array. I reduced the array into a single number.
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]
    let allConstellations = Object.keys(constellations);

    let totalStars = allConstellations.reduce((acc, constellation) => {
      constellations[constellation].stars.forEach(star => {
        stars.filter(starry => {
          if (starry.name === star) {
            acc.unshift(starry);
          }
        });
      });
      return acc;
    }, []);
    return totalStars;
  },
  // Annotation:
  // Use reduce, forEach, and filter. First get the constellation keys and then use reduce on the keys with an acc set to []. Use for each to go through each of the constellations stars and filter out the star objects that match the name of the constellation's star. Use unshift to get the stars into the acc array in the correct order.


  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    let allColors = {};
    stars.forEach(star => {
      let colorInfo = stars.filter(starry => {
        return starry.color === star.color;
      });
      if (allColors[star.color]) {
        return;
      } else {
        allColors[star.color] = colorInfo;
      }
    });
    return allColors;
  },
  // Annotation:
  // Use forEach and filter. Use forEach to go through each star. If the acc has a key of that color, return. Otherwise create a key of the color and use filter to find all of the other stars that have that color.

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]

    let allStars = [];
    stars.sort((a, b) => {
      return a.visualMagnitude - b.visualMagnitude;
    });
    stars.forEach(star => {
      if (allStars.includes(star.constellation)) {
        let i = allStars.indexOf(star.constellation);
        allStars.splice(i, 1);
        allStars.push(star.constellation);
      } else {
        allStars.push(star.constellation);
      }
    });

    return allStars;
    // Annotation:
    // **Added a constellation name to one of the stars because Johnny said he confirmed the test off** Start off by sorting the stars from lowest to highest visibility. Then use forEach to go through each star. If the constellation that star is a part of is alrady in the array, get rid of the first occurrence of that constellation with splice and then push the constellation so that the constellations remain in order without duplicates.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {
    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113
    let characterWeapons = Object.keys(weapons);
    let totalDamagePossible = 0;
    characterWeapons.forEach(weapon => {
      let count = characters.filter(character => {
        return character.weapons.includes(weapon);
      });
      totalDamagePossible += weapons[weapon].damage * count.length;
    });
    return totalDamagePossible;
    // Annotation:
    // Use forEach and filter. Find the keys of the weapons object and use those to go through the weapons. Find each weapon in the characters objects and keep track of how often they appear. Find total damage possible by multiplying the damage score for each weapon by the number of times it appears.
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    let weaponInfo = characters.reduce((acc, character) => {
      let characterWeapons = {};
      let totalWeapons = {damage: 0, range: 0};
      character.weapons.forEach(weapon => {
        if (weapons[weapon]) {
          totalWeapons.damage += weapons[weapon].damage;
          totalWeapons.range += weapons[weapon].range;
        }
      });
      characterWeapons[character.name] = totalWeapons;
      acc.push(characterWeapons);
      return acc;
    }, []);
    return weaponInfo;
    // Annotation:
    // Use reduce and forEach. Use reduce to reduce the character information into a single array. Use forEach to go through each of the character weaponds and find it in the weapons object. Create a new object for each character with a total count of its damage and range for all the weapons in its posession.
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  dinosaurPrompts
};
