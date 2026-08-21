const jogos = [
    {
        id: 1,
        nome: "Age of Empires",
        categoria: "Estratégia",
        preco: 19.90,
        imagem:"img/AgeOfEmpires.jpg"
    },
    
    {
        id: 2,
        nome: "Counter Strike",
        categoria: "FPS",
        preco: 25.90,
        imagem: "img/CounterStrike.jpg"
    },
    
    {
      id: 3,
        nome: "Doom",
        categoria: "FPS",
        preco: 22.90,
        imagem: "img/Doom.jpg"
    },
    {
        id: 4,
        nome: "Duke Nukem",
        categoria: "FPS",
        preco: 24.90,
        imagem: "img/DukeNukem.jpg"
    },

    {
        id: 5,
        nome: "Time Commando",
        categoria: "Ação",
        preco: 29.90,
        imagem: "img/Time Comando.jpg"
    },

    {
        id: 6,
        nome: "Worms Armageddon",
        categoria: "Estratégia",
        preco: 34.90,
        imagem: "img/Worms.jpg"
    },
    
    {
        id: 7,
        nome: "Prince of Persia",
        categoria: "Ação",
        preco: 22.90,
        imagem: "img/prince-of-persia_1.gif"
    },
    
    {
        id: 8,
        nome: "Starcraft",
        categoria: "Estratégia",
        preco: 27.90,
        imagem: "img/Starcraft.jpg"
    },

    {
        id: 9,
        nome: "Need For Speed-2",
        categoria: "Corrida",
        preco: 27.90,
        imagem: "img/NeedForSpeed.jpg"
    },

        {
        id: 10,
        nome: "KKND",
        categoria: "Estratégia",
        preco: 27.90,
        imagem: "img/KKND.jpg"
    },

        {
        id: 11,
        nome: "Sim City 3000",
        categoria: "Estratégia",
        preco: 19.90,
        imagem:"img/SimCity3000.jpg"
    },

        {
        id: 12,
        nome: "Theme Hospital",
        categoria: "estratégia",
        preco: 25.90,
        imagem: "img/ThemeHospital.jpg"
    },

        {
      id: 13,
        nome: "Rollercoaster",
        categoria: "Estratégia",
        preco: 22.90,
        imagem: "img/Rollercoaster.jpg"
    },

        {
        id: 14,
        nome: "Red Alert",
        categoria: "Estratégia",
        preco: 24.90,
        imagem: "img/RedAlert.jpg"
    },


    
];

let listaJogos = document.getElementById("listaJogos");
if (listaJogos) {
    for (let i = 0; i < jogos.length; i++){
        listaJogos.innerHTML += `
            <div class="card-jogo">
                <img src="${jogos[i].imagem}" alt="${jogos[i].nome}">
                <div class="card-conteudo">
                    <h3>${jogos[i].nome}</h3>
                    <p class="categoria">
                        ${jogos[i].categoria}
                    </p>

                    <p class="preco">
                        R$ ${jogos[i].preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                    <button class="botao" onclick="adicionarCarrinho(${jogos[i].id})">
                        ADICIONAR AO CARRINHO
                        </button>
                   </div>
                </div>
        `;
    }
}
let formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    formCadastro.onsubmit = function(event) {event.preventDefault();
        let nome = document.getElementById("nome").value;

        let email = document.getElementById("email").value;

        let senha = document.getElementById("senha").value;

        let confirmarSenha = document.getElementById("confirmarSenha").value;

        let mensagem = document.getElementById("mensagemCadastro");

        if (senha != confirmarSenha) {
            mensagem.innerHTML = "As senhas não são iguais.";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if (usuarios == null) {
            usuarios = [];
        }

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == email) {
                mensagem.innerHTML = "Este e-mail já está cadastrado.";
                return;
            }
        }

        let usuario = {nome: nome,email:email,senha:senha};
            usuarios.push(usuario);

            localStorage.setItem("usuarios",JSON.stringify(usuarios));
            mensagem.innerHTML ="Cadastro realizado com sucesso!";

            setTimeout(function() {
            window.location.href = "login.html";
        }, 1000);
    };
}

let formLogin =document.getElementById("formLogin");
if (formLogin) {
    formLogin.onsubmit = function(event){event.preventDefault();
        let email = document.getElementById("emailLogin").value;
        let senha = document.getElementById("senhaLogin").value;
        let mensagem = document.getElementById("mensagemLogin");
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if (usuarios == null){mensagem.innerHTML = "Nenhuma usuário cadastrado.";
            return;
        }
        let encontrou = false;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == email &&
                usuarios[i].senha == senha) {
                encontrou = true;

                localStorage.setItem("usuarioLogado",JSON.stringify(usuarios[i]));
                mensagem.innerHTML ="Login realizado com sucesso!";
 
                setTimeout(function() {window.location.href ="index.html";}, 1000);
            }
        }
        if (encontrou == false){mensagem.innerHTML ="E-mail ou senha incorretos.";}};
}

