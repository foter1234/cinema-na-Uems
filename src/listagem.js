import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sqpmnvfdauytmrrtdfoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0');


async function checkAuth() {
    try {
      const response = await fetch('http://localhost:3000/verify-token', {
        method: 'GET',
        credentials: 'include' 
      });
  
      if (response.ok) {
        document.getElementById('tabela').style.display = 'block';
      } else {
        window.location.href = '/index.html'; 
      }
    } catch (error) {
      console.error('Error:', error);

      window.location.href = '/index.html';
    }
  }
  checkAuth();

async function buscar() {
    const { data, error } = await supabase.from('cinema').select('*').eq('status',1).order('poltrona', { ascending: true });
    if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
    }


const tableBody = document.querySelector('#tabela tbody');
tableBody.innerHTML = '';


data.forEach(tabela => {
    const tr = document.createElement('tr');

    const tdPoltrona = document.createElement('td');
    tdPoltrona.textContent = tabela.poltrona;
    tr.appendChild(tdPoltrona);

    const tdNome = document.createElement('td');
    tdNome.textContent = tabela.nome;
    tr.appendChild(tdNome);

    tableBody.appendChild(tr);
});
}

buscar();
