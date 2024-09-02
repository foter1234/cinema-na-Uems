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
    const { data, error } = await supabase.from('cinema').
    select('poltrona,nome, telefone, eventos(nome)').
    eq('status',1).
    order('poltrona', { ascending: true });
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

    const tdTelefone = document.createElement('td');
    tdTelefone.textContent = tabela.telefone;
    tr.appendChild(tdTelefone);

    const tdEvento = document.createElement('td');
    tdEvento.textContent = tabela.eventos ? tabela.eventos.nome : 'N/A';
    tr.appendChild(tdEvento);

    tableBody.appendChild(tr);
});
}

async function limparStatus() {
  const { data, error } = await supabase
      .from('cinema')
      .update({ status: 0 })
      .eq('status', 1);//onde é equivalente a 1

  if (error) {
      console.error('Erro ao atualizar status:', error);
  } else {
      console.log('Status atualizado:', data);
  }
}

async function limparNome() {
  const { data, error } = await supabase.from('cinema').update({ nome: '' })
      .neq('nome', '');//onde nome não é equivalente a ''

  if (error) {
      console.error('Erro ao atualizar nome:', error);
  } else {
      console.log('Nome atualizado:', data);
  }
}

async function limparTelefone() {
  const { data, error } = await supabase.from('cinema').update({ telefone: '' })
      .neq('telefone', '');//onde telefone não é equivalente a ''

  if (error) {
      console.error('Erro ao atualizar telefone:', error);
  } else {
      console.log('Telefone atualizado:', data);
  }
}


async function limparEventoId() {
  const { data, error } = await supabase.from('cinema').update({ evento_id: null })
      .not('evento_id', 'is', null); // onde não for igual a null 


  if (error) {
      console.error('Erro ao atualizar evento_id:', error);
  } else {
      console.log('Evento_id atualizado:', data);
  }
}


async function limparTabela() {
  await limparStatus();
  await limparNome();
  await limparTelefone();
  await limparEventoId();
}

document.getElementById('resetarTabela').addEventListener('click', limparTabela);

buscar();
