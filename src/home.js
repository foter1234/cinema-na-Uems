import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para pegar o valor do cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Função para verificar autenticação
async function checkAuth() {
    const token = getCookie('token');

    if (!token) {
        // Se o token não existir, redirecionar para a página de login
        window.location.href = 'login.html';
        return;
    }

    // Verifica se o token ainda é válido
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        // Se o token for inválido ou não houver um usuário autenticado, redirecionar para a página de login
        window.location.href = 'login.html';
    } else {
        // O usuário está autenticado, exibe uma mensagem de boas-vindas
        document.getElementById('welcome-message').textContent = `Bem-vindo, ${user.email}!`;
    }
}

// Chama a função para verificar autenticação ao carregar a página
checkAuth();