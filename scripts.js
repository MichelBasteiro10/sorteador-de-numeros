// Obtendo elementos.
const form = document.querySelector(`form`);
const amountNumbers = document.querySelector(`#amount-of-numbers`);
const minNumber = document.querySelector(`#from`);
const maxNumber = document.querySelector(`#until`);
const notRepeat = document.querySelector(`#not-repeat-number`);
const drawButton = document.querySelector(`#draw`);
const newDrawButton = document.querySelector(`#draw-again`);
const listNumbers = document.querySelector(`.list-numbers`);
const resultScreen = document.querySelector(`#result-screen`);
const drawCounter = document.querySelector(`#draw-counter`);

// Captadno o evento de submit do formúlario.
form.onsubmit = (event) => {
  // Prevenindo evento padrão do formúlario.
  event.preventDefault();

  generateNumbers();
};

// Faz a contagem de quantos sorteios foram feitos.
let clicks = 1;
newDrawButton.addEventListener(`click`, () => {
  clicks++;
  drawCounter.textContent = `${clicks}º `;

  newDraw();
});

// função para fazer o sorteio.
function generateNumbers() {
  // Obtendo valores dos inputs
  const amountsReceived = {
    amount: Number(amountNumbers.value),
    minimum: Number(minNumber.value),
    maximum: Number(maxNumber.value),
    noRepeat: notRepeat.checked,
  };

  // Criando um objeto para armazenar os números sorteados.
  const numbersToDisplay = {};

  // verificando se o mínimo é maior que o máximo;
  if (amountsReceived.minimum >= amountsReceived.maximum) {
    alert(`O Número máximo deve ser maior que o minímo`);
    return;
  }

  // Verificando se a opção "Não repetir" está marcada.
  if (amountsReceived.noRepeat) {
    const range = amountsReceived.maximum - amountsReceived.minimum + 1;
    // Caso a quantidade a ser sorteada for maior que a quantidade total de numeros possíveis.
    if (amountsReceived.amount > range) {
      alert(
        `Não é possivel gerar ${amountsReceived.amount} números únicos entre ${amountsReceived.minimum} e ${amountsReceived.maximum}.`
      );
      return;
    }

    // Percorre o objeto de numeros gerados enquanto ele for menor que a quantidade de números sorteados.
    while (Object.keys(numbersToDisplay).length < amountsReceived.amount) {
      // armazena o número sorteado.
      let randomNumber =
        // Faz o número aleatório ser gerado entre o mínimo e o máximo.
        Math.floor(
          Math.random() *
            (amountsReceived.maximum - amountsReceived.minimum + 1)
        ) + amountsReceived.minimum;

      // Verifica se o número ja existe dentro do objeto
      if (numbersToDisplay[randomNumber] === undefined) {
        numbersToDisplay[randomNumber] = randomNumber;
      }
    }
  }
  // Faz o sorteio podendo repetir números.
  else {
    for (let i = 0; i < amountsReceived.amount; i++) {
      let randomNumber = Math.floor(Math.random() * (amountsReceived.maximum - amountsReceived.minimum + 1)) + amountsReceived.minimum;
      numbersToDisplay[i] = randomNumber
    }
  }

  // Esconde o form.
  form.style.display = `none`;
  // Faz a tela de resultado aparecer.
  resultScreen.style.display = `flex`;

  // variavel para controlar o tempo de aparecimento entre um número e outro.
  const delayToAppear = 3000;

  Object.values(numbersToDisplay).forEach((value, index) => {
    // Multiplica o valor da variavel pelo index, assim "reiniciando" o tempo para cada item aparecer.
    const delayForEachNumber = index * delayToAppear;

    // Faz os números sorteados aparecerem um de cada vez.
    setTimeout(() => {
      // Criando o elemento "li" e adicionando a classe.
      const li = document.createElement(`li`);
      li.classList.add(`drawn-number`);

      // Criando o elemento "p" e obtendo o valor do objeto.
      const drawnNumber = document.createElement(`p`);
      drawnNumber.textContent = value;

      // Adicionando a "li" na "ul"
      listNumbers.appendChild(li);
      // Adicionando o "p" na "li"
      li.appendChild(drawnNumber);
    }, delayForEachNumber);
  });
  
  // Armazena o total de tempo de delay dos números.
  const totalAnimationTime = Object.keys(numbersToDisplay).length * delayToAppear + 800;

  // Após o tempo total de animações ter passado o botão de sortear novamente aparece.
  setTimeout (() => {
    newDrawButton.style.display = `flex`;
  }, totalAnimationTime)
}

// Função para sortear novamente.
function newDraw() {
  // Remove a propriedade display.
  form.style.display = ``;

  // Volta a propriedade de display para none.
  resultScreen.style.display = `none`;

  // Limpa a "ul" para um novo sorteio.
  listNumbers.innerHTML = ``;

  amountNumbers.value = ``;
  minNumber.value = ``;
  maxNumber.value = ``;

  newDrawButton.style.display = `none`;
}