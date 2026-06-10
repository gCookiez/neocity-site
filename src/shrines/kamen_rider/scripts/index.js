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
    const headers = document.querySelectorAll('.main-content > section[id]');
    if (!headers.length) return;

    leftpane.innerHTML = '<h3> Table of Contents </h3>'

    for (var i of headers) {
        const format = document.createElement('h4');
        const link = document.createElement('a');

        link.setAttribute('href', `#${i.getAttribute('id')}`);
        format.innerHTML = i.querySelector('#headernote').textContent
        link.append(format)

        leftpane.append(link)
    }
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
tableOfContents();