import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function checkAuth() {
    try {
      const response = await fetch('https://servidor-omega.vercel.app/verify-token', {
        method: 'GET',
        credentials: 'include' 
      });
  
      if (response.ok) {
        // Token válido, mostre o conteúdo
        document.getElementById('showcase').style.display = 'block';
      } else {
        window.location.href = '/index.html'; 
      }
    } catch (error) {
      console.error('Error:', error);
      // Se houver um erro redireciona para a página de login
      window.location.href = '/index.html'; 
    }
  }
  checkAuth();

async function evento(id,nome,dataE,hora,duracao) {
    const { error, data } = await supabase.from('eventos').insert({id:id,nome: nome, data:dataE, hora:hora, duracao:duracao }).eq('id', id);
    
    if (error) {
        console.error('Erro ao cadastrar status:', error);
        return;
    }

    console.log('evento cadastrado com sucesso:', data);
}

document.getElementById('cadastro').addEventListener('submit', async(e) =>{
    e.preventDefault();
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const duracao = document.getElementById('duracao').value;

    await evento(id,nome, data, hora,duracao);

})