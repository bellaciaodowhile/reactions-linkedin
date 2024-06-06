console.log('IndexJS')

const $trigger = document.querySelector('.options__btn');
const $reactions = document.querySelector('.options__reactions');
const $reactionsItems = document.querySelectorAll('.options__reactions-item')

$trigger.addEventListener('click', addRemoveReaction);
$trigger.addEventListener('mouseenter', showReactions);
$trigger.addEventListener('mouseleave', hideReactions);
$reactions.addEventListener('mouseenter', ()=> clearTimeout(timeout));

let invertal;
let timeout;

function showReactions(e) {
    clearTimeout(timeout)
    mySetInterval($reactions, 100)
}

function hideReactions() {
    timeout = setTimeout(() => { $reactions.classList.remove('options__reactions--active') }, 600); // 600 waiting time to act
}

function mySetInterval(el, seconds) {
    let time = 0;
    interval = setInterval(() => {
        time = time + 100
        if (time == 600) { // 600 waiting time to act
            return el.classList.add('options__reactions--active')
        }
    }, seconds);
}

function addRemoveReaction(e) {
    if ($trigger.querySelector('img')) {
        $trigger.querySelector('svg').classList.remove('options__btn--hide');
        $trigger.querySelector('span').classList = '';
        $trigger.querySelector('span').textContent = 'Recomendar';
        $trigger.querySelector('img').remove();
    } else {
        showAnimation()
        $trigger.querySelector('svg').classList.add('options__btn--hide');
        $trigger.querySelector('span').classList.add('options__btn--like')
        $trigger.insertAdjacentHTML('afterbegin', `<img src="./assets/img/reactions/like.svg" alt="Recomendar">`);
    }
}
function showAnimation() {
    $trigger.classList.add('options__btn--show');
    setTimeout(() => {
        $trigger.classList.remove('options__btn--show');
    }, 300);
}

$reactionsItems.forEach(item => {
    item.addEventListener('click', ()=> {
        $reactions.classList.remove('options__reactions--active');

        let reaction = item.innerText.trim();
        let currentIcon = item.children[0];
        let currentSpan = $trigger.querySelector('span');

        $trigger.querySelector('svg').classList.add('options__btn--hide');
        
        if ($trigger.querySelector('img') != null) {
            $trigger.querySelector('img').remove();
        }
        
        $trigger.insertAdjacentHTML('afterbegin', `<img src="${currentIcon.src}" alt="${reaction}">`);
        showAnimation()

        currentSpan.classList = '';
        currentSpan.classList.add(`options__btn--${currentIcon.alt.toLowerCase()}`);
        currentSpan.textContent = reaction;
    })
});





