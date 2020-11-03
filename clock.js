let artworkObj = {};

const hour = new Date();

const artwork = document.querySelector("#artwork");
const description = document.querySelector("#description");
const time = document.querySelector("#time");
const settings = document.querySelector("#settings-btn");
const options = document.querySelector("#options");
const darkMode = document.querySelector("#dark-mode");
const clockFormat = document.querySelector("#clock-format");

// display the clock on load
// 24-hour default
window.onload = () => formatClock();

// event listener for dark mode option
darkMode.addEventListener('change', () => {
    if (darkMode.checked === true) {
        showDarkMode();
    }
});

// event listener for clock format option
clockFormat.addEventListener('change', formatClock);

// event listener for settings icon
settings.addEventListener('click', showSettings);

// function returns the hour of day as an integer
const getHour = () => hour.getHours();

// function displays artwork
const showArtwork = (painting, title) => artwork.innerHTML = `<img src="${painting}" alt="Artwork title: ${title}"/>`;

// function displays artwork description
const showDescription = (title, year, artist, link) =>
    description.innerHTML = `<em>"${title}</em>", ${year} - 
    <strong>${artist}</strong><p style="margin-top:10px;"><a href="${link}" 
    target="_blank" style="text-decoration:none; color:orange;">More Info</a></p>`;

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
function formatClock() {
    if (clockFormat.checked) {
        showClock12();
    } else {
        showClock24();
    }
    setInterval(formatClock, 0);

    // if (clock.getMinutes() === 0 && clock.getSeconds() === 0) {
    //     location.reload(true);
    // }
}

// function expands settings section to display options
function showSettings() {
    if (options.style.display === "flex") {
        options.style.display = "none";
    } else {
        options.style.display = "flex";
    }
}

// function styles elements as "dark mode"
function showDarkMode() {
    const body = document.querySelector('body');
    const h1 = document.querySelector('h1');

    if (darkMode.checked) {
        body.style.backgroundColor = '#121212';
        h1.style.color = '#FFF';
        h1.style.opacity = '0.6';
        time.style.color = '#FFF';
        time.style.opacity = '0.87';
        description.style.color = '#FFF';
        description.style.opacity = '0.6';
        options.style.color = '#FFF';
        options.style.opacity = '0.6';
    } else {
        body.style.backgroundColor = 'initial';
        h1.style.color = 'initial';
        h1.style.opacity = 'initial';
        time.style.color = 'initial';
        time.style.opacity = 'initial';
        description.style.color = 'initial';
        description.style.opacity = 'initial';
        options.style.color = 'initial';
        options.style.opacity = 'initial';
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

        setInterval(() => { location.reload(true) }, 900000);
    });

// ideas //
// options for different art periods
// when it's night time, automatically be on dark mode