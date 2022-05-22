// Tempo do Worktime.
var startCountdownTime = 25 * 60;
// Tempo do Short Break.
var shortBreakTime = 5 * 60;
// Tempo do Long Break.
var longBreakTime = 15 * 60;

// Variáveis de controle.
var pause = false;
var restart = false;
var shortBreak = false;
var longBreak = false;

// Nº do Worktime. Devem haver 4 Worktimes, sendo que o 1º já é exibido ao carregar a página.
var loopWorktime = 2;
// Devem haver 3 Short Breaks e um Long Break.
var loopShortBreak = 1;

// Função chamada quando clicar no botão play pela primeira vez.
// A partir da segunda vez, o botão clicado será o continue.
// Esta função é chamada apenas uma vez durante a execução do código.
function startTimer(countdownTime) {
    // Declarando as variáveis countdownTime, minutes, seconds.
    // Inicializa a timer com o valor de countdownTime.
    // É o mesmo que: let timer = countdownTime; let minutes; let seconds;
    let timer = countdownTime, minutes, seconds;

    // Função chamada a cada 1s após chamada a função startTime.
    setInterval(function () {
        // Restart é atribuído como verdadeiro quando o botão restart é pressionado.
        if(restart) {
            // Verifica em qual etapa o pomodoro se encontra (Worktime, Short Break ou Long Break).
            if(longBreak) {
                // Se a etapa Long Break for verdadeira, atribui à variável timer o valor padrão do longBreak, 
                // definido pela variável longBreakTime como 15min.
                timer = longBreakTime;
            } else if(shortBreak) {
                // Se a etapa Short Break for verdadeira, atribui à variável timer o valor padrão do shortBreak, 
                // definido pela variável shortBreakTime como 5min.
                timer = shortBreakTime;
            } else {
                // Se a etapa Worktime for verdadeira, atribui à variável timer o valor padrão do countdownTime de 25min.
                timer = countdownTime;
            }

            // Cálculos de conversão para determinar os minutos e segundos.
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            // Se o valor dos minutos for menor que 10, adicionar o 0 antes do número.
            if(minutes < 10) {
                document.querySelector(".minutes").innerText = "0" + minutes;
            } else {
                document.querySelector(".minutes").innerText = minutes;
            }
    
            // Se o valor dos segundos for menor que 10, adicionar o 0 antes do número.
            if(seconds < 10) {
                document.querySelector(".seconds").innerText = "0" + seconds;
            } else {
                document.querySelector(".seconds").innerText = seconds;
            }

            // Mostrar apenas os botões desejados.
            document.querySelector('.play-button').classList.add('disabled');
            document.querySelector('.pause-button').classList.add('disabled');
            document.querySelector('.restart-button').classList.add('disabled');
            document.querySelector('.continue-button').classList.remove('disabled');

            // Após reiniciar qualquer etapa, deseja-se que o contador fique pausado.
            pause = true;
            // Restart volta ao seu valor padrão (false) quando finaliza o procedimento.
            restart = false;
        }

        // A estrutura condicional abaixo é executada se o botão pause ainda não foi pressionado.
        if(!pause) {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            if(minutes < 10) {
                document.querySelector(".minutes").innerText = "0" + minutes;
            } else {
                document.querySelector(".minutes").innerText = minutes;
            }

            if(seconds < 10) {
                document.querySelector(".seconds").innerText = "0" + seconds;
            } else {
                document.querySelector(".seconds").innerText = seconds;
            }

            // A estrutura condicional abaixo é executada se o decremento do timer atingir um valor menor ou igual a 0.
            if(timer-- <= 0) {
                // A estrutura condicional abaixo é executada se o longBreak ainda não aconteceu.
                if(!longBreak) {
                    // A estrutura condicional abaixo é executada se ainda não chegou ao último Worktime.
                    if(loopWorktime <= 4) {
                        // Se a etapa Short Break foi finalizada, altera para a próxima etapa Worktime.
                        if(shortBreak) {
                            // Muda o título da etapa para mostrar em qual Worktime se encontra.
                            document.querySelector('.stages').innerText = loopWorktime + "º Worktime";
                            // Atribui ao timer o valor de 25min novamente.
                            timer = countdownTime;
                            // Incrementa o valor do contador de ordem do Worktime (1º, 2º, 3º... Worktime).
                            loopWorktime++;
                            // Como o Short Break foi finalizado, atribui ao shortBreak o valor false.
                            shortBreak = false;
                        } 
                        // Se a etapa Worktime foi finalizada, altera para a próxima etapa ShortBreak.
                        else {
                            document.querySelector('.stages').innerText = loopShortBreak +  "º Short break";
                            // Atribui ao timer o valor de 5min novamente.
                            timer = shortBreakTime;
                            // Incrementa o valor do contador de ordem do Short Break.
                            loopShortBreak++;
                            // Como o Worktime foi finalizado, atribui ao shortBreak o valor true.
                            shortBreak = true;
                        }
                    } 
                    // A estrutura condicional abaixo é executada se este for o último Worktime.
                    else {
                        // Alterar a próxima etapa para o Long break.
                        document.querySelector('.stages').innerText = "Long break";
                        timer = longBreakTime;
                        longBreak = true;
                    }
                } 
                // Se atingir o final do Long Break
                else {
                    // Reseta os valores das variáveis para que um novo pomodoro possa ser iniciado.
                    document.querySelector('.stages').innerText = "1º Worktime";
                    timer = countdownTime;
                    shortBreak = false;
                    loopWorktime = 2;
                    loopShortBreak = 1;
                    longBreak = false;
                }
                
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                if(minutes < 10) {
                    document.querySelector(".minutes").innerText = "0" + minutes;
                } else {
                    document.querySelector(".minutes").innerText = minutes;
                }
    
                if(seconds < 10) {
                    document.querySelector(".seconds").innerText = "0" + seconds;
                } else {
                    document.querySelector(".seconds").innerText = seconds;
                }

                document.querySelector('.play-button').classList.add('disabled');
                document.querySelector('.pause-button').classList.add('disabled');
                document.querySelector('.restart-button').classList.add('disabled');
                document.querySelector('.continue-button').classList.remove('disabled');

                // Decrementa a variável timer em 1 ao final de cada ciclo da função setInterval.
                timer--;
                
                // Pausa o contador quando uma nova etapa é iniciada.
                pause = true;
            }
        } 
    }, 1000);
};

