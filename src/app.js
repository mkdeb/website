import typed from "typed.js";

// Load icons
import fontawesome from "@fortawesome/fontawesome";
import faArrowAltCircleDown from "@fortawesome/fontawesome-free-regular/faArrowAltCircleDown";
import faCubes from "@fortawesome/fontawesome-free-solid/faCubes";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";
import faLink from "@fortawesome/fontawesome-free-solid/faLink";

fontawesome.library.add(
    faArrowAltCircleDown,
    faCubes,
    faGithub,
    faLink,
);

// Import local dependencies
import "./style";
import demo from "./demo.txt";

document.addEventListener("DOMContentLoaded", () => {
    // Toggle terminal window scroll class based on scroll position
    let terminal = document.querySelector("#terminal");

    terminal.addEventListener("scroll", (e) => {
        e.target.parentNode.classList.toggle("scroll", e.target.scrollTop > 0);
    });

    // Trigger terminal typing
    let cursor = null;

    new typed("#typed", {
        cursorChar: "&#9611;",
        onTypingResumed() {
            terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
        },
        strings: [demo],
        typeSpeed: 40,
    });
});
