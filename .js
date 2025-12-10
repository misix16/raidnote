const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function updateThemeLabel() {
    if (body.classList.contains("theme-dark")) {
        themeToggle.textContent = "Tryb: ciemny";
    } else {
        themeToggle.textContent = "Tryb: jasny";
    }
}

themeToggle.addEventListener("click", function () {
    if (body.classList.contains("theme-dark")) {
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
    } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
    }
    updateThemeLabel();
});

updateThemeLabel();

const chips = document.querySelectorAll("[data-raid-filter]");
const raidCards = document.querySelectorAll(".raid-card");

chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
        const filter = chip.getAttribute("data-raid-filter");
        chips.forEach(function (c) {
            c.classList.remove("chip-active");
        });
        chip.classList.add("chip-active");
        raidCards.forEach(function (card) {
            const type = card.getAttribute("data-raid-type");
            if (filter === "all") {
                card.style.display = "";
            } else {
                if (type === filter) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            }
        });
    });
});

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
            t.classList.remove("tab-active");
        });
        panels.forEach(function (p) {
            p.classList.remove("tab-panel-active");
        });
        tab.classList.add("tab-active");
        const targetPanel = document.getElementById(target);
        if (targetPanel) {
            targetPanel.classList.add("tab-panel-active");
        }
    });
});

const accordions = document.querySelectorAll(".accordion-item");

accordions.forEach(function (item) {
    const header = item.querySelector(".accordion-header");
    const bodyEl = item.querySelector(".accordion-body");
    const indicator = item.querySelector(".accordion-indicator");

    header.addEventListener("click", function () {
        const isOpen = bodyEl.classList.contains("accordion-body-open");
        accordions.forEach(function (other) {
            const otherBody = other.querySelector(".accordion-body");
            const otherIndicator = other.querySelector(".accordion-indicator");
            otherBody.classList.remove("accordion-body-open");
            otherIndicator.textContent = "+";
        });
        if (!isOpen) {
            bodyEl.classList.add("accordion-body-open");
            indicator.textContent = "−";
        } else {
            bodyEl.classList.remove("accordion-body-open");
            indicator.textContent = "+";
        }
    });
});

const btnSuggest = document.getElementById("btn-suggest");
const inputDisks = document.getElementById("input-disks");
const inputPriority = document.getElementById("input-priority");
const suggestionOutput = document.getElementById("suggestion-output");

btnSuggest.addEventListener("click", function () {
    const disks = parseInt(inputDisks.value, 10);
    const priority = inputPriority.value;
    if (isNaN(disks) || disks < 1) {
        suggestionOutput.textContent = "Podaj poprawną liczbę dysków.";
        return;
    }
    let suggestion = "";
    if (priority === "performance") {
        if (disks >= 2) {
            suggestion = "Priorytet: wydajność. Sensowny wybór: RAID 0 (jeśli dane nie są krytyczne) lub RAID 10 (jeśli są).";
        } else {
            suggestion = "Z jednym dyskiem nie stworzysz RAID nastawionego na wydajność – potrzebujesz min. 2 dysków.";
        }
    } else if (priority === "safety") {
        if (disks === 1) {
            suggestion = "Z jednym dyskiem nie zbudujesz macierzy RAID. Możesz myśleć tylko o kopii zapasowej.";
        } else if (disks === 2) {
            suggestion = "Z dwoma dyskami klasyk to RAID 1 – prosta i skuteczna ochrona.";
        } else if (disks === 3) {
            suggestion = "Dla bezpieczeństwa z trzema dyskami można rozważyć RAID 5, ale warto dodać jeszcze jeden dysk.";
        } else if (disks >= 4) {
            suggestion = "Priorytet bezpieczeństwo: RAID 6 (duża redundancja) lub RAID 10 (bezpieczny i szybki, ale pojemność 50%).";
        }
    } else if (priority === "balanced") {
        if (disks < 3) {
            suggestion = "Balans przy małej liczbie dysków: RAID 1 (2 dyski). Przy ≥3 dyskach pojawia się RAID 5 jako kompromis.";
        } else if (disks >= 3 && disks < 6) {
            suggestion = "Dobry balans: RAID 5 – sensowna pojemność i ochrona jednego dysku.";
        } else {
            suggestion = "Przy większej liczbie dysków możesz wybierać między RAID 5 (więcej miejsca) a RAID 6 (większe bezpieczeństwo).";
        }
    }
    suggestionOutput.textContent = suggestion;
});

const scenarioButtons = document.querySelectorAll(".scenario");
const scenarioOutput = document.getElementById("scenario-output");

scenarioButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const scenario = btn.getAttribute("data-scenario");
        let text = "";
        if (scenario === "dom") {
            text = "Domowy NAS: zwykle RAID 1 lub RAID 5. RAID 1 przy małej liczbie dysków, RAID 5 przy większej, gdy chcesz więcej miejsca.";
        } else if (scenario === "baza") {
            text = "Baza danych: często RAID 10, bo łączy wysoką wydajność z dobrą redundancją i lepszą odbudową niż RAID 5/6.";
        } else if (scenario === "video") {
            text = "Montaż wideo: RAID 0 dla maksymalnej prędkości, jeśli źródła masz gdzie indziej; RAID 10, jeśli projekt jest krytyczny.";
        } else if (scenario === "lab") {
            text = "Środowisko testowe: możesz bawić się RAID 0, 5, 6 albo nawet mieszać – ważniejsze są eksperymenty niż bezpieczeństwo.";
        }
        scenarioOutput.textContent = text;
    });
});

