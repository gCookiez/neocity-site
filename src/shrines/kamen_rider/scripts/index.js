import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
gsap.registerPlugin(Observer);

const mainTimeline = gsap.timeline({
    paused: true,
    repeat: -1
});
mainTimeline.addLabel("flicker")
mainTimeline.timeScale("2.5")

function tableOfContents() {
    const leftpane = document.querySelector('.leftpane > .follow');
    leftpane.replaceChildren('');
    const headers = document.querySelectorAll('.main-content > .active > section[id]');
    if (!headers.length) return;

    leftpane.innerHTML = '<h3> Table of Contents </h3>'

    for (var i of headers) {
        const format = document.createElement('h4');
        const link = document.createElement('a');
        link.classList.add('main-tb-header')

        link.setAttribute('href', `#${i.getAttribute('id')}`);
        format.innerHTML = i.querySelector('#headernote').textContent
        link.append(format)
        leftpane.append(link)

        i.querySelectorAll('h3, h4, caption').forEach((j,e) => {
            const subformat = document.createElement('h5');
            const sublink = document.createElement('a');
            subformat.innerHTML = `- ${j.textContent}`;
            sublink.append(subformat);
            if (j && (j.tagName === 'CAPTION')) {
                sublink.classList.add('sub-sub-tb-header')
            }
            if (j && (j.tagName === 'H4')) {
                sublink.classList.add('super-sub-sect')
            }
            else {
                sublink.classList.add('sub-tb-header')
            }
            
            sublink.setAttribute('href', `#${j.getAttribute('id')}`)
            leftpane.append(sublink);
        })
    }
}

const actions = {
    "about-section": {
        action: 'show',
        id: "about"
    },
    "coll-section": {
        action: 'show',
        id: "collection"
    },
    "return-home": {
        action: 'return',
    }
}

function changeState(id) {
    document.querySelector('.main-content > .active').classList.remove('active');
    document.querySelector(`.main-content > #${actions[id].id}`).classList.add('active');
    tableOfContents();
    return
}

function changeSection() {
    const allNavlinks = document.querySelectorAll('.nav-item');

    allNavlinks.forEach((i, e) => {
        const id = i.querySelector('span').getAttribute('id');

        i.addEventListener('click', () => {
            if ('show' === actions[id].action) {
                changeState(id);
            }

            if('return' === actions[id].action) {
                window.location.href = "/"
            }
        })
    })
    // console.log(allNavlinks);
}

function timelineList(startingLabel) {
    let targets = document.querySelectorAll(".spark");
    let numberOfTargets = targets.length;

    let duration = 0.05;
    let pause = 0.040;

    let stagger = duration + pause;
    let repeatDelay = (stagger * (numberOfTargets - 1) + pause)
    console.log(repeatDelay)

    mainTimeline.to('.spark', {
        filter: (i, el) => gsap.getProperty(el, "--zero-filter"),
        backgroundColor: (i, el) => gsap.getProperty(el, "--zero-bg"),
        animationTimingFunction: "linear",
        stagger: {
            each: stagger,
            repeat: 3,
            repeatDelay: repeatDelay
        }
    }, "flicker")

    mainTimeline.to('.spark', {
        filter: (i, el) => gsap.getProperty(el, "--full-filter"),
        backgroundColor: (i, el) => gsap.getProperty(el, "--full-bg"),
        animationTimingFunction: "linear",
        stagger: {
            each: stagger,
            repeat: 3,
            repeatDelay: repeatDelay
        },
        delay: pause,
    }, `flicker-=0.8`)

    mainTimeline.to('.spark', {
        filter: (i, el) => gsap.getProperty(el, "--full-filter"),
        backgroundColor: (i, el) => gsap.getProperty(el, "--full-bg"),
        duration: 0.33,
        delay: 0
    }, `flicker>0.5`)

    mainTimeline.to('.spark', {
        filter: (i, el) => gsap.getProperty(el, "--zero-filter"),
        backgroundColor: (i, el) => gsap.getProperty(el, "--zero-bg"),
        duration: 0.3,
        delay:0
    }, `flicker>1`)

    mainTimeline.to('.capsem', {
        filter: (i, el) => gsap.getProperty(el, "--full-filter"),
        backgroundColor: (i, el) => gsap.getProperty(el, "--full-bg"),
        duration: 0.4,
        delay:0
    }, `flicker>2.0`)

    mainTimeline.play(startingLabel);

}

timelineList("flicker");
changeSection();
tableOfContents();