function adicionarCarrinho(id) {
    let usuarioLogado =localStorage.getItem("usuarioLogado");
    if (usuarioLogado == null) {
        alert("Você precisa fazer login para comprar.");
        window.location.href="login.html";
        return;
    }

    let carrinho =JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho == null) {
        carrinho = [];
    }

    let jogo;
    for (let i = 0; i < jogos.length; i++) {
        if (jogos[i].id == id) {
            jogo = jogos[i];
        }
    }

    let encontrado = false;
    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id == id) {
            carrinho[i].quantidade++;
            encontrado = true;
        }
    }

    if (encontrado == false) {
        let novoJogo = {
            id: jogo.id,
            nome: jogo.nome,
            preco: jogo.preco,
            imagem: jogo.imagem,
            quantidade: 1
        };
        carrinho.push(novoJogo);
    }
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    atualizarContador();
    alert(jogo.nome + " foi adicionado ao carrinho!");
}

function atualizarContador(){
    let contador =document.getElementById("contadorCarrinho");
    if (contador == null){
        return;
    }
    let carrinho =JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho == null){
        contador.innerHTML = "0";
        return;
    }

    let quantidade = 0;
    for (let i = 0; i < carrinho.length; i++){
        quantidade = quantidade + carrinho[i].quantidade;
    }
    contador.innerHTML = quantidade;

}

function carregarCarrinho(){
    let listaCarrinho = document.getElementById("listaCarrinho");
    let resumoCarrinho = document.getElementById("resumoCarrinho");
    if (listaCarrinho == null || resumoCarrinho == null){
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho"));

    if (carrinho == null || carrinho.length == 0){
        listaCarrinho.innerHTML = `
            <div class="formulario">
                <h2>Seu carrinho está vazio.</h2>
                <br>
                <a href="index.html" class="botao">
                    VOLTAR PARA A LOJA
                </a>
            </div>
        `;
        resumoCarrinho.innerHTML = "";
        return;
    }

    listaCarrinho.innerHTML = "";
    let total = 0;
    for (let i = 0; i < carrinho.length; i++) {
        let subtotal = carrinho[i].preco * carrinho[i].quantidade;
        total = total + subtotal;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">
                <img src="${carrinho[i].imagem}" alt="${carrinho[i].nome}">
                <div class="item-info">
                    <h3>${carrinho[i].nome}</h3>
                    <p>R$ ${carrinho[i].preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>
                </div>
                <div class="quantidade">
                    <button onclick="alterarQuantidade(${carrinho[i].id},-1)"> -
                    </button>
                    <strong>${carrinho[i].quantidade}</strong>
                    <button onclick="alterarQuantidade(${carrinho[i].id},1)"> +
                    </button>
                </div>

                <button class="remover" onclick="removerItem(${carrinho[i].id})">
                    REMOVER
                </button>
            </div>
        `;
    }

    resumoCarrinho.innerHTML = `
        <h2>
            Total:
            R$ ${total
                .toFixed(2)
                .replace(".", ",")}
        </h2>
        <button class="botao" onclick="finalizarCompra()">
            FINALIZAR COMPRA
        </button>
    `;
}

function alterarQuantidade(id, valor) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho == null) {
        return;
    }

    for (let i = 0; i < carrinho.length; i++) {

        if (carrinho[i].id == id) {
            carrinho[i].quantidade = carrinho[i].quantidade + valor;

            if (carrinho[i].quantidade <= 0) {
                carrinho.splice(i, 1);
            }
        }
    }

    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    carregarCarrinho();
    atualizarContador();
}

function removerItem(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho == null) {
        return;
    }
    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id == id) {
            carrinho.splice(i, 1);
        }
    }
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
    carregarCarrinho();
    atualizarContador();
}

function atualizarUsuario() {
    let areaUsuario = document.getElementById("areaUsuario");

    if (areaUsuario == null) {
        return;
    }

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado != null) {
        areaUsuario.innerHTML = `
            <span>Olá, ${usuarioLogado.nome}</span>
            <a href="#" onclick="logout()">Sair</a>
        `;

    } else {
        areaUsuario.innerHTML = `
            <a href="login.html">Login</a>
            <a href="cadastro.html">Cadastro</a>
        `;
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

function finalizarCompra() {
    let usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado == null) {
        alert("Você precisa fazer login.");
        window.location.href = "login.html";
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho"));

    if (carrinho == null || carrinho.length == 0){
        alert("Seu carrinho está vazio.");
        return;
    }

    let total = 0;

    for (let i = 0; i < carrinho.length; i++) {
        total = total + (carrinho[i].preco * carrinho[i].quantidade);
    }

    let numeroPedido = Math.floor(Math.random() * 900000) + 100000;

    alert("COMPRA REALIZADA COM SUCESSO!\n\n" +
        "Número do pedido: #" + numeroPedido +
        "\n\n" +
        "Total: R$ " +
        total
            .toFixed(2)
            .replace(".", ",")
    );

    localStorage.removeItem("carrinho");
    window.location.href = "index.html";
}

carregarCarrinho();
atualizarContador();
atualizarUsuario();