const labDisks = document.getElementById("lab-disks");
const labSize = document.getElementById("lab-size");
const labLevel = document.getElementById("lab-level");
const labCalc = document.getElementById("lab-calc");
const labError = document.getElementById("lab-error");
const labTotal = document.getElementById("lab-total");
const labUsable = document.getElementById("lab-usable");
const labOverhead = document.getElementById("lab-overhead");
const labBarData = document.getElementById("lab-bar-data");
const labBarOverhead = document.getElementById("lab-bar-overhead");

function formatTB(value) {
    return value.toFixed(1) + " TB";
}

labCalc.addEventListener("click", function () {
    const disks = parseInt(labDisks.value, 10);
    const size = parseFloat(labSize.value);
    const level = labLevel.value;
    labError.textContent = "";
    if (isNaN(disks) || disks < 1) {
        labError.textContent = "Podaj poprawną liczbę dysków.";
        return;
    }
    if (isNaN(size) || size <= 0) {
        labError.textContent = "Podaj poprawną pojemność pojedynczego dysku.";
        return;
    }
    let minDisks = 0;
    if (level === "0") {
        minDisks = 2;
    } else if (level === "1") {
        minDisks = 2;
    } else if (level === "5") {
        minDisks = 3;
    } else if (level === "6") {
        minDisks = 4;
    } else if (level === "10") {
        minDisks = 4;
    }
    if (disks < minDisks) {
        labError.textContent = "Za mało dysków dla tego poziomu RAID. Minimalnie potrzebujesz: " + minDisks + ".";
        labTotal.textContent = "–";
        labUsable.textContent = "–";
        labOverhead.textContent = "–";
        labBarData.style.width = "0";
        labBarOverhead.style.width = "0";
        return;
    }
    const total = disks * size;
    let usable = 0;
    if (level === "0") {
        usable = total;
    } else if (level === "1") {
        usable = size;
    } else if (level === "5") {
        usable = (disks - 1) * size;
    } else if (level === "6") {
        usable = (disks - 2) * size;
    } else if (level === "10") {
        usable = (disks / 2) * size;
    }
    const overhead = total - usable;
    labTotal.textContent = formatTB(total);
    labUsable.textContent = formatTB(usable);
    labOverhead.textContent = formatTB(overhead);
    if (total > 0) {
        const usablePercent = (usable / total) * 100;
        const overheadPercent = (overhead / total) * 100;
        labBarData.style.width = usablePercent + "%";
        labBarOverhead.style.width = overheadPercent + "%";
    }
});

const quizQuestions = [
    {
        text: "Który poziom RAID nie zapewnia żadnej redundancji danych?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
        correct: 0,
        explanation: "RAID 0 to czyste striping – pełna wydajność, brak ochrony danych."
    },
    {
        text: "Masz dwa dyski i chcesz przede wszystkim bezpieczeństwa danych. Co wybierasz?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"],
        correct: 1,
        explanation: "RAID 1 tworzy kopię lustrzaną danych na dwóch dyskach."
    },
    {
        text: "Który poziom RAID znosi awarię dwóch dysków?",
        options: ["RAID 5", "RAID 6", "RAID 10", "RAID 0"],
        correct: 1,
        explanation: "RAID 6 korzysta z podwójnej parzystości i znosi awarię dwóch dysków."
    },
    {
        text: "Który RAID jest szczególnie popularny dla baz danych?",
        options: ["RAID 1", "RAID 10", "RAID 0", "RAID 5"],
        correct: 1,
        explanation: "RAID 10 łączy wysoką wydajność z redundancją – dobry wybór dla baz danych."
    }
];

const quizContainer = document.getElementById("quiz-container");
const quizProgressBar = document.getElementById("quiz-progress-bar");

let quizIndex = 0;
let quizCorrect = 0;

function renderQuizQuestion() {
    quizContainer.innerHTML = "";
    if (quizIndex >= quizQuestions.length) {
        const summary = document.createElement("div");
        summary.innerHTML = "Koniec quizu. Twój wynik: <strong>" + quizCorrect + " / " + quizQuestions.length + "</strong>.";
        quizContainer.appendChild(summary);
        quizProgressBar.style.width = "100%";
        return;
    }
    const q = quizQuestions[quizIndex];
    const qEl = document.createElement("div");
    qEl.className = "quiz-question";
    qEl.textContent = q.text;
    quizContainer.appendChild(qEl);
    q.options.forEach(function (option, index) {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", function () {
            handleQuizAnswer(index);
        });
        quizContainer.appendChild(btn);
    });
    const feedback = document.createElement("div");
    feedback.id = "quiz-feedback";
    feedback.className = "quiz-feedback";
    quizContainer.appendChild(feedback);
    const progressPercent = (quizIndex / quizQuestions.length) * 100;
    quizProgressBar.style.width = progressPercent + "%";
}

function handleQuizAnswer(index) {
    const q = quizQuestions[quizIndex];
    const buttons = quizContainer.querySelectorAll(".quiz-option");
    const feedback = document.getElementById("quiz-feedback");
    buttons.forEach(function (btn) {
        btn.disabled = true;
    });
    if (index === q.correct) {
        quizCorrect++;
        buttons[index].classList.add("quiz-option-correct");
        feedback.textContent = "Dobrze! " + q.explanation;
        feedback.classList.add("quiz-feedback-ok");
    } else {
        buttons[index].classList.add("quiz-option-wrong");
        buttons[q.correct].classList.add("quiz-option-correct");
        feedback.textContent = "Nie do końca. " + q.explanation;
        feedback.classList.add("quiz-feedback-err");
    }
    quizIndex++;
    setTimeout(function () {
        renderQuizQuestion();
    }, 1300);
}

renderQuizQuestion();