// Estrutura acionada quando a página inteira é carregada, incluindo seu conteúdo (imagens, css, scripts, etc.).
window.onload = function() {
    document.querySelector('.pause-button').classList.add('disabled');
    document.querySelector('.restart-button').classList.add('disabled');
    document.querySelector('.continue-button').classList.add('disabled');
}

function playButton() {
    // Passa o valor da variável startCountdownTime como argumento da função startTimer.
    startTimer(startCountdownTime);
    
    document.querySelector('.play-button').classList.add('disabled');
    document.querySelector('.pause-button').classList.remove('disabled');
    document.querySelector('.restart-button').classList.remove('disabled');
    document.querySelector('.continue-button').classList.add('disabled');
}

function continueButton() {
    pause = false;
    document.querySelector('.play-button').classList.add('disabled');
    document.querySelector('.pause-button').classList.remove('disabled');
    document.querySelector('.restart-button').classList.remove('disabled');
    document.querySelector('.continue-button').classList.add('disabled');
}

function pauseButton() {
    pause = true;
    document.querySelector('.play-button').classList.add('disabled');
    document.querySelector('.pause-button').classList.add('disabled');
    document.querySelector('.restart-button').classList.remove('disabled');
    document.querySelector('.continue-button').classList.remove('disabled');
}

function restartButton() {
    restart = true;
    document.querySelector('.play-button').classList.add('disabled');
    document.querySelector('.pause-button').classList.remove('disabled');
    document.querySelector('.restart-button').classList.remove('disabled');
    document.querySelector('.continue-button').classList.add('disabled');
}
