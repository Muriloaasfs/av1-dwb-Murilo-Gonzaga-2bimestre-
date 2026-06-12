// detalhes.js - Lógica da página de detalhes do Pokémon

// Elementos do DOM
const loadingSpinner = document.getElementById('loading-spinner');
const pokemonDetails = document.getElementById('pokemon-details');
const errorAlert = document.getElementById('error-alert');
const backButton = document.getElementById('back-button');

// Função principal para carregar os detalhes do Pokémon
async function loadPokemonDetails() {
    try {
        // Mostra o spinner de carregamento
        loadingSpinner.classList.remove('d-none');

        // Captura o parâmetro 'id' da URL usando URLSearchParams
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');

        // Verifica se o parâmetro foi fornecido
        if (!pokemonId) {
            throw new Error('ID do Pokémon não fornecido na URL');
        }

        // Faz o fetch para a API PokéAPI usando o ID do Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Esconde o spinner e mostra os detalhes
        loadingSpinner.classList.add('d-none');
        pokemonDetails.classList.remove('d-none');

        // Exibe os detalhes do Pokémon
        displayPokemonDetails(data);

    } catch (error) {
        // Em caso de erro, esconde o spinner e mostra o alerta
        loadingSpinner.classList.add('d-none');
        errorAlert.classList.remove('d-none');
        console.error('Erro ao carregar detalhes do Pokémon:', error);
    }
}

// Função para exibir os detalhes do Pokémon
function displayPokemonDetails(pokemon) {
    // Define a cor baseada no tipo principal
    const primaryType = pokemon.types[0].type.name;
    const palette = getTypePalette(primaryType);
    applyPokemonTypeColor(palette);

    // Atualiza a imagem
    const spriteImg = document.getElementById('pokemon-sprite');
    spriteImg.src = pokemon.sprites.front_default;
    spriteImg.alt = pokemon.name;

    // Atualiza o nome
    const nameElement = document.getElementById('pokemon-name');
    nameElement.textContent = pokemon.name;

    // Cria badges para os tipos
    const typesContainer = document.getElementById('pokemon-types');
    typesContainer.innerHTML = pokemon.types.map((typeObj, index) => {
        const typeName = typeObj.type.name;
        const badgeColor = index === 0 ?
            `linear-gradient(45deg, var(--main-pokemon-gradient-start), var(--main-pokemon-gradient-end))` :
            `linear-gradient(45deg, ${getTypePalette(typeName).badge}, ${getTypePalette(typeName).badgeDark})`;

        return `<span class="type-badge" style="background: ${badgeColor}">${typeName}</span>`;
    }).join('');

    // Cria as barras de status
    const statsContainer = document.getElementById('pokemon-stats');
    statsContainer.innerHTML = pokemon.stats.map(stat => `
        <div class="mb-3">
            <strong>${stat.stat.name.toUpperCase()}:</strong> ${stat.base_stat}
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${Math.min(stat.base_stat, 100)}%"></div>
            </div>
        </div>
    `).join('');
}

// Função para aplicar as variáveis CSS dinamicamente
function applyPokemonTypeColor(palette) {
    document.documentElement.style.setProperty('--main-pokemon-color', palette.main);
    document.documentElement.style.setProperty('--main-pokemon-glow', palette.glow);
    document.documentElement.style.setProperty('--main-pokemon-border', palette.border);
    document.documentElement.style.setProperty('--main-pokemon-gradient-start', palette.gradientStart);
    document.documentElement.style.setProperty('--main-pokemon-gradient-end', palette.gradientEnd);
}

