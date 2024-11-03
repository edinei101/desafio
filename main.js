let isMoving = false;
        let posicaoInicial = { left: null, top: null };

        const soundsbotao = [
            'som/1.mp3',
            'som/2.mp3',
            'som/3.mp3'
        ];

        function reproduzirBotao() {
            const audio = document.getElementById("botaoAudio");
            const randomIndex = Math.floor(Math.random() * soundsbotao.length);
            audio.src = soundsbotao[randomIndex];
            audio.play();
        }
        
       
        function verificarCampos(input) {
            const valor = input.value;
            const botao = document.getElementById("botaoFujao");
            const isValid1 = !isNaN(valor) && valor.trim() !== "";

            if (!isValid1) {
                reproduzirValorInvalido1();
            }

            const valor1 = document.getElementById("valor1").value;
            const valor2 = document.getElementById("valor2").value;

            if (valor1 && valor2) {
                botao.disabled = false;
                if (!isMoving) {
                    isMoving = true;
                    fugirBotao();
                }
            } else {
                botao.disabled = true;
            }
        }

        function fugirBotao() {
            const botao = document.getElementById("botaoFujao");
            const threshold = 400; 

            if (posicaoInicial.left === null && posicaoInicial.top === null) {
                posicaoInicial.left = botao.offsetLeft;
                posicaoInicial.top = botao.offsetTop;
            }

            function moverBotao(event) {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                const buttonRect = botao.getBoundingClientRect();
                const buttonX = buttonRect.left + buttonRect.width / 2;
                const buttonY = buttonRect.top + buttonRect.height / 2;

                const distanceX = mouseX - buttonX;
                const distanceY = mouseY - buttonY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distance < threshold) {
                    const offsetX = distanceX > 0 ? -300 : 300; 
                    const offsetY = distanceY > 0 ? -300 : 300;

                    const container = document.querySelector('.container');
                    const maxX = container.offsetWidth - botao.offsetWidth;
                    const maxY = container.offsetHeight - botao.offsetHeight;

                    let newLeft = botao.offsetLeft + offsetX;
                    let newTop = botao.offsetTop + offsetY;

                    newLeft = Math.max(0, Math.min(newLeft, maxX));
                    newTop = Math.max(0, Math.min(newTop, maxY));

                    botao.style.left = `${newLeft}px`;
                    botao.style.top = `${newTop}px`;
                }
            }

            document.addEventListener("mousemove", moverBotao);

            setTimeout(() => {
                document.removeEventListener("mousemove", moverBotao);
                botao.style.left = posicaoInicial.left + "px";
                botao.style.top = posicaoInicial.top + "px";
                isMoving = false;
            }, 3000);
        }

        function somar() {
            const botao = document.getElementById("botaoFujao");
            const valor1 = parseFloat(document.getElementById("valor1").value);
            const valor2 = parseFloat(document.getElementById("valor2").value);

            if (isNaN(valor1) || isNaN(valor2)) {
                document.getElementById("resultado").textContent = "Por favor, insira números válidos.";
            } else {
                const soma = valor1 + valor2;
                document.getElementById("resultado").textContent = `Resultado: ${soma}`;

                botao.style.left = posicaoInicial.left + "px";
                botao.style.top = posicaoInicial.top + "px";

                reproduzirBotao();

                document.getElementById("valor1").value = "";
                document.getElementById("valor2").value = "";
                botao.disabled = true;

                isMoving = false;
                posicaoInicial = { left: null, top: null };
            }
        }