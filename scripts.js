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

  newDraw()
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

  // verificando se o mínimo é maior que o máximo;
  if (amountsReceived.minimum >= amountsReceived.maximum) {
    alert(`O Número máximo deve ser maior que o minímo`);
    return;
  }

  // Verificando se a opção "Não repetir" está marcada caso a quantidade a ser sorteada for maior que a quantidade total de numeros possíveis.
  if (amountsReceived.noRepeat) {
    const range = amountsReceived.maximum - amountsReceived.minimum + 1;
    if (amountsReceived.amount > range) {
      alert(
        `Não é possivel gerar ${amountsReceived.amount} números únicos entre ${amountsReceived.minimum} e ${amountsReceived.maximum}.`
      );
      return;
    }
  }

  // Criando um objeto para armazenar os números sorteados.
  const generatedNumbers = {};

  // Percorre o objeto de numeros gerados enquanto ele for menor que a quantidade de números sorteados.
  while (Object.keys(generatedNumbers).length < amountsReceived.amount) {
    // armazena o número sorteado.
    let randomNumber =
      // Faz o número aleatório ser gerado entre o mínimo e o máximo.
      Math.floor(
        Math.random() * (amountsReceived.maximum - amountsReceived.minimum + 1)
      ) + amountsReceived.minimum;

    // Verifica se pode ou não repetir números, caso não possa repetir verifica se o número existe dentro do objeto.
    if (
      !amountsReceived.noRepeat ||
      (amountsReceived.noRepeat && generatedNumbers[randomNumber] === undefined)
    ) {
      generatedNumbers[randomNumber] = true;
    }
  }

  Object.keys(generatedNumbers).forEach((chave) => {
    // Criando o elemento "li" e adicionando a classe.
    const li = document.createElement(`li`);
    li.classList.add(`drawn-number`);

    // Criando o elemento "p" e obtendo o valor do objeto.
    const drawnNumber = document.createElement(`p`);
    drawnNumber.textContent = chave;

    // Adicionando a "li" na "ul"
    listNumbers.appendChild(li);
    // Adicionando o "p" na "li"
    li.appendChild(drawnNumber);
  });

  // Esconde o form.
  form.style.display = `none`;
  // Faz a tela de resultado aparecer.
  resultScreen.style.display = `flex`;
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
}