const smoothScroll = (element, target, duration) => {
    const start = element.scrollLeft;
    const change = target - start;
    const increment = 10;
    let currentTime = 0;

    const animateScroll = () => {
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    animateScroll();
}

Math.easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

const carousel = document.getElementById('carousel');
const leftScrollButton = document.getElementById('scroll-left');
const rightScrollButton = document.getElementById('scroll-right');

rightScrollButton.addEventListener('click', () => {
    const targetScroll = carousel.scrollLeft + 300;
    const duration = 100;
    smoothScroll(carousel, targetScroll, duration);
});
leftScrollButton.addEventListener('click', () => {
    const targetScroll = carousel.scrollLeft - 300;
    const duration = 100;
    smoothScroll(carousel, targetScroll, duration);
});

const increaseNumber = (selector, speed = 10) => {
    const elem = document.querySelector(selector);
    const endNumber = Number(elem.getAttribute('data-number'));

    let index = 0;

    const numberInterval = setInterval(function () {
        if (index <= endNumber) {
            elem.textContent = index;
        } else {
            clearInterval(numberInterval);
        }
        index++;
    }, speed);
}

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let alreadyAnimation = false;
window.onscroll = () => {
    if (!alreadyAnimation) {
        if (isInViewport(document.querySelector('.one'))) {
            alreadyAnimation = true;

            increaseNumber('.one', 85);
            increaseNumber('.two', 5);
            increaseNumber('.three', 500);
        }
    }
};

window.onload = () => {
    AOS.init();

    if (!alreadyAnimation) {
        if (isInViewport(document.querySelector('.one'))) {
            alreadyAnimation = true;

            increaseNumber('.one', 85);
            increaseNumber('.two', 5);
            increaseNumber('.three', 500);
        }
    }
};