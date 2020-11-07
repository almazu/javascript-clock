let artworkObj = {};

const hour = new Date();

const time = document.querySelector("#time");

const settings = document.querySelector("#settings-btn");

const clockCheckbox = document.querySelector("#clock-format");
let clockFormat = localStorage.getItem("clockformat");

const darkModeCheckbox = document.querySelector("#dark-mode");
let darkMode = localStorage.getItem("darkMode");

// function returns the hour of day as an integer
const getHour = () => hour.getHours();

// function displays artwork
const showArtwork = (painting, title) => {
    const artwork = document.querySelector("#artwork");

    // populate artwork html
    artwork.innerHTML = `<img src="${painting}" alt="Artwork title: ${title}"/>`
};

// function displays artwork description
const showDescription = (title, year, artist, link) => {
    const description = document.querySelector("#description");

    // populate description html
    description.innerHTML = `<em>"${title}</em>", ${year} - 
    <strong>${artist}</strong><p style="margin-top:10px;"><a href="${link}" 
    target="_blank" style="text-decoration:none; color:orange;">More Info</a></p>`;
}

// function enables dark mode
const enableDarkMode = () => {
    if (darkModeCheckbox.checked === true) {
        // add the class darkmode to body
        document.body.classList.add('darkmode');

        // update darkMode in the local storage
        localStorage.setItem('darkMode', 'true');
    }
}

// function disables dark mode
const disableDarkMode = () => {
    if (darkModeCheckbox.checked === false) {
        // remove the class darkmode to body
        document.body.classList.remove('darkmode');

        // update darkMode local storage
        localStorage.setItem('darkMode', 'false');
    }
}

// function enables 12-hour clock
const enableClock12 = () => {
    if (clockCheckbox.checked === true) {
        // show the 12 hour clock format - format clock
        showClock();

        // update clockFrmat in the local storage
        localStorage.setItem('clockformat', 'true');
    }
}

// function disables 12-hour clock
const disableClock12 = () => {
    if (clockCheckbox.checked === false) {
        // format clock
        showClock();

        // update clockFormat in the local storage
        localStorage.setItem('clockformat', 'false');
    }
}

// show clock on load
// get local storage settings
window.onload = () => {
    showClock();

    if (clockFormat === 'true') {
        clockCheckbox.checked = true;
        enableClock12();
    }

    if (darkMode === 'true') {
        darkModeCheckbox.checked = true;
        enableDarkMode();
    }
};

// event listener for dark mode option
darkModeCheckbox.addEventListener('change', () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkModeCheckbox.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// event listener for clock format option
clockCheckbox.addEventListener('change', () => {
    clockFormat = localStorage.getItem("clockformat");
    if (clockCheckbox.checked) {
        enableClock12();
    } else {
        disableClock12();
    }
});

// event listener for settings icon
settings.addEventListener('click', toggleSettings);

// function displays current time in 24 hour format
function showClock24() {
    let clock = new Date();
    let hr = clock.getHours();
    let min = clock.getMinutes();
    let sec = clock.getSeconds();

    hr = checkClock(hr);
    min = checkClock(min);
    sec = checkClock(sec);

    time.innerHTML = `${hr}:${min}:${sec}`;
}

// function displays current time in 12 hour format
function showClock12() {
    let clock = new Date();
    let hr = clock.getHours();
    let min = clock.getMinutes();
    let sec = clock.getSeconds();

    hr = checkClock(hr);
    min = checkClock(min);
    sec = checkClock(sec);

    let period = hr >= 12 ? 'PM' : 'AM'
    hr = (hr % 12) || 12;

    time.innerHTML = `${hr}:${min}:${sec} ${period}`;
}

// function checks if a number is less
// than 10, includes a zero in front
function checkClock(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

// function formats the clock based on settings
function showClock() {
    if (clockCheckbox.checked) {
        showClock12();
    } else {
        showClock24();
    }

    setTimeout(showClock, 1000);
}

// function expands settings section to display options
function toggleSettings() {
    const options = document.querySelector("#options");

    if (options.style.display === "flex") {
        options.style.display = "none";
    } else {
        options.style.display = "flex";
        options.scrollIntoView();
    }
}

// get json data
fetch("./artwork.json")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('There was an error fetching the artwork data.');
        }
    })
    .then(data => {
        // put data into object
        artworkObj = data;

        // show artwork based on time
        showArtwork(artworkObj[getHour()].path, artworkObj[getHour()].title);

        // show description based on time
        showDescription(artworkObj[getHour()].title,
            artworkObj[getHour()].year,
            artworkObj[getHour()].artist,
            artworkObj[getHour()].link);
    });

// ideas //
// options for different art periods
// when it's night time, automatically be on dark mode