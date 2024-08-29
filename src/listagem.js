import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sqpmnvfdauytmrrtdfoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0');


async function buscar() {
    const { data, error } = await supabase.from('cinema').select('*');
    if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
    }


const tableBody = document.querySelector('#data-table tbody');
tableBody.innerHTML = '';


data.forEach(tabela => {
    const tr = document.createElement('tr');

    const tdID = document.createElement('td');
    tdID.textContent = tabela.ID;
    tr.appendChild(tdID);

    const tdPoltrona = document.createElement('td');
    tdPoltrona.textContent = tabela.poltrona;
    tr.appendChild(tdPoltrona);

    const tdNome = document.createElement('td');
    tdNome.textContent = tabela.nome;
    tr.appendChild(tdNome);

    const tdstatus = document.createElement('td');
    tdstatus.textContent = tabela.status;
    tr.appendChild(tdstatus);

    tableBody.appendChild(tr);

});

}

buscar();
