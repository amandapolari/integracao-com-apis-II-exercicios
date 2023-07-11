# Integração de APIs II - Exercícios

## Índice

-   [1. Configurações Iniciais](#1-configurações-iniciais)
-   [2. Exercicio 1](#exercício-1)
-   [3. Exercício 2](#exercício-2)
-   [4. Exercício 3](#exercício-3)
-   [5. Exercício 4](#exercício-4)

## 1. Configurações Iniciais

-   Para esse exercício utilizaremos o `axios` e a `API Labefy`
    -   Para utilizar o `axios`, rode no terminal:
        ```
        npm install axios
        ```
    -   Após a instalação, importe-o no topo da página que irá utilizar o axios:
        ```
        import axios from 'axios'
        ```
    -   [Link da API Labefy](https://documenter.getpostman.com/view/7549981/SztBc8eT?version=latest)

## Exercício 1

### Enunciado:

Vamos relembrar um pouco o que foi feito até agora? Leia novamente a documentação da API e analise como você consumiu cada endpoint no seu código até o momento.

### Minha Resolução:

## Exercício 2

### Enunciado:

Viu alguma diferença em como utilizar os métodos `GET`, `POST` e `DELETE` da API?

### Minha Resolução:

# Exercício 3

### Enunciado:

Vamos então deixar o nosso projeto mais robusto e adicionar uma nova funcionalidade: procurar por uma playlist. Adicione esse novo `endpoint` no seu código utilizando a sintaxe do `async` e `await`. Lembre-se do tratamento de erros e das constantes.

### Minha Resolução:

-   Adicionei um campo para receber a digitação do usuário e outro para limpar a pesquisa:
    ```
    <div>
        <input
            value={namePlaylist}
            onChange={(e) => setNamePlaylist(e.target.value)}
            placeholder="Nome da Playlist"
        />
        <button
            type="submit"
            onClick={() => {
    enviarDados();
            }}
        >
            Pesquisar
        </button>
        <button
            onClick={() => {
    resete();
            }}
        >
            Limpar
        </button>
    </div>
    ```
-   Criei mais dois estados, um para receber os valores digitados pelo usuário e outro para passar os valores da pesquisa a cada nova pesquisa e para ser monitorado pelo `useEffect`:

    ```
    const [namePlaylist, setNamePlaylist] = useState('');
    const [pesquisa, setPesquisa] = useState({ nome: '' });
    ```

-   Criei a função de requisição:
    ```
    const pesquisaPlaylist = async (pesquisa) => {
        try {
            const resp = await axios.get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa.nome}`,
                {
                    headers: {
                        Authorization: 'amanda-polari-easley',
                    },
                }
            );
            resp.data.result.playlist.length
                ? setPlaylists(resp.data.result.playlist)
                : getAllPlaylists();
        } catch (error) {
            console.log(error.response);
        }
    };
    ```
-   Essas são as funções de `enviarDados` chamada no clique de _pesquisar_ e `resete` chamada no clique de _limpar_

    ```
    const enviarDados = () => {
        const novaPesquisa = {
            nome: namePlaylist,
        };
        setPesquisa(novaPesquisa);
        setNamePlaylist('');
    };

    const resete = () => {
        getAllPlaylists();
    };
    ```

-   Por fim criei um useEffect para monitorar as mudanças do estado `pesquisa`
    ```
    useEffect(() => {
        pesquisaPlaylist(pesquisa);
    }, [pesquisa]);
    ```

# Exercício 4

### Enunciado:

Por fim, vamos agora adicionar a funcionalidade de deletar uma playlist. Caso você tenha alguma dificuldade nas requisições, pode conferir como foi utilizado no exercício passado.

### Minha Resolução:
