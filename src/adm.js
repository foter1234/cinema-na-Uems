import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sqpmnvfdauytmrrtdfoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0');

async function checkAuth() {
    try {
      const response = await fetch('http://localhost:3000/verify-token', {
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