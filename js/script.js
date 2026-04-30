// script.js - Lógica da página de listagem de Pokémon

// Elementos do DOM
const loadingSpinner = document.getElementById('loading-spinner');
const pokemonGrid = document.getElementById('pokemon-grid');
const errorAlert = document.getElementById('error-alert');

// Função principal para carregar os Pokémon
async function loadPokemon() {
    try {
        // Mostra o spinner de carregamento
        loadingSpinner.classList.remove('d-none');

        // Faz o fetch para a API PokéAPI, buscando os primeiros 151 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Busca os detalhes de cada Pokémon em paralelo
        const pokemonDetailsList = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailResponse = await fetch(pokemon.url);
                if (!detailResponse.ok) {
                    throw new Error(`Erro ao carregar detalhes de ${pokemon.name}`);
                }
                return await detailResponse.json();
            })
        );

        // Ordena a lista pelo ID para manter a ordem correta da Pokédex
        pokemonDetailsList.sort((a, b) => a.id - b.id);

        // Esconde o spinner e mostra o grid
        loadingSpinner.classList.add('d-none');
        pokemonGrid.classList.remove('d-none');

        // Itera sobre os resultados ordenados e cria os cards
        pokemonDetailsList.forEach(details => {
            createPokemonCard(details);
        });

    } catch (error) {
        // Em caso de erro, esconde o spinner e mostra o alerta
        loadingSpinner.classList.add('d-none');
        errorAlert.classList.remove('d-none');
        console.error('Erro ao carregar Pokémon:', error);
    }
}

// Função para criar um card de Pokémon
function createPokemonCard(pokemonDetails) {
    // Cria o elemento do card
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    // Obtém a imagem do sprite frontal diretamente dos detalhes
    const imageUrl = pokemonDetails.sprites.front_default;

    // Cria o conteúdo do card com glassmorphism
    card.innerHTML = `
        <div class="pokemon-card h-100" onclick="goToDetails('${pokemonDetails.name}')">
            <img src="${imageUrl}" alt="${pokemonDetails.name}" class="pokemon-image">
            <div class="pokemon-name">${pokemonDetails.name}</div>
        </div>
    `;

    // Adiciona o card ao grid
    pokemonGrid.appendChild(card);
}

// Função para redirecionar para a página de detalhes
function goToDetails(name) {
    // Redireciona para detalhes.html com o parâmetro name
    window.location.href = `detalhes.html?name=${name}`;
}

// Carrega os Pokémon quando a página é carregada
document.addEventListener('DOMContentLoaded', loadPokemon);