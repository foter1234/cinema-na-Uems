import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://sqpmnvfdauytmrrtdfoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.getElementById('login').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    alert('Erro ao fazer login: ' + error.message);
    return;
  }

  if (data) {
    alert('Login bem-sucedido! Redirecionando...');
    try {
      const response = await fetch('https://servidor-omega.vercel.app/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.statusText}`);
      }
      
      const result = await response.json(); // Adiciona isso para capturar o corpo da resposta
      console.log(result); // Para depuração
      
      window.location.href = '/home.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao obter token: ' + error.message);
    }
  }
});
