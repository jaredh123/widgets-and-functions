$(document).ready(function() {
  const removeStyles = document.getElementById('removeStyles');
  const returnStyles = document.getElementById('returnStyles');
  returnStyles.style.visibility = "hidden";
  returnStyles.style.float = "right";

  removeStyles.addEventListener("click", function() {
    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
    colorName.textContent = "#000000";
    removeStyles.style.visibility = "hidden";
    removeStyles.style.float = "right";
    returnStyles.style.float = "left";
    returnStyles.style.visibility = "visible";
  })

  returnStyles.addEventListener("click", function() {
    location.reload();
  })

  // Change background color
  const backgroundColorChange = document.getElementById('backgroundColorChange');
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  const colorName = document.querySelector(".colorName");
  colorName.textContent = "#669EA2";

  backgroundColorChange.addEventListener("click", function() {
    let hexCode = "#";
    for (let i = 0; i < 6; i++) {
      hexCode += hexValues[getRandomNumber()];
    }
    console.log(hexCode);
    document.body.style.backgroundColor = hexCode;
    colorName.textContent = hexCode;
  });

  function getRandomNumber() {
    return Math.floor(Math.random() * hexValues.length);
  }

  const modalClose = document.getElementsByClassName("modalClose")[0];

  modalClose.addEventListener("click", function() {
    modalGalacticAgeCalculator.style.display = "none";
    modalPigLatin.style.display = "none";
  });

  window.addEventListener("click", function() {
    if (event.target == modalPigLatin) {
      modalPigLatin.style.display = "none";
    }
    if (event.target == modalGalacticAgeCalculator) {
      modalGalacticAgeCalculator.style.display = "none";
    }
  });

  // Pig Latin using jquery
  $("#runPigLatin").submit(function(event) {
    event.preventDefault();

    const vowels  = ["a", "e", "i", "o", "u"];
    let word = $("#inputPigLatin").val();

    if (word.includes(" ", ",")) {
      alert("Sorry, please only input one word at a time.");
    }
    else {
      let translation = word;

      if (vowels.includes(word[0])) {
        translation += "yay";
      }
      else {
        translation += translation[0];
        translation = translation.substring(1);
        while (vowels.includes(!translation[0])) {
          translation += translation[0];
          translation = translation.substring(1);
        }
        translation += "ay";
      }
      $("#resultPigLatin").text(`${word} --> ${translation}`);
    }
  });

  const modalPigLatin = document.getElementById("modalPigLatin");
  const modalClickPigLatin = document.getElementById("modalClickPigLatin");

  modalClickPigLatin.addEventListener("click", function() {
    modalPigLatin.style.display = "block";
  });

  // Galactic Age Calculator using jquery
  $("#runGalacticAgeCalculator").submit(function(event) {
    event.preventDefault();

    let inputDay = parseInt($("#day").val());
    let inputMonth = parseInt($("#month").val());
    let inputYear = parseInt($("#year").val());
    let inputCelestialBody = parseInt($("#celestialBody").val());

    let currentDate = new Date();
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const celestialBody = ["Sun", "Mercury" , "Venus" , "Earth" , "Mars" , "Jupiter" , "Saturn" , "Uranus" , "Neptune" , "Pluto"];
    const yearMultiplier = [0.24, 0.62, 1, 1.88, 11.86, 29.46, 84, 164.8, 248.09];

    function getDayCount() {
      // Counting days to end of birth month + days of current month
      return (months[inputMonth - 1] - inputDay + currentDate.getDate());
    }

    function getMonthDayCount() {
      let count = 0;
      for (let i = inputMonth + 1; i <= months.length; i++) {
        // Leap year logic counting days of months to end of birth year
        if ((inputYear % 4 === 0) && (inputYear % 100 !== 0) || (inputYear % 400 === 0)) {
          months[1] = 29;
        }
        else {
          months[1] = 28;
        }
        count += months[i - 1];
      }
      for (let i = 0; i < currentDate.getMonth(); i++) {
        // Leap year logic counting days of months leading to current month of current year
        if ((currentDate.getFullYear() % 4 === 0) && (currentDate.getFullYear() % 100 !== 0) || (currentDate.getFullYear() % 400 === 0)) {
          months[1] = 29;
        }
        else {
          months[1] = 28;
        }
        count += months[i];
      }
      return count;
    }

    function getYearCount() {
      return (currentDate.getFullYear() - inputYear - 1);
    }

    function getLifeDuration() {
      return (getYearCount() + parseFloat((getMonthDayCount() + getDayCount()) / 365));
    }

    function getCelestialAge() {
      return (getLifeDuration() / yearMultiplier[inputCelestialBody - 2]);
    }

    if (inputCelestialBody == 0) {
      alert("Please select a celestial body");
    }
    else if (inputDay > months[inputMonth - 1] || inputDay <= 0 || inputMonth > months.length || inputMonth <= 0) {
      alert("That date doesn't exist!");
    }
    else if (inputCelestialBody == 1) {
      alert("That's the sun. Just no. Try a planet instead.");
    }
    else {
      console.log(celestialBody[inputCelestialBody - 1]);
      $("#resultGalacticAgeCalculator").text(
        `You are ${getCelestialAge()} years old on ${celestialBody[inputCelestialBody - 1]}`
      );
    }
  });
  const modalGalacticAgeCalculator = document.getElementById("modalGalacticAgeCalculator");
  const modalClickGalacticAgeCalculator = document.getElementById("modalClickGalacticAgeCalculator");

  modalClickGalacticAgeCalculator.addEventListener("click", function() {
    modalGalacticAgeCalculator.style.display = "block";
  });
});
