import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

let fornecedores = [
  {
    cnpj: "00.000.000/0000-00",
    razao: "EXEMPLO FEITO",
    fantasia: "Exemplo42",
    endereco: "Rua Bla Bla, 123",
    cidade: "Presidente Prudente",
    uf: "SP",
    cep: "00000-000",
    email: "contato@exemplo.com",
    telefone: "(18) 99999-9999",
    data: "Pré-cadastrado"
  }
];

let logado = false;
const user = "admin";
const pass = "1234";

function menu() {
  return `
    <a href="/">Home</a> |
    <a href="/fornecedor">Cadastrar</a> |
    <a href="/lista">Lista</a> |
    <a href="/login">Login</a> |
    <a href="/logout">Logout</a>
    <hr>
  `;
}

app.get("/", (req, res) => {
  res.send(`
    <h1>Home</h1>
    ${menu()}
    <p>ESCOLHA A OPÇÂO DESEJADA ACIMA</p>
  `);
});

 // LOGIN
app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    ${menu()}

    <form method="POST">
      Usuário: <input name="user"><br>
      <span style="color:red"></span><br><br>

      Senha: <input type="password" name="pass"><br>
      <span style="color:red"></span><br><br>

      <button>Entrar</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  let usuario = req.body.user;
  let senha = req.body.pass;

  let erroUser = "";
  let erroPass = "";
  let temErro = false;

  // validação simples
  if (!usuario) {
    erroUser = "O usuário é obrigatório.";
    temErro = true;
  }

  if (!senha) {
    erroPass = "A senha é obrigatória.";
    temErro = true;
  }

  if (temErro) {
    return res.send(`
      <h1>Login</h1>
      ${menu()}

      <form method="POST">
        Usuário: <input name="user" value="${usuario || ""}"><br>
        <span style="color:red">${erroUser}</span><br><br>

        Senha: <input type="password" name="pass" value=""><br>
        <span style="color:red">${erroPass}</span><br><br>

        <button>Entrar</button>
      </form>
    `);
  }

  if (usuario === user && senha === pass) {
    logado = true;
    return res.send(`
      <h1>Logado!</h1>
      ${menu()}
      <p>Login efetuado com sucesso!</p>
    `);
  }

  return res.send(`
    <h1>Falha no Login</h1>
    ${menu()}

    <form method="POST">
      Usuário: <input name="user" value="${usuario}"><br>
      <span style="color:red">Usuário ou senha incorretos.</span><br><br>

      Senha: <input type="password" name="pass"><br>
      <span style="color:red">Usuário ou senha incorretos.</span><br><br>

      <button>Entrar</button>
    </form>
  `);
});


 // LOGOUT 
app.get("/logout", (req, res) => {
  logado = false;
  res.send(`
    <h1>Logout</h1>
    ${menu()}
    <p>Logout realizado com sucesso!</p>
  `);
});

 // CADASTROO
app.get("/fornecedor", (req, res) => {
  res.send(`
    <h1>Cadastro de Fornecedor</h1>
    ${menu()}

    <form method="POST">
      CNPJ: <input name="cnpj" value=""><br><br>
      Razão Social: <input name="razao" value=""><br><br>
      Nome Fantasia: <input name="fantasia" value=""><br><br>
      Endereço: <input name="endereco" value=""><br><br>
      Cidade: <input name="cidade" value=""><br><br>
      UF: <input name="uf" value=""><br><br>
      CEP: <input name="cep" value=""><br><br>
      Email: <input name="email" value=""><br><br>
      Telefone: <input name="telefone" value=""><br><br>

      <button>Cadastrar</button>
    </form>
  `);
});
 // cadastro 2 
app.post("/fornecedor", (req, res) => {

  let dados = req.body;
  let erros = {};

  if (!dados.cnpj) erros.cnpj = "CNPJ é obrigatório";
  if (!dados.razao) erros.razao = "Razão Social é obrigatória";
  if (!dados.fantasia) erros.fantasia = "Nome Fantasia é obrigatória";
  if (!dados.endereco) erros.endereco = "Endereço é obrigatório";
  if (!dados.cidade) erros.cidade = "Cidade é obrigatória";
  if (!dados.uf) erros.uf = "UF é obrigatória";
  if (!dados.cep) erros.cep = "CEP é obrigatório";
  if (!dados.email) erros.email = "Email é obrigatório";
  if (!dados.telefone) erros.telefone = "Telefone é obrigatório";

  let temErros = false;

  if (erros.cnpj) temErros = true;
  if (erros.razao) temErros = true;
  if (erros.fantasia) temErros = true;
  if (erros.endereco) temErros = true;
  if (erros.cidade) temErros = true;
  if (erros.uf) temErros = true;
  if (erros.cep) temErros = true;
  if (erros.email) temErros = true;
  if (erros.telefone) temErros = true;

  if (temErros) {
    return res.send(`
      <h1>Cadastro de Fornecedor</h1>
      ${menu()}

      <form method="POST">

        CNPJ: <input name="cnpj" value="${dados.cnpj || ""}"><br>
        <span style="color:red">${erros.cnpj || ""}</span><br><br>

        Razão Social: <input name="razao" value="${dados.razao || ""}"><br>
        <span style="color:red">${erros.razao || ""}</span><br><br>

        Nome Fantasia: <input name="fantasia" value="${dados.fantasia || ""}"><br>
        <span style="color:red">${erros.fantasia || ""}</span><br><br>

        Endereço: <input name="endereco" value="${dados.endereco || ""}"><br>
        <span style="color:red">${erros.endereco || ""}</span><br><br>

        Cidade: <input name="cidade" value="${dados.cidade || ""}"><br>
        <span style="color:red">${erros.cidade || ""}</span><br><br>

        UF: <input name="uf" value="${dados.uf || ""}"><br>
        <span style="color:red">${erros.uf || ""}</span><br><br>

        CEP: <input name="cep" value="${dados.cep || ""}"><br>
        <span style="color:red">${erros.cep || ""}</span><br><br>

        Email: <input name="email" value="${dados.email || ""}"><br>
        <span style="color:red">${erros.email || ""}</span><br><br>

        Telefone: <input name="telefone" value="${dados.telefone || ""}"><br>
        <span style="color:red">${erros.telefone || ""}</span><br><br>

        <button>Cadastrar</button>
      </form>
    `);
  }

  let novoFornecedor = {
    cnpj: dados.cnpj,
    razao: dados.razao,
    fantasia: dados.fantasia,
    endereco: dados.endereco,
    cidade: dados.cidade,
    uf: dados.uf,
    cep: dados.cep,
    email: dados.email,
    telefone: dados.telefone,
    data: new Date().toLocaleString()
  };

  fornecedores.push(novoFornecedor);

  res.send(`
    <h1>Fornecedor cadastrado!</h1>
    ${menu()}
    <p>Cadastro efetuado com sucesso.</p>
    <a href="/fornecedor">Cadastrar outro</a><br>
    <a href="/lista">Ver lista</a>
  `);
});

 // LISTA
app.get("/lista", (req, res) => {

  let lista = "";

  for (let i = 0; i < fornecedores.length; i++) {
    let f = fornecedores[i];
    lista += `
      <li>
        <b>${f.razao}</b> (${f.fantasia})<br>
        CNPJ: ${f.cnpj}<br>
        ${f.cidade}/${f.uf}<br>
        ${f.email}<br>
        ${f.telefone}<br>
      </li><br>
    `;
  }

  res.send(`
    <h1>Lista de Fornecedores</h1>
    ${menu()}
    <ul>${lista}</ul>
  `);
});

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:" + port);
});
