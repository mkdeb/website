import typed from "typed.js";

// Load icons
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faCubes, faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(
    faArrowAltCircleDown,
    faCubes,
    faGithub,
    faLink,
);

dom.watch();

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
