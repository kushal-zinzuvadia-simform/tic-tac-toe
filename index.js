let reset = document.querySelector(".reset");
let grid = document.querySelector(".game-grid");
let gridItem = document.querySelectorAll(".grid-item");
let instr = document.querySelector(".instructions");
let current = "X";
let turn = 0;

function resetGrid() {
    current = "X";
    gridItem.forEach(element => {
        element.innerText = "";
    });

    instr.innerText = "X's turn";
    turn = 0;
    grid.addEventListener("click", entryHandler);
}

let entryHandler = (e) => {
    if (e.target.textContent == "") {
        e.target.textContent = current;
        current = (current === "X") ? "O" : "X";
        instr.innerText = current + "'s turn";
        turn++;
    }

    if (turn >= 5) {
        if (checkGrid()) {
            grid.removeEventListener("click", entryHandler);
        };
    }
}

reset.addEventListener("click", resetGrid);

grid.addEventListener("click", entryHandler);

function checkGrid() {
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of patterns) {
        let valA = gridItem[a].innerText;
        let valB = gridItem[b].innerText;
        let valC = gridItem[c].innerText;

        if (valA !== "" && valA === valB && valB === valC) {
            instr.innerText = valA + " wins!";
            return true;
        }
    }

    if (turn == 9) {
        instr.innerText = "DRAW!";
        return true;
    }

    return false;
}