// Função para obter paleta de cores por tipo
function getTypePalette(type) {
    const palettes = {
        bug: {
            main: '#92BC2C',
            glow: 'rgba(146, 188, 44, 0.35)',
            border: 'rgba(146, 188, 44, 0.3)',
            gradientStart: '#92BC2C',
            gradientEnd: '#B9D262',
            badge: '#92BC2C',
            badgeDark: '#768B24',
        },
        grass: {
            main: '#5FBD58',
            glow: 'rgba(95, 189, 88, 0.35)',
            border: 'rgba(95, 189, 88, 0.3)',
            gradientStart: '#5FBD58',
            gradientEnd: '#85D17F',
            badge: '#5FBD58',
            badgeDark: '#4C9147',
        },
        fairy: {
            main: '#EE90E6',
            glow: 'rgba(238, 144, 230, 0.35)',
            border: 'rgba(238, 144, 230, 0.3)',
            gradientStart: '#EE90E6',
            gradientEnd: '#F2B4F0',
            badge: '#EE90E6',
            badgeDark: '#C97BCB',
        },
        normal: {
            main: '#A0A29F',
            glow: 'rgba(160, 162, 159, 0.35)',
            border: 'rgba(160, 162, 159, 0.3)',
            gradientStart: '#A0A29F',
            gradientEnd: '#C2C3BF',
            badge: '#A0A29F',
            badgeDark: '#81837F',
        },
        dragon: {
            main: '#0C69C8',
            glow: 'rgba(12, 105, 200, 0.35)',
            border: 'rgba(12, 105, 200, 0.3)',
            gradientStart: '#0C69C8',
            gradientEnd: '#4A8CEC',
            badge: '#0C69C8',
            badgeDark: '#0A54A2',
        },
        psychic: {
            main: '#FA8581',
            glow: 'rgba(250, 133, 129, 0.35)',
            border: 'rgba(250, 133, 129, 0.3)',
            gradientStart: '#FA8581',
            gradientEnd: '#F9A8A4',
            badge: '#FA8581',
            badgeDark: '#D06B67',
        },
        ghost: {
            main: '#5F6DBC',
            glow: 'rgba(95, 109, 188, 0.35)',
            border: 'rgba(95, 109, 188, 0.3)',
            gradientStart: '#5F6DBC',
            gradientEnd: '#8291D1',
            badge: '#5F6DBC',
            badgeDark: '#4B558E',
        },
        ground: {
            main: '#DA7C4D',
            glow: 'rgba(218, 124, 77, 0.35)',
            border: 'rgba(218, 124, 77, 0.3)',
            gradientStart: '#DA7C4D',
            gradientEnd: '#E19A70',
            badge: '#DA7C4D',
            badgeDark: '#B26644',
        },
        steel: {
            main: '#5695A3',
            glow: 'rgba(86, 149, 163, 0.35)',
            border: 'rgba(86, 149, 163, 0.3)',
            gradientStart: '#5695A3',
            gradientEnd: '#7FB2BB',
            badge: '#5695A3',
            badgeDark: '#417078',
        },
        fire: {
            main: '#FBA54C',
            glow: 'rgba(251, 165, 76, 0.35)',
            border: 'rgba(251, 165, 76, 0.3)',
            gradientStart: '#FBA54C',
            gradientEnd: '#FFB974',
            badge: '#FBA54C',
            badgeDark: '#D88A3B',
        },
        flying: {
            main: '#81B9EF',
            glow: 'rgba(129, 185, 239, 0.35)',
            border: 'rgba(129, 185, 239, 0.3)',
            gradientStart: '#81B9EF',
            gradientEnd: '#A1CFF6',
            badge: '#81B9EF',
            badgeDark: '#5D91C3',
        },
        ice: {
            main: '#75D0C1',
            glow: 'rgba(117, 208, 193, 0.35)',
            border: 'rgba(117, 208, 193, 0.3)',
            gradientStart: '#75D0C1',
            gradientEnd: '#95E4D8',
            badge: '#75D0C1',
            badgeDark: '#5BA99A',
        },
        electric: {
            main: '#F2D94E',
            glow: 'rgba(242, 217, 78, 0.35)',
            border: 'rgba(242, 217, 78, 0.3)',
            gradientStart: '#F2D94E',
            gradientEnd: '#F7E47A',
            badge: '#F2D94E',
            badgeDark: '#C9B647',
        },
        rock: {
            main: '#C9BB8A',
            glow: 'rgba(201, 187, 138, 0.35)',
            border: 'rgba(201, 187, 138, 0.3)',
            gradientStart: '#C9BB8A',
            gradientEnd: '#DBCFA7',
            badge: '#C9BB8A',
            badgeDark: '#9C8E6C',
        },
        dark: {
            main: '#595761',
            glow: 'rgba(89, 87, 97, 0.35)',
            border: 'rgba(89, 87, 97, 0.3)',
            gradientStart: '#595761',
            gradientEnd: '#7A7885',
            badge: '#595761',
            badgeDark: '#43424C',
        },
        water: {
            main: '#539DDF',
            glow: 'rgba(83, 157, 223, 0.35)',
            border: 'rgba(83, 157, 223, 0.3)',
            gradientStart: '#539DDF',
            gradientEnd: '#78B7F1',
            badge: '#539DDF',
            badgeDark: '#3C7DAA',
        },
        fighting: {
            main: '#D3425F',
            glow: 'rgba(211, 66, 95, 0.35)',
            border: 'rgba(211, 66, 95, 0.3)',
            gradientStart: '#D3425F',
            gradientEnd: '#E37A87',
            badge: '#D3425F',
            badgeDark: '#A9394F',
        },
        poison: {
            main: '#B763CF',
            glow: 'rgba(183, 99, 207, 0.35)',
            border: 'rgba(183, 99, 207, 0.3)',
            gradientStart: '#B763CF',
            gradientEnd: '#C99DE0',
            badge: '#B763CF',
            badgeDark: '#8E4A9F',
        },
    };
    return palettes[type] || palettes.normal;
}

// Função para voltar à página inicial
function goBack() {
    window.location.href = 'index.html';
}

// Adiciona evento ao botão voltar
backButton.addEventListener('click', goBack);

// Carrega os detalhes quando a página é carregada
document.addEventListener('DOMContentLoaded', loadPokemonDetails);